-- IntelligentForce Enterprise Lead Ledger
-- Primary database schema for ALEX lead events and Valdi-approved follow-up.
-- Security model: no browser client may read or write these tables directly.

create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  external_reference text not null unique,
  source text not null check (source in ('alex_public_chat', 'alex_inbox', 'manual_import', 'zapier_sync')),
  source_conversation_id text,
  contact_email text,
  contact_name text,
  company_name text,
  summary text not null check (char_length(summary) <= 4000),
  priority smallint not null default 3 check (priority between 1 and 5),
  status text not null default 'new' check (status in ('new', 'qualified', 'review', 'approved_follow_up', 'contacted', 'nurture', 'closed_won', 'closed_lost', 'archived')),
  suggested_next_step text,
  owner_user_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  last_activity_at timestamptz not null default now(),
  closed_at timestamptz,
  retention_review_at timestamptz not null default (now() + interval '12 months')
);

create index if not exists leads_status_priority_idx on public.leads (status, priority desc, last_activity_at desc);
create index if not exists leads_source_idx on public.leads (source, created_at desc);
create index if not exists leads_retention_idx on public.leads (retention_review_at) where status not in ('closed_won', 'closed_lost', 'archived');

create table if not exists public.lead_events (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  event_type text not null check (event_type in ('created', 'classified', 'brief_generated', 'status_changed', 'owner_assigned', 'draft_created', 'draft_approved', 'contacted', 'note_added', 'archived')),
  actor_type text not null check (actor_type in ('alex', 'valdi', 'system', 'integration')),
  actor_user_id uuid references auth.users(id) on delete set null,
  event_data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists lead_events_lead_idx on public.lead_events (lead_id, created_at desc);

create table if not exists public.lead_access_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('owner', 'operator', 'reviewer', 'auditor')),
  granted_at timestamptz not null default now(),
  granted_by uuid references auth.users(id) on delete set null
);

-- No client role has direct permissions. All access is mediated by the
-- server-side ALEX service, which keeps privileged credentials private.
revoke all on table public.leads from anon, authenticated;
revoke all on table public.lead_events from anon, authenticated;
revoke all on table public.lead_access_roles from anon, authenticated;

alter table public.leads enable row level security;
alter table public.lead_events enable row level security;
alter table public.lead_access_roles enable row level security;

create or replace function public.set_lead_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  new.updated_at = now();
  new.last_activity_at = now();
  if new.status in ('closed_won', 'closed_lost', 'archived') and old.status is distinct from new.status then
    new.closed_at = now();
  elsif new.status not in ('closed_won', 'closed_lost', 'archived') then
    new.closed_at = null;
  end if;
  return new;
end;
$$;

drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at
before update on public.leads
for each row execute function public.set_lead_updated_at();

-- Keep a small, explicit audit event for every lead created through the
-- protected ALEX service. The service writes the remaining lifecycle events.
create or replace function public.audit_new_lead()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.lead_events (lead_id, event_type, actor_type, event_data)
  values (
    new.id,
    'created',
    'alex',
    jsonb_build_object(
      'source', new.source,
      'priority', new.priority,
      'status', new.status,
      'external_reference', new.external_reference
    )
  );
  return new;
end;
$$;

revoke all on function public.audit_new_lead() from public;

drop trigger if exists leads_audit_new on public.leads;
create trigger leads_audit_new
after insert on public.leads
for each row execute function public.audit_new_lead();

comment on table public.leads is 'Permanent IntelligentForce ledger for qualified prospects and customer-interest events.';
comment on table public.lead_events is 'Append-only business event history for enterprise lead governance.';
comment on table public.lead_access_roles is 'Future authenticated AI Office and enterprise access roles.';
