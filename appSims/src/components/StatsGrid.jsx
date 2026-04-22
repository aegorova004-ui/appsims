function StatsGrid({ stats, labels, activeStatus, onStatClick }) {
  const items = [
    { key: 'total', label: labels.total, tone: 'peach', status: 'all' },
    { key: 'wishlist', label: labels.wishlist, tone: 'lavender', status: 'Wishlist' },
    { key: 'installed', label: labels.installed, tone: 'sage', status: 'Installed' },
    { key: 'broken', label: labels.broken, tone: 'rose', status: 'Broken' },
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
          <p className="stat-card__label">{item.label}</p>
          <strong className="stat-card__value">{stats[item.key]}</strong>
        </button>
      ))}
    </section>
  )
}

export default StatsGrid
