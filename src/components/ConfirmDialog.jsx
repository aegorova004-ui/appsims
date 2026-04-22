function ConfirmDialog({ labels, onCancel, onConfirm }) {
  return (
    <div className="confirm-dialog-backdrop" role="presentation">
      <div
        className="confirm-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-entry-title"
        aria-describedby="delete-entry-description"
      >
        <div className="confirm-dialog__content">
          <h3 id="delete-entry-title">{labels.title}</h3>
          <p id="delete-entry-description">{labels.description}</p>
        </div>

        <div className="confirm-dialog__actions">
          <button
            className="secondary-button secondary-button--soft"
            type="button"
            onClick={onCancel}
          >
            {labels.cancel}
          </button>
          <button
            className="secondary-button secondary-button--danger"
            type="button"
            onClick={onConfirm}
          >
            {labels.confirm}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog
