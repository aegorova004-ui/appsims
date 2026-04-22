import { useMemo, useState } from 'react'
import {
  getCategoriesForType,
  getCreatorSuggestions,
  normalizeCreatorName,
} from '../lib/wishlist.js'

function EntryFields({ labels, options, formData, onChange }) {
  const [isCreatorFocused, setIsCreatorFocused] = useState(false)
  const creatorSuggestions = useMemo(() => {
    return getCreatorSuggestions(
      options.creators,
      formData.creator,
      options.locale,
    ).slice(0, 6)
  }, [formData.creator, options.creators, options.locale])

  const showCreatorSuggestions =
    isCreatorFocused &&
    formData.creator.trim() !== '' &&
    creatorSuggestions.length > 0
  const categoriesForSelectedType = getCategoriesForType(formData.type)

  function handleFieldChange(event) {
    const field = event.target.dataset.field ?? event.target.name
    const { value } = event.target

    onChange(field, value)
  }

  function handleCreatorSelect(creator) {
    onChange('creator', creator)
    setIsCreatorFocused(false)
  }

  return (
    <>
      <label className="field">
        <span>{labels.fields.title}</span>
        <input
          name="wishlist_entry_title"
          data-field="title"
          type="text"
          value={formData.title}
          onChange={handleFieldChange}
          placeholder={labels.placeholders.title}
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          required
        />
      </label>

      <label className="field field--creator">
        <span>{labels.fields.creator}</span>
        <div className="creator-input-wrap">
          <input
            name="wishlist_entry_creator"
            data-field="creator"
            type="text"
            value={formData.creator}
            onChange={handleFieldChange}
            onFocus={() => setIsCreatorFocused(true)}
            onBlur={() => {
              window.setTimeout(() => {
                setIsCreatorFocused(false)
                onChange('creator', normalizeCreatorName(formData.creator))
              }, 120)
            }}
            placeholder={labels.placeholders.creator}
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            required
          />

          {showCreatorSuggestions ? (
            <div className="creator-suggestions" role="listbox">
              {creatorSuggestions.map((creator) => (
                <button
                  key={creator}
                  className="creator-suggestions__item"
                  type="button"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => handleCreatorSelect(creator)}
                >
                  {creator}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </label>

      <label className="field">
        <span>{labels.fields.type}</span>
        <select
          name="type"
          value={formData.type}
          onChange={handleFieldChange}
        >
          {options.types.map((type) => (
            <option key={type} value={type}>
              {labels.typeLabels[type]}
            </option>
          ))}
        </select>
      </label>

      <label className="field">
        <span>{labels.fields.category}</span>
        <select
          name="category"
          value={formData.category}
          onChange={handleFieldChange}
        >
          {categoriesForSelectedType.map((category) => (
            <option key={category} value={category}>
              {labels.categoryLabels[category]}
            </option>
          ))}
        </select>
      </label>

      <label className="field">
        <span>{labels.fields.status}</span>
        <select name="status" value={formData.status} onChange={handleFieldChange}>
          {options.statuses.map((status) => (
            <option key={status} value={status}>
              {labels.statusLabels[status]}
            </option>
          ))}
        </select>
      </label>

      <label className="field">
        <span>{labels.fields.link}</span>
        <input
          name="wishlist_entry_link"
          data-field="link"
          type="url"
          value={formData.link}
          onChange={handleFieldChange}
          placeholder={labels.placeholders.link}
        />
      </label>

      <label className="field field--textarea">
        <span>{labels.fields.notes}</span>
        <textarea
          name="notes"
          rows="4"
          value={formData.notes}
          onChange={handleFieldChange}
          placeholder={labels.placeholders.notes}
        />
      </label>
    </>
  )
}

export default EntryFields
