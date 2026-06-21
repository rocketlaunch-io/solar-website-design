create extension if not exists pgcrypto with schema extensions;

create table if not exists public.customers (
  id text primary key default gen_random_uuid()::text,
  stripe_customer_id text unique,
  company_name text not null,
  email text not null,
  plan_tier text not null check (plan_tier in ('business', 'scale')),
  subscription_id text,
  subscription_item_id text,
  status text not null default 'active' check (status in ('active', 'paused', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  customer_id text not null references public.customers(id) on delete cascade,
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,
  address text,
  city text,
  state text,
  zip_code text not null,
  roof_type text,
  monthly_bill numeric(10, 2),
  primary_goal text,
  business_type text,
  lead_volume text,
  current_platform text,
  company_name text,
  website_url text,
  status text not null default 'pending' check (status in ('pending', 'verifying', 'verified', 'rejected')),
  verification_score integer not null default 0 check (verification_score >= 0 and verification_score <= 100),
  format_valid boolean not null default false,
  tcpa_consent boolean not null default false,
  tcpa_consent_at timestamptz,
  tcpa_ip_address text,
  address_valid boolean not null default false,
  is_duplicate boolean not null default false,
  meter_event_id text,
  billed_at timestamptz,
  rejection_reason text,
  source_url text,
  user_agent text,
  ip_address text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.support_requests (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  name text,
  email text,
  company_name text,
  subject text,
  message text not null,
  status text not null default 'new' check (status in ('new', 'triaged', 'resolved', 'closed')),
  source_url text,
  user_agent text,
  ip_address text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source_url text,
  created_at timestamptz not null default now()
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

drop trigger if exists set_customers_updated_at on public.customers;
create trigger set_customers_updated_at
before update on public.customers
for each row execute function public.set_updated_at();

drop trigger if exists set_leads_updated_at on public.leads;
create trigger set_leads_updated_at
before update on public.leads
for each row execute function public.set_updated_at();

drop trigger if exists set_support_requests_updated_at on public.support_requests;
create trigger set_support_requests_updated_at
before update on public.support_requests
for each row execute function public.set_updated_at();

create index if not exists customers_status_idx on public.customers(status);
create index if not exists leads_customer_id_idx on public.leads(customer_id);
create index if not exists leads_email_customer_id_idx on public.leads(email, customer_id);
create index if not exists leads_status_idx on public.leads(status);
create index if not exists leads_created_at_idx on public.leads(created_at desc);
create index if not exists support_requests_status_idx on public.support_requests(status);
create index if not exists support_requests_created_at_idx on public.support_requests(created_at desc);

insert into public.customers (id, stripe_customer_id, company_name, email, plan_tier, status)
values
  ('platform-owner', 'cus_mock_platform-owner', 'Spark Solar Platform', 'dealer@sparksolar.com', 'business', 'active'),
  ('default', 'cus_mock_default', 'Default Spark Dealer', 'dealer@sparksolar.com', 'business', 'active'),
  ('mock-customer', 'cus_mock_mock-customer', 'Default Spark Dealer', 'dealer@sparksolar.com', 'business', 'active'),
  ('test', 'cus_mock_test', 'Default Spark Dealer', 'dealer@sparksolar.com', 'business', 'active')
on conflict (id) do update set
  stripe_customer_id = excluded.stripe_customer_id,
  company_name = excluded.company_name,
  email = excluded.email,
  plan_tier = excluded.plan_tier,
  status = excluded.status;

alter table public.customers enable row level security;
alter table public.leads enable row level security;
alter table public.support_requests enable row level security;
alter table public.newsletter_subscribers enable row level security;

drop policy if exists "Allow public customer lookup for active customers" on public.customers;
create policy "Allow public customer lookup for active customers"
on public.customers
for select
to anon, authenticated
using (status = 'active');

drop policy if exists "Allow public lead capture" on public.leads;
create policy "Allow public lead capture"
on public.leads
for insert
to anon, authenticated
with check (tcpa_consent = true);

drop policy if exists "Allow authenticated users to read leads" on public.leads;
create policy "Allow authenticated users to read leads"
on public.leads
for select
to authenticated
using (true);

drop policy if exists "Allow public support request capture" on public.support_requests;
create policy "Allow public support request capture"
on public.support_requests
for insert
to anon, authenticated
with check (length(trim(message)) > 0);

drop policy if exists "Allow public newsletter subscription" on public.newsletter_subscribers;
create policy "Allow public newsletter subscription"
on public.newsletter_subscribers
for insert
to anon, authenticated
with check (email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$');

grant usage on schema public to anon, authenticated;
grant select on public.customers to anon, authenticated;
grant insert on public.leads to anon, authenticated;
grant select on public.leads to authenticated;
grant insert on public.support_requests to anon, authenticated;
grant insert on public.newsletter_subscribers to anon, authenticated;
