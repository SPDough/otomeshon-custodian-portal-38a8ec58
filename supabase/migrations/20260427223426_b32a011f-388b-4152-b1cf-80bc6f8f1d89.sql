-- 1. Add the missing DELETE policy on profiles so users can only delete their own row.
CREATE POLICY "Users can delete their own profile"
ON public.profiles
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- 2. Lock down SECURITY DEFINER functions so they cannot be invoked over the
--    PostgREST API by anon or authenticated roles. These are only used as
--    triggers / internal helpers and should never be callable directly.
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;
