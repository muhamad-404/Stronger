import { Link } from 'react-router-dom';
import Card from '../components/Card.jsx';
import MoveBackLink from '../components/MoveBackLink.jsx';
import PageHeader from '../components/PageHeader.jsx';
import WorkoutCard from '../components/WorkoutCard.jsx';
import { useWorkoutSchedule } from '../hooks/useWorkoutSchedule.js';
import './MoveSubpage.css';

export default function MoveTodayPage() {
  const schedule = useWorkoutSchedule();

  return (
    <div className="page move-subpage">
      <MoveBackLink />
      <PageHeader
        title="Today's plan"
        subtitle={schedule.dateLabel}
      />

      {schedule.isRest ? (
        <Card>
          <h2 className="move-subpage__title">Rest day</h2>
          <p className="move-subpage__copy">
            Strength days are usually Monday, Wednesday, and Friday. Today is
            for recovery — sleep, food, and easy movement if you feel like it.
            No need to force a hard cardio session.
          </p>
          <p className="move-subpage__copy">
            You can still browse Workout A or B if you want to practice form
            gently.
          </p>
          <div className="move-subpage__row-links">
            <Link to="/move/a">Workout A</Link>
            <Link to="/move/b">Workout B</Link>
          </div>
        </Card>
      ) : (
        <WorkoutCard
          workout={schedule.workout}
          badge="Scheduled today"
          to={`/move/${schedule.type.toLowerCase()}`}
          startTo={`/move/session/${schedule.type}`}
          ctaLabel="Start workout"
        />
      )}
    </div>
  );
}
