import { useEffect, useMemo, useState } from 'react';
import Button from './Button.jsx';
import Field from './Field.jsx';
import { estimateSleepHours } from '../services/sleep.js';
import './ProgressSheet.css';
import './SleepLogSheet.css';

export default function SleepLogSheet({
  open,
  initial,
  defaults,
  onClose,
  onSave,
  saving = false,
}) {
  const [bedtime, setBedtime] = useState('');
  const [wakeTime, setWakeTime] = useState('');
  const [quality, setQuality] = useState(3);
  const [note, setNote] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!open) return;
    setBedtime(initial?.bedtime || defaults?.bedtime || '22:30');
    setWakeTime(initial?.wakeTime || defaults?.wakeTime || '07:00');
    setQuality(initial?.quality ?? 3);
    setNote(initial?.note || '');
    setError(null);
  }, [open, initial, defaults]);

  const estimated = useMemo(
    () => estimateSleepHours(bedtime, wakeTime),
    [bedtime, wakeTime],
  );

  if (!open) return null;

  const handleSave = async () => {
    setError(null);
    if (!bedtime || !wakeTime) {
      setError('Add both bedtime and wake time.');
      return;
    }
    try {
      await onSave({
        bedtime,
        wakeTime,
        quality: Number(quality),
        note,
      });
      onClose();
    } catch (err) {
      setError(err?.message || 'Could not save sleep.');
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
        <h2 className="progress-sheet__title">Log last night’s sleep</h2>
        <p className="progress-sheet__hint">
          Times are for the night that just ended. Duration updates automatically.
        </p>

        <div className="sleep-log__row">
          <Field
            id="sleep-bed"
            label="Bedtime"
            type="time"
            value={bedtime}
            onChange={(e) => setBedtime(e.target.value)}
          />
          <Field
            id="sleep-wake"
            label="Wake time"
            type="time"
            value={wakeTime}
            onChange={(e) => setWakeTime(e.target.value)}
          />
        </div>

        <p className="sleep-log__estimate">
          Estimated sleep:{' '}
          <strong>{estimated != null ? `${estimated} hours` : '—'}</strong>
        </p>

        <label className="progress-sheet__range-label" htmlFor="sleep-quality">
          Sleep quality: {quality}/5
        </label>
        <input
          id="sleep-quality"
          className="progress-sheet__range"
          type="range"
          min={1}
          max={5}
          step={1}
          value={quality}
          onChange={(e) => setQuality(e.target.value)}
        />
        <p className="sleep-log__quality-hint">
          1 = rough · 3 = okay · 5 = rested
        </p>

        <Field
          id="sleep-note"
          label="Note (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Late guests, noisy night, felt calm…"
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
          <Button onClick={handleSave} disabled={saving}>
            {saving ? 'Saving…' : 'Save sleep'}
          </Button>
        </div>
      </div>
    </div>
  );
}
