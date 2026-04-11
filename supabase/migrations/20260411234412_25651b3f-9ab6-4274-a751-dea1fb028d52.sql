
-- ============================================
-- Fix chat_conversations: drop public policies, add authenticated + session_id scoped
-- ============================================
DROP POLICY IF EXISTS "Anyone can read conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Anyone can create conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Anyone can update conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Anyone can delete conversations" ON public.chat_conversations;

CREATE POLICY "Users can read own conversations"
ON public.chat_conversations FOR SELECT TO authenticated
USING (session_id = (current_setting('request.jwt.claims', true)::json->>'sub'));

CREATE POLICY "Users can create own conversations"
ON public.chat_conversations FOR INSERT TO authenticated
WITH CHECK (session_id IS NOT NULL);

CREATE POLICY "Users can update own conversations"
ON public.chat_conversations FOR UPDATE TO authenticated
USING (session_id = (current_setting('request.jwt.claims', true)::json->>'sub'));

CREATE POLICY "Users can delete own conversations"
ON public.chat_conversations FOR DELETE TO authenticated
USING (session_id = (current_setting('request.jwt.claims', true)::json->>'sub'));

-- ============================================
-- Fix chat_messages: drop public policies, add authenticated + ownership via conversation
-- ============================================
DROP POLICY IF EXISTS "Anyone can read messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Anyone can create messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Anyone can delete messages" ON public.chat_messages;

CREATE POLICY "Users can read own messages"
ON public.chat_messages FOR SELECT TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.chat_conversations
  WHERE id = chat_messages.conversation_id
  AND session_id = (current_setting('request.jwt.claims', true)::json->>'sub')
));

CREATE POLICY "Users can create messages in own conversations"
ON public.chat_messages FOR INSERT TO authenticated
WITH CHECK (EXISTS (
  SELECT 1 FROM public.chat_conversations
  WHERE id = chat_messages.conversation_id
  AND session_id = (current_setting('request.jwt.claims', true)::json->>'sub')
));

CREATE POLICY "Users can delete own messages"
ON public.chat_messages FOR DELETE TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.chat_conversations
  WHERE id = chat_messages.conversation_id
  AND session_id = (current_setting('request.jwt.claims', true)::json->>'sub')
));

-- ============================================
-- Fix profiles: restrict SELECT to own profile only
-- ============================================
DROP POLICY IF EXISTS "Profiles are viewable by authenticated users" ON public.profiles;

CREATE POLICY "Users can view own profile"
ON public.profiles FOR SELECT TO authenticated
USING (auth.uid() = user_id);
