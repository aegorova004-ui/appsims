import {
  CATEGORIES_BY_TYPE,
  CC_CATEGORIES,
  LEGACY_CATEGORY_MIGRATIONS,
  TYPES,
} from '../data/constants.js'

export function normalizeEntry(formData) {
  const typeCategory = normalizeTypeCategory(formData.type, formData.category)

  return {
    title: formData.title.trim(),
    creator: normalizeCreatorName(formData.creator),
    type: typeCategory.type,
    category: typeCategory.category,
    status: formData.status,
    link: formData.link.trim(),
    notes: formData.notes.trim(),
  }
}

export function normalizeTypeCategory(type, category) {
  const legacyMigration = LEGACY_CATEGORY_MIGRATIONS[category]

  if (legacyMigration) {
    return legacyMigration
  }

  const normalizedType = TYPES.includes(type) ? type : inferTypeFromCategory(category)
  const categories = getCategoriesForType(normalizedType)
  const normalizedCategory = categories.includes(category)
    ? category
    : categories[0] ?? 'Other'

  return {
    type: normalizedType,
    category: normalizedCategory,
  }
}

export function inferTypeFromCategory(category) {
  if (CATEGORIES_BY_TYPE.Mod.includes(category)) {
    return 'Mod'
  }

  return 'CC'
}

export function getCategoriesForType(type) {
  return CATEGORIES_BY_TYPE[type] ?? CC_CATEGORIES
}

export function getAllCategories() {
  return Array.from(new Set([...CATEGORIES_BY_TYPE.CC, ...CATEGORIES_BY_TYPE.Mod]))
}

export function isCategoryAllowedForType(type, category) {
  if (type === 'all') {
    return getAllCategories().includes(category)
  }

  return getCategoriesForType(type).includes(category)
}

export function matchesSearch(entry, searchQuery) {
  const normalizedQuery = normalizeSearchValue(searchQuery)

  if (!normalizedQuery) {
    return true
  }

  const normalizedTitle = normalizeSearchValue(entry.title)
  const normalizedCreator = normalizeSearchValue(entry.creator)

  return (
    normalizedTitle.includes(normalizedQuery) ||
    normalizedCreator.includes(normalizedQuery)
  )
}

export function cycleStatus(currentStatus, statuses) {
  const currentIndex = statuses.indexOf(currentStatus)
  const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % statuses.length
  return statuses[nextIndex]
}

export function sortKeysByLocalizedLabel(keys, labels, locale) {
  const collator = new Intl.Collator(locale, { sensitivity: 'base' })
  return [...keys].sort((firstKey, secondKey) =>
    collator.compare(labels[firstKey], labels[secondKey]),
  )
}

export function getCreatorOptions(entries, locale) {
  const collator = new Intl.Collator(locale, { sensitivity: 'base' })
  const creatorMap = new Map()

  entries.forEach((entry) => {
    const normalizedCreator = normalizeCreatorName(entry.creator)

    if (!normalizedCreator) {
      return
    }

    const normalizedKey = normalizeSearchValue(normalizedCreator)

    if (!creatorMap.has(normalizedKey)) {
      creatorMap.set(normalizedKey, normalizedCreator)
    }
  })

  return [...creatorMap.values()].sort((firstCreator, secondCreator) =>
    collator.compare(firstCreator, secondCreator),
  )
}

export function getCreatorSuggestions(creators, query, locale) {
  const normalizedQuery = normalizeSearchValue(query)

  if (!normalizedQuery) {
    return creators
  }

  const collator = new Intl.Collator(locale, { sensitivity: 'base' })

  return creators
    .filter((creator) =>
      normalizeSearchValue(creator).includes(normalizedQuery),
    )
    .sort((firstCreator, secondCreator) =>
      collator.compare(firstCreator, secondCreator),
    )
}

export function normalizeCreatorName(creatorName) {
  return creatorName.trim().replace(/\s+/g, ' ')
}

export function normalizeCreatorKey(creatorName) {
  return normalizeCreatorName(creatorName).toLowerCase()
}

export function getCreatorDisplayOptions(creators, locale) {
  const collator = new Intl.Collator(locale, { sensitivity: 'base' })
  const creatorMap = new Map()

  creators.forEach((creator) => {
    const displayName =
      typeof creator === 'string' ? creator : creator?.displayName ?? ''
    const normalizedKey = normalizeCreatorKey(displayName)

    if (!normalizedKey) {
      return
    }

    if (!creatorMap.has(normalizedKey)) {
      creatorMap.set(normalizedKey, normalizeCreatorName(displayName))
    }
  })

  return [...creatorMap.values()].sort((firstCreator, secondCreator) =>
    collator.compare(firstCreator, secondCreator),
  )
}

export function resolveCanonicalCreatorName(creatorName, creators) {
  const normalizedCreator = normalizeCreatorKey(creatorName)

  if (!normalizedCreator) {
    return ''
  }

  const matchedCreator = creators.find(
    (creator) => normalizeSearchValue(creator) === normalizedCreator,
  )

  return matchedCreator ?? normalizeCreatorName(creatorName)
}

function normalizeSearchValue(value) {
  return normalizeCreatorKey(value)
}
