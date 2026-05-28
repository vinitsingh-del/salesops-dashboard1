create table if not exists public.deals (
  deal_id text primary key,
  brand_name text not null default '',
  short_code text not null default '',
  deal_type text not null default '',
  stage text not null default 'approval',
  invoice_status text not null default '--',
  amount numeric not null default 0,
  refrens_id text not null default '',
  invoice_number text not null default '',
  sales_owner text not null default '',
  cam_owner text not null default '',
  business_owner text not null default '',
  next_action text not null default '',
  action_date date,
  month_key text not null default '',
  renewal_date date,
  churn_risk text not null default 'low',
  churn_notes text not null default '',
  agreement_signed boolean not null default false,
  agreement_sent_date date,
  agreement_signed_date date,
  first_invoice_raised boolean not null default false,
  first_invoice_date date,
  invoice_due_date date,
  clearance_date date,
  duration_months integer not null default 0,
  docs jsonb not null default '{}'::jsonb,
  invoice_schedule jsonb not null default '[]'::jsonb,
  data jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.deals add column if not exists brand_name text not null default '';
alter table public.deals add column if not exists short_code text not null default '';
alter table public.deals add column if not exists deal_type text not null default '';
alter table public.deals add column if not exists stage text not null default 'approval';
alter table public.deals add column if not exists invoice_status text not null default '--';
alter table public.deals add column if not exists amount numeric not null default 0;
alter table public.deals add column if not exists refrens_id text not null default '';
alter table public.deals add column if not exists invoice_number text not null default '';
alter table public.deals add column if not exists sales_owner text not null default '';
alter table public.deals add column if not exists cam_owner text not null default '';
alter table public.deals add column if not exists business_owner text not null default '';
alter table public.deals add column if not exists next_action text not null default '';
alter table public.deals add column if not exists action_date date;
alter table public.deals add column if not exists month_key text not null default '';
alter table public.deals add column if not exists renewal_date date;
alter table public.deals add column if not exists churn_risk text not null default 'low';
alter table public.deals add column if not exists churn_notes text not null default '';
alter table public.deals add column if not exists agreement_signed boolean not null default false;
alter table public.deals add column if not exists agreement_sent_date date;
alter table public.deals add column if not exists agreement_signed_date date;
alter table public.deals add column if not exists first_invoice_raised boolean not null default false;
alter table public.deals add column if not exists first_invoice_date date;
alter table public.deals add column if not exists invoice_due_date date;
alter table public.deals add column if not exists clearance_date date;
alter table public.deals add column if not exists duration_months integer not null default 0;
alter table public.deals add column if not exists docs jsonb not null default '{}'::jsonb;
alter table public.deals add column if not exists invoice_schedule jsonb not null default '[]'::jsonb;

update public.deals
set
  brand_name = coalesce(nullif(brand_name, ''), data->>'name', ''),
  short_code = coalesce(nullif(short_code, ''), data->>'sh', ''),
  deal_type = coalesce(nullif(deal_type, ''), data->>'type', ''),
  stage = coalesce(nullif(stage, ''), data->>'stage', 'approval'),
  invoice_status = coalesce(nullif(invoice_status, ''), data->>'inv', '--'),
  amount = coalesce(nullif(amount, 0), nullif(regexp_replace(coalesce(data->>'af',''), '[^0-9]', '', 'g'), '')::numeric, 0),
  refrens_id = coalesce(nullif(refrens_id, ''), data->>'ref', ''),
  invoice_number = coalesce(nullif(invoice_number, ''), data->>'inum', ''),
  sales_owner = coalesce(nullif(sales_owner, ''), data->>'sales', ''),
  cam_owner = coalesce(nullif(cam_owner, ''), data->>'cam', ''),
  business_owner = coalesce(nullif(business_owner, ''), data->>'biz', ''),
  next_action = coalesce(nullif(next_action, ''), data->>'nextAction', ''),
  month_key = coalesce(nullif(month_key, ''), data->>'month', ''),
  churn_risk = coalesce(nullif(churn_risk, ''), data->>'churnRisk', 'low'),
  churn_notes = coalesce(churn_notes, data->>'churnNotes', ''),
  agreement_signed = coalesce(agreement_signed, (data->>'agreementSigned')::boolean, (data->>'agr')::boolean, false),
  first_invoice_raised = coalesce(first_invoice_raised, (data->>'firstInvoiceRaised')::boolean, false),
  duration_months = coalesce(nullif(duration_months, 0), nullif(regexp_replace(coalesce(data->>'dur',''), '[^0-9]', '', 'g'), '')::integer, 0),
  docs = coalesce(docs, data->'docs', '{}'::jsonb),
  invoice_schedule = coalesce(invoice_schedule, data->'mrrI', '[]'::jsonb)
where data is not null;

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

create index if not exists deals_stage_idx on public.deals(stage);
create index if not exists deals_invoice_status_idx on public.deals(invoice_status);
create index if not exists deals_churn_risk_idx on public.deals(churn_risk);
create index if not exists deals_action_date_idx on public.deals(action_date);
create index if not exists deals_month_key_idx on public.deals(month_key);

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
