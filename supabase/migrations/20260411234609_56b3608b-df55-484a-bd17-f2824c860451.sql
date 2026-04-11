
-- chat_conversations
DROP POLICY IF EXISTS "Users can read own conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Users can create own conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Users can update own conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Users can delete own conversations" ON public.chat_conversations;

CREATE POLICY "Users can read own conversations"
ON public.chat_conversations FOR SELECT TO authenticated
USING (session_id = auth.uid()::text);

CREATE POLICY "Users can create own conversations"
ON public.chat_conversations FOR INSERT TO authenticated
WITH CHECK (session_id = auth.uid()::text);

CREATE POLICY "Users can update own conversations"
ON public.chat_conversations FOR UPDATE TO authenticated
USING (session_id = auth.uid()::text);

CREATE POLICY "Users can delete own conversations"
ON public.chat_conversations FOR DELETE TO authenticated
USING (session_id = auth.uid()::text);

-- chat_messages
DROP POLICY IF EXISTS "Users can read own messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Users can create messages in own conversations" ON public.chat_messages;
DROP POLICY IF EXISTS "Users can delete own messages" ON public.chat_messages;

CREATE POLICY "Users can read own messages"
ON public.chat_messages FOR SELECT TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.chat_conversations
  WHERE id = chat_messages.conversation_id
  AND session_id = auth.uid()::text
));

CREATE POLICY "Users can create messages in own conversations"
ON public.chat_messages FOR INSERT TO authenticated
WITH CHECK (EXISTS (
  SELECT 1 FROM public.chat_conversations
  WHERE id = chat_messages.conversation_id
  AND session_id = auth.uid()::text
));

CREATE POLICY "Users can delete own messages"
ON public.chat_messages FOR DELETE TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.chat_conversations
  WHERE id = chat_messages.conversation_id
  AND session_id = auth.uid()::text
));
