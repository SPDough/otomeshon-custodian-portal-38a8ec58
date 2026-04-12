
-- Table for agent test conversations
CREATE TABLE public.agent_test_conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  agent_id UUID NOT NULL,
  user_id UUID NOT NULL,
  model_used TEXT NOT NULL DEFAULT 'gemini-2.5-flash',
  temperature_used NUMERIC NOT NULL DEFAULT 0.7,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.agent_test_conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own test conversations"
  ON public.agent_test_conversations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own test conversations"
  ON public.agent_test_conversations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own test conversations"
  ON public.agent_test_conversations FOR DELETE
  USING (auth.uid() = user_id);

CREATE TRIGGER update_agent_test_conversations_updated_at
  BEFORE UPDATE ON public.agent_test_conversations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Table for agent test messages
CREATE TABLE public.agent_test_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID NOT NULL REFERENCES public.agent_test_conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.agent_test_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own test messages"
  ON public.agent_test_messages FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.agent_test_conversations
    WHERE id = agent_test_messages.conversation_id AND user_id = auth.uid()
  ));

CREATE POLICY "Users can create messages in own test conversations"
  ON public.agent_test_messages FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.agent_test_conversations
    WHERE id = agent_test_messages.conversation_id AND user_id = auth.uid()
  ));

CREATE POLICY "Users can delete their own test messages"
  ON public.agent_test_messages FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM public.agent_test_conversations
    WHERE id = agent_test_messages.conversation_id AND user_id = auth.uid()
  ));

-- Index for fast lookups
CREATE INDEX idx_agent_test_conversations_agent_id ON public.agent_test_conversations(agent_id);
CREATE INDEX idx_agent_test_conversations_user_id ON public.agent_test_conversations(user_id);
CREATE INDEX idx_agent_test_messages_conversation_id ON public.agent_test_messages(conversation_id);
