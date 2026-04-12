import { useState, useRef, useCallback } from "react";
import {
  Box, Card, CardContent, Typography, TextField, IconButton, alpha, useTheme, Chip,
  Select, MenuItem, FormControl, InputLabel, Slider, Tooltip,
} from "@mui/material";
import { Send as SendIcon, Stop as StopIcon, DeleteSweep as ClearIcon } from "@mui/icons-material";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import type { Agent } from "@/hooks/useAgents";

const AVAILABLE_MODELS = [
  { value: "gemini-2.5-flash", label: "Gemini 2.5 Flash" },
  { value: "gemini-2.5-pro", label: "Gemini 2.5 Pro" },
  { value: "gemini-3-flash-preview", label: "Gemini 3 Flash" },
  { value: "gemini-3.1-pro-preview", label: "Gemini 3.1 Pro" },
  { value: "gpt-5-mini", label: "GPT-5 Mini" },
  { value: "gpt-5", label: "GPT-5" },
  { value: "gpt-5-nano", label: "GPT-5 Nano" },
];

type Msg = { role: "user" | "assistant"; content: string };

const AGENT_TEST_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/agent-test`;

interface AgentTestPanelProps {
  agent: Agent;
}

export default function AgentTestPanel({ agent }: AgentTestPanelProps) {
  const theme = useTheme();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [overrideModel, setOverrideModel] = useState<string>("");
  const abortRef = useRef<AbortController | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: Msg = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);
    scrollToBottom();

    const controller = new AbortController();
    abortRef.current = controller;

    let assistantSoFar = "";

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
      scrollToBottom();
    };

    try {
      const allMessages = [...messages, userMsg];
      const resp = await fetch(AGENT_TEST_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: allMessages.map(({ role, content }) => ({ role, content })),
          agentConfig: {
            persona: agent.persona,
            model: overrideModel || agent.model,
            temperature: agent.temperature,
            max_tokens: agent.max_tokens,
            guardrails: agent.guardrails,
          },
        }),
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

      // flush
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
    } catch (e: any) {
      if (e.name !== "AbortError") {
        console.error("Agent test error:", e);
        toast.error("Failed to get response.");
      }
    } finally {
      setIsLoading(false);
      abortRef.current = null;
    }
  }, [input, isLoading, messages, agent]);

  const stop = () => abortRef.current?.abort();
  const clear = () => { setMessages([]); setInput(""); };

  return (
    <Card>
      <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
        {/* Header */}
        <Box sx={{ px: 3, py: 2, borderBottom: 1, borderColor: "divider", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
            <Typography variant="h6" fontWeight={600}>Test Agent</Typography>
            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel>Model</InputLabel>
              <Select
                value={overrideModel || agent.model || "gemini-2.5-flash"}
                label="Model"
                onChange={(e) => setOverrideModel(e.target.value)}
              >
                {AVAILABLE_MODELS.map((m) => (
                  <MenuItem key={m.value} value={m.value}>{m.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Chip label={`temp ${agent.temperature?.toFixed(2) ?? "0.70"}`} size="small" variant="outlined" />
              <Chip label={`${agent.max_tokens ?? 4096} tokens`} size="small" variant="outlined" />
              {agent.guardrails?.length > 0 && (
                <Chip label={`${agent.guardrails.length} guardrail${agent.guardrails.length > 1 ? "s" : ""}`} size="small" color="warning" variant="outlined" />
              )}
            </Box>
          </Box>
          <IconButton size="small" onClick={clear} disabled={messages.length === 0 && !input}>
            <ClearIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Messages */}
        <Box sx={{ height: 360, overflowY: "auto", px: 3, py: 2 }}>
          {messages.length === 0 && (
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", opacity: 0.5 }}>
              <Typography variant="body2" color="text.secondary">
                Send a message to test this agent with its configured persona, model, and settings.
              </Typography>
            </Box>
          )}
          {messages.map((msg, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                mb: 1.5,
              }}
            >
              <Box
                sx={{
                  maxWidth: "80%",
                  px: 2,
                  py: 1.5,
                  borderRadius: 2,
                  bgcolor: msg.role === "user"
                    ? alpha(theme.palette.primary.main, 0.1)
                    : alpha(theme.palette.text.primary, 0.04),
                  "& p": { m: 0 },
                  "& pre": {
                    bgcolor: alpha(theme.palette.text.primary, 0.06),
                    p: 1.5,
                    borderRadius: 1,
                    overflowX: "auto",
                    fontSize: "0.85rem",
                  },
                  "& code": { fontSize: "0.85rem" },
                }}
              >
                {msg.role === "assistant" ? (
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                ) : (
                  <Typography variant="body2">{msg.content}</Typography>
                )}
              </Box>
            </Box>
          ))}
          {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
            <Box sx={{ display: "flex", gap: 0.5, py: 1 }}>
              {[0, 1, 2].map((i) => (
                <Box
                  key={i}
                  sx={{
                    width: 8, height: 8, borderRadius: "50%",
                    bgcolor: "text.disabled",
                    animation: "bounce 1.4s infinite",
                    animationDelay: `${i * 0.16}s`,
                    "@keyframes bounce": {
                      "0%, 80%, 100%": { transform: "scale(0)" },
                      "40%": { transform: "scale(1)" },
                    },
                  }}
                />
              ))}
            </Box>
          )}
          <div ref={bottomRef} />
        </Box>

        {/* Input */}
        <Box sx={{ px: 3, py: 2, borderTop: 1, borderColor: "divider", display: "flex", gap: 1 }}>
          <TextField
            size="small"
            fullWidth
            placeholder="Type a message to test..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            multiline
            maxRows={3}
            inputProps={{ maxLength: 4000 }}
          />
          {isLoading ? (
            <IconButton onClick={stop} color="error">
              <StopIcon />
            </IconButton>
          ) : (
            <IconButton onClick={send} disabled={!input.trim()} color="primary">
              <SendIcon />
            </IconButton>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
