import { useState } from 'react'
import {
  getCategoriesForType,
  resolveCanonicalCreatorName,
} from '../lib/wishlist.js'
import EntryFields from './EntryFields.jsx'

const INITIAL_FORM = {
  title: '',
  creator: '',
  type: 'CC',
  category: 'Hair',
  status: 'Wishlist',
  link: '',
  notes: '',
}

function EntryForm({ labels, options, onSubmit }) {
  const [formData, setFormData] = useState(() => buildInitialFormState(options))

  function handleFieldChange(field, value) {
    setFormData((currentData) => ({
      ...currentData,
      [field]: value,
      ...(field === 'type'
        ? { category: getCategoriesForType(value)[0] ?? currentData.category }
        : {}),
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const wasSaved = await onSubmit({
      ...formData,
      creator: resolveCanonicalCreatorName(formData.creator, options.creators),
    })

    if (wasSaved === false) {
      return
    }

    setFormData(buildInitialFormState(options))
  }

  return (
    <section className="panel-card">
      <div className="panel-card__header">
        <p className="panel-card__eyebrow">{labels.eyebrow}</p>
        <h2>{labels.title}</h2>
        <p className="panel-card__description">{labels.description}</p>
      </div>

      <form className="entry-form" onSubmit={handleSubmit} autoComplete="off">
        <EntryFields
          labels={labels}
          options={options}
          formData={formData}
          onChange={handleFieldChange}
        />

        <div className="entry-form__actions">
          <button className="primary-button" type="submit">
            {labels.submit}
          </button>
        </div>
      </form>
    </section>
  )
}

function buildInitialFormState(options) {
  const type = options.types[0]

  return {
    ...INITIAL_FORM,
    type,
    category: getCategoriesForType(type)[0],
    status: options.statuses[0],
  }
}

export default EntryForm
