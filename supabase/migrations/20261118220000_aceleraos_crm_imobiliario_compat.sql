-- Compatibility layer for running the AceleraOS application on the CRM Imobiliario project.
-- It only adds missing authorization primitives; existing CRM tables and rows are untouched.
create table if not exists public.user_organizations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  role text not null default 'viewer' check (role in ('viewer','agent','manager','admin')),
  revoked_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, organization_id)
);

create table if not exists public.platform_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  granted_by uuid not null references auth.users(id) on delete restrict,
  granted_at timestamptz not null default now(),
  scope text not null default 'full' check (scope in ('full','support_readonly')),
  mfa_required boolean not null default false,
  reason text not null,
  revoked_at timestamptz,
  revoked_by uuid references auth.users(id) on delete set null,
  revoke_reason text
);

create or replace function public.fn_user_org_ids()
returns setof uuid language sql stable security definer set search_path = public as $$
  select organization_id from public.user_organizations
  where user_id = auth.uid() and revoked_at is null
  union
  select organization_id from public.profiles
  where id = auth.uid();
$$;

create or replace function public.fn_is_platform_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.platform_admins where user_id = auth.uid() and revoked_at is null);
$$;

alter table public.user_organizations enable row level security;
alter table public.platform_admins enable row level security;

drop policy if exists user_organizations_self_read on public.user_organizations;
create policy user_organizations_self_read on public.user_organizations
  for select to authenticated using (user_id = auth.uid() or public.fn_is_platform_admin());

drop policy if exists platform_admins_self_read on public.platform_admins;
create policy platform_admins_self_read on public.platform_admins
  for select to authenticated using (user_id = auth.uid());

insert into public.user_organizations (user_id, organization_id, role)
select p.id, p.organization_id, case when p.role = 'admin' then 'admin' else p.role::text end
from public.profiles p
where p.organization_id is not null
on conflict (user_id, organization_id) do update set role = excluded.role, revoked_at = null;

insert into public.platform_admins (user_id, granted_by, reason)
select p.id, p.id, 'AceleraOS owner compatibility bootstrap'
from public.profiles p
where p.role = 'admin'
on conflict (user_id) do update set revoked_at = null;
