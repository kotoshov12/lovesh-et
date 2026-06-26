-- =============================================================================
-- Migration v11: purchase requests — the seller approves a Bit/meeting before
-- a purchase of their item is finalised. Run in the Supabase SQL editor.
-- =============================================================================

create table if not exists public.purchase_requests (
  id             uuid primary key default gen_random_uuid(),
  product_id     uuid references public.products (id) on delete set null,
  product_name   text,
  buyer_id       uuid not null references auth.users (id) on delete cascade,
  seller_id      uuid not null references auth.users (id) on delete cascade,
  amount         integer not null default 0,
  payment_method text,
  status         text not null default 'pending',  -- pending | approved | declined
  created_at     timestamptz not null default now()
);
create index if not exists purchases_seller_idx on public.purchase_requests (seller_id, status);
create index if not exists purchases_buyer_idx on public.purchase_requests (buyer_id);

alter table public.purchase_requests enable row level security;

drop policy if exists "purchases participants read" on public.purchase_requests;
create policy "purchases participants read" on public.purchase_requests
  for select using (auth.uid() = buyer_id or auth.uid() = seller_id);

drop policy if exists "purchases buyer insert" on public.purchase_requests;
create policy "purchases buyer insert" on public.purchase_requests
  for insert with check (auth.uid() = buyer_id);

drop policy if exists "purchases seller update" on public.purchase_requests;
create policy "purchases seller update" on public.purchase_requests
  for update using (auth.uid() = seller_id);
