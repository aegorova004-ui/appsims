import LanguageSwitch from './LanguageSwitch.jsx'
import useLanguage from '../hooks/useLanguage.js'

function HeroPreview({ content }) {
  const stats = content.previewCard.stats.slice(0, 3)

  return (
    <div className="landing-hero-preview" aria-hidden="true">
      <div className="landing-hero-preview__glow landing-hero-preview__glow--lavender" />
      <div className="landing-hero-preview__glow landing-hero-preview__glow--sage" />
      <div className="landing-hero-preview__accent landing-hero-preview__accent--top" />
      <div className="landing-hero-preview__accent landing-hero-preview__accent--bottom" />
      <div className="landing-hero-preview__plumbob landing-hero-preview__plumbob--right" />
      <div className="landing-hero-preview__plumbob landing-hero-preview__plumbob--left" />
      <div className="landing-hero-preview__bunny" />

      <div className="landing-hero-preview__frame">
        <div className="landing-hero-preview__topbar">
          <div className="landing-hero-preview__window">
            <span />
            <span />
            <span />
          </div>
          <div className="landing-hero-preview__mini-switch">
            <span>English</span>
            <span className="is-active">Русский</span>
          </div>
        </div>

        <div className="landing-hero-preview__hero-card">
          <div className="landing-hero-preview__badge-row">
            <span className="landing-hero-preview__badge">
              {content.brand}
            </span>
          </div>
          <h3>Sims CC &amp; Mods Wishlist</h3>
          <p>{content.hero.description}</p>
        </div>

        <div className="landing-hero-preview__stats">
          {stats.map((stat, index) => (
            <article
              key={stat.label}
              className={`landing-hero-preview__stat landing-hero-preview__stat--${index}`}
            >
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </article>
          ))}
          <article className="landing-hero-preview__stat landing-hero-preview__stat--3">
            <span>{content.previewCard.sampleStatus}</span>
            <strong>1</strong>
          </article>
        </div>

        <div className="landing-hero-preview__content">
          <section className="landing-hero-preview__form-card">
            <p className="landing-hero-preview__section-label">
              {content.features.items[0]?.title}
            </p>
            <h4>{content.previewCard.sampleTitle}</h4>
            <div className="landing-hero-preview__field-list">
              <span />
              <span />
              <span />
              <span />
              <span className="is-wide" />
            </div>
            <button type="button" className="landing-hero-preview__primary">
              {content.hero.primaryCta}
            </button>
          </section>

          <section className="landing-hero-preview__collection-card">
            <p className="landing-hero-preview__section-label">
              {content.productPreview.eyebrow}
            </p>
            <h4>{content.previewCard.frameTitle}</h4>

            <div className="landing-hero-preview__toolbar">
              <span className="landing-hero-preview__search" />
              <span className="landing-hero-preview__filter" />
              <span className="landing-hero-preview__filter" />
            </div>

            <div className="landing-hero-preview__entry-grid">
              <article className="landing-hero-preview__entry">
                <h5>{content.previewCard.sampleTitle}</h5>
                <div className="landing-hero-preview__pill-row">
                  <span className="pill pill--category">
                    {content.previewCard.sampleCategory}
                  </span>
                  <span className="pill pill--status pill--update-needed">
                    {content.previewCard.sampleStatus}
                  </span>
                </div>
                <p>
                  <strong>{content.previewCard.creatorLabel}:</strong>{' '}
                  {content.previewCard.sampleCreator}
                </p>
              </article>

              <article className="landing-hero-preview__entry landing-hero-preview__entry--soft">
                <h5>{content.story.cards[0]?.title}</h5>
                <div className="landing-hero-preview__pill-row">
                  <span className="pill pill--category">
                    {content.features.items[3]?.title}
                  </span>
                </div>
                <p>{content.story.cards[1]?.text}</p>
              </article>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

function LandingHero({ content, onSignIn, onSignUp }) {
  const { language, toggleLanguage } = useLanguage()

  return (
    <section className="landing-hero landing-hero--art-directed">
      <div className="landing-hero__atmosphere">
        <span className="landing-hero__mist landing-hero__mist--left" />
        <span className="landing-hero__mist landing-hero__mist--center" />
        <span className="landing-hero__mist landing-hero__mist--right" />
      </div>

      <div className="landing-hero__topbar">
        <div className="landing-hero__brand-block">
          <span className="landing-hero__brand">{content.brand}</span>
        </div>

        <LanguageSwitch
          currentLanguage={language}
          onToggle={toggleLanguage}
          labels={content.languageSwitch}
        />
      </div>

      <div className="landing-hero__grid landing-hero__grid--showcase">
        <div className="landing-hero__copy landing-hero__copy--showcase">
          <div className="landing-hero__heading">
            <p className="landing-hero__eyebrow landing-hero__eyebrow--pill">
              {content.hero.eyebrow}
            </p>
            <h1>
              {content.hero.titleLines.map((line) => (
                <span key={line} className="landing-hero__title-line">
                  {line}
                </span>
              ))}
            </h1>
            <p className="landing-hero__supporting-text">
              {content.hero.description}
            </p>
          </div>

          <div className="landing-hero__actions landing-hero__actions--showcase">
            <button className="primary-button" type="button" onClick={onSignUp}>
              {content.hero.primaryCta}
            </button>
            <button
              className="secondary-button secondary-button--soft"
              type="button"
              onClick={onSignIn}
            >
              {content.hero.secondaryCta}
            </button>
          </div>
        </div>

        <HeroPreview content={content} />
      </div>
    </section>
  )
}

export default LandingHero
