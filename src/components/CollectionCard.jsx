function CollectionCard({
  entry,
  index,
  labels,
  onEdit,
  onDelete,
  onCycleStatus,
}) {
  const statusClassName = entry.status.toLowerCase().replace(/\s+/g, '-')

  return (
    <article className="collection-card" style={{ '--card-index': index }}>
      <div className="collection-card__top">
        <div className="collection-card__topline">
          <div>
            <h3 className="collection-card__title">{entry.title}</h3>
            <p className="collection-card__creator">
              {labels.creator}: {entry.creator}
            </p>
          </div>

          <div className="collection-card__icon-actions">
            <button
              className="icon-action-button"
              type="button"
              onClick={() => onEdit(entry.id)}
              aria-label={labels.editAriaLabel}
              title={labels.editAriaLabel}
            >
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M4 13.75V16h2.25L14.7 7.55l-2.25-2.25L4 13.75Z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.8 5.95L14.05 8.2"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <button
              className="icon-action-button icon-action-button--danger"
              type="button"
              onClick={() => onDelete(entry.id)}
              aria-label={labels.deleteAriaLabel}
              title={labels.deleteAriaLabel}
            >
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M5.5 6.5L6.2 15.1A1.2 1.2 0 0 0 7.4 16.2h5.2a1.2 1.2 0 0 0 1.2-1.1l.7-8.6"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.5 5.5h11"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
                <path
                  d="M8 5.5V4.6c0-.44.36-.8.8-.8h2.4c.44 0 .8.36.8.8v.9"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
                <path
                  d="M8.4 8.5v4.6M11.6 8.5v4.6"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="collection-card__badges">
          <span className="pill pill--category">
            {labels.categoryLabels[entry.category]}
          </span>
          <span className={`pill pill--status pill--${statusClassName}`}>
            {labels.statusLabels[entry.status]}
          </span>
        </div>
      </div>

      <dl className="collection-card__meta">
        <div>
          <dt>{labels.category}</dt>
          <dd>{labels.categoryLabels[entry.category]}</dd>
        </div>
        <div className="collection-card__notes">
          <dt>{labels.notes}</dt>
          <dd>{entry.notes || labels.emptyNotes}</dd>
        </div>
      </dl>

      <div className="collection-card__actions">
        <button
          className="secondary-button"
          type="button"
          onClick={() => onCycleStatus(entry.id)}
        >
          {labels.changeStatus}
        </button>

        {entry.link ? (
          <a
            className="secondary-button secondary-button--link"
            href={entry.link}
            target="_blank"
            rel="noreferrer"
          >
            <span className="button-icon-inline" aria-hidden="true">
              <svg viewBox="0 0 20 20" fill="none">
                <path
                  d="M8 5H5.6A1.6 1.6 0 0 0 4 6.6v7.8A1.6 1.6 0 0 0 5.6 16h7.8a1.6 1.6 0 0 0 1.6-1.6V12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M10.5 4H16v5.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 4L9 11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            {labels.openLink}
          </a>
        ) : null}
      </div>
    </article>
  )
}

export default CollectionCard
