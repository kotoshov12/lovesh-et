import { supabase } from '../lib/supabase.js'

/** All reviews for a seller, newest first. */
export async function fetchReviews(sellerId) {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('seller_id', sellerId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

/** Create or update the current user's review for a seller. */
export async function submitReview({ sellerId, rating, body }) {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error('not authenticated')

  const { data, error } = await supabase
    .from('reviews')
    .upsert(
      { seller_id: sellerId, author_id: user.id, rating, body },
      { onConflict: 'seller_id,author_id' }
    )
    .select('*')
    .single()
  if (error) throw error
  return data
}

export function averageRating(reviews) {
  if (!reviews?.length) return 0
  return reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
}
