import { supabase } from '../lib/supabase.js'

/** Create a notification for a recipient. Best-effort (never throws). */
export async function createNotification({ userId, type, body, link }) {
  if (!userId) return
  try {
    await supabase.from('notifications').insert({ user_id: userId, type, body, link })
  } catch (err) {
    console.warn('[notifications] insert failed', err)
  }
}

export async function fetchNotifications() {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return []
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(30)
  if (error) throw error
  return data
}

export async function fetchUnreadCount() {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return 0
  const { count, error } = await supabase
    .from('notifications')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('is_read', false)
  if (error) return 0
  return count || 0
}

export async function markAllRead() {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return
  await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('user_id', user.id)
    .eq('is_read', false)
}

export function subscribeToNotifications(userId, onInsert) {
  const channel = supabase
    .channel(`notif:${userId}`)
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'notifications', filter: `user_id=eq.${userId}` },
      (payload) => onInsert(payload.new)
    )
    .subscribe()
  return () => supabase.removeChannel(channel)
}
