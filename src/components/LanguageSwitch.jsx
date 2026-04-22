function LanguageSwitch({
  currentLanguage,
  onToggle,
  labels,
  compact = false,
}) {
  const englishLabel = compact ? 'EN' : 'English'
  const russianLabel = compact ? 'RU' : 'Русский'

  return (
    <button
      className={
        compact ? 'language-switch language-switch--compact' : 'language-switch'
      }
      type="button"
      onClick={onToggle}
      aria-label={labels.ariaLabel}
    >
      <span
        className={
          currentLanguage === 'en'
            ? 'language-switch__option is-active'
            : 'language-switch__option'
        }
      >
        {englishLabel}
      </span>
      <span
        className={
          currentLanguage === 'ru'
            ? 'language-switch__option is-active'
            : 'language-switch__option'
        }
      >
        {russianLabel}
      </span>
    </button>
  )
}

export default LanguageSwitch
