import MainLayout from '../layouts/MainLayout.jsx'
import LandingHero from '../components/LandingHero.jsx'
import useLanguage from '../hooks/useLanguage.js'
import { translations } from '../data/translations.js'

function normalizeLandingContent(content) {
  const hero = content?.hero ?? {}
  const features = content?.features ?? {}
  const previewCard = content?.previewCard ?? content?.preview ?? {}
  const productPreview = content?.productPreview ?? content?.product ?? {}
  const story = content?.story ?? {}
  const cta = content?.cta ?? {}

  return {
    brand: content?.brand ?? 'Sims Wishlist',
    languageSwitch: content?.languageSwitch ?? {
      ariaLabel: 'Switch interface language',
    },
    hero: {
      eyebrow: hero.eyebrow ?? '',
      titleLines: Array.isArray(hero.titleLines)
        ? hero.titleLines
        : hero.title
          ? [hero.title]
          : [],
      description: hero.description ?? '',
      primaryCta: hero.primaryCta ?? '',
      secondaryCta: hero.secondaryCta ?? '',
    },
    features: {
      eyebrow: features.eyebrow ?? '',
      title: features.title ?? '',
      items: Array.isArray(features.items) ? features.items : [],
    },
    previewCard: {
      frameLabel: previewCard.frameLabel ?? previewCard.panelEyebrow ?? '',
      frameTitle: previewCard.frameTitle ?? previewCard.panelTitle ?? '',
      sampleCategory: previewCard.sampleCategory ?? '',
      sampleStatus: previewCard.sampleStatus ?? '',
      creatorLabel: previewCard.creatorLabel ?? '',
      sampleTitle: previewCard.sampleTitle ?? '',
      sampleCreator: previewCard.sampleCreator ?? '',
      sampleNote: previewCard.sampleNote ?? '',
      stats: Array.isArray(previewCard.stats) ? previewCard.stats : [],
    },
    productPreview: {
      eyebrow: productPreview.eyebrow ?? '',
      title: productPreview.title ?? '',
      text: productPreview.text ?? productPreview.description ?? '',
    },
    story: {
      eyebrow: story.eyebrow ?? '',
      title: story.title ?? '',
      text: story.text ?? '',
      cards: Array.isArray(story.cards)
        ? story.cards
        : Array.isArray(productPreview.points)
          ? productPreview.points.map((point) => ({
              title: point.title ?? '',
              text: point.text ?? point.description ?? '',
            }))
          : [],
    },
    cta: {
      eyebrow: cta.eyebrow ?? '',
      title: cta.title ?? '',
      text: cta.text ?? cta.description ?? '',
      primaryCta: cta.primaryCta ?? '',
      secondaryCta: cta.secondaryCta ?? '',
    },
  }
}

function LandingPage({ onSignIn, onSignUp }) {
  const { language } = useLanguage()
  const content = normalizeLandingContent(translations[language]?.landing)

  return (
    <MainLayout>
      <LandingHero
        content={content}
        onSignIn={onSignIn}
        onSignUp={onSignUp}
      />

      <section className="landing-section panel-card">
        <div className="landing-section__header">
          <p className="panel-card__eyebrow">{content.features.eyebrow}</p>
          <h2>{content.features.title}</h2>
        </div>

        <div className="landing-features-grid">
          {content.features.items.map((feature) => (
            <article key={feature.title} className="landing-feature-card">
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-section panel-card landing-section--preview">
        <div className="landing-section__header">
          <p className="panel-card__eyebrow">{content.productPreview.eyebrow}</p>
          <h2>{content.productPreview.title}</h2>
          <p className="panel-card__description">
            {content.productPreview.text}
          </p>
        </div>

        <div className="landing-preview-section__card">
          <div className="landing-preview-card" aria-hidden="true">
            <div className="landing-preview-card__window">
              <span />
              <span />
              <span />
            </div>

            <div className="landing-preview-card__body">
              <div className="landing-preview-card__header">
                <div>
                  <p className="landing-preview-card__label">
                    {content.previewCard.frameLabel}
                  </p>
                  <h3>{content.previewCard.frameTitle}</h3>
                </div>

                <div className="landing-preview-card__pills">
                  <span className="pill pill--category">
                    {content.previewCard.sampleCategory}
                  </span>
                  <span className="pill pill--status pill--update-needed">
                    {content.previewCard.sampleStatus}
                  </span>
                </div>
              </div>

              <div className="landing-preview-card__stats">
                {content.previewCard.stats.map((stat) => (
                  <article key={stat.label} className="landing-preview-card__stat">
                    <span>{stat.label}</span>
                    <strong>{stat.value}</strong>
                  </article>
                ))}
              </div>

              <article className="landing-preview-card__sample">
                <h4>{content.previewCard.sampleTitle}</h4>
                <p>
                  <strong>{content.previewCard.creatorLabel}:</strong>{' '}
                  {content.previewCard.sampleCreator}
                </p>
                <p>{content.previewCard.sampleNote}</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-section panel-card">
        <div className="landing-section__header">
          <p className="panel-card__eyebrow">{content.story.eyebrow}</p>
          <h2>{content.story.title}</h2>
          <p className="panel-card__description">{content.story.text}</p>
        </div>

        <div className="landing-story-grid">
          {content.story.cards.map((card) => (
            <article key={card.title} className="landing-story-card">
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-cta panel-card">
        <div className="landing-cta__copy">
          <p className="panel-card__eyebrow">{content.cta.eyebrow}</p>
          <h2>{content.cta.title}</h2>
          <p className="panel-card__description">{content.cta.text}</p>
        </div>

        <div className="landing-cta__actions">
          <button className="primary-button" type="button" onClick={onSignUp}>
            {content.cta.primaryCta}
          </button>
          <button
            className="secondary-button secondary-button--soft"
            type="button"
            onClick={onSignIn}
          >
            {content.cta.secondaryCta}
          </button>
        </div>
      </section>
    </MainLayout>
  )
}

export default LandingPage
