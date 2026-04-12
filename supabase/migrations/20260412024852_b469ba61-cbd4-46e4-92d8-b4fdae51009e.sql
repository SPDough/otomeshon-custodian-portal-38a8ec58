
ALTER TABLE public.agent_test_conversations
  ADD COLUMN prompt_tokens integer NOT NULL DEFAULT 0,
  ADD COLUMN completion_tokens integer NOT NULL DEFAULT 0,
  ADD COLUMN total_tokens integer NOT NULL DEFAULT 0;
