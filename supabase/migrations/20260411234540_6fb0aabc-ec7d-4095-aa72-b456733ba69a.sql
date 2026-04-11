
DROP POLICY IF EXISTS "Users can create own conversations" ON public.chat_conversations;

CREATE POLICY "Users can create own conversations"
ON public.chat_conversations FOR INSERT TO authenticated
WITH CHECK (session_id = (current_setting('request.jwt.claims', true)::json->>'sub'));
