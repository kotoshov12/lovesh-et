-- =============================================================================
-- Migration v13:
--   1. Price offers live inside the buyer⇄seller conversation (same chat).
--   2. Users can block each other; blocked users can't message one another.
-- Run in the Supabase SQL editor.
-- =============================================================================

-- 1. Offers → tie to the conversation + keep the product name for display.
alter table public.offers
  add column if not exists conversation_id uuid references public.conversations (id) on delete set null;
alter table public.offers
  add column if not exists product_name text;
create index if not exists offers_conv_idx on public.offers (conversation_id);

-- 2. Blocks.
create table if not exists public.blocks (
  id          uuid primary key default gen_random_uuid(),
  blocker_id  uuid not null references auth.users (id) on delete cascade,
  blocked_id  uuid not null references auth.users (id) on delete cascade,
  created_at  timestamptz not null default now(),
  unique (blocker_id, blocked_id)
);
create index if not exists blocks_blocker_idx on public.blocks (blocker_id);
create index if not exists blocks_blocked_idx on public.blocks (blocked_id);

alter table public.blocks enable row level security;

drop policy if exists "blocks read own" on public.blocks;
create policy "blocks read own" on public.blocks
  for select using (auth.uid() = blocker_id or auth.uid() = blocked_id);

drop policy if exists "blocks insert own" on public.blocks;
create policy "blocks insert own" on public.blocks
  for insert with check (auth.uid() = blocker_id);

drop policy if exists "blocks delete own" on public.blocks;
create policy "blocks delete own" on public.blocks
  for delete using (auth.uid() = blocker_id);

-- A message can't be sent if either participant blocked the other.
drop policy if exists "msg no blocks" on public.messages;
create policy "msg no blocks" on public.messages
  as restrictive for insert
  with check (
    not exists (
      select 1
      from public.blocks b
      join public.conversations c on c.id = conversation_id
      where (b.blocker_id = c.buyer_id and b.blocked_id = c.seller_id)
         or (b.blocker_id = c.seller_id and b.blocked_id = c.buyer_id)
    )
  );
