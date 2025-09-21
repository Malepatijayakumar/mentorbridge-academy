-- Update the superadmin user to have the correct super_admin role
UPDATE profiles 
SET role = 'super_admin'::user_role 
WHERE email = 'superadmin@gmail.com';