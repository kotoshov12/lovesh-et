import { supabase } from '../lib/supabase.js'

export async function followSeller(sellerId) {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error('not authenticated')
  const { error } = await supabase
    .from('follows')
    .insert({ follower_id: user.id, seller_id: sellerId })
  if (error) throw error
}

export async function unfollowSeller(sellerId) {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error('not authenticated')
  const { error } = await supabase
    .from('follows')
    .delete()
    .eq('follower_id', user.id)
    .eq('seller_id', sellerId)
  if (error) throw error
}

export async function isFollowing(sellerId) {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return false
  const { data, error } = await supabase
    .from('follows')
    .select('id')
    .eq('follower_id', user.id)
    .eq('seller_id', sellerId)
    .maybeSingle()
  if (error) return false
  return Boolean(data)
}

export async function countFollowers(sellerId) {
  const { count, error } = await supabase
    .from('follows')
    .select('id', { count: 'exact', head: true })
    .eq('seller_id', sellerId)
  if (error) return 0
  return count || 0
}

/** Sellers the current user follows (with seller info). */
export async function fetchMyFollows() {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return []
  const { data, error } = await supabase
    .from('follows')
    .select('seller:sellers(*)')
    .eq('follower_id', user.id)
  if (error) throw error
  return data.map((r) => r.seller).filter(Boolean)
}
