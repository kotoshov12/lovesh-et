-- =============================================================================
-- Migration v5: follow sellers + realistic second-hand prices.
-- Run in the Supabase SQL editor (after the earlier migrations).
-- =============================================================================

-- ---- Follows ---------------------------------------------------------------
create table if not exists public.follows (
  id          uuid primary key default gen_random_uuid(),
  follower_id uuid not null references auth.users (id) on delete cascade,
  seller_id   uuid not null references public.sellers (id) on delete cascade,
  created_at  timestamptz not null default now(),
  unique (follower_id, seller_id)
);
create index if not exists follows_follower_idx on public.follows (follower_id);
create index if not exists follows_seller_idx on public.follows (seller_id);

alter table public.follows enable row level security;

drop policy if exists "follows public read" on public.follows;
create policy "follows public read" on public.follows for select using (true);

drop policy if exists "follows owner insert" on public.follows;
create policy "follows owner insert" on public.follows
  for insert with check (follower_id = auth.uid());

drop policy if exists "follows owner delete" on public.follows;
create policy "follows owner delete" on public.follows
  for delete using (follower_id = auth.uid());

-- ---- Realistic second-hand prices ------------------------------------------
update public.products set price = 45, original_price = 70  where name = 'חולצת ראפ 90s';
update public.products set price = 75, original_price = 110 where name = 'ג''קט ג''ינס Levi''s';
update public.products set price = 90, original_price = null where name = 'סניקרס New Balance';
update public.products set price = 80, original_price = null where name = 'מעיל רוח וינטג''';
update public.products set price = 60, original_price = null where name = 'חולצת פשתן קלאסית';
update public.products set price = 55, original_price = 90  where name = 'חגורת עור בעבודת יד';
update public.products set price = 70, original_price = null where name = 'מכנסיים מחויטים';
update public.products set price = 110, original_price = null where name = 'נעלי לופרס קלאסיות';

update public.products set price = 40, original_price = null where name = 'טי-שירט גרפי וינטג''';
update public.products set price = 30, original_price = null where name = 'חולצת טי לבנה בייסיק';
update public.products set price = 70, original_price = 110 where name = 'ג''ינס מאמא Levi''s';
update public.products set price = 85, original_price = null where name = 'שמלת ערב אדומה';
update public.products set price = 80, original_price = 130 where name = 'שמלת קוקטייל סגולה';
update public.products set price = 45, original_price = 70  where name = 'חצאית מידי פליסה';
update public.products set price = 85, original_price = null where name = 'סניקרס ואנס בורדו';
update public.products set price = 70, original_price = null where name = 'ז''קט ג''ינס אוברסייז';
update public.products set price = 90, original_price = null where name = 'מעיל בומבר חום';
update public.products set price = 70, original_price = null where name = 'תיק קרוסבודי שחור';
