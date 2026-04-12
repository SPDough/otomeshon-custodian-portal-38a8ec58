ALTER TABLE public.agents ADD COLUMN temperature numeric NOT NULL DEFAULT 0.7;
ALTER TABLE public.agents ADD COLUMN max_tokens integer NOT NULL DEFAULT 4096;
ALTER TABLE public.agents ADD COLUMN guardrails text[] NOT NULL DEFAULT '{}'::text[];
ALTER TABLE public.agents ADD COLUMN logging_enabled boolean NOT NULL DEFAULT true;