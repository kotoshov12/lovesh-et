-- =============================================================================
-- Migration: buyer ⇄ seller messaging.
-- Run this in the Supabase SQL editor (after the earlier migrations).
-- =============================================================================

create table if not exists public.conversations (
  id              uuid primary key default gen_random_uuid(),
  product_id      uuid references public.products (id) on delete set null,
  buyer_id        uuid not null references auth.users (id) on delete cascade,
  seller_id       uuid not null references auth.users (id) on delete cascade,
  created_at      timestamptz not null default now(),
  last_message_at timestamptz not null default now(),
  unique (product_id, buyer_id)
);

create table if not exists public.messages (
  id              uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations (id) on delete cascade,
  sender_id       uuid not null references auth.users (id) on delete cascade,
  body            text not null,
  created_at      timestamptz not null default now()
);

create index if not exists messages_conversation_idx on public.messages (conversation_id, created_at);
create index if not exists conversations_buyer_idx on public.conversations (buyer_id);
create index if not exists conversations_seller_idx on public.conversations (seller_id);

-- ---- Row Level Security: only the two participants can see / write ----------
alter table public.conversations enable row level security;
alter table public.messages enable row level security;

drop policy if exists "conv participants read" on public.conversations;
create policy "conv participants read" on public.conversations
  for select using (auth.uid() = buyer_id or auth.uid() = seller_id);

drop policy if exists "conv buyer insert" on public.conversations;
create policy "conv buyer insert" on public.conversations
  for insert with check (auth.uid() = buyer_id);

drop policy if exists "conv participants update" on public.conversations;
create policy "conv participants update" on public.conversations
  for update using (auth.uid() = buyer_id or auth.uid() = seller_id);

drop policy if exists "msg participants read" on public.messages;
create policy "msg participants read" on public.messages
  for select using (
    exists (
      select 1 from public.conversations c
      where c.id = conversation_id and (c.buyer_id = auth.uid() or c.seller_id = auth.uid())
    )
  );

drop policy if exists "msg participant insert" on public.messages;
create policy "msg participant insert" on public.messages
  for insert with check (
    sender_id = auth.uid() and exists (
      select 1 from public.conversations c
      where c.id = conversation_id and (c.buyer_id = auth.uid() or c.seller_id = auth.uid())
    )
  );

-- ---- Realtime: stream new messages to the open conversation ----------------
do $$
begin
  alter publication supabase_realtime add table public.messages;
exception
  when duplicate_object then null;
  when undefined_object then null;
end $$;
