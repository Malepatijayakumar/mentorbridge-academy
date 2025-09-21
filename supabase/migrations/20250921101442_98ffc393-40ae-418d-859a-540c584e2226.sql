-- Create resources table for global resources (notes, videos)
CREATE TABLE public.resources (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  file_url text NOT NULL,
  file_type text NOT NULL, -- 'video', 'pdf', 'document', etc.
  file_size bigint,
  visibility text NOT NULL DEFAULT 'all', -- 'all', 'college_specific', 'student_specific'
  college_id uuid REFERENCES public.colleges(id),
  created_by uuid NOT NULL REFERENCES auth.users(id),
  tags text[],
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create events table for workshops and events
CREATE TABLE public.events (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  event_type text NOT NULL DEFAULT 'workshop', -- 'workshop', 'seminar', 'conference'
  start_date timestamp with time zone NOT NULL,
  end_date timestamp with time zone NOT NULL,
  location text,
  max_participants integer,
  registration_deadline timestamp with time zone,
  college_id uuid REFERENCES public.colleges(id), -- null means for all colleges
  created_by uuid NOT NULL REFERENCES auth.users(id),
  banner_url text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create competitions table
CREATE TABLE public.competitions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  competition_type text NOT NULL DEFAULT 'intra_college', -- 'intra_college', 'inter_college'
  start_date timestamp with time zone NOT NULL,
  end_date timestamp with time zone NOT NULL,
  registration_deadline timestamp with time zone,
  college_id uuid REFERENCES public.colleges(id), -- null means inter-college
  created_by uuid NOT NULL REFERENCES auth.users(id),
  rules text,
  prizes text,
  max_participants integer,
  banner_url text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create system_settings table
CREATE TABLE public.system_settings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key text NOT NULL UNIQUE,
  setting_value jsonb NOT NULL,
  description text,
  category text NOT NULL DEFAULT 'general', -- 'general', 'email', 'auth', 'storage'
  updated_by uuid NOT NULL REFERENCES auth.users(id),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create event_registrations table
CREATE TABLE public.event_registrations (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id uuid NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'registered', -- 'registered', 'attended', 'cancelled'
  registered_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(event_id, user_id)
);

-- Create competition_registrations table
CREATE TABLE public.competition_registrations (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  competition_id uuid NOT NULL REFERENCES public.competitions(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  team_name text,
  status text NOT NULL DEFAULT 'registered', -- 'registered', 'qualified', 'eliminated'
  registered_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(competition_id, user_id)
);

-- Enable RLS on all new tables
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competition_registrations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for resources
CREATE POLICY "Super admins can manage all resources" ON public.resources
FOR ALL USING (EXISTS (
  SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'super_admin'::user_role
));

CREATE POLICY "Users can view active resources" ON public.resources
FOR SELECT USING (
  is_active = true AND 
  (visibility = 'all' OR 
   (visibility = 'college_specific' AND college_id IN (
     SELECT college_id FROM profiles WHERE user_id = auth.uid()
   )))
);

-- RLS Policies for events
CREATE POLICY "Super admins can manage all events" ON public.events
FOR ALL USING (EXISTS (
  SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'super_admin'::user_role
));

CREATE POLICY "Users can view active events" ON public.events
FOR SELECT USING (
  is_active = true AND 
  (college_id IS NULL OR college_id IN (
    SELECT college_id FROM profiles WHERE user_id = auth.uid()
  ))
);

-- RLS Policies for competitions
CREATE POLICY "Super admins can manage all competitions" ON public.competitions
FOR ALL USING (EXISTS (
  SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'super_admin'::user_role
));

CREATE POLICY "Users can view active competitions" ON public.competitions
FOR SELECT USING (
  is_active = true AND 
  (college_id IS NULL OR college_id IN (
    SELECT college_id FROM profiles WHERE user_id = auth.uid()
  ))
);

-- RLS Policies for system_settings
CREATE POLICY "Only super admins can manage system settings" ON public.system_settings
FOR ALL USING (EXISTS (
  SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'super_admin'::user_role
));

-- RLS Policies for registrations
CREATE POLICY "Users can manage their own registrations" ON public.event_registrations
FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Super admins can view all event registrations" ON public.event_registrations
FOR SELECT USING (EXISTS (
  SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'super_admin'::user_role
));

CREATE POLICY "Users can manage their own competition registrations" ON public.competition_registrations
FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Super admins can view all competition registrations" ON public.competition_registrations
FOR SELECT USING (EXISTS (
  SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'super_admin'::user_role
));

-- Create storage bucket for resources
INSERT INTO storage.buckets (id, name, public) VALUES ('resources', 'resources', true);

-- Storage policies for resources bucket
CREATE POLICY "Super admins can upload resources" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'resources' AND 
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'super_admin'::user_role)
);

CREATE POLICY "Resources are publicly viewable" ON storage.objects
FOR SELECT USING (bucket_id = 'resources');

CREATE POLICY "Super admins can update resources" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'resources' AND 
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'super_admin'::user_role)
);

CREATE POLICY "Super admins can delete resources" ON storage.objects
FOR DELETE USING (
  bucket_id = 'resources' AND 
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'super_admin'::user_role)
);

-- Add triggers for updated_at columns
CREATE TRIGGER update_resources_updated_at
BEFORE UPDATE ON public.resources
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_events_updated_at
BEFORE UPDATE ON public.events
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_competitions_updated_at
BEFORE UPDATE ON public.competitions
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_system_settings_updated_at
BEFORE UPDATE ON public.system_settings
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default system settings
INSERT INTO public.system_settings (setting_key, setting_value, description, category, updated_by) VALUES
('app_name', '"EdTech Platform"', 'Application name displayed across the system', 'general', (SELECT id FROM auth.users WHERE email = 'malepatijayakumarreddy316@gmail.com' LIMIT 1)),
('app_description', '"Educational Technology Platform for Colleges"', 'Application description', 'general', (SELECT id FROM auth.users WHERE email = 'malepatijayakumarreddy316@gmail.com' LIMIT 1)),
('max_file_upload_size', '52428800', 'Maximum file upload size in bytes (50MB)', 'storage', (SELECT id FROM auth.users WHERE email = 'malepatijayakumarreddy316@gmail.com' LIMIT 1)),
('allowed_file_types', '["pdf", "doc", "docx", "ppt", "pptx", "mp4", "avi", "mov", "jpg", "jpeg", "png"]', 'Allowed file types for resource uploads', 'storage', (SELECT id FROM auth.users WHERE email = 'malepatijayakumarreddy316@gmail.com' LIMIT 1)),
('email_notifications', 'true', 'Enable email notifications', 'email', (SELECT id FROM auth.users WHERE email = 'malepatijayakumarreddy316@gmail.com' LIMIT 1));