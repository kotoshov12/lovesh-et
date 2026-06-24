-- =============================================================================
-- Migration: link products to the user who created them.
-- Run this in the Supabase SQL editor (after schema.sql / seed.sql).
-- Enables the "my listings" section on the profile page.
-- =============================================================================

alter table public.products
  add column if not exists user_id uuid references auth.users (id) on delete set null;

create index if not exists products_user_id_idx on public.products (user_id);

-- Optional hardening (uncomment to require logged-in inserts to own their rows):
-- drop policy if exists "products public insert" on public.products;
-- create policy "products owner insert" on public.products
--   for insert to authenticated with check (user_id = auth.uid());
