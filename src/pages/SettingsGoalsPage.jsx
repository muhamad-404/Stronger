import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';
import Field from '../components/Field.jsx';
import PageHeader from '../components/PageHeader.jsx';
import SettingsBackLink from '../components/SettingsBackLink.jsx';
import {
  getWeightGoals,
  saveWeightGoals,
} from '../services/progress.js';
import { formatKg } from '../utils/dates.js';
import './SettingsPage.css';

export default function SettingsGoalsPage() {
  const [goals, setGoals] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    startingWeightKg: '',
    milestone1Kg: '',
    milestone2Kg: '',
    longTermKg: '',
  });
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { goals: g } = await getWeightGoals();
        setGoals(g);
        setForm({
          startingWeightKg: g?.startingWeightKg ?? '',
          milestone1Kg: g?.milestone1Kg ?? '',
          milestone2Kg: g?.milestone2Kg ?? '',
          longTermKg: g?.longTermKg ?? '',
        });
      } catch {
        setError('Could not load goals.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const update = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
    setSaved(null);
    setError(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();
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
      const next = await saveWeightGoals({
        startingWeightKg: start,
        milestone1Kg: m1,
        milestone2Kg: m2,
        longTermKg: long,
      });
      setGoals(next);
      setSaved('Weight milestones saved on this device.');
    } catch (err) {
      setError(err?.message || 'Could not save.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="page settings-page">
      <SettingsBackLink />
      <PageHeader
        title="Goals"
        subtitle="Weight milestones for Progress — plus your wider goals module."
      />

      <Card className="settings-page__teaser">
        <p className="settings-page__teaser-title">All goals</p>
        <p className="settings-page__teaser-copy">
          Food, strength, sleep, and routine goals live in the Goals module.
        </p>
        <Link to="/goals" className="settings-page__text-link">
          Open Goals →
        </Link>
      </Card>

      {loading ? <p className="page-placeholder">Loading…</p> : null}

      {!loading ? (
        <Card>
          <form className="settings-form" onSubmit={handleSave} noValidate>
            <p className="settings-page__section-hint">
              Weight milestones
              {goals?.longTermKg != null
                ? ` · longer-term ${formatKg(Number(goals.longTermKg))}`
                : ''}
            </p>
            <Field
              id="sg-start"
              label="Starting weight"
              type="number"
              inputMode="decimal"
              suffix="kg"
              value={form.startingWeightKg}
              onChange={update('startingWeightKg')}
            />
            <Field
              id="sg-m1"
              label="Milestone 1"
              type="number"
              inputMode="decimal"
              suffix="kg"
              value={form.milestone1Kg}
              onChange={update('milestone1Kg')}
            />
            <Field
              id="sg-m2"
              label="Milestone 2"
              type="number"
              inputMode="decimal"
              suffix="kg"
              value={form.milestone2Kg}
              onChange={update('milestone2Kg')}
            />
            <Field
              id="sg-long"
              label="Longer-term goal"
              type="number"
              inputMode="decimal"
              suffix="kg"
              value={form.longTermKg}
              onChange={update('longTermKg')}
            />

            {saved ? (
              <p className="settings-page__success" role="status">
                {saved}
              </p>
            ) : null}
            {error ? (
              <p className="settings-page__alert" role="alert">
                {error}
              </p>
            ) : null}

            <Button type="submit" size="lg" fullWidth disabled={saving}>
              {saving ? 'Saving…' : 'Save milestones'}
            </Button>
          </form>
        </Card>
      ) : null}
    </div>
  );
}
