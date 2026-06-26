import { supabase } from '../lib/supabase.js'

/** Buyer sends a price offer for a product (kept inside the conversation). */
export async function submitOffer({ productId, productName, sellerId, amount, conversationId }) {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error('not authenticated')

  const { data, error } = await supabase
    .from('offers')
    .insert({
      product_id: productId,
      product_name: productName,
      buyer_id: user.id,
      seller_id: sellerId,
      amount,
      conversation_id: conversationId,
    })
    .select('*')
    .single()
  if (error) throw error
  return data
}

/** The latest price offer attached to a conversation (or null). */
export async function fetchConversationOffer(conversationId) {
  if (!conversationId) return null
  const { data, error } = await supabase
    .from('offers')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()
  if (error) throw error
  return data
}

/** Pending offers a seller has received (with product name). */
export async function fetchIncomingOffers() {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return []
  const { data, error } = await supabase
    .from('offers')
    .select('*, product:products(id,name)')
    .eq('seller_id', user.id)
    .eq('status', 'pending')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

/** Seller accepts/rejects an offer. Returns the updated row. */
export async function respondOffer(id, status) {
  const { data, error } = await supabase
    .from('offers')
    .update({ status })
    .eq('id', id)
    .select('*, product:products(id,name)')
    .single()
  if (error) throw error
  return data
}
