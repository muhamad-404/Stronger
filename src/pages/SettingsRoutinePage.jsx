import { useEffect, useState } from 'react';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';
import Field from '../components/Field.jsx';
import PageHeader from '../components/PageHeader.jsx';
import SettingsBackLink from '../components/SettingsBackLink.jsx';
import { useProfile } from '../hooks/useProfile.js';
import { validateProfileForm } from '../utils/onboardingValidation.js';
import './SettingsPage.css';

export default function SettingsRoutinePage() {
  const { profile, loading, saving, save, error: loadError } = useProfile();
  const [wakeTime, setWakeTime] = useState('');
  const [bedTime, setBedTime] = useState('');
  const [errors, setErrors] = useState({});
  const [savedMessage, setSavedMessage] = useState(null);
  const [saveError, setSaveError] = useState(null);

  useEffect(() => {
    if (!profile) return;
    setWakeTime(profile.wakeTime ?? '');
    setBedTime(profile.bedTime ?? '');
  }, [profile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const answers = {
      preferredName: profile?.preferredName ?? '',
      currentWeightKg: profile?.currentWeightKg ?? '',
      heightCm: profile?.heightCm ?? '',
      targetWeightKg: profile?.targetWeightKg ?? '',
      wakeTime,
      bedTime,
    };
    const nextErrors = {};
    const full = validateProfileForm(answers);
    if (full.wakeTime) nextErrors.wakeTime = full.wakeTime;
    if (full.bedTime) nextErrors.bedTime = full.bedTime;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    try {
      await save(answers);
      setSavedMessage('Routine times saved. Today’s task times will follow.');
      setSaveError(null);
    } catch {
      setSaveError('Could not save routine.');
    }
  };

  return (
    <div className="page settings-page">
      <SettingsBackLink />
      <PageHeader
        title="Routine"
        subtitle="Wake and bedtime shape your daily task schedule."
      />

      {loading ? <p className="page-placeholder">Loading…</p> : null}
      {loadError ? (
        <p className="settings-page__alert" role="alert">
          Could not load routine.
        </p>
      ) : null}

      {!loading ? (
        <Card>
          <form className="settings-form" onSubmit={handleSubmit} noValidate>
            <Field
              id="sr-wake"
              label="Wake-up time"
              type="time"
              value={wakeTime}
              onChange={(e) => {
                setWakeTime(e.target.value);
                setSavedMessage(null);
              }}
              error={errors.wakeTime}
            />
            <Field
              id="sr-bed"
              label="Bedtime"
              type="time"
              value={bedTime}
              onChange={(e) => {
                setBedTime(e.target.value);
                setSavedMessage(null);
              }}
              error={errors.bedTime}
              hint="Sleep logging can use these as defaults."
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
              {saving ? 'Saving…' : 'Save routine'}
            </Button>
          </form>
        </Card>
      ) : null}
    </div>
  );
}
