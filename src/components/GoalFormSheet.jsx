import { useEffect, useState } from 'react';
import Button from './Button.jsx';
import Field from './Field.jsx';
import { GOAL_CATEGORIES, GOAL_STATUSES } from '../services/goals.js';
import './ProgressSheet.css';
import './GoalFormSheet.css';

const EMPTY = {
  title: '',
  category: 'routine',
  target: '',
  current: '',
  unit: '',
  startDate: '',
  targetDate: '',
  status: 'active',
  tracking: 'manual',
};

export default function GoalFormSheet({
  open,
  mode = 'create',
  goal = null,
  onClose,
  onSave,
  onDelete,
  onProgress,
  saving = false,
}) {
  const [form, setForm] = useState(EMPTY);
  const [progressValue, setProgressValue] = useState('');
  const [error, setError] = useState(null);
  const [tab, setTab] = useState('details');

  useEffect(() => {
    if (!open) return;
    setError(null);
    if (mode === 'edit' && goal) {
      setForm({
        title: goal.title || '',
        category: goal.category || 'routine',
        target: goal.target != null ? String(goal.target) : '',
        current: goal.current != null ? String(goal.current) : '',
        unit: goal.unit || '',
        startDate: goal.startDate || '',
        targetDate: goal.targetDate || '',
        status: goal.status || 'active',
        tracking: goal.tracking || 'manual',
      });
      setProgressValue(goal.current != null ? String(goal.current) : '');
      setTab(goal.tracking === 'manual' ? 'progress' : 'details');
    } else {
      const today = new Date().toISOString().slice(0, 10);
      setForm({ ...EMPTY, startDate: today });
      setProgressValue('');
      setTab('details');
    }
  }, [open, mode, goal]);

  if (!open) return null;

  const update = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSave = async () => {
    setError(null);
    const title = form.title.trim();
    if (!title) {
      setError('Add a title for this goal.');
      return;
    }
    const target = Number(form.target);
    if (!Number.isFinite(target) || target <= 0) {
      setError('Enter a target greater than zero.');
      return;
    }
    try {
      await onSave({
        title,
        category: form.category,
        target,
        current: Number(form.current) || 0,
        unit: form.unit.trim() || 'units',
        startDate: form.startDate || null,
        targetDate: form.targetDate || null,
        status: form.status,
        tracking: form.tracking,
        metric: form.tracking === 'auto' && goal?.metric ? goal.metric : null,
      });
      onClose();
    } catch (err) {
      setError(err?.message || 'Could not save goal.');
    }
  };

  const handleProgress = async () => {
    setError(null);
    if (!onProgress || !goal) return;
    try {
      await onProgress(Number(progressValue));
      onClose();
    } catch (err) {
      setError(err?.message || 'Could not update progress.');
    }
  };

  const handleDelete = async () => {
    if (!onDelete || !goal) return;
    setError(null);
    try {
      await onDelete();
      onClose();
    } catch (err) {
      setError(err?.message || 'Could not delete goal.');
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
        <h2 className="progress-sheet__title">
          {mode === 'create' ? 'New goal' : 'Goal'}
        </h2>
        <p className="progress-sheet__hint">
          Weight, food, strength, sleep, or routine — whatever supports you.
        </p>

        {mode === 'edit' && goal?.tracking === 'manual' ? (
          <div className="goal-form__tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'progress'}
              className={
                tab === 'progress'
                  ? 'goal-form__tab goal-form__tab--active'
                  : 'goal-form__tab'
              }
              onClick={() => setTab('progress')}
            >
              Progress
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'details'}
              className={
                tab === 'details'
                  ? 'goal-form__tab goal-form__tab--active'
                  : 'goal-form__tab'
              }
              onClick={() => setTab('details')}
            >
              Details
            </button>
          </div>
        ) : null}

        {tab === 'progress' && mode === 'edit' && goal?.tracking === 'manual' ? (
          <>
            <Field
              id="goal-progress"
              label="Current progress"
              type="number"
              inputMode="decimal"
              value={progressValue}
              onChange={(e) => setProgressValue(e.target.value)}
              suffix={goal.unit}
              hint={`Target: ${goal.target} ${goal.unit}`}
            />
            {error ? (
              <p className="progress-sheet__error" role="alert">
                {error}
              </p>
            ) : null}
            <div className="goal-form__actions">
              <Button variant="ghost" onClick={onClose} disabled={saving}>
                Cancel
              </Button>
              <Button onClick={handleProgress} disabled={saving}>
                {saving ? 'Saving…' : 'Save progress'}
              </Button>
            </div>
          </>
        ) : (
          <>
            <Field
              id="goal-title"
              label="Title"
              value={form.title}
              onChange={update('title')}
              placeholder="e.g. Complete 3 workouts this week"
            />

            <div className="goal-form__field">
              <label className="goal-form__label" htmlFor="goal-category">
                Category
              </label>
              <select
                id="goal-category"
                className="goal-form__select"
                value={form.category}
                onChange={update('category')}
              >
                {GOAL_CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="goal-form__row">
              <Field
                id="goal-target"
                label="Target"
                type="number"
                inputMode="decimal"
                value={form.target}
                onChange={update('target')}
              />
              <Field
                id="goal-unit"
                label="Unit"
                value={form.unit}
                onChange={update('unit')}
                placeholder="kg, %, days…"
              />
            </div>

            {form.tracking === 'manual' || mode === 'create' ? (
              <Field
                id="goal-current"
                label="Current progress"
                type="number"
                inputMode="decimal"
                value={form.current}
                onChange={update('current')}
                hint={
                  mode === 'create'
                    ? 'Starts at 0 unless you set it. Linked goals update from your logs.'
                    : undefined
                }
              />
            ) : (
              <p className="progress-sheet__hint">
                Progress updates from your logs ({goal?.current ?? '—'} /{' '}
                {goal?.target} {goal?.unit}).
              </p>
            )}

            <div className="goal-form__row">
              <Field
                id="goal-start"
                label="Start date"
                type="date"
                value={form.startDate}
                onChange={update('startDate')}
              />
              <Field
                id="goal-end"
                label="Target date"
                type="date"
                value={form.targetDate}
                onChange={update('targetDate')}
              />
            </div>

            {mode === 'edit' ? (
              <div className="goal-form__field">
                <label className="goal-form__label" htmlFor="goal-status">
                  Status
                </label>
                <select
                  id="goal-status"
                  className="goal-form__select"
                  value={form.status}
                  onChange={update('status')}
                >
                  {GOAL_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="goal-form__field">
                <label className="goal-form__label" htmlFor="goal-tracking">
                  Tracking
                </label>
                <select
                  id="goal-tracking"
                  className="goal-form__select"
                  value={form.tracking}
                  onChange={update('tracking')}
                >
                  <option value="manual">Manual updates</option>
                  <option value="auto" disabled>
                    Auto (use starter goals)
                  </option>
                </select>
              </div>
            )}

            {error ? (
              <p className="progress-sheet__error" role="alert">
                {error}
              </p>
            ) : null}

            <div className="goal-form__actions">
              {mode === 'edit' && onDelete ? (
                <Button
                  variant="ghost"
                  onClick={handleDelete}
                  disabled={saving}
                  className="goal-form__delete"
                >
                  Delete
                </Button>
              ) : (
                <span />
              )}
              <div className="goal-form__actions-end">
                <Button variant="ghost" onClick={onClose} disabled={saving}>
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? 'Saving…' : 'Save'}
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
