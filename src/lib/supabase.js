import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(url && anonKey)

if (!isSupabaseConfigured) {
  // Surfaced in the console so a missing .env is easy to diagnose in dev.
  console.warn(
    '[supabase] Missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY. ' +
      'Copy .env.example to .env and fill in your project values.'
  )
}

// Fall back to a placeholder so createClient() doesn't throw at import time
// when env vars are absent — data calls then fail gracefully into error states
// instead of white-screening the whole app.
export const supabase = createClient(
  url || 'https://placeholder.supabase.co',
  anonKey || 'placeholder-anon-key'
)

export const STORAGE_BUCKET = 'product-images'
