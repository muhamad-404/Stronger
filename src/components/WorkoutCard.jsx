import { Link } from 'react-router-dom';
import Card from './Card.jsx';
import { getWorkoutExercises } from '../data/workouts.js';
import './WorkoutCard.css';

export default function WorkoutCard({
  workout,
  badge,
  to,
  startTo,
  ctaLabel = 'Start',
}) {
  if (!workout) return null;
  const count = getWorkoutExercises(workout.id).length;

  return (
    <Card className="workout-card">
      <div className="workout-card__top">
        {badge ? <span className="workout-card__badge">{badge}</span> : null}
        <h3 className="workout-card__title">{workout.name}</h3>
        <p className="workout-card__desc">{workout.description}</p>
        <p className="workout-card__meta">{count} exercises · home bodyweight</p>
      </div>
      <div className="workout-card__actions">
        {to ? (
          <Link to={to} className="workout-card__secondary">
            Details
          </Link>
        ) : null}
        {startTo ? (
          <Link to={startTo} className="workout-card__primary">
            {ctaLabel}
          </Link>
        ) : null}
      </div>
    </Card>
  );
}
