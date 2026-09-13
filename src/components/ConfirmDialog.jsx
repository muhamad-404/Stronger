import { useEffect, useId, useRef } from 'react';
import Button from './Button.jsx';
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
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape' && !busy) onCancel?.();
    };
    window.addEventListener('keydown', onKey);
    panelRef.current?.focus?.();
    return () => window.removeEventListener('keydown', onKey);
  }, [open, busy, onCancel]);

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
        tabIndex={-1}
        ref={panelRef}
      >
        <h2 id={titleId} className="confirm-dialog__title">
          {title}
        </h2>
        {typeof body === 'string' ? (
          <p className="confirm-dialog__body">{body}</p>
        ) : (
          <div className="confirm-dialog__body">{body}</div>
        )}
        <div className="confirm-dialog__actions">
          <Button variant="ghost" onClick={onCancel} disabled={busy}>
            {cancelLabel}
          </Button>
          <Button
            variant={tone === 'danger' ? 'primary' : 'primary'}
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
