alter table profiles   enable row level security;
alter table properties enable row level security;
alter table room_types  enable row level security;
alter table rooms_beds  enable row level security;
alter table channels    enable row level security;
alter table guests      enable row level security;
alter table bookings    enable row level security;

-- profiles: every authenticated user can read all profiles, only update their own
create policy "profiles_select_all" on profiles for select using (auth.role() = 'authenticated');
create policy "profiles_update_own" on profiles for update using (id = auth.uid());

-- all other Phase 1 tables: full CRUD for any authenticated user (no role gating yet;
-- profiles.role exists for future staff permission differentiation, not enforced here)
create policy "authenticated_full_access" on properties for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated_full_access" on room_types for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated_full_access" on rooms_beds for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated_full_access" on channels for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated_full_access" on guests for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "authenticated_full_access" on bookings for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
