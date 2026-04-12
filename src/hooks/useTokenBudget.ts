import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface TokenBudget {
  id: string;
  agent_id: string;
  user_id: string;
  period: "daily" | "weekly";
  threshold: number;
  enabled: boolean;
  created_at: string;
  updated_at: string;
}

export function useTokenBudget(agentId: string) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["token-budget", agentId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("agent_token_budgets" as any)
        .select("*")
        .eq("agent_id", agentId)
        .maybeSingle();
      if (error) throw error;
      return data as TokenBudget | null;
    },
    enabled: !!user && !!agentId,
  });
}

export function useUpsertTokenBudget() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({
      agentId,
      period,
      threshold,
      enabled,
    }: {
      agentId: string;
      period: "daily" | "weekly";
      threshold: number;
      enabled: boolean;
    }) => {
      if (!user) throw new Error("Not authenticated");

      // Check if budget exists
      const { data: existing } = await supabase
        .from("agent_token_budgets" as any)
        .select("id")
        .eq("agent_id", agentId)
        .maybeSingle();

      if (existing) {
        const { error } = await supabase
          .from("agent_token_budgets" as any)
          .update({ period, threshold, enabled } as any)
          .eq("id", (existing as any).id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("agent_token_budgets" as any)
          .insert({ agent_id: agentId, user_id: user.id, period, threshold, enabled } as any);
        if (error) throw error;
      }
      return { agentId };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["token-budget", data.agentId] });
    },
  });
}
