import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { formatExerciseTarget } from '../data/workouts.js';
import './ExerciseCard.css';

export default function ExerciseCard({ exercise, to }) {
  if (!exercise) return null;
  const href = to || `/move/exercise/${exercise.id}`;

  return (
    <Link to={href} className="exercise-card">
      <div className="exercise-card__text">
        <h3 className="exercise-card__title">{exercise.name}</h3>
        <p className="exercise-card__target">{formatExerciseTarget(exercise)}</p>
        <p className="exercise-card__rest">Rest {exercise.restSeconds}s</p>
      </div>
      <ChevronRight className="exercise-card__chevron" size={18} aria-hidden />
    </Link>
  );
}
