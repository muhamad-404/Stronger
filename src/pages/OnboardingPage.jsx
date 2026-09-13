import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';
import Field from '../components/Field.jsx';
import StepProgress from '../components/StepProgress.jsx';
import { useOnboardingStatus } from '../hooks/useOnboardingStatus.jsx';
import {
  calculateFirstMilestone,
  completeOnboarding,
  getOnboardingDraft,
  saveOnboardingDraft,
} from '../services/profile.js';
import {
  getLargeGainNote,
  validateOnboardingStep,
} from '../utils/onboardingValidation.js';
import './OnboardingPage.css';

const QUESTION_STEPS = 6;
const CONFIRM_STEP = 6;

const EMPTY_ANSWERS = {
  preferredName: '',
  currentWeightKg: '',
  heightCm: '',
  targetWeightKg: '',
  wakeTime: '',
  bedTime: '',
};

function formatKg(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return '—';
  return `${n % 1 === 0 ? n.toFixed(0) : n.toFixed(1)} kg`;
}

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { markCompleted, refresh } = useOnboardingStatus();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(EMPTY_ANSWERS);
  const [error, setError] = useState(null);
  const [hydrated, setHydrated] = useState(false);
  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const draft = await getOnboardingDraft();
        if (cancelled) return;
        if (draft?.answers) {
          setAnswers({ ...EMPTY_ANSWERS, ...draft.answers });
        }
        if (typeof draft?.step === 'number' && draft.step >= 0) {
          setStep(Math.min(draft.step, CONFIRM_STEP));
        }
      } catch {
        // Start fresh if draft cannot load
      } finally {
        if (!cancelled) setHydrated(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const updateField = (key) => (event) => {
    const value = event.target.value;
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setError(null);
  };

  const persistDraft = async (nextStep, nextAnswers) => {
    await saveOnboardingDraft({
      step: nextStep,
      answers: nextAnswers,
    });
  };

  const handleBack = async () => {
    if (step <= 0) return;
    const nextStep = step - 1;
    setError(null);
    setSubmitError(null);
    setStep(nextStep);
    try {
      await persistDraft(nextStep, answers);
    } catch {
      // Navigation still works offline to draft
    }
  };

  const handleContinue = async () => {
    const validationError = validateOnboardingStep(step, answers);
    if (validationError) {
      setError(validationError);
      return;
    }

    const nextStep = step + 1;
    setError(null);
    setStep(nextStep);
    try {
      await persistDraft(nextStep, answers);
    } catch {
      // Allow advancing; final save still required
    }
  };

  const handleFinish = async () => {
    setSaving(true);
    setSubmitError(null);
    try {
      await completeOnboarding(answers);
      markCompleted();
      await refresh();
      navigate('/', { replace: true });
    } catch {
      setSubmitError('We couldn’t save your setup. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (!hydrated) {
    return (
      <div className="onboarding-page">
        <p className="onboarding-page__loading" aria-live="polite">
          Loading your setup…
        </p>
      </div>
    );
  }

  const progressCurrent = step >= CONFIRM_STEP ? QUESTION_STEPS : step + 1;
  const largeGainNote =
    step === 3
      ? getLargeGainNote(answers.currentWeightKg, answers.targetWeightKg)
      : null;
  const milestone = calculateFirstMilestone(
    Number(answers.currentWeightKg),
    Number(answers.targetWeightKg),
  );
  const name = String(answers.preferredName || '').trim() || 'friend';

  return (
    <div className="onboarding-page">
      <header className="onboarding-page__brand">
        <p className="onboarding-page__brand-name">Stronger</p>
      </header>

      {step < CONFIRM_STEP ? (
        <StepProgress current={progressCurrent} total={QUESTION_STEPS} />
      ) : (
        <StepProgress
          current={QUESTION_STEPS}
          total={QUESTION_STEPS}
          label="Ready"
        />
      )}

      <div className="onboarding-page__body" key={step}>
        {step === 0 && (
          <>
            <h1 className="onboarding-page__title">What should we call you?</h1>
            <p className="onboarding-page__subtitle">
              A first name or preferred name is perfect.
            </p>
            <Field
              id="preferredName"
              label="Preferred name"
              value={answers.preferredName}
              onChange={updateField('preferredName')}
              autoComplete="given-name"
              placeholder="e.g. Ayesha"
              error={error}
              autoFocus
            />
          </>
        )}

        {step === 1 && (
          <>
            <h1 className="onboarding-page__title">Your current weight</h1>
            <p className="onboarding-page__subtitle">
              Just a starting point — no judgment, only progress.
            </p>
            <Field
              id="currentWeightKg"
              label="Current weight"
              type="number"
              inputMode="decimal"
              suffix="kg"
              value={answers.currentWeightKg}
              onChange={updateField('currentWeightKg')}
              placeholder="e.g. 48"
              min={30}
              max={200}
              step="0.1"
              error={error}
              autoFocus
            />
          </>
        )}

        {step === 2 && (
          <>
            <h1 className="onboarding-page__title">Your height</h1>
            <p className="onboarding-page__subtitle">
              Used quietly in the background — not the star of the show.
            </p>
            <Field
              id="heightCm"
              label="Height"
              type="number"
              inputMode="decimal"
              suffix="cm"
              value={answers.heightCm}
              onChange={updateField('heightCm')}
              placeholder="e.g. 160"
              min={120}
              max={220}
              step="1"
              error={error}
              autoFocus
            />
          </>
        )}

        {step === 3 && (
          <>
            <h1 className="onboarding-page__title">Your target weight</h1>
            <p className="onboarding-page__subtitle">
              Choose a gentle goal you feel good working toward.
            </p>
            <Field
              id="targetWeightKg"
              label="Target weight"
              type="number"
              inputMode="decimal"
              suffix="kg"
              value={answers.targetWeightKg}
              onChange={updateField('targetWeightKg')}
              placeholder="e.g. 55"
              min={30}
              max={200}
              step="0.1"
              error={error}
              hint={largeGainNote || undefined}
              autoFocus
            />
          </>
        )}

        {step === 4 && (
          <>
            <h1 className="onboarding-page__title">Preferred wake-up time</h1>
            <p className="onboarding-page__subtitle">
              Helps shape a calm daily rhythm.
            </p>
            <Field
              id="wakeTime"
              label="Wake-up time"
              type="time"
              value={answers.wakeTime}
              onChange={updateField('wakeTime')}
              error={error}
              autoFocus
            />
          </>
        )}

        {step === 5 && (
          <>
            <h1 className="onboarding-page__title">Preferred bedtime</h1>
            <p className="onboarding-page__subtitle">
              Rest is part of getting stronger too.
            </p>
            <Field
              id="bedTime"
              label="Bedtime"
              type="time"
              value={answers.bedTime}
              onChange={updateField('bedTime')}
              error={error}
              autoFocus
            />
          </>
        )}

        {step === CONFIRM_STEP && (
          <>
            <h1 className="onboarding-page__title">Your routine is ready.</h1>
            <p className="onboarding-page__subtitle">
              Nice work, {name}. Here’s your gentle starting picture.
            </p>
            <Card className="onboarding-page__summary">
              <dl className="onboarding-summary">
                <div className="onboarding-summary__row">
                  <dt>Current weight</dt>
                  <dd>{formatKg(answers.currentWeightKg)}</dd>
                </div>
                <div className="onboarding-summary__row">
                  <dt>Target weight</dt>
                  <dd>{formatKg(answers.targetWeightKg)}</dd>
                </div>
                <div className="onboarding-summary__row">
                  <dt>First milestone</dt>
                  <dd>{formatKg(milestone)}</dd>
                </div>
              </dl>
              <p className="onboarding-page__encourage">
                Small, steady steps — eat what you can, move gently, rest well.
                You’re already beginning.
              </p>
            </Card>
            {submitError ? (
              <p className="onboarding-page__submit-error" role="alert">
                {submitError}
              </p>
            ) : null}
          </>
        )}
      </div>

      <div className="onboarding-page__actions">
        {step > 0 ? (
          <Button
            variant="ghost"
            size="lg"
            onClick={handleBack}
            disabled={saving}
          >
            Back
          </Button>
        ) : (
          <span />
        )}
        {step < CONFIRM_STEP ? (
          <Button variant="primary" size="lg" onClick={handleContinue}>
            Continue
          </Button>
        ) : (
          <Button
            variant="primary"
            size="lg"
            onClick={handleFinish}
            disabled={saving}
          >
            {saving ? 'Saving…' : 'Start my routine'}
          </Button>
        )}
      </div>
    </div>
  );
}
