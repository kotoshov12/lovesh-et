import { supabase } from '../lib/supabase.js'

/** Email + password sign up. `fullName` is stored in user metadata. */
export function signUpWithEmail({ email, password, fullName }) {
  return supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
  })
}

/** Email + password sign in. */
export function signInWithEmail({ email, password }) {
  return supabase.auth.signInWithPassword({ email, password })
}

/** Redirect-based Google OAuth. Returns to the app origin after auth. */
export function signInWithGoogle() {
  return supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: window.location.origin },
  })
}

export function signOut() {
  return supabase.auth.signOut()
}

/** Update the signed-in user's profile (auth metadata + public profiles row). */
export async function updateProfile({ fullName, avatarUrl, coverUrl, bio, location }) {
  const res = await supabase.auth.updateUser({
    data: { full_name: fullName, avatar_url: avatarUrl, cover_url: coverUrl, bio, location },
  })
  // Mirror to the public profiles table so others see the name/photo.
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (user) {
    await supabase.from('profiles').upsert({
      id: user.id,
      full_name: fullName,
      avatar_url: avatarUrl,
      cover_url: coverUrl,
      bio,
      location,
      updated_at: new Date().toISOString(),
    })
  }
  return res
}
