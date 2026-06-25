import { supabase } from '../lib/supabase.js'

/** Public profile of any user (or null). */
export async function fetchProfile(id) {
  if (!id) return null
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .maybeSingle()
  if (error) throw error
  return data
}

/** Upsert the current user's public profile (mirrors auth metadata). */
export async function upsertMyProfile(fields) {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return
  await supabase
    .from('profiles')
    .upsert({ id: user.id, ...fields, updated_at: new Date().toISOString() })
}
