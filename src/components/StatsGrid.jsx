function StatsGrid({ stats, labels, activeStatus, onStatClick }) {
  const assetVersion = '20260422-2314'
  const assetPath = (fileName) => `/assets/redesign/${fileName}?v=${assetVersion}`
  const items = [
    {
      key: 'total',
      label: labels.total,
      tone: 'peach',
      status: 'all',
      icon: assetPath('icon-total.png'),
    },
    {
      key: 'wishlist',
      label: labels.wishlist,
      tone: 'lavender',
      status: 'Wishlist',
      icon: assetPath('icon-wishlist.png'),
    },
    {
      key: 'installed',
      label: labels.installed,
      tone: 'sage',
      status: 'Installed',
      icon: assetPath('icon-installed.png'),
    },
    {
      key: 'broken',
      label: labels.broken,
      tone: 'rose',
      status: 'Broken',
      icon: assetPath('icon-broken.png'),
    },
  ]

  return (
    <section className="stats-grid" aria-label={labels.sectionLabel}>
      {items.map((item) => (
        <button
          key={item.key}
          type="button"
          className={`stat-card stat-card--${item.tone} ${
            (item.status === 'all' && activeStatus === 'all') ||
            item.status === activeStatus
              ? 'is-active'
              : ''
          }`}
          onClick={() => onStatClick(item.status)}
          aria-pressed={
            (item.status === 'all' && activeStatus === 'all') ||
            item.status === activeStatus
          }
        >
          <span className="stat-card__icon" aria-hidden="true">
            <img src={item.icon} alt="" />
          </span>
          <span className="stat-card__content">
            <p className="stat-card__label">{item.label}</p>
            <strong className="stat-card__value">{stats[item.key]}</strong>
          </span>
          <span className="stat-card__sparkle" aria-hidden="true">
            <img src={assetPath('accent-sparkle.png')} alt="" />
          </span>
        </button>
      ))}
    </section>
  )
}

export default StatsGrid
