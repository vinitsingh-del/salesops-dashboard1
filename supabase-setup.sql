create table if not exists public.deals (
  deal_id text primary key,
  data jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists deals_set_updated_at on public.deals;
create trigger deals_set_updated_at
before update on public.deals
for each row
execute function public.set_updated_at();

alter table public.deals replica identity full;

do $$
begin
  alter publication supabase_realtime add table public.deals;
exception
  when duplicate_object then null;
  when undefined_object then null;
end;
$$;

alter table public.deals enable row level security;

drop policy if exists "Allow dashboard reads" on public.deals;
create policy "Allow dashboard reads"
on public.deals
for select
to anon
using (true);

drop policy if exists "Allow dashboard inserts" on public.deals;
create policy "Allow dashboard inserts"
on public.deals
for insert
to anon
with check (true);

drop policy if exists "Allow dashboard updates" on public.deals;
create policy "Allow dashboard updates"
on public.deals
for update
to anon
using (true)
with check (true);

drop policy if exists "Allow dashboard deletes" on public.deals;
create policy "Allow dashboard deletes"
on public.deals
for delete
to anon
using (true);

insert into storage.buckets (id, name, public)
values ('deal-documents', 'deal-documents', false)
on conflict (id) do nothing;

drop policy if exists "Allow dashboard document reads" on storage.objects;
create policy "Allow dashboard document reads"
on storage.objects
for select
to anon
using (bucket_id = 'deal-documents');

drop policy if exists "Allow dashboard document uploads" on storage.objects;
create policy "Allow dashboard document uploads"
on storage.objects
for insert
to anon
with check (bucket_id = 'deal-documents');

drop policy if exists "Allow dashboard document updates" on storage.objects;
create policy "Allow dashboard document updates"
on storage.objects
for update
to anon
using (bucket_id = 'deal-documents')
with check (bucket_id = 'deal-documents');

drop policy if exists "Allow dashboard document deletes" on storage.objects;
create policy "Allow dashboard document deletes"
on storage.objects
for delete
to anon
using (bucket_id = 'deal-documents');
