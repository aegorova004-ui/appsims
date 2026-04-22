import { useState } from 'react'
import { resolveCanonicalCreatorName } from '../lib/wishlist.js'
import EntryFields from './EntryFields.jsx'

function EditEntryModal({ labels, options, entry, onCancel, onSave }) {
  const [formData, setFormData] = useState(() => ({
    title: entry.title ?? '',
    creator: entry.creator ?? '',
    category: entry.category ?? options.categories[0],
    status: entry.status ?? options.statuses[0],
    link: entry.link ?? '',
    notes: entry.notes ?? '',
  }))

  function handleFieldChange(field, value) {
    setFormData((currentData) => ({
      ...currentData,
      [field]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const wasSaved = await onSave({
      ...formData,
      creator: resolveCanonicalCreatorName(formData.creator, options.creators),
    })

    if (wasSaved === false) {
      return
    }
  }

  return (
    <div
      className="confirm-dialog-backdrop"
      role="presentation"
      onClick={onCancel}
    >
      <div
        className="edit-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-entry-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="edit-modal__header">
          <div className="edit-modal__heading">
            <p className="panel-card__eyebrow">{labels.eyebrow}</p>
            <h3 id="edit-entry-title">{labels.title}</h3>
          </div>

          <button
            className="edit-modal__close"
            type="button"
            onClick={onCancel}
            aria-label={labels.closeAriaLabel}
            title={labels.closeAriaLabel}
          >
            <span aria-hidden="true">x</span>
          </button>
        </div>

        <p className="panel-card__description">{labels.description}</p>

        <form className="entry-form" onSubmit={handleSubmit} autoComplete="off">
          <EntryFields
            labels={labels}
            options={options}
            formData={formData}
            onChange={handleFieldChange}
          />

          <div className="entry-form__actions">
            <button className="primary-button" type="submit">
              {labels.saveChanges}
            </button>
            <button
              className="secondary-button secondary-button--soft"
              type="button"
              onClick={onCancel}
            >
              {labels.cancel}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditEntryModal
