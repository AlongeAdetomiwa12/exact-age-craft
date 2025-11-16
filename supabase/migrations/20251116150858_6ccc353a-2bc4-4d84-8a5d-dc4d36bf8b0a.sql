-- Fix the create_admin_user_by_email function to work without email column in profiles
DROP FUNCTION IF EXISTS public.create_admin_user_by_email(text, uuid);

CREATE OR REPLACE FUNCTION public.create_admin_user_by_email(target_email text, inviting_admin_id uuid)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  target_user_id uuid;
BEGIN
  -- Check if the inviting user is an admin
  IF NOT EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = inviting_admin_id AND role = 'admin'
  ) THEN
    RAISE EXCEPTION 'Only admins can invite other admins';
  END IF;

  -- Find user by email in auth.users table
  SELECT id INTO target_user_id 
  FROM auth.users 
  WHERE email = target_email;

  IF target_user_id IS NULL THEN
    RAISE EXCEPTION 'User with email % not found', target_email;
  END IF;

  -- Check if user already has a role
  IF EXISTS (SELECT 1 FROM user_roles WHERE user_id = target_user_id) THEN
    -- Update existing role to admin
    UPDATE user_roles 
    SET role = 'admin', invited_by = inviting_admin_id, invited_at = now()
    WHERE user_id = target_user_id;
  ELSE
    -- Insert new admin role
    INSERT INTO user_roles (user_id, role, invited_by, invited_at)
    VALUES (target_user_id, 'admin', inviting_admin_id, now());
  END IF;

  RETURN target_user_id;
END;
$$;