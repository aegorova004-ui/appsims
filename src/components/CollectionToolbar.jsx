function CollectionToolbar({
  labels,
  searchValue,
  creatorFilterValue,
  typeFilterValue,
  statusFilterValue,
  categoryFilterValue,
  onSearchChange,
  onCreatorFilterChange,
  onTypeFilterChange,
  onStatusFilterChange,
  onCategoryFilterChange,
  onResetFilters,
  creators,
  types,
  categories,
  statuses,
  hasActiveFilters,
}) {
  return (
    <div className="collection-toolbar-wrap">
      <div className="collection-toolbar__search-row">
        <label className="field field--search">
          <span>{labels.searchLabel}</span>
          <div
            className={
              searchValue
                ? 'search-input-wrap has-value'
                : 'search-input-wrap'
            }
          >
            <span className="search-input-wrap__icon" aria-hidden="true">
              <svg viewBox="0 0 20 20" fill="none">
                <circle cx="8.5" cy="8.5" r="4.75" stroke="currentColor" strokeWidth="1.5" />
                <path d="M12 12L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
            <input
              name="wishlist_search_query"
              type="text"
              value={searchValue}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder={labels.searchPlaceholder}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
            />
            <button
              className={
                searchValue
                  ? 'search-input-wrap__clear is-visible'
                  : 'search-input-wrap__clear'
              }
              type="button"
              onClick={() => onSearchChange('')}
              aria-label={labels.clearSearch}
              disabled={!searchValue}
            >
              ×
            </button>
          </div>
        </label>
      </div>

      <div className="collection-toolbar">
        <label className="field field--toolbar">
          <span>{labels.creatorLabel}</span>
          <select
            value={creatorFilterValue}
            onChange={(event) => onCreatorFilterChange(event.target.value)}
          >
            <option value="all">{labels.allCreators}</option>
            {creators.map((creator) => (
              <option key={creator} value={creator}>
                {creator}
              </option>
            ))}
          </select>
        </label>

        <label className="field field--toolbar">
          <span>{labels.typeLabel}</span>
          <select
            value={typeFilterValue}
            onChange={(event) => onTypeFilterChange(event.target.value)}
          >
            <option value="all">{labels.allTypes}</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {labels.typeLabels[type]}
              </option>
            ))}
          </select>
        </label>

        <label className="field field--toolbar">
          <span>{labels.categoryLabel}</span>
          <select
            value={categoryFilterValue}
            onChange={(event) => onCategoryFilterChange(event.target.value)}
          >
            <option value="all">{labels.allCategories}</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {labels.categoryLabels[category]}
              </option>
            ))}
          </select>
        </label>

        <label className="field field--toolbar">
          <span>{labels.statusLabel}</span>
          <select
            value={statusFilterValue}
            onChange={(event) => onStatusFilterChange(event.target.value)}
          >
            <option value="all">{labels.allStatuses}</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {labels.statusLabels[status]}
              </option>
            ))}
          </select>
        </label>

        <div className="toolbar-reset-wrap">
          <button
            className="toolbar-reset"
            type="button"
            onClick={onResetFilters}
            disabled={!hasActiveFilters}
          >
            <span className="toolbar-reset__icon" aria-hidden="true">
              <svg viewBox="0 0 20 20" fill="none">
                <path
                  d="M15.2 6.4A6 6 0 1 0 16 10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M15.4 3.8V6.7H12.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            {labels.reset}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CollectionToolbar
