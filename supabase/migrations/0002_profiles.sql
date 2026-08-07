-- profiles: one per Supabase Auth user, for multi-staff access
create table profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  full_name  text not null,
  role       staff_role not null default 'staff',
  created_at timestamptz not null default now()
);

-- auto-create a profile row for every new Supabase Auth user
create function public.handle_new_user() returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.email));
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
