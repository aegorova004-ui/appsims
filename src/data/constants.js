export const TYPES = ['CC', 'Mod']

export const CC_CATEGORIES = [
  'Hair',
  'Clothes',
  'Makeup',
  'Accessories',
  'Furniture',
  'Build/Buy',
  'Default Replacement',
  'Presets',
  'Loading Screen',
  'Other',
]

export const MOD_CATEGORIES = [
  'Gameplay',
  'Script',
  'Tuning',
  'UI',
  'Overrides',
  'Utility',
  'Other',
]

export const LEGACY_CATEGORY_MIGRATIONS = {
  'Script Mod': {
    type: 'Mod',
    category: 'Script',
  },
  'Gameplay Mod': {
    type: 'Mod',
    category: 'Gameplay',
  },
}

export const CATEGORIES_BY_TYPE = {
  CC: CC_CATEGORIES,
  Mod: MOD_CATEGORIES,
}

export const CATEGORIES = Array.from(new Set([...CC_CATEGORIES, ...MOD_CATEGORIES]))

export const STATUSES = [
  'Wishlist',
  'Installed',
  'Update Needed',
  'Conflicting',
  'Broken',
]

export const STORAGE_KEYS = {
  entries: 'appsims-wishlist-entries',
  language: 'appsims-language',
}
