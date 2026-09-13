import { Link } from 'react-router-dom';
import Card from './Card.jsx';
import './SleepProgressCard.css';

export default function SleepProgressCard({ journal, consistency }) {
  const hours = journal?.sleepHours;
  const quality = journal?.sleepQuality;

  return (
    <Card className="sleep-progress-card">
      <div className="sleep-progress-card__head">
        <div>
          <p className="sleep-progress-card__label">Sleep</p>
          <p className="sleep-progress-card__copy">
            From your sleep log — linked to weekly consistency.
          </p>
        </div>
        <Link to="/sleep" className="sleep-progress-card__cta">
          Open
        </Link>
      </div>

      <dl className="sleep-progress-card__stats">
        <div>
          <dt>Today</dt>
          <dd>{hours != null ? `${hours}h` : 'Not logged'}</dd>
        </div>
        <div>
          <dt>Quality</dt>
          <dd>{quality != null ? `${quality}/5` : '—'}</dd>
        </div>
        <div>
          <dt>Week</dt>
          <dd>
            {consistency?.sleepPercent != null
              ? `${consistency.sleepPercent}% nights`
              : '—'}
          </dd>
        </div>
      </dl>
    </Card>
  );
}
