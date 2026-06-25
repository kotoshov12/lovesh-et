-- =============================================================================
-- Migration v6: profile cover image + remove an unwanted seed product.
-- Run in the Supabase SQL editor (after the earlier migrations).
-- =============================================================================

-- Profile background / cover image.
alter table public.profiles add column if not exists cover_url text;

-- Remove the loafers seed product (requested).
delete from public.products where name = 'נעלי לופרס קלאסיות';
