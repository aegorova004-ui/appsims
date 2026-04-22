import { isSupabaseConfigured, supabase } from './supabaseClient.js'
import { normalizeCreatorKey, normalizeCreatorName } from './wishlist.js'

const TABLE_NAME = 'creators'

export const creatorsRepository = {
  loadCreators,
  ensureCreator,
}

async function loadCreators(scope = {}) {
  const userId = requireUserId(scope)

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('id, user_id, display_name, normalized_name, created_at')
    .eq('user_id', userId)
    .order('display_name', { ascending: true })

  if (error) {
    throw error
  }

  return (data ?? []).map(mapRowToCreator)
}

async function ensureCreator(creatorName, scope = {}) {
  const userId = requireUserId(scope)
  const normalizedName = normalizeCreatorKey(creatorName)

  if (!normalizedName) {
    return null
  }

  const displayName = normalizeCreatorName(creatorName)

  const { data: existingCreator, error: existingError } = await supabase
    .from(TABLE_NAME)
    .select('id, user_id, display_name, normalized_name, created_at')
    .eq('user_id', userId)
    .eq('normalized_name', normalizedName)
    .maybeSingle()

  if (existingError) {
    throw existingError
  }

  if (existingCreator) {
    return mapRowToCreator(existingCreator)
  }

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert({
      user_id: userId,
      display_name: displayName,
      normalized_name: normalizedName,
    })
    .select('id, user_id, display_name, normalized_name, created_at')
    .single()

  if (!error) {
    return mapRowToCreator(data)
  }

  if (error.code === '23505') {
    const { data: conflictedCreator, error: conflictedError } = await supabase
      .from(TABLE_NAME)
      .select('id, user_id, display_name, normalized_name, created_at')
      .eq('user_id', userId)
      .eq('normalized_name', normalizedName)
      .maybeSingle()

    if (conflictedError) {
      throw conflictedError
    }

    return conflictedCreator ? mapRowToCreator(conflictedCreator) : null
  }

  throw error
}

function requireUserId(scope) {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured.')
  }

  if (!scope.userId) {
    throw new Error('A signed-in user is required for creator operations.')
  }

  return scope.userId
}

function mapRowToCreator(row) {
  return {
    id: row.id,
    userId: row.user_id,
    displayName: row.display_name,
    normalizedName: row.normalized_name,
    createdAt: row.created_at ?? null,
  }
}
