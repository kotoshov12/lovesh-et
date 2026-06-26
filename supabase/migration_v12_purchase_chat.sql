-- =============================================================================
-- Migration v12: tie a purchase request to the buyer⇄seller conversation, so the
-- seller can approve/decline it inside the chat. Run in the Supabase SQL editor.
-- =============================================================================

alter table public.purchase_requests
  add column if not exists conversation_id uuid references public.conversations (id) on delete set null;

create index if not exists purchases_conv_idx on public.purchase_requests (conversation_id);
