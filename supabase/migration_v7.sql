-- =============================================================================
-- Migration v7: track read state per conversation (for the messages badge).
-- Run in the Supabase SQL editor (after the earlier migrations).
-- =============================================================================

alter table public.conversations
  add column if not exists buyer_last_read  timestamptz,
  add column if not exists seller_last_read timestamptz;
