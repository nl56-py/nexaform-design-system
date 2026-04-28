create policy "Anyone can submit digital fairness bookings"
  on public.digital_fairness_bookings
  for insert
  to anon, authenticated
  with check (
    status = 'new'
    and source_path = '/digital-fairness-campaign'
  );

create policy "Anyone can submit free audit requests"
  on public.free_audit_requests
  for insert
  to anon, authenticated
  with check (
    status = 'new'
    and source_path = '/free-audit'
  );
