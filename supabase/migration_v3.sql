-- =============================================================================
-- Migration v3: price offers + seller edit/delete of their listings.
-- Run in the Supabase SQL editor (after the earlier migrations).
-- =============================================================================

-- ---- Price offers ----------------------------------------------------------
create table if not exists public.offers (
  id         uuid primary key default gen_random_uuid(),
  product_id uuid references public.products (id) on delete cascade,
  buyer_id   uuid not null references auth.users (id) on delete cascade,
  seller_id  uuid not null references auth.users (id) on delete cascade,
  amount     integer not null,
  status     text not null default 'pending',  -- pending | accepted | rejected
  created_at timestamptz not null default now()
);
create index if not exists offers_seller_idx on public.offers (seller_id, status);
create index if not exists offers_buyer_idx on public.offers (buyer_id);

alter table public.offers enable row level security;

drop policy if exists "offers participants read" on public.offers;
create policy "offers participants read" on public.offers
  for select using (auth.uid() = buyer_id or auth.uid() = seller_id);

drop policy if exists "offers buyer insert" on public.offers;
create policy "offers buyer insert" on public.offers
  for insert with check (auth.uid() = buyer_id);

drop policy if exists "offers seller update" on public.offers;
create policy "offers seller update" on public.offers
  for update using (auth.uid() = seller_id);

-- ---- Let sellers edit / delete their own listings --------------------------
-- (also enables "mark as sold", which had no update policy before)
drop policy if exists "products owner update" on public.products;
create policy "products owner update" on public.products
  for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists "products owner delete" on public.products;
create policy "products owner delete" on public.products
  for delete to authenticated using (user_id = auth.uid());
