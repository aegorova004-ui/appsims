function UndoToast({ labels, onUndo, onDismiss }) {
  return (
    <div className="undo-toast" role="status" aria-live="polite">
      <p className="undo-toast__message">{labels.message}</p>
      <div className="undo-toast__actions">
        <button
          className="undo-toast__action"
          type="button"
          onClick={onUndo}
        >
          {labels.undo}
        </button>
        <button
          className="undo-toast__dismiss"
          type="button"
          onClick={onDismiss}
          aria-label={labels.dismissAriaLabel}
        >
          <span aria-hidden="true">x</span>
        </button>
      </div>
    </div>
  )
}

export default UndoToast
