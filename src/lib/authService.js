import { isSupabaseConfigured, supabase } from './supabaseClient.js'

export const authService = {
  isConfigured,
  getSession,
  onAuthStateChange,
  signIn,
  signUp,
  resetPassword,
  updatePassword,
  signOut,
}

function isConfigured() {
  return isSupabaseConfigured
}

async function getSession() {
  if (!supabase) {
    return { data: { session: null }, error: null }
  }

  return supabase.auth.getSession()
}

function onAuthStateChange(callback) {
  if (!supabase) {
    return {
      data: {
        subscription: {
          unsubscribe() {},
        },
      },
    }
  }

  return supabase.auth.onAuthStateChange(callback)
}

async function signIn({ email, password }) {
  if (!supabase) {
    return buildConfigError()
  }

  return supabase.auth.signInWithPassword({ email, password })
}

async function signUp({ email, password }) {
  if (!supabase) {
    return buildConfigError()
  }

  return supabase.auth.signUp({ email, password })
}

async function resetPassword({ email }) {
  if (!supabase) {
    return buildConfigError()
  }

  const redirectTo = `${window.location.origin}${window.location.pathname}`

  return supabase.auth.resetPasswordForEmail(email, {
    redirectTo,
  })
}

async function updatePassword({ password }) {
  if (!supabase) {
    return buildConfigError()
  }

  return supabase.auth.updateUser({
    password,
  })
}

async function signOut() {
  if (!supabase) {
    return buildConfigError()
  }

  return supabase.auth.signOut()
}

function buildConfigError() {
  return {
    data: null,
    error: new Error('Supabase is not configured.'),
  }
}
