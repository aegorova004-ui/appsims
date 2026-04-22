import CollectionToolbar from './CollectionToolbar.jsx'
import CollectionCard from './CollectionCard.jsx'
import ActiveFilterChips from './ActiveFilterChips.jsx'

function CollectionSection({
  labels,
  entries,
  searchValue,
  creatorFilterValue,
  statusFilterValue,
  categoryFilterValue,
  onSearchChange,
  onCreatorFilterChange,
  onStatusFilterChange,
  onCategoryFilterChange,
  onResetFilters,
  creators,
  categories,
  statuses,
  onEdit,
  onDelete,
  onCycleStatus,
  hasActiveFilters,
  activeFilterChips,
}) {
  const filterMotionKey = [
    searchValue,
    creatorFilterValue,
    categoryFilterValue,
    statusFilterValue,
    entries.length,
  ].join('|')

  return (
    <section className="panel-card panel-card--collection">
      <div className="panel-card__header">
        <p className="panel-card__eyebrow">{labels.eyebrow}</p>
        <h2>{labels.title}</h2>
        <p className="panel-card__description">{labels.description}</p>
        <p className="panel-card__meta-note">
          {labels.resultsLabel}: {entries.length}
        </p>
      </div>

      <CollectionToolbar
        labels={labels.toolbar}
        searchValue={searchValue}
        creatorFilterValue={creatorFilterValue}
        statusFilterValue={statusFilterValue}
        categoryFilterValue={categoryFilterValue}
        onSearchChange={onSearchChange}
        onCreatorFilterChange={onCreatorFilterChange}
        onStatusFilterChange={onStatusFilterChange}
        onCategoryFilterChange={onCategoryFilterChange}
        onResetFilters={onResetFilters}
        creators={creators}
        categories={categories}
        statuses={statuses}
        hasActiveFilters={hasActiveFilters}
      />

      <ActiveFilterChips chips={activeFilterChips} />

      {entries.length ? (
        <div key={filterMotionKey} className="collection-grid">
          {entries.map((entry, index) => (
            <CollectionCard
              key={entry.id}
              entry={entry}
              index={index}
              labels={labels.card}
              onEdit={onEdit}
              onDelete={onDelete}
              onCycleStatus={onCycleStatus}
            />
          ))}
        </div>
      ) : (
        <div key={filterMotionKey} className="empty-state">
          <div className="empty-state__content">
            <h3>{labels.emptyTitle}</h3>
            <p>{labels.empty}</p>
            <button
              className="secondary-button"
              type="button"
              onClick={onResetFilters}
            >
              {labels.toolbar.reset}
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

export default CollectionSection
