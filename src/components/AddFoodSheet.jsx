import { useEffect, useRef, useState } from 'react';
import Button from './Button.jsx';
import Field from './Field.jsx';
import { MEAL_SLOTS } from '../data/meals.js';
import { PORTIONS } from '../services/foodLog.js';
import { currentTimeLabel } from '../utils/dates.js';
import { formatStorageError } from '../utils/storageErrors.js';
import { useDialogA11y } from '../hooks/useDialogA11y.js';
import './AddFoodSheet.css';

const EMPTY = {
  slotId: 'breakfast',
  foodTitle: '',
  portion: 'normal',
  portionNote: '',
  time: '',
  note: '',
  hasProtein: false,
  isDrink: false,
  eaten: true,
  mealId: null,
};

export default function AddFoodSheet({
  open,
  mode = 'add',
  initialValues = null,
  quickPicks = [],
  onClose,
  onSave,
}) {
  const panelRef = useRef(null);
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  useDialogA11y({ open, onClose, panelRef });

  useEffect(() => {
    if (!open) return;
    setError(null);
    if (initialValues) {
      setForm({
        ...EMPTY,
        ...initialValues,
        time: initialValues.time || currentTimeLabel(),
      });
    } else {
      setForm({ ...EMPTY, time: currentTimeLabel() });
    }
    // Only hydrate when the sheet opens (not on every parent render)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional
  }, [open]);

  if (!open) return null;

  const update = (key) => (event) => {
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (!String(form.foodTitle).trim()) {
      setError('Add a food name.');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await onSave(form);
      onClose();
    } catch (err) {
      setError(formatStorageError(err, 'Could not save. Please try again.'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="add-food-sheet"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-food-title"
    >
      <button
        type="button"
        className="add-food-sheet__backdrop"
        aria-label="Close"
        onClick={onClose}
      />
      <div className="add-food-sheet__panel" ref={panelRef}>
        <h2 id="add-food-title" className="add-food-sheet__title">
          {mode === 'edit' ? 'Edit food' : 'Add food'}
        </h2>

        <label className="add-food-sheet__field-label" htmlFor="flog-slot">
          Meal
        </label>
        <select
          id="flog-slot"
          className="add-food-sheet__select"
          value={form.slotId}
          onChange={update('slotId')}
        >
          {MEAL_SLOTS.map((slot) => (
            <option key={slot.id} value={slot.id}>
              {slot.label}
            </option>
          ))}
        </select>

        <Field
          id="flog-title"
          label="Food"
          value={form.foodTitle}
          onChange={update('foodTitle')}
          placeholder="e.g. 2 eggs, paratha, banana"
          error={error && !form.foodTitle.trim() ? error : null}
        />

        {quickPicks.length ? (
          <div className="add-food-sheet__picks">
            {quickPicks.map((pick) => (
              <button
                key={pick}
                type="button"
                className="add-food-sheet__pick"
                onClick={() =>
                  setForm((prev) => ({ ...prev, foodTitle: pick }))
                }
              >
                {pick}
              </button>
            ))}
          </div>
        ) : null}

        <p className="add-food-sheet__field-label" id="flog-portion-label">
          Portion
        </p>
        <div
          className="add-food-sheet__portions"
          role="group"
          aria-labelledby="flog-portion-label"
        >
          {PORTIONS.map((portion) => (
            <button
              key={portion}
              type="button"
              aria-pressed={form.portion === portion}
              className={[
                'add-food-sheet__portion',
                form.portion === portion ? 'add-food-sheet__portion--on' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => setForm((prev) => ({ ...prev, portion }))}
            >
              {portion}
            </button>
          ))}
        </div>

        {form.portion === 'custom' ? (
          <Field
            id="flog-portion-note"
            label="Portion note"
            value={form.portionNote}
            onChange={update('portionNote')}
            placeholder="e.g. half plate, a few bites"
          />
        ) : null}

        <Field
          id="flog-time"
          label="Time"
          type="time"
          value={form.time}
          onChange={update('time')}
        />

        <Field
          id="flog-note"
          label="Note (optional)"
          value={form.note}
          onChange={update('note')}
          placeholder="How it felt, what helped…"
        />

        <label className="add-food-sheet__check">
          <input
            type="checkbox"
            checked={form.hasProtein}
            onChange={update('hasProtein')}
          />
          Includes a protein source
        </label>
        <label className="add-food-sheet__check">
          <input
            type="checkbox"
            checked={form.isDrink}
            onChange={update('isDrink')}
          />
          Nourishing drink
        </label>
        <label className="add-food-sheet__check">
          <input
            type="checkbox"
            checked={form.eaten}
            onChange={update('eaten')}
          />
          Marked as eaten
        </label>

        {error ? (
          <p className="add-food-sheet__error" role="alert">
            {error}
          </p>
        ) : null}

        <div className="add-food-sheet__actions">
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
