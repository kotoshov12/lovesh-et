import { supabase } from '../lib/supabase.js'

// A review target is a sellers-table seller ({ sellerId }) or a user ({ userId }).
function target({ sellerId, userId }) {
  return sellerId
    ? { col: 'seller_id', val: sellerId, onConflict: 'seller_id,author_id' }
    : { col: 'reviewed_user_id', val: userId, onConflict: 'reviewed_user_id,author_id' }
}

/** Reviews for a seller or user, newest first. */
export async function fetchReviews(t) {
  const { col, val } = target(t)
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq(col, val)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

/** Create or update the current user's review for a seller or user. */
export async function submitReview({ sellerId, userId, rating, body }) {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error('not authenticated')

  const { col, val, onConflict } = target({ sellerId, userId })
  const { data, error } = await supabase
    .from('reviews')
    .upsert({ [col]: val, author_id: user.id, rating, body }, { onConflict })
    .select('*')
    .single()
  if (error) throw error
  return data
}

export function averageRating(reviews) {
  if (!reviews?.length) return 0
  return reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
}
