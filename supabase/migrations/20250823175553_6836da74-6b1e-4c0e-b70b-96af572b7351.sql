-- Grant admin access to the specified email
-- First, we need to find the user_id for the email (this will be handled by the trigger when they sign up)
-- For now, we'll create a function to assign admin role based on email

CREATE OR REPLACE FUNCTION public.assign_admin_role_by_email()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  -- Check if the new user's email matches the admin email
  IF NEW.email = 'alongeadetomiwa@gmail.com' THEN
    -- Update the user role to admin
    UPDATE public.user_roles 
    SET role = 'admin' 
    WHERE user_id = NEW.id;
    
    -- If no role exists yet, the handle_new_user trigger will create it as 'user'
    -- So we need to ensure this runs after that trigger
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger to assign admin role after user creation
DROP TRIGGER IF EXISTS assign_admin_role_trigger ON auth.users;
CREATE TRIGGER assign_admin_role_trigger
  AFTER INSERT ON auth.users
  FOR EACH ROW 
  EXECUTE FUNCTION public.assign_admin_role_by_email();

-- If the user already exists, update their role directly
-- This is a one-time update for existing users
DO $$
DECLARE
  admin_user_id uuid;
BEGIN
  -- Find user by email
  SELECT id INTO admin_user_id 
  FROM auth.users 
  WHERE email = 'alongeadetomiwa@gmail.com';
  
  -- If user exists, update their role
  IF admin_user_id IS NOT NULL THEN
    UPDATE public.user_roles 
    SET role = 'admin' 
    WHERE user_id = admin_user_id;
    
    -- If no role record exists, create one
    INSERT INTO public.user_roles (user_id, role)
    SELECT admin_user_id, 'admin'
    WHERE NOT EXISTS (
      SELECT 1 FROM public.user_roles WHERE user_id = admin_user_id
    );
  END IF;
END $$;