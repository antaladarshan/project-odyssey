-- guests
create table guests (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  phone           text,
  email           text,
  id_proof_type   text,
  id_proof_number text,
  notes           text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
create index guests_name_idx  on guests (lower(name));
create index guests_phone_idx on guests (phone);

-- bookings
-- guest_id is NOT NULL: Phase 1 quick-add always collects a guest name.
-- rate_total is nullable (unpriced is a real state); amount_paid defaults to 0
-- (not entered means nothing paid, not "unknown").
create table bookings (
  id            uuid primary key default gen_random_uuid(),
  channel_id    uuid not null references channels(id) on delete restrict,
  guest_id      uuid not null references guests(id) on delete restrict,
  room_bed_id   uuid not null references rooms_beds(id) on delete restrict,
  checkin_date  date not null,
  checkout_date date not null,
  status        booking_status not null default 'confirmed',
  rate_total    numeric(10,2),
  amount_paid   numeric(10,2) not null default 0,
  external_ref  text,
  note          text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  constraint bookings_dates_check       check (checkout_date > checkin_date),
  constraint bookings_amount_paid_check check (amount_paid >= 0),
  -- prevent double-booking the same room/bed for overlapping dates
  exclude using gist (
    room_bed_id with =,
    daterange(checkin_date, checkout_date, '[)') with &&
  ) where (status <> 'cancelled')
);
create index bookings_room_bed_dates_idx on bookings (room_bed_id, checkin_date, checkout_date);
create index bookings_guest_idx   on bookings (guest_id);
create index bookings_channel_idx on bookings (channel_id);
