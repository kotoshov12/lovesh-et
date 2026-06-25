-- =============================================================================
-- Migration v8: allow following any user (not only sellers-table sellers).
-- Run in the Supabase SQL editor (after the earlier migrations).
-- =============================================================================

alter table public.follows alter column seller_id drop not null;

alter table public.follows
  add column if not exists followed_user_id uuid references auth.users (id) on delete cascade;

create unique index if not exists follows_user_unique
  on public.follows (follower_id, followed_user_id);

create index if not exists follows_followed_user_idx
  on public.follows (followed_user_id);
