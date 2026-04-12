import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface TestConversation {
  id: string;
  agent_id: string;
  user_id: string;
  model_used: string;
  temperature_used: number;
  created_at: string;
  updated_at: string;
}

export interface TestMessage {
  id: string;
  conversation_id: string;
  role: string;
  content: string;
  created_at: string;
}

export function useAgentTestConversations(agentId: string) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["agent-test-conversations", agentId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("agent_test_conversations")
        .select("*")
        .eq("agent_id", agentId)
        .order("created_at", { ascending: false })
        .limit(50);
      if (error) throw error;
      return data as TestConversation[];
    },
    enabled: !!user && !!agentId,
  });
}

export function useTestConversationMessages(conversationId: string | null) {
  return useQuery({
    queryKey: ["agent-test-messages", conversationId],
    queryFn: async () => {
      if (!conversationId) return [];
      const { data, error } = await supabase
        .from("agent_test_messages")
        .select("*")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data as TestMessage[];
    },
    enabled: !!conversationId,
  });
}

export function useCreateTestConversation() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({
      agentId,
      modelUsed,
      temperatureUsed,
    }: {
      agentId: string;
      modelUsed: string;
      temperatureUsed: number;
    }) => {
      if (!user) throw new Error("Not authenticated");
      const { data, error } = await supabase
        .from("agent_test_conversations")
        .insert({
          agent_id: agentId,
          user_id: user.id,
          model_used: modelUsed,
          temperature_used: temperatureUsed,
        })
        .select()
        .single();
      if (error) throw error;
      return data as TestConversation;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["agent-test-conversations", data.agent_id] });
    },
  });
}

export function useSaveTestMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      conversationId,
      role,
      content,
    }: {
      conversationId: string;
      role: string;
      content: string;
    }) => {
      const { data, error } = await supabase
        .from("agent_test_messages")
        .insert({ conversation_id: conversationId, role, content })
        .select()
        .single();
      if (error) throw error;
      return data as TestMessage;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["agent-test-messages", data.conversation_id] });
    },
  });
}

export function useDeleteTestConversation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, agentId }: { id: string; agentId: string }) => {
      const { error } = await supabase
        .from("agent_test_conversations")
        .delete()
        .eq("id", id);
      if (error) throw error;
      return { id, agentId };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["agent-test-conversations", data.agentId] });
    },
  });
}
