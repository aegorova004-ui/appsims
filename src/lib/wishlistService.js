import {
  cycleStatus,
  normalizeEntry,
  resolveCanonicalCreatorName,
} from './wishlist.js'
import { creatorsService } from './creatorsService.js'
import { wishlistRepository } from './wishlistRepository.js'

export const wishlistService = {
  getEntries,
  saveEntries,
  createEntry,
  updateEntry,
  deleteEntry,
  restoreEntry,
  cycleEntryStatus,
}

async function getEntries(scope = {}) {
  return wishlistRepository.loadEntries(scope)
}

async function saveEntries(entries) {
  return entries
}

async function createEntry(formData, options = {}) {
  const creatorOptions = options.creatorOptions ?? []
  const scope = options.scope ?? {}
  const canonicalCreatorName = resolveCanonicalCreatorName(
    formData.creator,
    creatorOptions,
  )
  const creator = await creatorsService.ensureCreator(canonicalCreatorName, scope)

  const nextEntry = normalizeEntry({
    ...formData,
    creator: canonicalCreatorName,
  })

  return wishlistRepository.createEntry(nextEntry, {
    ...scope,
    creator,
  })
}

async function updateEntry(entryId, formData, options = {}) {
  const creatorOptions = options.creatorOptions ?? []
  const scope = options.scope ?? {}
  const canonicalCreatorName = resolveCanonicalCreatorName(
    formData.creator,
    creatorOptions,
  )
  const creator = await creatorsService.ensureCreator(canonicalCreatorName, scope)

  return wishlistRepository.updateEntry(
    entryId,
    {
      title: formData.title.trim(),
      creator: canonicalCreatorName,
      category: formData.category,
      status: formData.status,
      link: formData.link.trim(),
      notes: formData.notes.trim(),
    },
    {
      ...scope,
      creator,
    },
  )
}

async function deleteEntry(entryId, scope = {}) {
  await wishlistRepository.deleteEntry(entryId, scope)
  return entryId
}

async function restoreEntry(entry, scope = {}) {
  const creator = await creatorsService.ensureCreator(entry.creator, scope)

  return wishlistRepository.restoreEntry(entry, {
    ...scope,
    creator,
  })
}

async function cycleEntryStatus(entryId, entries, statuses, scope = {}) {
  const currentEntry = entries.find((entry) => entry.id === entryId)
  const nextStatus = cycleStatus(currentEntry?.status, statuses)

  return updateEntry(
    entryId,
    {
      status: nextStatus,
    },
    scope,
  )
}
