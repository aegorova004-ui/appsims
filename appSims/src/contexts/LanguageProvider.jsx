import { useEffect, useMemo, useState } from 'react'
import { LanguageContext } from './languageContext.js'
import { preferencesRepository } from '../lib/preferencesRepository.js'

function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() =>
    preferencesRepository.loadLanguage(),
  )

  useEffect(() => {
    preferencesRepository.saveLanguage(language)
  }, [language])

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () =>
        setLanguage((currentLanguage) =>
          currentLanguage === 'en' ? 'ru' : 'en',
        ),
    }),
    [language],
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export default LanguageProvider
