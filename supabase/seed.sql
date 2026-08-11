insert into properties (name) values ('Project Odyssey');

insert into channels (name, brand_color, logo_key, type, sync_method, commission_pct) values
  ('Booking.com',    '#003580', 'monogram:B.',         'ota',       'ical',          null),
  ('Airbnb',         '#FF385C', 'icon:heart',          'ota',       'ical',          null),
  ('Agoda',          '#5C2D91', 'monogram:a',          'ota',       'ical',          null),
  ('MakeMyTrip',     '#E4392A', 'monogram:my',         'ota',       'ical',          null),
  ('Goibibo',        '#F5872B', 'icon:circle',         'ota',       'ical',          null),
  ('Vrbo',           '#3D5B96', 'monogram:V',          'ota',       'ical',          null),
  ('WhatsApp',       '#25D366', 'icon:message-circle', 'messaging', 'manual',        0),
  ('Direct Website', '#B08551', 'icon:globe',          'direct',    'direct_engine', 0),
  ('Phone',          '#4A6B8A', 'icon:phone',          'phone',     'manual',        0),
  ('Walk-in',        '#6E7F54', 'icon:footprints',     'walkin',    'manual',        0);

-- Room inventory
insert into room_types (property_id, name, description, base_capacity, sort_order)
select id, 'Olympus', 'Dorm', 4, 1 from properties limit 1;
insert into room_types (property_id, name, description, base_capacity, sort_order)
select id, 'Ithaca', 'Dorm', 4, 2 from properties limit 1;
insert into room_types (property_id, name, description, base_capacity, sort_order)
select id, 'Oracle', 'Dorm', 6, 3 from properties limit 1;

-- Olympus: 4 individually bookable beds
insert into rooms_beds (room_type_id, label, is_private_room, sort_order)
select id, 'Bed ' || n, false, n
from room_types, generate_series(1, 4) as n
where room_types.name = 'Olympus';

-- Ithaca: 4 individually bookable beds
insert into rooms_beds (room_type_id, label, is_private_room, sort_order)
select id, 'Bed ' || n, false, n
from room_types, generate_series(1, 4) as n
where room_types.name = 'Ithaca';

-- Oracle: 6 individually bookable beds
insert into rooms_beds (room_type_id, label, is_private_room, sort_order)
select id, 'Bed ' || n, false, n
from room_types, generate_series(1, 6) as n
where room_types.name = 'Oracle';

-- Pricing: base rate per bed + LOS/weekend discount percentages, matching
-- what's currently live on projectodyssey.in (see src/lib/pricing.ts there).
insert into rate_plans (room_type_id, base_price)
select id, 700 from room_types;

insert into pricing_rules (property_id, weekly_discount_pct, extended_discount_pct, monthly_discount_pct, weekend_discount_pct)
select id, 29, 43, 49, 0 from properties limit 1;

-- Real tenant/guest data is NOT committed to this repo.
-- Run supabase/seed.private.sql (gitignored, local-only) after this file
-- to load current tenant bookings into a local/dev database.
