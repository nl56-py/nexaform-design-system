
-- Drop the overly permissive policy
DROP POLICY "Service role can manage submissions" ON public.contact_submissions;

-- Restrict: only authenticated service_role can read/update/delete
-- The anon INSERT policy already exists and is appropriate for a public form
-- No SELECT/UPDATE/DELETE for anon or authenticated users — only service_role bypasses RLS
