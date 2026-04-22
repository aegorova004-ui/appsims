export function normalizeEntry(formData) {
  return {
    title: formData.title.trim(),
    creator: normalizeCreatorName(formData.creator),
    category: formData.category,
    status: formData.status,
    link: formData.link.trim(),
    notes: formData.notes.trim(),
  }
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
