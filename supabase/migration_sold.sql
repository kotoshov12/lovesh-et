-- =============================================================================
-- Migration: mark products as sold.
-- Run this in the Supabase SQL editor (after the earlier migrations).
-- Sold items are hidden from the catalogue but still shown (blurred) on the
-- seller's profile.
-- =============================================================================

alter table public.products
  add column if not exists is_sold boolean not null default false;

create index if not exists products_is_sold_idx on public.products (is_sold);
