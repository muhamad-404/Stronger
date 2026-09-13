import { useEffect, useState } from 'react';
import Button from './Button.jsx';
import Field from './Field.jsx';
import './ProgressSheet.css';

export default function GoalsEditSheet({ open, goals, onClose, onSave }) {
  const [form, setForm] = useState({
    startingWeightKg: '',
    milestone1Kg: '',
    milestone2Kg: '',
    longTermKg: '',
  });
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open || !goals) return;
    setForm({
      startingWeightKg: goals.startingWeightKg ?? '',
      milestone1Kg: goals.milestone1Kg ?? '',
      milestone2Kg: goals.milestone2Kg ?? '',
      longTermKg: goals.longTermKg ?? '',
    });
    setError(null);
  }, [open, goals]);

  if (!open) return null;

  const update = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const start = Number(form.startingWeightKg);
      const m1 = Number(form.milestone1Kg);
      const m2 = Number(form.milestone2Kg);
      const long = Number(form.longTermKg);
      if (![start, m1, m2, long].every((n) => Number.isFinite(n))) {
        throw new Error('Enter valid weights in kg.');
      }
      if (!(m1 > start && m2 >= m1 && long >= m2)) {
        throw new Error('Milestones should step upward from starting weight.');
      }
      await onSave({
        startingWeightKg: start,
        milestone1Kg: m1,
        milestone2Kg: m2,
        longTermKg: long,
      });
      onClose();
    } catch (err) {
      setError(err?.message || 'Could not save goals.');
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
        <h2 className="progress-sheet__title">Edit goals</h2>
        <p className="progress-sheet__hint">
          Gentle milestones — you can adjust them anytime.
        </p>
        <Field
          id="pg-start"
          label="Starting weight"
          type="number"
          inputMode="decimal"
          suffix="kg"
          value={form.startingWeightKg}
          onChange={update('startingWeightKg')}
          step="0.1"
        />
        <Field
          id="pg-m1"
          label="Milestone 1"
          type="number"
          inputMode="decimal"
          suffix="kg"
          value={form.milestone1Kg}
          onChange={update('milestone1Kg')}
          step="0.1"
        />
        <Field
          id="pg-m2"
          label="Milestone 2"
          type="number"
          inputMode="decimal"
          suffix="kg"
          value={form.milestone2Kg}
          onChange={update('milestone2Kg')}
          step="0.1"
        />
        <Field
          id="pg-long"
          label="Longer-term target"
          type="number"
          inputMode="decimal"
          suffix="kg"
          value={form.longTermKg}
          onChange={update('longTermKg')}
          step="0.1"
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
            {saving ? 'Saving…' : 'Save goals'}
          </Button>
        </div>
      </div>
    </div>
  );
}
