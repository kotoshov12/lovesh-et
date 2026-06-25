-- =============================================================================
-- Migration v2: orders, reviews, notifications.
-- Run in the Supabase SQL editor (after the earlier migrations).
-- =============================================================================

-- ---- Orders ----------------------------------------------------------------
create table if not exists public.orders (
  id             uuid primary key default gen_random_uuid(),
  buyer_id       uuid not null references auth.users (id) on delete cascade,
  items          jsonb not null default '[]',
  total          integer not null default 0,
  payment_method text,
  status         text not null default 'placed',
  created_at     timestamptz not null default now()
);
create index if not exists orders_buyer_idx on public.orders (buyer_id, created_at desc);
alter table public.orders enable row level security;

drop policy if exists "orders own read" on public.orders;
create policy "orders own read" on public.orders for select using (auth.uid() = buyer_id);
drop policy if exists "orders own insert" on public.orders;
create policy "orders own insert" on public.orders for insert with check (auth.uid() = buyer_id);

-- ---- Reviews (for sellers-table sellers) -----------------------------------
create table if not exists public.reviews (
  id         uuid primary key default gen_random_uuid(),
  seller_id  uuid not null references public.sellers (id) on delete cascade,
  author_id  uuid not null references auth.users (id) on delete cascade,
  rating     int not null check (rating between 1 and 5),
  body       text,
  created_at timestamptz not null default now(),
  unique (seller_id, author_id)
);
create index if not exists reviews_seller_idx on public.reviews (seller_id);
alter table public.reviews enable row level security;

drop policy if exists "reviews public read" on public.reviews;
create policy "reviews public read" on public.reviews for select using (true);
drop policy if exists "reviews author insert" on public.reviews;
create policy "reviews author insert" on public.reviews for insert with check (auth.uid() = author_id);
drop policy if exists "reviews author update" on public.reviews;
create policy "reviews author update" on public.reviews for update using (auth.uid() = author_id);

-- ---- Notifications ---------------------------------------------------------
create table if not exists public.notifications (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users (id) on delete cascade,
  type       text,
  body       text not null,
  link       text,
  is_read    boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists notifications_user_idx on public.notifications (user_id, created_at desc);
alter table public.notifications enable row level security;

drop policy if exists "notif own read" on public.notifications;
create policy "notif own read" on public.notifications for select using (auth.uid() = user_id);
drop policy if exists "notif own update" on public.notifications;
create policy "notif own update" on public.notifications for update using (auth.uid() = user_id);
-- any signed-in user may create a notification for another (message/order/etc.)
drop policy if exists "notif insert authed" on public.notifications;
create policy "notif insert authed" on public.notifications
  for insert to authenticated with check (true);

-- realtime stream for the notification bell
do $$
begin
  alter publication supabase_realtime add table public.notifications;
exception
  when duplicate_object then null;
  when undefined_object then null;
end $$;
