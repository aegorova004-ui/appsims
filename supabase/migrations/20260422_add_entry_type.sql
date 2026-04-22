begin;

alter table public.wishlist_entries
  add column if not exists type text;

update public.wishlist_entries
set
  type = 'Mod',
  category = 'Script',
  updated_at = coalesce(updated_at, timezone('utc', now()))
where category = 'Script Mod';

update public.wishlist_entries
set
  type = 'Mod',
  category = 'Gameplay',
  updated_at = coalesce(updated_at, timezone('utc', now()))
where category = 'Gameplay Mod';

update public.wishlist_entries
set type = 'CC'
where type is null;

alter table public.wishlist_entries
  alter column type set default 'CC';

alter table public.wishlist_entries
  alter column type set not null;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'wishlist_entries_type_check'
      and conrelid = 'public.wishlist_entries'::regclass
  ) then
    alter table public.wishlist_entries
      add constraint wishlist_entries_type_check
      check (type in ('CC', 'Mod'));
  end if;
end
$$;

create index if not exists wishlist_entries_user_id_type_idx
  on public.wishlist_entries (user_id, type);

commit;
