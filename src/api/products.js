import { supabase, STORAGE_BUCKET } from '../lib/supabase.js'

/** Format a whole-shekel integer as a display string, e.g. 45 -> "₪45". */
export function formatPrice(value) {
  return value == null ? '' : `₪${value}`
}

/** Map a raw DB row into the shape the UI components expect. */
function mapProduct(row) {
  if (!row) return null
  return {
    id: row.id,
    name: row.name,
    image: row.image,
    gallery: row.gallery?.length ? row.gallery : row.image ? [row.image] : [],
    price: formatPrice(row.price),
    original: row.original_price != null ? formatPrice(row.original_price) : undefined,
    badge: row.badge_text ? { text: row.badge_text, variant: row.badge_variant } : undefined,
    distance: row.distance,
    caption: row.caption,
    category: row.category,
    brand: row.brand,
    size: row.size,
    condition: row.condition,
    eyebrow: row.eyebrow,
    description: row.description,
    seller: row.seller
      ? {
          name: row.seller.name,
          avatar: row.seller.avatar,
          location: row.seller.location,
          distance: row.seller.distance,
        }
      : null,
  }
}

const SELECT_WITH_SELLER = '*, seller:sellers(*)'

/** All products, newest first. */
export async function fetchProducts() {
  const { data, error } = await supabase
    .from('products')
    .select(SELECT_WITH_SELLER)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data.map(mapProduct)
}

/** A single product by id (null if not found). */
export async function fetchProduct(id) {
  const { data, error } = await supabase
    .from('products')
    .select(SELECT_WITH_SELLER)
    .eq('id', id)
    .maybeSingle()
  if (error) throw error
  return mapProduct(data)
}

/** Products created by a given user (their own listings). */
export async function fetchMyProducts(userId) {
  if (!userId) return []
  const { data, error } = await supabase
    .from('products')
    .select(SELECT_WITH_SELLER)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data.map(mapProduct)
}

/** A few other products to show as "similar items". */
export async function fetchSimilar(excludeId, limit = 4) {
  const { data, error } = await supabase
    .from('products')
    .select(SELECT_WITH_SELLER)
    .neq('id', excludeId)
    .order('created_at', { ascending: false })
    .limit(limit)
  if (error) throw error
  return data.map(mapProduct)
}

/**
 * Upload an image file to Storage and return its public URL.
 * Names are made unique with a random prefix to avoid collisions.
 */
export async function uploadProductImage(file) {
  const safeName = file.name.replace(/[^\w.\-]/g, '_')
  const path = `${crypto.randomUUID()}-${safeName}`
  const { error } = await supabase.storage.from(STORAGE_BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  })
  if (error) throw error
  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path)
  return data.publicUrl
}

/**
 * Insert a new product. `input` uses UI-friendly fields; we translate to columns.
 * Returns the created product (mapped).
 */
export async function createProduct(input) {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const row = {
    user_id: user?.id ?? null,
    name: input.name,
    category: input.category || null,
    price: input.price ? Number(input.price) : 0,
    original_price: input.originalPrice ? Number(input.originalPrice) : null,
    brand: input.brand || null,
    size: input.size || null,
    condition: input.condition || null,
    caption: input.caption || null,
    eyebrow: input.eyebrow || null,
    description: input.description || null,
    distance: input.distance || null,
    badge_text: input.badge?.text || null,
    badge_variant: input.badge?.variant || null,
    image: input.image || (input.gallery && input.gallery[0]) || null,
    gallery: input.gallery?.length ? input.gallery : input.image ? [input.image] : [],
  }
  const { data, error } = await supabase
    .from('products')
    .insert(row)
    .select(SELECT_WITH_SELLER)
    .single()
  if (error) throw error
  return mapProduct(data)
}
