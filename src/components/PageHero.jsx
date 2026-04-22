import { useState } from 'react'
import LanguageSwitch from './LanguageSwitch.jsx'

function PageHero({ labels, currentLanguage, onToggleLanguage, accountSlot = null }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const menuLabel = currentLanguage === 'ru' ? 'Меню' : 'Menu'
  const assetVersion = '20260422-2314'
  const assetPath = (fileName) => `/assets/redesign/${fileName}?v=${assetVersion}`

  function handleLanguageToggle() {
    onToggleLanguage()
    setIsMobileMenuOpen(false)
  }

  return (
    <section className="hero-card">
      <div className="hero-card__decor" aria-hidden="true">
        <img
          className="hero-card__illustration"
          src={assetPath('hero-illustration.png')}
          alt=""
        />
        <img
          className="hero-card__accent hero-card__accent--sparkle"
          src={assetPath('accent-sparkle.png')}
          alt=""
        />
      </div>

      <div className="hero-card__topline">
        <span className="hero-card__badge">
          <span className="hero-card__badge-icon" aria-hidden="true">
            <img src={assetPath('accent-sparkle.png')} alt="" />
          </span>
          {labels.badge}
        </span>
        <div className="hero-card__controls">
          {accountSlot}
          <LanguageSwitch
            currentLanguage={currentLanguage}
            onToggle={onToggleLanguage}
            labels={labels.languageSwitch}
          />
        </div>

        <div className="hero-card__mobile-menu">
          <button
            className="hero-card__menu-button"
            type="button"
            aria-label={menuLabel}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
          >
            <span />
            <span />
            <span />
          </button>

          {isMobileMenuOpen ? (
            <div className="hero-card__menu-panel">
              {accountSlot}
              <LanguageSwitch
                currentLanguage={currentLanguage}
                onToggle={handleLanguageToggle}
                labels={labels.languageSwitch}
              />
            </div>
          ) : null}
        </div>
      </div>

      <div className="hero-card__content">
        <div className="hero-card__copy">
          <h1>{labels.title}</h1>
          <p>{labels.description}</p>
        </div>
      </div>
    </section>
  )
}

export default PageHero
