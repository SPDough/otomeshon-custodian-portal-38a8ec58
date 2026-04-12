import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export type AgentModuleStatus = "active" | "configured" | "needs_setup";

export interface AgentModule {
  id: string;
  user_id: string;
  module_key: string;
  status: AgentModuleStatus;
  progress: number;
  configured_items: string[];
  stats_label: string;
}

const DEFAULT_MODULES: Omit<AgentModule, "id" | "user_id">[] = [
  {
    module_key: "agentBuilder",
    status: "active",
    progress: 80,
    configured_items: ["Portfolio Analyst", "Trade Monitor", "Compliance Bot", "NAV Calculator", "Report Generator"],
    stats_label: "5 Active",
  },
  {
    module_key: "dataBindings",
    status: "configured",
    progress: 100,
    configured_items: ["Market Data API", "Fund Holdings", "Benchmark Indices", "Counterparty DB"],
    stats_label: "18 Sources",
  },
  {
    module_key: "calculationPolicies",
    status: "configured",
    progress: 100,
    configured_items: ["NAV Computation", "Fee Accruals", "FX Conversion", "P&L Attribution"],
    stats_label: "42 Formulas",
  },
  {
    module_key: "ruleSets",
    status: "active",
    progress: 65,
    configured_items: ["Trade Limits", "Concentration Checks", "Regulatory Thresholds", "Approval Gates"],
    stats_label: "31 Rules",
  },
  {
    module_key: "workflowOrchestration",
    status: "active",
    progress: 50,
    configured_items: ["Trade Settlement", "Corporate Actions", "Reconciliation", "Client Onboarding"],
    stats_label: "8 Workflows",
  },
  {
    module_key: "agentConfig",
    status: "needs_setup",
    progress: 25,
    configured_items: ["Model Selection", "Token Budget", "Guardrails", "Audit Logging"],
    stats_label: "Advanced",
  },
];

async function fetchOrSeedModules(userId: string): Promise<AgentModule[]> {
  const { data, error } = await supabase
    .from("agent_modules")
    .select("*")
    .eq("user_id", userId)
    .order("created_at");

  if (error) throw error;

  // Seed defaults if the user has no modules yet
  if (!data || data.length === 0) {
    const rows = DEFAULT_MODULES.map((m) => ({ ...m, user_id: userId }));
    const { data: inserted, error: insertErr } = await supabase
      .from("agent_modules")
      .insert(rows)
      .select();
    if (insertErr) throw insertErr;
    return (inserted ?? []) as AgentModule[];
  }

  return data as AgentModule[];
}

export function useAgentModules() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["agent_modules", user?.id],
    queryFn: () => fetchOrSeedModules(user!.id),
    enabled: !!user,
  });

  const updateModule = useMutation({
    mutationFn: async (patch: Partial<AgentModule> & { module_key: string }) => {
      const { module_key, ...rest } = patch;
      const { error } = await supabase
        .from("agent_modules")
        .update(rest)
        .eq("user_id", user!.id)
        .eq("module_key", module_key);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["agent_modules", user?.id] }),
  });

  return { modules: query.data ?? [], isLoading: query.isLoading, error: query.error, updateModule };
}
