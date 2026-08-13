-- guest self-check-in (QR flow): a staging queue for public submissions.
-- One submission is a "party" — the person filling the form, plus any
-- travelers they add on their behalf. Nothing here is a booking yet:
-- bookings.room_bed_id is NOT NULL and FK'd to one specific bed, and each
-- traveler in a party needs their OWN bed, so staff assign beds one
-- traveler at a time from the /checkins PMS page. Assigning a traveler
-- creates a real guests + bookings row and marks that traveler 'assigned'.
create table guest_checkins (
  id            uuid primary key default gen_random_uuid(),
  room_type_id  uuid not null references room_types(id) on delete restrict,
  email         text not null,
  phone         text,
  checkin_date  date not null,
  checkout_date date not null,
  add_ons       text[] not null default '{}',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  constraint guest_checkins_dates_check check (checkout_date > checkin_date)
);

-- One row per person in the party — at least one (whoever filled the form),
-- plus any companions they added. Each needs their own ID photo because
-- each will end up occupying their own bed.
create table guest_checkin_travelers (
  id                    uuid primary key default gen_random_uuid(),
  checkin_id            uuid not null references guest_checkins(id) on delete cascade,
  name                  text not null,
  id_card_path          text not null,
  status                text not null default 'pending',
  assigned_room_bed_id  uuid references rooms_beds(id),
  booking_id            uuid references bookings(id),
  sort_order            smallint not null default 0,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now(),
  constraint guest_checkin_travelers_status_check check (status in ('pending', 'assigned', 'rejected'))
);
create index guest_checkin_travelers_checkin_idx on guest_checkin_travelers (checkin_id);
create index guest_checkin_travelers_status_idx on guest_checkin_travelers (status);

alter table guests add column id_card_path text;

alter table guest_checkins enable row level security;
alter table guest_checkin_travelers enable row level security;

create policy "authenticated_full_access" on guest_checkins for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated_full_access" on guest_checkin_travelers for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

grant select, insert, update, delete on table public.guest_checkins to authenticated;
grant select, insert, update, delete on table public.guest_checkin_travelers to authenticated;

-- The public submission endpoint (src/app/api/self-checkin/route.ts) writes
-- via the service-role client. service_role bypasses RLS, but table-level
-- GRANTs are a separate mechanism Postgres still enforces — and unlike the
-- tables from earlier migrations (which picked up SELECT/etc. on
-- service_role from the project's initial bootstrap), a table created here
-- gets no grant at all unless one is added explicitly.
-- guest_checkins additionally needs select: the Route Handler chains
-- .select("id").single() after inserting the submission row so it can link
-- the traveler rows to it, and PostgREST's "return=representation" (what
-- that .select() triggers) needs select privilege, not just insert.
grant select, insert on table public.guest_checkins to service_role;
grant insert on table public.guest_checkin_travelers to service_role;

-- Storage: private bucket for uploaded ID card photos. Public submissions
-- upload via a service-role Route Handler (bypasses storage RLS entirely),
-- so no anon policy is needed here — only staff (authenticated) can read.
insert into storage.buckets (id, name, public)
values ('id-cards', 'id-cards', false)
on conflict (id) do nothing;

create policy "staff_read_id_cards" on storage.objects for select
  using (bucket_id = 'id-cards' and auth.role() = 'authenticated');
