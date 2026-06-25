import { supabase } from '../lib/supabase.js'

// A follow target is either a sellers-table seller ({ sellerId }) or a user ({ userId }).
function target({ sellerId, userId }) {
  return sellerId
    ? { col: 'seller_id', val: sellerId }
    : { col: 'followed_user_id', val: userId }
}

export async function follow(t) {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error('not authenticated')
  const { col, val } = target(t)
  const { error } = await supabase.from('follows').insert({ follower_id: user.id, [col]: val })
  if (error) throw error
}

export async function unfollow(t) {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error('not authenticated')
  const { col, val } = target(t)
  const { error } = await supabase
    .from('follows')
    .delete()
    .eq('follower_id', user.id)
    .eq(col, val)
  if (error) throw error
}

export async function isFollowing(t) {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return false
  const { col, val } = target(t)
  const { data } = await supabase
    .from('follows')
    .select('id')
    .eq('follower_id', user.id)
    .eq(col, val)
    .maybeSingle()
  return Boolean(data)
}

export async function countFollowers(t) {
  const { col, val } = target(t)
  const { count, error } = await supabase
    .from('follows')
    .select('id', { count: 'exact', head: true })
    .eq(col, val)
  if (error) return 0
  return count || 0
}

/** Everything the current user follows — sellers and users — for the profile. */
export async function fetchMyFollows() {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return []

  const { data, error } = await supabase
    .from('follows')
    .select('seller_id, followed_user_id, seller:sellers(*)')
    .eq('follower_id', user.id)
  if (error) throw error

  const sellers = data
    .filter((r) => r.seller)
    .map((r) => ({ type: 'seller', id: r.seller.id, name: r.seller.name, avatar: r.seller.avatar }))

  const userIds = data.filter((r) => r.followed_user_id).map((r) => r.followed_user_id)
  const profiles = {}
  if (userIds.length) {
    const { data: profs } = await supabase
      .from('profiles')
      .select('id,full_name,avatar_url')
      .in('id', userIds)
    profs?.forEach((p) => (profiles[p.id] = p))
  }
  const users = userIds.map((id) => ({
    type: 'user',
    id,
    name: profiles[id]?.full_name || 'משתמש',
    avatar: profiles[id]?.avatar_url || null,
  }))

  return [...sellers, ...users]
}
