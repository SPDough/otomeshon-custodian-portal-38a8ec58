
CREATE POLICY "Users can update their own test conversations"
ON public.agent_test_conversations
FOR UPDATE
USING (auth.uid() = user_id);
