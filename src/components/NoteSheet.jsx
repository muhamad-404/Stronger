import { useEffect, useState } from 'react';
import Button from './Button.jsx';
import './NoteSheet.css';

export default function NoteSheet({
  open,
  initialValue = '',
  onClose,
  onSave,
}) {
  const [value, setValue] = useState(initialValue);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (open) {
      setValue(initialValue);
      setError(null);
    }
  }, [open, initialValue]);

  if (!open) return null;

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      await onSave(value);
      onClose();
    } catch {
      setError('Could not save your note. Try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="note-sheet" role="dialog" aria-modal="true" aria-labelledby="note-sheet-title">
      <button
        type="button"
        className="note-sheet__backdrop"
        aria-label="Close note"
        onClick={onClose}
      />
      <div className="note-sheet__panel">
        <h2 id="note-sheet-title" className="note-sheet__title">
          Today&apos;s note
        </h2>
        <p className="note-sheet__hint">
          A quick thought about how you feel or what helped today.
        </p>
        <textarea
          className="note-sheet__input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={4}
          maxLength={500}
          placeholder="Optional note…"
          autoFocus
        />
        {error ? (
          <p className="note-sheet__error" role="alert">
            {error}
          </p>
        ) : null}
        <div className="note-sheet__actions">
          <Button variant="ghost" onClick={onClose} disabled={saving}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving…' : 'Save'}
          </Button>
        </div>
      </div>
    </div>
  );
}
