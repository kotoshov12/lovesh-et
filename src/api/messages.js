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

/** All conversations the current user takes part in, newest activity first. */
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
  return data
}

export async function fetchConversation(id) {
  const { data, error } = await supabase
    .from('conversations')
    .select('*, product:products(id,name,image)')
    .eq('id', id)
    .maybeSingle()
  if (error) throw error
  return data
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
