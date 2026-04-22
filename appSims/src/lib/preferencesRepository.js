import { STORAGE_KEYS } from '../data/constants.js'

export const preferencesRepository = {
  loadLanguage,
  saveLanguage,
}

function loadLanguage() {
  const rawLanguage = localStorage.getItem(STORAGE_KEYS.language)
  return rawLanguage === 'ru' ? 'ru' : 'en'
}

function saveLanguage(language) {
  localStorage.setItem(STORAGE_KEYS.language, language)
}
