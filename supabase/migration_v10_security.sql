-- =============================================================================
-- Migration v10: security hardening — replace demo-era "public insert" policies
-- with authenticated, ownership-checked ones. Run in the Supabase SQL editor.
-- (Seeding still works: the SQL editor runs as owner and bypasses RLS.)
-- =============================================================================

-- Products: only signed-in users may add an item, and only as themselves.
drop policy if exists "products public insert" on public.products;
drop policy if exists "products owner insert" on public.products;
create policy "products owner insert" on public.products
  for insert to authenticated with check (user_id = auth.uid());

-- Sellers: no client-side inserts at all (sellers are created via seed SQL only).
drop policy if exists "sellers public insert" on public.sellers;

-- Storage: only signed-in users may upload product/profile images.
drop policy if exists "product images public upload" on storage.objects;
drop policy if exists "product images auth upload" on storage.objects;
create policy "product images auth upload" on storage.objects
  for insert to authenticated with check (bucket_id = 'product-images');

-- Note: notifications still allow any authenticated user to insert (needed so a
-- message/offer/follow can notify the other party). It's a minor spam vector;
-- tighten later with per-event server logic if needed.
