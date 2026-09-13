import { useId, useRef } from 'react';
import Button from './Button.jsx';
import { useDialogA11y } from '../hooks/useDialogA11y.js';
import './ConfirmDialog.css';

/**
 * Reusable confirmation dialog (mobile-first bottom sheet style).
 */
export default function ConfirmDialog({
  open,
  title,
  body,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  tone = 'default',
  busy = false,
  onConfirm,
  onCancel,
}) {
  const titleId = useId();
  const bodyId = useId();
  const panelRef = useRef(null);

  useDialogA11y({
    open,
    onClose: () => {
      if (!busy) onCancel?.();
    },
    panelRef,
  });

  if (!open) return null;

  return (
    <div className="confirm-dialog" role="presentation">
      <button
        type="button"
        className="confirm-dialog__backdrop"
        aria-label="Dismiss"
        disabled={busy}
        onClick={() => {
          if (!busy) onCancel?.();
        }}
      />
      <div
        className={[
          'confirm-dialog__panel',
          tone === 'danger' ? 'confirm-dialog__panel--danger' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={bodyId}
        tabIndex={-1}
        ref={panelRef}
      >
        <h2 id={titleId} className="confirm-dialog__title">
          {title}
        </h2>
        {typeof body === 'string' ? (
          <p id={bodyId} className="confirm-dialog__body">
            {body}
          </p>
        ) : (
          <div id={bodyId} className="confirm-dialog__body">
            {body}
          </div>
        )}
        <div className="confirm-dialog__actions">
          <Button variant="ghost" onClick={onCancel} disabled={busy}>
            {cancelLabel}
          </Button>
          <Button
            variant="primary"
            className={
              tone === 'danger' ? 'confirm-dialog__confirm--danger' : ''
            }
            onClick={onConfirm}
            disabled={busy}
          >
            {busy ? 'Working…' : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
