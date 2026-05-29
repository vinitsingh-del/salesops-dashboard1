-- Sales DB Supabase backend
-- Run this full file in Supabase SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.deals (
  deal_id text primary key,
  brand_name text not null default '',
  short_code text not null default '',
  deal_type text not null default 'MRR',
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
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint deals_deal_type_chk check (deal_type in ('MRR','onetime','One-Time','')),
  constraint deals_stage_chk check (stage in ('approval','agreement','inv-raised','inv-paid','onboarding','active','renewal','churned','')),
  constraint deals_invoice_status_chk check (invoice_status in ('Paid','Pending','--','Not Raised','')),
  constraint deals_churn_risk_chk check (churn_risk in ('low','medium','high',''))
);

alter table public.deals add column if not exists brand_name text not null default '';
alter table public.deals add column if not exists short_code text not null default '';
alter table public.deals add column if not exists deal_type text not null default 'MRR';
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
alter table public.deals add column if not exists data jsonb not null default '{}'::jsonb;
alter table public.deals add column if not exists created_at timestamptz not null default now();
alter table public.deals add column if not exists updated_at timestamptz not null default now();

create table if not exists public.deal_documents (
  document_id uuid primary key default gen_random_uuid(),
  deal_id text not null references public.deals(deal_id) on delete cascade,
  document_kind text not null,
  file_name text not null default '',
  bucket_id text not null default 'deal-documents',
  storage_path text not null default '',
  external_url text not null default '',
  upload_status text not null default 'uploaded',
  error_message text not null default '',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint deal_documents_kind_chk check (document_kind in ('nda','agreement','agreement-copy','invoice','refrens-invoice','proposal','other')),
  constraint deal_documents_status_chk check (upload_status in ('uploaded','failed','linked'))
);

create table if not exists public.deal_audit_issues (
  issue_id uuid primary key default gen_random_uuid(),
  deal_id text not null references public.deals(deal_id) on delete cascade,
  issue_type text not null,
  severity text not null default 'medium',
  fix text not null default '',
  is_open boolean not null default true,
  source text not null default 'dashboard',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint deal_audit_severity_chk check (severity in ('low','medium','high'))
);

create table if not exists public.deal_events (
  event_id uuid primary key default gen_random_uuid(),
  deal_id text,
  event_type text not null,
  event_summary text not null default '',
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.deal_events drop constraint if exists deal_events_deal_id_fkey;

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
for each row execute function public.set_updated_at();

drop trigger if exists deal_documents_set_updated_at on public.deal_documents;
create trigger deal_documents_set_updated_at
before update on public.deal_documents
for each row execute function public.set_updated_at();

drop trigger if exists deal_audit_issues_set_updated_at on public.deal_audit_issues;
create trigger deal_audit_issues_set_updated_at
before update on public.deal_audit_issues
for each row execute function public.set_updated_at();

create or replace function public.capture_deal_event()
returns trigger
language plpgsql
as $$
begin
  if tg_op = 'INSERT' then
    insert into public.deal_events(deal_id, event_type, event_summary, payload)
    values (new.deal_id, 'deal_created', 'Deal created', to_jsonb(new));
    return new;
  elsif tg_op = 'UPDATE' then
    insert into public.deal_events(deal_id, event_type, event_summary, payload)
    values (
      new.deal_id,
      'deal_updated',
      'Deal updated',
      jsonb_build_object(
        'old_stage', old.stage,
        'new_stage', new.stage,
        'old_invoice_status', old.invoice_status,
        'new_invoice_status', new.invoice_status,
        'old_churn_risk', old.churn_risk,
        'new_churn_risk', new.churn_risk
      )
    );
    return new;
  elsif tg_op = 'DELETE' then
    insert into public.deal_events(deal_id, event_type, event_summary, payload)
    values (old.deal_id, 'deal_deleted', 'Deal deleted', to_jsonb(old));
    return old;
  end if;
  return null;
end;
$$;

drop trigger if exists deals_capture_event on public.deals;
create trigger deals_capture_event
after insert or update or delete on public.deals
for each row execute function public.capture_deal_event();

create index if not exists deals_stage_idx on public.deals(stage);
create index if not exists deals_invoice_status_idx on public.deals(invoice_status);
create index if not exists deals_churn_risk_idx on public.deals(churn_risk);
create index if not exists deals_action_date_idx on public.deals(action_date);
create index if not exists deals_month_key_idx on public.deals(month_key);
create index if not exists deals_updated_at_idx on public.deals(updated_at desc);
create index if not exists deal_documents_deal_id_idx on public.deal_documents(deal_id);
create index if not exists deal_documents_kind_idx on public.deal_documents(document_kind);
create index if not exists deal_audit_issues_deal_id_idx on public.deal_audit_issues(deal_id);
create index if not exists deal_audit_issues_open_idx on public.deal_audit_issues(is_open, severity);
create index if not exists deal_events_deal_id_idx on public.deal_events(deal_id, created_at desc);

alter table public.deals replica identity full;
alter table public.deal_documents replica identity full;
alter table public.deal_audit_issues replica identity full;
alter table public.deal_events replica identity full;

do $$
begin
  alter publication supabase_realtime add table public.deals;
exception when duplicate_object then null; when undefined_object then null;
end;
$$;

do $$
begin
  alter publication supabase_realtime add table public.deal_documents;
exception when duplicate_object then null; when undefined_object then null;
end;
$$;

do $$
begin
  alter publication supabase_realtime add table public.deal_audit_issues;
exception when duplicate_object then null; when undefined_object then null;
end;
$$;

do $$
begin
  alter publication supabase_realtime add table public.deal_events;
exception when duplicate_object then null; when undefined_object then null;
end;
$$;

alter table public.deals enable row level security;
alter table public.deal_documents enable row level security;
alter table public.deal_audit_issues enable row level security;
alter table public.deal_events enable row level security;

drop policy if exists "Dashboard read deals" on public.deals;
create policy "Dashboard read deals" on public.deals for select to anon using (true);
drop policy if exists "Dashboard insert deals" on public.deals;
create policy "Dashboard insert deals" on public.deals for insert to anon with check (true);
drop policy if exists "Dashboard update deals" on public.deals;
create policy "Dashboard update deals" on public.deals for update to anon using (true) with check (true);
drop policy if exists "Dashboard delete deals" on public.deals;
create policy "Dashboard delete deals" on public.deals for delete to anon using (true);

drop policy if exists "Dashboard read documents" on public.deal_documents;
create policy "Dashboard read documents" on public.deal_documents for select to anon using (true);
drop policy if exists "Dashboard insert documents" on public.deal_documents;
create policy "Dashboard insert documents" on public.deal_documents for insert to anon with check (true);
drop policy if exists "Dashboard update documents" on public.deal_documents;
create policy "Dashboard update documents" on public.deal_documents for update to anon using (true) with check (true);
drop policy if exists "Dashboard delete documents" on public.deal_documents;
create policy "Dashboard delete documents" on public.deal_documents for delete to anon using (true);

drop policy if exists "Dashboard read audit" on public.deal_audit_issues;
create policy "Dashboard read audit" on public.deal_audit_issues for select to anon using (true);
drop policy if exists "Dashboard insert audit" on public.deal_audit_issues;
create policy "Dashboard insert audit" on public.deal_audit_issues for insert to anon with check (true);
drop policy if exists "Dashboard update audit" on public.deal_audit_issues;
create policy "Dashboard update audit" on public.deal_audit_issues for update to anon using (true) with check (true);
drop policy if exists "Dashboard delete audit" on public.deal_audit_issues;
create policy "Dashboard delete audit" on public.deal_audit_issues for delete to anon using (true);

drop policy if exists "Dashboard read events" on public.deal_events;
create policy "Dashboard read events" on public.deal_events for select to anon using (true);
drop policy if exists "Dashboard insert events" on public.deal_events;
create policy "Dashboard insert events" on public.deal_events for insert to anon with check (true);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'deal-documents',
  'deal-documents',
  false,
  20971520,
  array[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png'
  ]
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Dashboard storage read" on storage.objects;
create policy "Dashboard storage read" on storage.objects
for select to anon using (bucket_id = 'deal-documents');

drop policy if exists "Dashboard storage upload" on storage.objects;
create policy "Dashboard storage upload" on storage.objects
for insert to anon with check (bucket_id = 'deal-documents');

drop policy if exists "Dashboard storage update" on storage.objects;
create policy "Dashboard storage update" on storage.objects
for update to anon using (bucket_id = 'deal-documents') with check (bucket_id = 'deal-documents');

drop policy if exists "Dashboard storage delete" on storage.objects;
create policy "Dashboard storage delete" on storage.objects
for delete to anon using (bucket_id = 'deal-documents');
