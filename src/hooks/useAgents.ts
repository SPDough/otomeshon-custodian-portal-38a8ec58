import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface Agent {
  id: string;
  user_id: string;
  name: string;
  description: string;
  status: "enabled" | "disabled";
  persona: string;
  tools: string[];
  data_bindings: string[];
  model: string;
  created_at: string;
  updated_at: string;
}

export function useAgents() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["agents", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("agents")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at");
      if (error) throw error;
      return (data ?? []) as Agent[];
    },
    enabled: !!user,
  });

  const createAgent = useMutation({
    mutationFn: async (agent: { name: string; description?: string; persona?: string; model?: string }) => {
      const { data, error } = await supabase
        .from("agents")
        .insert({ ...agent, user_id: user!.id })
        .select()
        .single();
      if (error) throw error;
      return data as Agent;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["agents", user?.id] }),
  });

  const updateAgent = useMutation({
    mutationFn: async ({ id, ...patch }: Partial<Agent> & { id: string }) => {
      const { error } = await supabase
        .from("agents")
        .update(patch)
        .eq("id", id)
        .eq("user_id", user!.id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["agents", user?.id] }),
  });

  const deleteAgent = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("agents")
        .delete()
        .eq("id", id)
        .eq("user_id", user!.id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["agents", user?.id] }),
  });

  return {
    agents: query.data ?? [],
    isLoading: query.isLoading,
    createAgent,
    updateAgent,
    deleteAgent,
  };
}
