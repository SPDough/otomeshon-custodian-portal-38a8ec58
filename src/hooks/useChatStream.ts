import { useState, useRef, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export type ChatMessage = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

export function useChatStream() {
  const location = useLocation();
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<{ id: string; title: string; updated_at: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const getUserId = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.user?.id ?? "";
  };

  // Load conversation list
  const loadConversations = useCallback(async () => {
    const { data } = await supabase
      .from("chat_conversations")
      .select("id, title, updated_at")
      .eq("session_id", userId)
      .order("updated_at", { ascending: false })
      .limit(20);
    if (data) setConversations(data);
  }, []);

  // Load messages for a conversation
  const loadConversation = useCallback(async (convId: string) => {
    const { data } = await supabase
      .from("chat_messages")
      .select("role, content")
      .eq("conversation_id", convId)
      .order("created_at", { ascending: true });
    if (data) {
      setMessages(data as ChatMessage[]);
      setConversationId(convId);
    }
  }, []);

  // Start a new conversation
  const newConversation = useCallback(() => {
    setMessages([]);
    setConversationId(null);
  }, []);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  // Persist a message to the DB
  const persistMessage = async (convId: string, role: string, content: string) => {
    await supabase.from("chat_messages").insert({ conversation_id: convId, role, content });
  };

  // Ensure a conversation exists, create if needed
  const ensureConversation = async (firstMessage: string): Promise<string> => {
    if (conversationId) return conversationId;
    const title = firstMessage.length > 60 ? firstMessage.slice(0, 57) + "…" : firstMessage;
    const { data } = await supabase
      .from("chat_conversations")
      .insert({ session_id: userId, title })
      .select("id")
      .single();
    if (!data) throw new Error("Failed to create conversation");
    setConversationId(data.id);
    loadConversations();
    return data.id;
  };

  const send = useCallback(async (input: string) => {
    const userMsg: ChatMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    const controller = new AbortController();
    abortRef.current = controller;

    let assistantSoFar = "";
    let convId: string;

    try {
      convId = await ensureConversation(input);
      await persistMessage(convId, "user", input);
    } catch {
      toast.error("Failed to save message.");
      setIsLoading(false);
      return;
    }

    const upsert = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: assistantSoFar } : m
          );
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      const allMessages = [...messages, userMsg];
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: allMessages.map(({ role, content }) => ({ role, content })), context: { route: location.pathname } }),
        signal: controller.signal,
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({ error: "Request failed" }));
        if (resp.status === 429) toast.error("Rate limit reached — please wait a moment.");
        else if (resp.status === 402) toast.error("AI credits exhausted — add funds in workspace settings.");
        else toast.error(err.error || "Something went wrong.");
        setIsLoading(false);
        return;
      }

      if (!resp.body) throw new Error("No response body");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let done = false;

      while (!done) {
        const { done: readerDone, value } = await reader.read();
        if (readerDone) break;
        buffer += decoder.decode(value, { stream: true });

        let idx: number;
        while ((idx = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, idx);
          buffer = buffer.slice(idx + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") { done = true; break; }
          try {
            const parsed = JSON.parse(json);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) upsert(content);
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }

      // flush remaining
      if (buffer.trim()) {
        for (let raw of buffer.split("\n")) {
          if (!raw) continue;
          if (raw.endsWith("\r")) raw = raw.slice(0, -1);
          if (!raw.startsWith("data: ")) continue;
          const json = raw.slice(6).trim();
          if (json === "[DONE]") continue;
          try {
            const parsed = JSON.parse(json);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) upsert(content);
          } catch { /* ignore */ }
        }
      }

      // Persist the full assistant response
      if (assistantSoFar) {
        await persistMessage(convId, "assistant", assistantSoFar);
        // Update conversation timestamp
        await supabase.from("chat_conversations").update({ updated_at: new Date().toISOString() }).eq("id", convId);
      }
    } catch (e: any) {
      if (e.name !== "AbortError") {
        console.error("Chat stream error:", e);
        toast.error("Failed to get response.");
      }
    } finally {
      setIsLoading(false);
      abortRef.current = null;
    }
  }, [messages, conversationId, location.pathname]);

  const stop = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  const clear = useCallback(async () => {
    if (conversationId) {
      await supabase.from("chat_conversations").delete().eq("id", conversationId);
      loadConversations();
    }
    setMessages([]);
    setConversationId(null);
  }, [conversationId, loadConversations]);

  const deleteConversation = useCallback(async (convId: string) => {
    await supabase.from("chat_conversations").delete().eq("id", convId);
    if (convId === conversationId) {
      setMessages([]);
      setConversationId(null);
    }
    loadConversations();
  }, [conversationId, loadConversations]);

  return {
    messages, isLoading, send, stop, clear,
    conversations, conversationId,
    loadConversation, newConversation, deleteConversation,
  };
}
