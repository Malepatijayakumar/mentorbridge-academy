-- Update the user role to super_admin for the specified email
UPDATE profiles 
SET role = 'super_admin'::user_role 
WHERE email = 'malepatijayakumarreddy316@gmail.com';