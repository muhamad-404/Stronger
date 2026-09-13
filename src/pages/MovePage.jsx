import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card.jsx';
import PageHeader from '../components/PageHeader.jsx';
import SectionLinkCard from '../components/SectionLinkCard.jsx';
import WorkoutCard from '../components/WorkoutCard.jsx';
import { WORKOUT_A, WORKOUT_B, WORKOUT_SAFETY } from '../data/workouts.js';
import { useWorkoutSchedule } from '../hooks/useWorkoutSchedule.js';
import { getRecentSessions } from '../services/workoutLog.js';
import { CalendarDays, Dumbbell, Shield, BookOpen } from 'lucide-react';
import './MovePage.css';

export default function MovePage() {
  const schedule = useWorkoutSchedule();
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    getRecentSessions(3).then(setRecent).catch(() => setRecent([]));
  }, []);

  return (
    <div className="page move-page">
      <PageHeader
        title="Move"
        subtitle="Home strength to feel stronger — about 3 gentle sessions a week."
      />

      <Card className="move-page__safety">
        <div className="move-page__safety-head">
          <Shield size={18} aria-hidden />
          <h2>Train kindly</h2>
        </div>
        <ul className="move-page__safety-list">
          {WORKOUT_SAFETY.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </Card>

      <section aria-labelledby="move-today-heading">
        <div className="move-page__section-head">
          <h2 id="move-today-heading">Today</h2>
          <Link to="/move/today" className="move-page__see-all">
            Open
          </Link>
        </div>
        {schedule.isRest ? (
          <Card>
            <p className="move-page__rest-title">Rest & recovery</p>
            <p className="move-page__rest-copy">
              No strength session planned today. Walk gently if you like — this
              plan prioritizes strength and rest, not hard cardio.
            </p>
            <Link to="/move/today" className="move-page__text-link">
              See today’s plan →
            </Link>
          </Card>
        ) : (
          <WorkoutCard
            workout={schedule.workout}
            badge={`Today · ${schedule.dateLabel}`}
            to={`/move/${schedule.type.toLowerCase()}`}
            startTo={`/move/session/${schedule.type}`}
            ctaLabel="Start workout"
          />
        )}
      </section>

      <section className="move-page__explore" aria-label="Workouts">
        <h2 className="move-page__section-title">Programs</h2>
        <div className="move-page__links">
          <SectionLinkCard
            to="/move/today"
            title="Today's workout"
            description={
              schedule.isRest
                ? 'Rest day guidance'
                : `${schedule.workout.name} is scheduled`
            }
            icon={CalendarDays}
          />
          <SectionLinkCard
            to="/move/a"
            title="Workout A"
            description={WORKOUT_A.description}
            icon={Dumbbell}
          />
          <SectionLinkCard
            to="/move/b"
            title="Workout B"
            description={WORKOUT_B.description}
            icon={Dumbbell}
          />
          <SectionLinkCard
            to="/guide/workout-guide"
            title="Workout guide"
            description="How to train gently and recover well"
            icon={BookOpen}
          />
        </div>
      </section>

      {recent.length ? (
        <section aria-labelledby="move-recent-heading">
          <h2 id="move-recent-heading" className="move-page__section-title">
            Recent sessions
          </h2>
          <Card padding="none">
            <ul className="move-page__recent">
              {recent.map((session) => (
                <li key={session.id}>
                  <span>Workout {session.workoutId}</span>
                  <span>{session.date}</span>
                </li>
              ))}
            </ul>
          </Card>
        </section>
      ) : null}
    </div>
  );
}
