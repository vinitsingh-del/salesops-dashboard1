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
