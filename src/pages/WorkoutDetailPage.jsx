import { Link, useParams } from 'react-router-dom';
import ExerciseCard from '../components/ExerciseCard.jsx';
import MoveBackLink from '../components/MoveBackLink.jsx';
import PageHeader from '../components/PageHeader.jsx';
import {
  getWorkoutById,
  getWorkoutExercises,
  WORKOUT_SAFETY,
} from '../data/workouts.js';
import './MoveSubpage.css';

export default function WorkoutDetailPage({ fixedId }) {
  const params = useParams();
  const id = String(fixedId || params.workoutId || 'A').toUpperCase();
  const workout = getWorkoutById(id);
  const exercises = getWorkoutExercises(id);

  if (!workout) {
    return (
      <div className="page move-subpage">
        <MoveBackLink />
        <PageHeader title="Workout not found" />
      </div>
    );
  }

  return (
    <div className="page move-subpage">
      <MoveBackLink />
      <PageHeader title={workout.name} subtitle={workout.description} />

      <Link to={`/move/session/${workout.id}`} className="move-subpage__start-btn">
        Start {workout.name}
      </Link>

      <h2 className="move-subpage__section-label">Exercises</h2>
      <div className="move-subpage__exercise-list">
        {exercises.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </div>

      <ul className="move-subpage__safety">
        {WORKOUT_SAFETY.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </div>
  );
}
