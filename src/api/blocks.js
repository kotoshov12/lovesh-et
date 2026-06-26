import { supabase } from '../lib/supabase.js'

/** Block another user. */
export async function blockUser(userId) {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error('not authenticated')
  const { error } = await supabase
    .from('blocks')
    .insert({ blocker_id: user.id, blocked_id: userId })
  if (error && error.code !== '23505') throw error // ignore "already blocked"
}

/** Unblock a user I previously blocked. */
export async function unblockUser(userId) {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error('not authenticated')
  const { error } = await supabase
    .from('blocks')
    .delete()
    .eq('blocker_id', user.id)
    .eq('blocked_id', userId)
  if (error) throw error
}

/** Block status between me and another user: did I block them / did they block me. */
export async function getBlockStatus(otherUserId) {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user || !otherUserId) return { iBlocked: false, blockedMe: false }
  const { data, error } = await supabase
    .from('blocks')
    .select('blocker_id,blocked_id')
    .or(
      `and(blocker_id.eq.${user.id},blocked_id.eq.${otherUserId}),and(blocker_id.eq.${otherUserId},blocked_id.eq.${user.id})`
    )
  if (error) throw error
  return {
    iBlocked: data.some((b) => b.blocker_id === user.id),
    blockedMe: data.some((b) => b.blocker_id === otherUserId),
  }
}
