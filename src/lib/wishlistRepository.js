import { isSupabaseConfigured, supabase } from './supabaseClient.js'
import { normalizeTypeCategory } from './wishlist.js'

const TABLE_NAME = 'wishlist_entries'

export const wishlistRepository = {
  loadEntries,
  createEntry,
  updateEntry,
  deleteEntry,
  restoreEntry,
}

async function loadEntries(scope = {}) {
  const userId = requireUserId(scope)

  const nextRows = await loadEntryRows(userId)
  return nextRows.map(mapRowToEntry)
}

async function createEntry(entry, scope = {}) {
  const userId = requireUserId(scope)
  const payload = mapEntryToInsertPayload(entry, userId, scope.creator)

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert(payload)
    .select(ENTRY_SELECT_WITH_CREATOR)
    .single()

  if (!error) {
    return mapRowToEntry(data)
  }

  if (!isMissingTypeColumnError(error)) {
    throw error
  }

  const fallbackPayload = omitType(payload)
  const { data: fallbackData, error: fallbackError } = await supabase
    .from(TABLE_NAME)
    .insert(fallbackPayload)
    .select(ENTRY_SELECT_FALLBACK)
    .single()

  if (fallbackError) {
    throw fallbackError
  }

  return mapRowToEntry(fallbackData)
}

async function updateEntry(entryId, changes, scope = {}) {
  const userId = requireUserId(scope)
  const payload = mapEntryToUpdatePayload(changes, scope.creator)

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update(payload)
    .eq('id', entryId)
    .eq('user_id', userId)
    .select(ENTRY_SELECT_WITH_CREATOR)
    .single()

  if (!error) {
    return mapRowToEntry(data)
  }

  if (!isMissingTypeColumnError(error)) {
    throw error
  }

  const fallbackPayload = omitType(payload)
  const { data: fallbackData, error: fallbackError } = await supabase
    .from(TABLE_NAME)
    .update(fallbackPayload)
    .eq('id', entryId)
    .eq('user_id', userId)
    .select(ENTRY_SELECT_FALLBACK)
    .single()

  if (fallbackError) {
    throw fallbackError
  }

  return mapRowToEntry(fallbackData)
}

async function deleteEntry(entryId, scope = {}) {
  const userId = requireUserId(scope)

  const { error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq('id', entryId)
    .eq('user_id', userId)

  if (error) {
    throw error
  }
}

async function restoreEntry(entry, scope = {}) {
  return createEntry(entry, scope)
}

const ENTRY_SELECT_WITH_CREATOR =
  'id, user_id, name, creator, creator_id, type, category, status, link, notes, created_at, updated_at, creator_rel:creator_id(id, display_name, normalized_name)'

const ENTRY_SELECT_FALLBACK =
  'id, user_id, name, creator, category, status, link, notes, created_at, updated_at'

function requireUserId(scope) {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured.')
  }

  if (!scope.userId) {
    throw new Error('A signed-in user is required for wishlist operations.')
  }

  return scope.userId
}

function mapRowToEntry(row) {
  const creatorDisplayName =
    row.creator_rel?.display_name ?? row.creator ?? ''
  const typeCategory = normalizeTypeCategory(row.type, row.category)

  return {
    id: row.id,
    title: row.name ?? '',
    creator: creatorDisplayName,
    creatorId: row.creator_id ?? row.creator_rel?.id ?? null,
    type: typeCategory.type,
    category: typeCategory.category,
    status: row.status ?? 'Wishlist',
    link: row.link ?? '',
    notes: row.notes ?? '',
    createdAt: row.created_at ?? null,
    updatedAt: row.updated_at ?? null,
  }
}

function mapEntryToInsertPayload(entry, userId, creator) {
  const timestamp = new Date().toISOString()
  const typeCategory = normalizeTypeCategory(entry.type, entry.category)

  const payload = {
    user_id: userId,
    name: entry.title,
    creator: entry.creator,
    creator_id: creator?.id ?? entry.creatorId ?? null,
    type: typeCategory.type,
    category: typeCategory.category,
    status: entry.status,
    link: entry.link,
    notes: entry.notes,
    created_at: entry.createdAt ?? timestamp,
    updated_at: entry.updatedAt ?? timestamp,
  }

  if (entry.id && isPersistedEntryId(entry.id)) {
    payload.id = entry.id
  }

  return payload
}

function mapEntryToUpdatePayload(changes, creator) {
  const payload = {
    updated_at: new Date().toISOString(),
  }
  const hasTypeOrCategory =
    Object.hasOwn(changes, 'type') || Object.hasOwn(changes, 'category')
  const typeCategory = hasTypeOrCategory
    ? normalizeTypeCategory(changes.type, changes.category)
    : null

  if (Object.hasOwn(changes, 'title')) {
    payload.name = changes.title
  }

  if (Object.hasOwn(changes, 'creator')) {
    payload.creator = changes.creator
    payload.creator_id = creator?.id ?? null
  }

  if (Object.hasOwn(changes, 'category')) {
    payload.category = typeCategory.category
  }

  if (Object.hasOwn(changes, 'type')) {
    payload.type = typeCategory.type
  }

  if (Object.hasOwn(changes, 'status')) {
    payload.status = changes.status
  }

  if (Object.hasOwn(changes, 'link')) {
    payload.link = changes.link
  }

  if (Object.hasOwn(changes, 'notes')) {
    payload.notes = changes.notes
  }

  return payload
}

async function loadEntryRows(userId) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select(ENTRY_SELECT_WITH_CREATOR)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (!error) {
    return data ?? []
  }

  const { data: fallbackData, error: fallbackError } = await supabase
    .from(TABLE_NAME)
    .select(ENTRY_SELECT_FALLBACK)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (fallbackError) {
    throw fallbackError
  }

  return fallbackData ?? []
}

function isPersistedEntryId(id) {
  return typeof id === 'string' && !id.startsWith('entry-')
}

function omitType(payload) {
  const payloadWithoutType = { ...payload }
  delete payloadWithoutType.type
  return payloadWithoutType
}

function isMissingTypeColumnError(error) {
  const message = [
    error?.message,
    error?.details,
    error?.hint,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  return (
    error?.code === 'PGRST204' ||
    error?.code === '42703' ||
    message.includes('type') && message.includes('column') ||
    message.includes('schema cache') && message.includes('type')
  )
}
