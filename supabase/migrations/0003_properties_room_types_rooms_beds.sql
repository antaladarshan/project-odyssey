-- properties (1 row today, but a real FK target)
create table properties (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  timezone   text not null default 'Asia/Kolkata',
  created_at timestamptz not null default now()
);

-- room_types (see supabase/seed.sql for current names/bed counts)
create table room_types (
  id            uuid primary key default gen_random_uuid(),
  property_id   uuid not null references properties(id) on delete cascade,
  name          text not null,
  description   text,
  base_capacity smallint not null default 1,
  sort_order    smallint not null default 0,
  created_at    timestamptz not null default now(),
  unique (property_id, name)
);

-- rooms_beds: single bookable-unit table.
-- A private room -> one row = one whole room, is_private_room = true.
-- A dorm -> one row per bed, is_private_room = false.
create table rooms_beds (
  id              uuid primary key default gen_random_uuid(),
  room_type_id    uuid not null references room_types(id) on delete cascade,
  label           text not null,
  is_private_room boolean not null default false,
  is_active       boolean not null default true,
  sort_order      smallint not null default 0,
  created_at      timestamptz not null default now(),
  unique (room_type_id, label)
);
