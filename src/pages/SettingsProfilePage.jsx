import { useEffect, useState } from 'react';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';
import Field from '../components/Field.jsx';
import PageHeader from '../components/PageHeader.jsx';
import SettingsBackLink from '../components/SettingsBackLink.jsx';
import { useProfile } from '../hooks/useProfile.js';
import {
  getLargeGainNote,
  validateProfileForm,
} from '../utils/onboardingValidation.js';
import './SettingsPage.css';

const EMPTY = {
  preferredName: '',
  currentWeightKg: '',
  heightCm: '',
  targetWeightKg: '',
  wakeTime: '',
  bedTime: '',
};

export default function SettingsProfilePage() {
  const { profile, loading, saving, save, error: loadError } = useProfile();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [savedMessage, setSavedMessage] = useState(null);
  const [saveError, setSaveError] = useState(null);

  useEffect(() => {
    if (!profile) return;
    setForm({
      preferredName: profile.preferredName ?? '',
      currentWeightKg:
        profile.currentWeightKg != null ? String(profile.currentWeightKg) : '',
      heightCm: profile.heightCm != null ? String(profile.heightCm) : '',
      targetWeightKg:
        profile.targetWeightKg != null ? String(profile.targetWeightKg) : '',
      wakeTime: profile.wakeTime ?? '',
      bedTime: profile.bedTime ?? '',
    });
  }, [profile]);

  const updateField = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
    setSavedMessage(null);
    setSaveError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Keep routine times in validation by carrying existing values
    const nextErrors = validateProfileForm(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    try {
      await save(form);
      setSavedMessage('Profile saved on this device.');
    } catch {
      setSaveError('Could not save right now.');
    }
  };

  const largeGainNote = getLargeGainNote(
    form.currentWeightKg,
    form.targetWeightKg,
  );

  return (
    <div className="page settings-page">
      <SettingsBackLink />
      <PageHeader
        title="Profile"
        subtitle="Name, height, current weight, and longer-term goal."
      />

      {loading ? <p className="page-placeholder">Loading…</p> : null}
      {loadError ? (
        <p className="settings-page__alert" role="alert">
          Could not load your profile.
        </p>
      ) : null}

      {!loading ? (
        <Card>
          <form className="settings-form" onSubmit={handleSubmit} noValidate>
            <Field
              id="sp-name"
              label="Preferred name"
              value={form.preferredName}
              onChange={updateField('preferredName')}
              autoComplete="given-name"
              error={errors.preferredName}
            />
            <Field
              id="sp-height"
              label="Height"
              type="number"
              inputMode="decimal"
              suffix="cm"
              value={form.heightCm}
              onChange={updateField('heightCm')}
              min={120}
              max={220}
              step="1"
              error={errors.heightCm}
            />
            <Field
              id="sp-weight"
              label="Current weight"
              type="number"
              inputMode="decimal"
              suffix="kg"
              value={form.currentWeightKg}
              onChange={updateField('currentWeightKg')}
              min={30}
              max={200}
              step="0.1"
              error={errors.currentWeightKg}
            />
            <Field
              id="sp-goal"
              label="Current goal weight"
              type="number"
              inputMode="decimal"
              suffix="kg"
              value={form.targetWeightKg}
              onChange={updateField('targetWeightKg')}
              min={30}
              max={200}
              step="0.1"
              error={errors.targetWeightKg}
              hint={
                !errors.targetWeightKg && largeGainNote
                  ? largeGainNote
                  : 'Gentle milestones live under Goals.'
              }
            />

            {savedMessage ? (
              <p className="settings-page__success" role="status">
                {savedMessage}
              </p>
            ) : null}
            {saveError ? (
              <p className="settings-page__alert" role="alert">
                {saveError}
              </p>
            ) : null}

            <Button type="submit" size="lg" fullWidth disabled={saving}>
              {saving ? 'Saving…' : 'Save profile'}
            </Button>
          </form>
        </Card>
      ) : null}
    </div>
  );
}
