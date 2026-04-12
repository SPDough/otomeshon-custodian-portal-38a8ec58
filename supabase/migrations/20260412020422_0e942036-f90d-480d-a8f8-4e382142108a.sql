ALTER TABLE public.agents ADD COLUMN calculation_policies text[] NOT NULL DEFAULT '{}'::text[];
ALTER TABLE public.agents ADD COLUMN rule_sets text[] NOT NULL DEFAULT '{}'::text[];