function ActiveFilterChips({ chips }) {
  if (!chips.length) {
    return null
  }

  return (
    <div className="active-filter-chips" aria-label="Active filters">
      {chips.map((chip) => (
        <span key={chip.key} className="active-filter-chip">
          <span className="active-filter-chip__label">{chip.label}:</span>
          <span>{chip.value}</span>
        </span>
      ))}
    </div>
  )
}

export default ActiveFilterChips
