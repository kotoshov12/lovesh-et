import { supabase } from '../lib/supabase.js'

/** Buyer asks a seller to approve a purchase (Bit / meeting) before it's final. */
export async function createPurchaseRequest({
  productId,
  productName,
  sellerId,
  amount,
  paymentMethod,
}) {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error('not authenticated')
  const { data, error } = await supabase
    .from('purchase_requests')
    .insert({
      product_id: productId,
      product_name: productName,
      buyer_id: user.id,
      seller_id: sellerId,
      amount,
      payment_method: paymentMethod,
    })
    .select('*')
    .single()
  if (error) throw error
  return data
}

/** Pending requests a seller has received. */
export async function fetchIncomingPurchases() {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return []
  const { data, error } = await supabase
    .from('purchase_requests')
    .select('*')
    .eq('seller_id', user.id)
    .eq('status', 'pending')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

/** The current user's own purchase requests (as a buyer). */
export async function fetchMyPurchases() {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return []
  const { data, error } = await supabase
    .from('purchase_requests')
    .select('*')
    .eq('buyer_id', user.id)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

/** Seller approves / declines a request. Returns the updated row. */
export async function respondPurchase(id, status) {
  const { data, error } = await supabase
    .from('purchase_requests')
    .update({ status })
    .eq('id', id)
    .select('*')
    .single()
  if (error) throw error
  return data
}
