import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';
import MoveBackLink from '../components/MoveBackLink.jsx';
import PageHeader from '../components/PageHeader.jsx';
import ProgressBar from '../components/ProgressBar.jsx';
import SessionExerciseRow from '../components/SessionExerciseRow.jsx';
import {
  getWorkoutById,
  WORKOUT_SAFETY,
} from '../data/workouts.js';
import { useWorkoutSession } from '../hooks/useWorkoutSession.js';
import { getSessionProgress } from '../services/workoutLog.js';
import './MoveSubpage.css';
import './WorkoutSessionPage.css';

export default function WorkoutSessionPage() {
  const { workoutId } = useParams();
  const id = (workoutId || 'A').toUpperCase();
  const workout = getWorkoutById(id);
  const navigate = useNavigate();
  const {
    session,
    loading,
    error,
    saving,
    progress,
    start,
    toggleSet,
    setActual,
    markExerciseComplete,
    finish,
  } = useWorkoutSession(id);

  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [suggestNext, setSuggestNext] = useState(false);
  const [finishError, setFinishError] = useState(null);

  useEffect(() => {
    if (session?.status === 'in_progress') setStarted(true);
    if (session?.status === 'completed') setFinished(true);
  }, [session]);

  const hitAllTargets = useMemo(() => {
    if (!session) return false;
    return session.exercises.every((ex) =>
      ex.sets.every((set) => set.completed && Number(set.actual) >= Number(set.target)),
    );
  }, [session]);

  if (!workout) {
    return (
      <div className="page move-subpage">
        <MoveBackLink />
        <PageHeader title="Workout not found" />
      </div>
    );
  }

  const handleStart = async () => {
    await start();
    setStarted(true);
    setFinished(false);
  };

  const handleFinish = async () => {
    setFinishError(null);
    try {
      await finish({ suggestedNextReps: suggestNext && hitAllTargets });
      setFinished(true);
    } catch {
      setFinishError('Couldn’t save this workout. Try again.');
    }
  };

  if (loading && !session) {
    return (
      <div className="page move-subpage">
        <MoveBackLink />
        <p className="page-placeholder">Loading session…</p>
      </div>
    );
  }

  if (finished && session?.status === 'completed') {
    const finalProgress = getSessionProgress(session);
    return (
      <div className="page move-subpage">
        <MoveBackLink />
        <PageHeader
          title="Workout complete"
          subtitle={`${workout.name} · nice work showing up.`}
        />
        <Card>
          <p className="move-subpage__copy">
            You finished {finalProgress.completedExercises} of{' '}
            {finalProgress.totalExercises} exercises (
            {finalProgress.completedSets} sets).
          </p>
          {session.suggestedNextReps ? (
            <p className="move-subpage__copy">
              Next time you can aim for about +1–2 reps if it still feels
              comfortable — only if you want to.
            </p>
          ) : null}
          <div className="workout-session__done-actions">
            <Button variant="primary" onClick={() => navigate('/move')}>
              Back to Move
            </Button>
            <Link to="/">Home</Link>
          </div>
        </Card>
      </div>
    );
  }

  if (!started || !session) {
    return (
      <div className="page move-subpage">
        <MoveBackLink to={`/move/${id.toLowerCase()}`} label={workout.name} />
        <PageHeader
          title={`Start ${workout.name}`}
          subtitle="Track sets at your pace. You can change reps anytime."
        />
        <Card className="workout-session__safety">
          <ul>
            {WORKOUT_SAFETY.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </Card>
        {error ? (
          <p className="move-subpage__error" role="alert">
            Something went wrong loading your session.
          </p>
        ) : null}
        <Button
          variant="primary"
          size="lg"
          fullWidth
          disabled={saving}
          onClick={handleStart}
        >
          {saving ? 'Starting…' : 'Start workout'}
        </Button>
      </div>
    );
  }

  return (
    <div className="page move-subpage workout-session">
      <MoveBackLink to="/move" label="Move" />
      <PageHeader
        title={workout.name}
        subtitle="Mark sets as you go — controlled movement first."
      />

      <Card className="workout-session__progress-card">
        <div className="workout-session__progress-head">
          <span>Workout progress</span>
          <strong>
            {progress.completedSets}/{progress.totalSets} sets
          </strong>
        </div>
        <ProgressBar
          value={progress.percent}
          max={100}
          label="Workout progress"
        />
      </Card>

      <p className="workout-session__safety-inline" role="note">
        Stop if there is significant pain. Use stable furniture and rest as
        needed.
      </p>

      <div className="workout-session__list">
        {session.exercises.map((ex) => (
          <SessionExerciseRow
            key={ex.exerciseId}
            exerciseState={ex}
            onToggleSet={toggleSet}
            onChangeActual={setActual}
            onCompleteExercise={(exerciseId) =>
              markExerciseComplete(exerciseId, false)
            }
            onSkipRemaining={(exerciseId) =>
              markExerciseComplete(exerciseId, true)
            }
          />
        ))}
      </div>

      {hitAllTargets ? (
        <label className="workout-session__suggest">
          <input
            type="checkbox"
            checked={suggestNext}
            onChange={(e) => setSuggestNext(e.target.checked)}
          />
          Aim for +1–2 reps next time? (optional — never required)
        </label>
      ) : null}

      {finishError ? (
        <p className="move-subpage__error" role="alert">
          {finishError}
        </p>
      ) : null}

      <Button
        variant="primary"
        size="lg"
        fullWidth
        disabled={saving}
        onClick={handleFinish}
      >
        {saving ? 'Saving…' : 'Finish workout'}
      </Button>
    </div>
  );
}
