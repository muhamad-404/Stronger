import { useEffect, useState } from 'react';
import Button from './Button.jsx';
import Field from './Field.jsx';
import { toDateKey } from '../utils/dates.js';
import './ProgressSheet.css';

export default function WeightLogSheet({ open, onClose, onSave }) {
  const [date, setDate] = useState(toDateKey());
  const [weight, setWeight] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setDate(toDateKey());
    setWeight('');
    setNote('');
    setError(null);
  }, [open]);

  if (!open) return null;

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      await onSave({ date, weightKg: weight, note });
      onClose();
    } catch (err) {
      setError(err?.message || 'Could not save weight.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="progress-sheet" role="dialog" aria-modal="true">
      <button
        type="button"
        className="progress-sheet__backdrop"
        aria-label="Close"
        onClick={onClose}
      />
      <div className="progress-sheet__panel">
        <h2 className="progress-sheet__title">Log weight</h2>
        <Field
          id="pw-date"
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          max={toDateKey()}
        />
        <Field
          id="pw-weight"
          label="Weight"
          type="number"
          inputMode="decimal"
          suffix="kg"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          min={30}
          max={200}
          step="0.1"
          placeholder="e.g. 44.1"
        />
        <Field
          id="pw-note"
          label="Note (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="How you’re feeling, time of day…"
        />
        {error ? (
          <p className="progress-sheet__error" role="alert">
            {error}
          </p>
        ) : null}
        <div className="progress-sheet__actions">
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
