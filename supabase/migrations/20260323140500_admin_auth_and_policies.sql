create table public.admin_users (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references auth.users(id) on delete cascade,
  email text not null unique,
  display_name text,
  role text not null default 'admin',
  is_active boolean not null default true,
  claimed_at timestamp with time zone,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  constraint admin_users_email_lowercase check (email = lower(email)),
  constraint admin_users_role_check check (role in ('admin'))
);

alter table public.admin_users enable row level security;

create trigger update_admin_users_updated_at
  before update on public.admin_users
  for each row execute function public.update_updated_at_column();

create or replace function public.claim_admin_access()
returns public.admin_users
language plpgsql
security definer
set search_path = public
as $$
declare
  admin_row public.admin_users;
  current_email text;
begin
  if auth.uid() is null then
    return null;
  end if;

  current_email := lower(nullif(auth.jwt() ->> 'email', ''));

  if current_email is not null then
    update public.admin_users
       set user_id = coalesce(user_id, auth.uid()),
           email = current_email,
           claimed_at = coalesce(claimed_at, now()),
           updated_at = now()
     where lower(email) = current_email
       and is_active = true
       and (user_id is null or user_id = auth.uid())
    returning *
      into admin_row;
  end if;

  if admin_row.id is null then
    select *
      into admin_row
      from public.admin_users
     where user_id = auth.uid()
       and is_active = true
     limit 1;
  end if;

  return admin_row;
end;
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
      from public.admin_users
     where is_active = true
       and (
         user_id = auth.uid()
         or email = lower(coalesce(auth.jwt() ->> 'email', ''))
       )
  );
$$;

create policy "Authenticated users can read their admin record"
  on public.admin_users
  for select
  to authenticated
  using (
    is_active = true
    and (
      user_id = auth.uid()
      or email = lower(coalesce(auth.jwt() ->> 'email', ''))
    )
  );

drop policy if exists "Anyone can read published blog posts" on public.blog_posts;

create policy "Published blog posts stay public and admins can read all"
  on public.blog_posts
  for select
  using (published = true or public.is_admin());

create policy "Admins can insert blog posts"
  on public.blog_posts
  for insert
  to authenticated
  with check (public.is_admin());

create policy "Admins can update blog posts"
  on public.blog_posts
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins can delete blog posts"
  on public.blog_posts
  for delete
  to authenticated
  using (public.is_admin());

drop policy if exists "Anyone can read published case studies" on public.case_studies;

create policy "Published case studies stay public and admins can read all"
  on public.case_studies
  for select
  using (published = true or public.is_admin());

create policy "Admins can insert case studies"
  on public.case_studies
  for insert
  to authenticated
  with check (public.is_admin());

create policy "Admins can update case studies"
  on public.case_studies
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins can delete case studies"
  on public.case_studies
  for delete
  to authenticated
  using (public.is_admin());

create policy "Admins can read contact submissions"
  on public.contact_submissions
  for select
  to authenticated
  using (public.is_admin());

create policy "Admins can update contact submissions"
  on public.contact_submissions
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins can delete contact submissions"
  on public.contact_submissions
  for delete
  to authenticated
  using (public.is_admin());
