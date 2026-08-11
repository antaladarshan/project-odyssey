-- Pricing config becomes owner-only: staff can neither read nor write
-- rate_plans/pricing_rules. Safe for booking creation (rate_total is typed
-- manually, never read from these tables) and for the public /api/pricing
-- route (uses the service-role client, which bypasses RLS).

drop policy "authenticated_full_access" on rate_plans;
create policy "owner_full_access" on rate_plans for all
  using (exists (select 1 from profiles where profiles.id = auth.uid() and profiles.role = 'owner'))
  with check (exists (select 1 from profiles where profiles.id = auth.uid() and profiles.role = 'owner'));

drop policy "authenticated_full_access" on pricing_rules;
create policy "owner_full_access" on pricing_rules for all
  using (exists (select 1 from profiles where profiles.id = auth.uid() and profiles.role = 'owner'))
  with check (exists (select 1 from profiles where profiles.id = auth.uid() and profiles.role = 'owner'));

-- Close self-escalation: block any authenticated (non-owner) session from
-- changing a profiles.role value via PostgREST. auth.uid() is null for
-- direct SQL (SQL editor, migrations, the owner-promotion statement run
-- once after this migration), so that path is intentionally left open.
create function public.prevent_role_self_escalation() returns trigger as $$
begin
  if new.role is distinct from old.role and auth.uid() is not null then
    if not exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'owner') then
      raise exception 'Only an owner can change a profile''s role';
    end if;
  end if;
  return new;
end;
$$ language plpgsql security definer;

create trigger profiles_prevent_role_self_escalation
  before update on profiles
  for each row execute function public.prevent_role_self_escalation();
