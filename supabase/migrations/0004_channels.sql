-- channels: seeded with the 10 channels from PLAN.md Section 4 (see supabase/seed.sql)
create table channels (
  id             uuid primary key default gen_random_uuid(),
  name           text not null unique,
  brand_color    text not null,
  logo_key       text not null,
  type           channel_type not null,
  commission_pct numeric(5,2),
  sync_method    sync_method not null,
  is_active      boolean not null default true,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);
