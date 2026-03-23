insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'admin-media',
  'admin-media',
  true,
  10485760,
  array[
    'image/png',
    'image/jpeg',
    'image/webp',
    'image/gif',
    'image/svg+xml',
    'image/avif'
  ]
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Admins can view admin media objects" on storage.objects;
drop policy if exists "Admins can upload admin media objects" on storage.objects;
drop policy if exists "Admins can update admin media objects" on storage.objects;
drop policy if exists "Admins can delete admin media objects" on storage.objects;

create policy "Admins can view admin media objects"
  on storage.objects
  for select
  to authenticated
  using (bucket_id = 'admin-media' and public.is_admin());

create policy "Admins can upload admin media objects"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'admin-media' and public.is_admin());

create policy "Admins can update admin media objects"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'admin-media' and public.is_admin())
  with check (bucket_id = 'admin-media' and public.is_admin());

create policy "Admins can delete admin media objects"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'admin-media' and public.is_admin());
