
-- Create enum for module status
CREATE TYPE public.agent_module_status AS ENUM ('active', 'configured', 'needs_setup');

-- Create agent_modules table
CREATE TABLE public.agent_modules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  module_key TEXT NOT NULL,
  status agent_module_status NOT NULL DEFAULT 'needs_setup',
  progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  configured_items TEXT[] NOT NULL DEFAULT '{}',
  stats_label TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, module_key)
);

-- Enable RLS
ALTER TABLE public.agent_modules ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Users can view their own agent modules"
  ON public.agent_modules FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own agent modules"
  ON public.agent_modules FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own agent modules"
  ON public.agent_modules FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own agent modules"
  ON public.agent_modules FOR DELETE
  USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER update_agent_modules_updated_at
  BEFORE UPDATE ON public.agent_modules
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
