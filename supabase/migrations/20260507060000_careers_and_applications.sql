-- =============================================
-- Career positions & job applications
-- =============================================

-- 1. Job positions posted by admins
CREATE TABLE IF NOT EXISTS public.job_positions (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title         text NOT NULL,
  slug          text NOT NULL UNIQUE,
  department    text NOT NULL DEFAULT 'Engineering',
  location      text NOT NULL DEFAULT 'Remote',
  employment_type text NOT NULL DEFAULT 'Full-time',        -- Full-time | Part-time | Contract | Internship
  experience_level text NOT NULL DEFAULT 'Mid-level',       -- Entry | Mid-level | Senior | Lead
  salary_range  text,                                        -- e.g. "NPR 50k – 80k / month"
  description   text NOT NULL DEFAULT '',                    -- Rich text / HTML body
  requirements  text,                                        -- Rich text / HTML
  benefits      text,                                        -- Rich text / HTML
  published     boolean NOT NULL DEFAULT false,
  published_at  timestamptz,
  deadline      timestamptz,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_job_positions_published ON public.job_positions (published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_job_positions_slug ON public.job_positions (slug);

-- 2. Applications submitted by candidates
CREATE TABLE IF NOT EXISTS public.job_applications (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  position_id     uuid NOT NULL REFERENCES public.job_positions(id) ON DELETE CASCADE,
  full_name       text NOT NULL,
  email           text NOT NULL,
  phone           text,
  portfolio_url   text,
  cover_letter    text,
  resume_url      text,                                       -- Supabase Storage URL
  experience_years text,
  "current_role"  text,
  status          text NOT NULL DEFAULT 'new',                -- new | reviewing | shortlisted | interviewed | offered | rejected | archived
  admin_notes     text,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_job_applications_position ON public.job_applications (position_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_job_applications_status ON public.job_applications (status);

-- =============================================
-- Row-Level Security
-- =============================================

ALTER TABLE public.job_positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Public can read published positions
CREATE POLICY "Public can read published positions"
  ON public.job_positions FOR SELECT
  USING (published = true);

-- Admins have full access to positions
CREATE POLICY "Admins full access to positions"
  ON public.job_positions FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE admin_users.user_id = auth.uid()
        AND admin_users.is_active = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE admin_users.user_id = auth.uid()
        AND admin_users.is_active = true
    )
  );

-- Anyone can insert an application (public form)
CREATE POLICY "Public can submit applications"
  ON public.job_applications FOR INSERT
  WITH CHECK (true);

-- Admins can read and update applications
CREATE POLICY "Admins full access to applications"
  ON public.job_applications FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE admin_users.user_id = auth.uid()
        AND admin_users.is_active = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE admin_users.user_id = auth.uid()
        AND admin_users.is_active = true
    )
  );

-- =============================================
-- Storage bucket for resumes
-- =============================================

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'resumes',
  'resumes',
  true,
  10485760,   -- 10 MB
  ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
)
ON CONFLICT (id) DO NOTHING;

-- Allow public uploads to the resumes bucket
CREATE POLICY "Public can upload resumes"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'resumes');

-- Allow public reads from the resumes bucket
CREATE POLICY "Public can read resumes"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'resumes');

-- Allow admins to delete resumes
CREATE POLICY "Admins can delete resumes"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'resumes'
    AND EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE admin_users.user_id = auth.uid()
        AND admin_users.is_active = true
    )
  );
