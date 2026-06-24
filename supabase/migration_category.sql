-- =============================================================================
-- Migration: add a category to products + backfill the seed catalogue.
-- Run this in the Supabase SQL editor (after schema.sql / seed.sql).
-- Powers the Shop page category filters and the header category links.
-- =============================================================================

alter table public.products
  add column if not exists category text;

create index if not exists products_category_idx on public.products (category);

-- Backfill the seeded products with canonical categories.
update public.products set category = 'חולצות'   where name in ('חולצת ראפ 90s', 'חולצת פשתן קלאסית');
update public.products set category = 'מעילים'    where name in ('ג''קט ג''ינס Levi''s', 'מעיל רוח וינטג''');
update public.products set category = 'נעליים'    where name in ('סניקרס New Balance', 'נעלי לופרס קלאסיות');
update public.products set category = 'מכנסיים'   where name = 'מכנסיים מחויטים';
update public.products set category = 'אקססוריז'  where name = 'חגורת עור בעבודת יד';
