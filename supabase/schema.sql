-- =============================================================================
-- LOVEsh\et — Supabase schema
-- Run this in the Supabase SQL editor (Dashboard → SQL → New query).
-- Then run seed.sql to populate the catalogue.
-- =============================================================================

-- ---- Tables ----------------------------------------------------------------

create table if not exists public.sellers (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  avatar     text,
  location   text,
  distance   text,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id             uuid primary key default gen_random_uuid(),
  name           text not null,
  price          integer not null,           -- whole shekels
  original_price integer,                     -- null when not on sale
  brand          text,
  size           text,
  condition      text,
  caption        text,
  eyebrow        text,
  description    text,
  distance       text,
  badge_text     text,                        -- e.g. "SALE" / "חדש"
  badge_variant  text,                        -- 'sale' | 'new' | 'last'
  image          text,                        -- main image url
  gallery        text[] not null default '{}',
  seller_id      uuid references public.sellers (id) on delete set null,
  created_at     timestamptz not null default now()
);

create index if not exists products_created_at_idx on public.products (created_at desc);

-- ---- Row Level Security ----------------------------------------------------
-- This app has no auth yet, so reads are public and inserts are allowed for the
-- anon (public) key. Tighten these once authentication is added.

alter table public.sellers  enable row level security;
alter table public.products enable row level security;

drop policy if exists "sellers public read" on public.sellers;
create policy "sellers public read" on public.sellers
  for select using (true);

drop policy if exists "sellers public insert" on public.sellers;
create policy "sellers public insert" on public.sellers
  for insert with check (true);

drop policy if exists "products public read" on public.products;
create policy "products public read" on public.products
  for select using (true);

drop policy if exists "products public insert" on public.products;
create policy "products public insert" on public.products
  for insert with check (true);

-- ---- Storage ---------------------------------------------------------------
-- Public bucket for uploaded product photos.

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

drop policy if exists "product images public read" on storage.objects;
create policy "product images public read" on storage.objects
  for select using (bucket_id = 'product-images');

drop policy if exists "product images public upload" on storage.objects;
create policy "product images public upload" on storage.objects
  for insert with check (bucket_id = 'product-images');
