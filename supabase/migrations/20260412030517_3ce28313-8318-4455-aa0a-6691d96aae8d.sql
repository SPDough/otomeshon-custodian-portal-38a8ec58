
CREATE TABLE public.agent_token_budgets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id uuid NOT NULL,
  user_id uuid NOT NULL,
  period text NOT NULL DEFAULT 'daily' CHECK (period IN ('daily', 'weekly')),
  threshold integer NOT NULL DEFAULT 10000,
  enabled boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX idx_agent_token_budgets_agent ON public.agent_token_budgets (agent_id);

ALTER TABLE public.agent_token_budgets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own budgets"
  ON public.agent_token_budgets FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own budgets"
  ON public.agent_token_budgets FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own budgets"
  ON public.agent_token_budgets FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own budgets"
  ON public.agent_token_budgets FOR DELETE
  USING (auth.uid() = user_id);

CREATE TRIGGER update_agent_token_budgets_updated_at
  BEFORE UPDATE ON public.agent_token_budgets
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
