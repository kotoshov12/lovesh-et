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

/** Update the signed-in user's display name (stored in user metadata). */
export function updateFullName(fullName) {
  return supabase.auth.updateUser({ data: { full_name: fullName } })
}
