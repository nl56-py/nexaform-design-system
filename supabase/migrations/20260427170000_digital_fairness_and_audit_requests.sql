create table public.digital_fairness_bookings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  organization text,
  business_category text not null,
  domain_support text,
  preferred_timeline text,
  services_description text not null,
  source_path text not null default '/digital-fairness-campaign',
  status text not null default 'new',
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  constraint digital_fairness_bookings_email_check check (position('@' in email) > 1),
  constraint digital_fairness_bookings_status_check check (
    status in ('new', 'reviewing', 'contacted', 'completed', 'converted', 'archived')
  )
);

create table public.free_audit_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  business_name text not null,
  business_category text not null,
  services text not null,
  website_url text not null,
  contact_number text not null,
  email text not null,
  service_area text,
  primary_goal text,
  notes text,
  source_path text not null default '/free-audit',
  status text not null default 'new',
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  constraint free_audit_requests_email_check check (position('@' in email) > 1),
  constraint free_audit_requests_website_url_check check (website_url ~* '^https?://'),
  constraint free_audit_requests_status_check check (
    status in ('new', 'reviewing', 'contacted', 'completed', 'converted', 'archived')
  )
);

alter table public.digital_fairness_bookings enable row level security;
alter table public.free_audit_requests enable row level security;

create trigger update_digital_fairness_bookings_updated_at
  before update on public.digital_fairness_bookings
  for each row execute function public.update_updated_at_column();

create trigger update_free_audit_requests_updated_at
  before update on public.free_audit_requests
  for each row execute function public.update_updated_at_column();

create policy "Admins can read digital fairness bookings"
  on public.digital_fairness_bookings
  for select
  to authenticated
  using (public.is_admin());

create policy "Admins can update digital fairness bookings"
  on public.digital_fairness_bookings
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins can delete digital fairness bookings"
  on public.digital_fairness_bookings
  for delete
  to authenticated
  using (public.is_admin());

create policy "Admins can read free audit requests"
  on public.free_audit_requests
  for select
  to authenticated
  using (public.is_admin());

create policy "Admins can update free audit requests"
  on public.free_audit_requests
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins can delete free audit requests"
  on public.free_audit_requests
  for delete
  to authenticated
  using (public.is_admin());

create index idx_digital_fairness_bookings_status
  on public.digital_fairness_bookings(status);

create index idx_digital_fairness_bookings_created_at
  on public.digital_fairness_bookings(created_at desc);

create index idx_free_audit_requests_status
  on public.free_audit_requests(status);

create index idx_free_audit_requests_created_at
  on public.free_audit_requests(created_at desc);

create index idx_free_audit_requests_website_url
  on public.free_audit_requests(website_url);
