import { supabase } from '../lib/supabase.js'

/** Create an order for the current user from cart items. */
export async function createOrder({ items, total, paymentMethod }) {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error('not authenticated')

  const slim = items.map((i) => ({ id: i.id, name: i.name, price: i.price, image: i.image }))
  const { data, error } = await supabase
    .from('orders')
    .insert({ buyer_id: user.id, items: slim, total, payment_method: paymentMethod })
    .select('*')
    .single()
  if (error) throw error
  return data
}

/** The current user's orders, newest first. */
export async function fetchMyOrders() {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return []
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('buyer_id', user.id)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}
