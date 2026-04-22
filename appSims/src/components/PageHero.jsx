import LanguageSwitch from './LanguageSwitch.jsx'

function PageHero({ labels, currentLanguage, onToggleLanguage }) {
  return (
    <section className="hero-card">
      <div className="hero-card__topline">
        <span className="hero-card__badge">
          <span className="hero-card__badge-icon" aria-hidden="true">
            ✦
          </span>
          {labels.badge}
        </span>
        <LanguageSwitch
          currentLanguage={currentLanguage}
          onToggle={onToggleLanguage}
          labels={labels.languageSwitch}
        />
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
