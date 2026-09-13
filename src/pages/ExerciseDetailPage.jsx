import { useParams } from 'react-router-dom';
import Card from '../components/Card.jsx';
import MoveBackLink from '../components/MoveBackLink.jsx';
import PageHeader from '../components/PageHeader.jsx';
import {
  formatExerciseTarget,
  getExerciseById,
} from '../data/workouts.js';
import './MoveSubpage.css';

export default function ExerciseDetailPage() {
  const { exerciseId } = useParams();
  const exercise = getExerciseById(exerciseId);

  if (!exercise) {
    return (
      <div className="page move-subpage">
        <MoveBackLink to="/move" label="Move" />
        <PageHeader title="Exercise not found" />
      </div>
    );
  }

  return (
    <div className="page move-subpage">
      <MoveBackLink to="/move" label="Move" />
      <PageHeader
        title={exercise.name}
        subtitle={formatExerciseTarget(exercise)}
      />

      <Card>
        <h2 className="move-subpage__block-title">How to do it</h2>
        <p className="move-subpage__copy">{exercise.instructions}</p>

        <h2 className="move-subpage__block-title">Beginner variation</h2>
        <p className="move-subpage__copy">{exercise.beginnerVariation}</p>

        <h2 className="move-subpage__block-title">Easier alternative</h2>
        <p className="move-subpage__copy">{exercise.easierAlternative}</p>

        <h2 className="move-subpage__block-title">Rest</h2>
        <p className="move-subpage__copy">{exercise.restSeconds} seconds between sets</p>

        <h2 className="move-subpage__block-title">Common form mistakes</h2>
        <ul className="move-subpage__bullets">
          {exercise.commonMistakes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
