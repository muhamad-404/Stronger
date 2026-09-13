import Card from './Card.jsx';
import './WeeklyConsistency.css';

const DAY_LETTERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function dayLetterForKey(dateKey) {
  const [y, m, d] = dateKey.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return DAY_LETTERS[date.getDay()];
}

export default function WeeklyConsistency({ weeklySummary }) {
  if (!weeklySummary) return null;

  const { daysWithCheckIns, totalDays, days } = weeklySummary;

  return (
    <Card className="weekly-consistency">
      <div className="weekly-consistency__header">
        <p className="weekly-consistency__label">This week</p>
        <p className="weekly-consistency__count">
          {daysWithCheckIns} of {totalDays} days with check-ins
        </p>
      </div>
      <ul className="weekly-consistency__days" aria-label="Weekly check-ins">
        {days.map((day) => (
          <li key={day.dateKey} className="weekly-consistency__day">
            <span
              className={[
                'weekly-consistency__dot',
                day.hasCheckIn ? 'weekly-consistency__dot--on' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              title={`${day.completedCount} tasks`}
            />
            <span className="weekly-consistency__letter">
              {dayLetterForKey(day.dateKey)}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
