import { useContext } from 'react'
import { LanguageContext } from '../contexts/languageContext.js'

function useLanguage() {
  const languageContext = useContext(LanguageContext)

  if (!languageContext) {
    throw new Error('useLanguage must be used within a LanguageProvider.')
  }

  return languageContext
}

export default useLanguage
