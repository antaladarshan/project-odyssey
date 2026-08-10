-- Dynamic pricing: per-room-type base rate + property-wide length-of-stay /
-- weekend discount percentages. Replaces the hardcoded constants that used
-- to live in src/lib/pricing.ts.
--
-- NOTE: already applied directly to the shared production database as part
-- of shipping this feature — this file documents that schema change in this
-- repo's history (the PMS section here didn't have its own migrations folder
-- entry for it yet). Re-running it is safe (idempotent guards aren't present
-- since it's create-only, so don't re-run against a database that already
-- has these tables).

create table rate_plans (
  id           uuid primary key default gen_random_uuid(),
  room_type_id uuid not null references room_types(id) on delete cascade,
  base_price   numeric(10,2) not null,
  is_default   boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- Only one default rate plan per room type (future non-default plans, e.g.
-- seasonal, aren't built yet but the flag leaves room for them).
create unique index rate_plans_one_default_per_room_type
  on rate_plans (room_type_id) where is_default;

-- Property-wide length-of-stay + weekend discount percentages. Single row
-- per property (today there's exactly one). Night-count thresholds (7 / 14 /
-- 27) are fixed in application code, not stored here — only the percentages
-- are host-editable.
create table pricing_rules (
  id                    uuid primary key default gen_random_uuid(),
  property_id           uuid not null references properties(id) on delete cascade,
  weekly_discount_pct   numeric(5,2) not null default 0,  -- >= 7 nights
  extended_discount_pct numeric(5,2) not null default 0,  -- >= 14 nights
  monthly_discount_pct  numeric(5,2) not null default 0,  -- >= 27 nights
  weekend_discount_pct  numeric(5,2) not null default 0,  -- Fri/Sat nights, applied per-night
  updated_at            timestamptz not null default now(),
  unique (property_id)
);

alter table rate_plans    enable row level security;
alter table pricing_rules enable row level security;

create policy "authenticated_full_access" on rate_plans for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated_full_access" on pricing_rules for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

grant select, insert, update, delete on table public.rate_plans    to authenticated;
grant select, insert, update, delete on table public.pricing_rules to authenticated;

-- Seed with today's live values (see ODYSSEY_PRICING_CONFIG / RACK_NIGHTLY in
-- src/lib/pricing.ts) so nothing changes for guests until a host edits it
-- from the PMS pricing settings page.
insert into rate_plans (room_type_id, base_price)
select id, 700 from room_types;

insert into pricing_rules (property_id, weekly_discount_pct, extended_discount_pct, monthly_discount_pct, weekend_discount_pct)
select id, 29, 43, 49, 0 from properties limit 1;
