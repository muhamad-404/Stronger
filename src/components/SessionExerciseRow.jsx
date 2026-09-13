import { Check } from 'lucide-react';
import Button from './Button.jsx';
import { getExerciseById } from '../data/workouts.js';
import './SessionExerciseRow.css';

export default function SessionExerciseRow({
  exerciseState,
  onToggleSet,
  onChangeActual,
  onCompleteExercise,
  onSkipRemaining,
}) {
  const catalog = getExerciseById(exerciseState.exerciseId);
  if (!catalog || !exerciseState) return null;

  const unit = exerciseState.tracking === 'time' ? 's' : '';
  const doneSets = exerciseState.sets.filter((s) => s.completed).length;

  return (
    <div
      className={[
        'session-ex',
        exerciseState.completed ? 'session-ex--done' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="session-ex__head">
        <div>
          <h3 className="session-ex__title">{catalog.name}</h3>
          <p className="session-ex__meta">
            {doneSets}/{exerciseState.sets.length} sets · Rest {catalog.restSeconds}s
          </p>
        </div>
      </div>

      <ul className="session-ex__sets">
        {exerciseState.sets.map((set) => (
          <li key={set.index} className="session-ex__set">
            <button
              type="button"
              className={[
                'session-ex__check',
                set.completed ? 'session-ex__check--on' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              aria-pressed={set.completed}
              aria-label={`Set ${set.index + 1}`}
              onClick={() =>
                onToggleSet?.(
                  exerciseState.exerciseId,
                  set.index,
                  !set.completed,
                )
              }
            >
              {set.completed ? <Check size={14} strokeWidth={2.5} /> : null}
            </button>
            <span className="session-ex__set-label">Set {set.index + 1}</span>
            <label className="session-ex__actual">
              <span className="session-ex__actual-label">
                {exerciseState.tracking === 'time' ? 'Seconds' : 'Reps'}
              </span>
              <input
                type="number"
                inputMode="numeric"
                min={0}
                max={200}
                value={set.actual}
                disabled={exerciseState.completed}
                onChange={(e) =>
                  onChangeActual?.(
                    exerciseState.exerciseId,
                    set.index,
                    e.target.value,
                  )
                }
              />
              {unit ? <span className="session-ex__unit">{unit}</span> : null}
            </label>
          </li>
        ))}
      </ul>

      {!exerciseState.completed ? (
        <div className="session-ex__actions">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onCompleteExercise?.(exerciseState.exerciseId)}
            disabled={doneSets < exerciseState.sets.length}
          >
            Mark exercise complete
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSkipRemaining?.(exerciseState.exerciseId)}
          >
            Finish with remaining
          </Button>
        </div>
      ) : (
        <p className="session-ex__done-label">Exercise complete</p>
      )}
    </div>
  );
}
