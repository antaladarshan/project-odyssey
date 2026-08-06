-- RLS policies only take effect once the underlying role already has the
-- base table-level GRANT; without this, PostgREST returns 42501
-- "permission denied" before RLS is ever evaluated.
grant usage on schema public to authenticated;

grant select, insert, update, delete on table public.profiles    to authenticated;
grant select, insert, update, delete on table public.properties  to authenticated;
grant select, insert, update, delete on table public.room_types  to authenticated;
grant select, insert, update, delete on table public.rooms_beds  to authenticated;
grant select, insert, update, delete on table public.channels    to authenticated;
grant select, insert, update, delete on table public.guests      to authenticated;
grant select, insert, update, delete on table public.bookings    to authenticated;
