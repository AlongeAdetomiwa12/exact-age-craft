-- CRITICAL SECURITY FIXES

-- 1. Fix profiles table INSERT policy to prevent fake admin accounts
CREATE POLICY "Users can only create their own profile"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- 2. Fix payments table to prevent unauthorized modifications
CREATE POLICY "Users can only view their own payments"
ON public.payments
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Only system can create payments"
ON public.payments
FOR INSERT
TO authenticated
WITH CHECK (false); -- Payments should only be created by backend/service

CREATE POLICY "Payments cannot be updated by users"
ON public.payments
FOR UPDATE
TO authenticated
USING (false); -- Prevent any payment modifications

CREATE POLICY "Payments cannot be deleted by users"
ON public.payments
FOR DELETE
TO authenticated
USING (false); -- Prevent payment history deletion

-- 3. Fix user_roles table to prevent privilege escalation
DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;

CREATE POLICY "Users can view their own role"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Only admins can insert roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (
  -- Only admins can create role assignments
  (SELECT role FROM public.user_roles WHERE user_id = auth.uid()) = 'admin'
);

CREATE POLICY "Only admins can update roles"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (
  -- Only admins can modify role assignments
  (SELECT role FROM public.user_roles WHERE user_id = auth.uid()) = 'admin'
);

CREATE POLICY "Only admins can delete roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (
  -- Only admins can delete role assignments
  (SELECT role FROM public.user_roles WHERE user_id = auth.uid()) = 'admin'
);

-- 4. Fix note_links UPDATE policy
CREATE POLICY "Users can update links between their own notes"
ON public.note_links
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.notes 
    WHERE notes.id = note_links.source_note_id 
    AND notes.user_id = auth.uid()
  )
  AND EXISTS (
    SELECT 1 FROM public.notes 
    WHERE notes.id = note_links.target_note_id 
    AND notes.user_id = auth.uid()
  )
);

-- 5. Add comment documenting security model
COMMENT ON TABLE public.profiles IS 'User profiles with RLS protection. Users can only create/view/update their own profile. Admins can view/delete all profiles.';
COMMENT ON TABLE public.payments IS 'Payment records - immutable once created. Users can only view their own payments. All modifications blocked for security.';
COMMENT ON TABLE public.user_roles IS 'User role assignments. Only admins can modify roles to prevent privilege escalation attacks.';
COMMENT ON TABLE public.note_links IS 'Links between notes. Users can only modify links between their own notes.';