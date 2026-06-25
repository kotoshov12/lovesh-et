import { supabase } from '../lib/supabase.js'

/** Find the buyer's existing conversation for a product, or create one. */
export async function getOrCreateConversation({ productId, sellerId }) {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error('not authenticated')

  const { data: existing } = await supabase
    .from('conversations')
    .select('*')
    .eq('product_id', productId)
    .eq('buyer_id', user.id)
    .maybeSingle()
  if (existing) return existing

  const { data, error } = await supabase
    .from('conversations')
    .insert({ product_id: productId, buyer_id: user.id, seller_id: sellerId })
    .select('*')
    .single()
  if (error) throw error
  return data
}

/** Compute the "other" participant + unread flag for the current user. */
function decorate(conv, userId, profiles = {}) {
  const otherId = conv.buyer_id === userId ? conv.seller_id : conv.buyer_id
  const myLastRead = conv.buyer_id === userId ? conv.buyer_last_read : conv.seller_last_read
  const unread = myLastRead ? new Date(conv.last_message_at) > new Date(myLastRead) : true
  return { ...conv, otherId, other: profiles[otherId] || null, unread }
}

/** All conversations the current user takes part in, newest activity first.
 *  Each is decorated with the other participant's profile + an unread flag. */
export async function fetchConversations() {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return []

  const { data, error } = await supabase
    .from('conversations')
    .select('*, product:products(id,name,image)')
    .or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`)
    .order('last_message_at', { ascending: false })
  if (error) throw error

  const otherIds = [
    ...new Set(data.map((c) => (c.buyer_id === user.id ? c.seller_id : c.buyer_id))),
  ]
  const profiles = {}
  if (otherIds.length) {
    const { data: profs } = await supabase
      .from('profiles')
      .select('id,full_name,avatar_url')
      .in('id', otherIds)
    profs?.forEach((p) => (profiles[p.id] = p))
  }
  return data.map((c) => decorate(c, user.id, profiles))
}

/** Count of conversations with unread messages (for the header badge). */
export async function fetchUnreadMessageCount() {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return 0
  const { data, error } = await supabase
    .from('conversations')
    .select('buyer_id,seller_id,last_message_at,buyer_last_read,seller_last_read')
    .or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`)
  if (error) return 0
  return data.filter((c) => decorate(c, user.id).unread).length
}

/** Mark a conversation as read for the current user. */
export async function markConversationRead(id) {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return
  const { data: conv } = await supabase
    .from('conversations')
    .select('buyer_id,seller_id')
    .eq('id', id)
    .maybeSingle()
  if (!conv) return
  const col = conv.buyer_id === user.id ? 'buyer_last_read' : 'seller_last_read'
  await supabase
    .from('conversations')
    .update({ [col]: new Date().toISOString() })
    .eq('id', id)
}

export async function fetchConversation(id) {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const { data, error } = await supabase
    .from('conversations')
    .select('*, product:products(id,name,image)')
    .eq('id', id)
    .maybeSingle()
  if (error) throw error
  if (!data) return null

  const otherId = data.buyer_id === user?.id ? data.seller_id : data.buyer_id
  let other = null
  if (otherId) {
    const { data: prof } = await supabase
      .from('profiles')
      .select('id,full_name,avatar_url')
      .eq('id', otherId)
      .maybeSingle()
    other = prof
  }
  return { ...data, otherId, other }
}

export async function fetchMessages(conversationId) {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true })
  if (error) throw error
  return data
}

export async function sendMessage({ conversationId, body }) {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error('not authenticated')

  const { data, error } = await supabase
    .from('messages')
    .insert({ conversation_id: conversationId, sender_id: user.id, body })
    .select('*')
    .single()
  if (error) throw error

  await supabase
    .from('conversations')
    .update({ last_message_at: new Date().toISOString() })
    .eq('id', conversationId)

  return data
}

/** Subscribe to new messages in a conversation. Returns an unsubscribe fn. */
export function subscribeToMessages(conversationId, onInsert) {
  const channel = supabase
    .channel(`messages:${conversationId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `conversation_id=eq.${conversationId}`,
      },
      (payload) => onInsert(payload.new)
    )
    .subscribe()
  return () => supabase.removeChannel(channel)
}
