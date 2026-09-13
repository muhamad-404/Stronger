import { useEffect, useRef, useState } from 'react';
import Button from './Button.jsx';
import Field from './Field.jsx';
import { useDialogA11y } from '../hooks/useDialogA11y.js';
import './ProgressSheet.css';

export default function JournalSheet({ open, initial, onClose, onSave }) {
  const panelRef = useRef(null);
  const [energy, setEnergy] = useState(3);
  const [appetite, setAppetite] = useState(3);
  const [sleepHours, setSleepHours] = useState('');
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useDialogA11y({ open, onClose, panelRef });

  useEffect(() => {
    if (!open) return;
    setEnergy(initial?.energy ?? 3);
    setAppetite(initial?.appetite ?? 3);
    setSleepHours(
      initial?.sleepHours != null ? String(initial.sleepHours) : '',
    );
    setNote(initial?.note || '');
    setError(null);
  }, [open, initial]);

  if (!open) return null;

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      await onSave({
        energy: Number(energy),
        appetite: Number(appetite),
        sleepHours: sleepHours === '' ? null : Number(sleepHours),
        note,
      });
      onClose();
    } catch {
      setError('Could not save journal entry.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="progress-sheet"
      role="dialog"
      aria-modal="true"
      aria-labelledby="journal-sheet-title"
      aria-describedby="journal-sheet-hint"
    >
      <button
        type="button"
        className="progress-sheet__backdrop"
        aria-label="Close"
        onClick={onClose}
      />
      <div className="progress-sheet__panel" ref={panelRef}>
        <h2 id="journal-sheet-title" className="progress-sheet__title">
          Today&apos;s check-in
        </h2>
        <p id="journal-sheet-hint" className="progress-sheet__hint">
          Energy and appetite from 1 (low) to 5 (strong).
        </p>

        <label className="progress-sheet__range-label" htmlFor="pj-energy">
          Energy: {energy}
        </label>
        <input
          id="pj-energy"
          className="progress-sheet__range"
          type="range"
          min={1}
          max={5}
          step={1}
          value={energy}
          onChange={(e) => setEnergy(e.target.value)}
          aria-valuetext={`${energy} out of 5`}
        />

        <label className="progress-sheet__range-label" htmlFor="pj-appetite">
          Appetite: {appetite}
        </label>
        <input
          id="pj-appetite"
          className="progress-sheet__range"
          type="range"
          min={1}
          max={5}
          step={1}
          value={appetite}
          onChange={(e) => setAppetite(e.target.value)}
          aria-valuetext={`${appetite} out of 5`}
        />

        <Field
          id="pj-sleep"
          label="Sleep hours"
          type="number"
          inputMode="decimal"
          value={sleepHours}
          onChange={(e) => setSleepHours(e.target.value)}
          min={0}
          max={24}
          step="0.5"
          placeholder="e.g. 7.5"
        />
        <Field
          id="pj-note"
          label="Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Anything worth remembering…"
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
