-- =============================================================================
-- Migration v9: allow reviews on any user (not only sellers-table sellers).
-- Run in the Supabase SQL editor (after the earlier migrations).
-- =============================================================================

alter table public.reviews alter column seller_id drop not null;

alter table public.reviews
  add column if not exists reviewed_user_id uuid references auth.users (id) on delete cascade;

create unique index if not exists reviews_user_unique
  on public.reviews (reviewed_user_id, author_id);

create index if not exists reviews_reviewed_user_idx
  on public.reviews (reviewed_user_id);
