begin;

create table if not exists public.creators (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  display_name text not null,
  normalized_name text not null,
  created_at timestamptz not null default timezone('utc', now())
);

create unique index if not exists creators_user_id_normalized_name_key
  on public.creators (user_id, normalized_name);

create index if not exists creators_user_id_idx
  on public.creators (user_id);

alter table public.creators enable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'creators'
      and policyname = 'Users can view their creators'
  ) then
    create policy "Users can view their creators"
      on public.creators
      for select
      using (auth.uid() = user_id);
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'creators'
      and policyname = 'Users can insert their creators'
  ) then
    create policy "Users can insert their creators"
      on public.creators
      for insert
      with check (auth.uid() = user_id);
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'creators'
      and policyname = 'Users can update their creators'
  ) then
    create policy "Users can update their creators"
      on public.creators
      for update
      using (auth.uid() = user_id)
      with check (auth.uid() = user_id);
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'creators'
      and policyname = 'Users can delete their creators'
  ) then
    create policy "Users can delete their creators"
      on public.creators
      for delete
      using (auth.uid() = user_id);
  end if;
end
$$;

alter table public.wishlist_entries
  add column if not exists creator_id uuid references public.creators(id) on delete set null;

create index if not exists wishlist_entries_creator_id_idx
  on public.wishlist_entries (creator_id);

insert into public.creators (user_id, display_name, normalized_name)
select distinct
  we.user_id,
  btrim(regexp_replace(we.creator, '\s+', ' ', 'g')) as display_name,
  lower(btrim(regexp_replace(we.creator, '\s+', ' ', 'g'))) as normalized_name
from public.wishlist_entries we
where coalesce(btrim(we.creator), '') <> ''
on conflict (user_id, normalized_name) do nothing;

update public.wishlist_entries we
set creator_id = c.id
from public.creators c
where we.user_id = c.user_id
  and lower(btrim(regexp_replace(we.creator, '\s+', ' ', 'g'))) = c.normalized_name
  and (we.creator_id is null or we.creator_id <> c.id);

commit;
