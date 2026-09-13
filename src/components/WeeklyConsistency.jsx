import Card from './Card.jsx';
import './WeeklyConsistency.css';

const DAY_LETTERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const DAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

function dayMeta(dateKey) {
  const [y, m, d] = dateKey.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  const index = date.getDay();
  return {
    letter: DAY_LETTERS[index],
    name: DAY_NAMES[index],
  };
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
        {days.map((day) => {
          const meta = dayMeta(day.dateKey);
          const status = day.hasCheckIn
            ? `${meta.name}: check-in logged, ${day.completedCount} tasks`
            : `${meta.name}: no check-in`;
          return (
            <li key={day.dateKey} className="weekly-consistency__day">
              <span
                className={[
                  'weekly-consistency__dot',
                  day.hasCheckIn ? 'weekly-consistency__dot--on' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                aria-hidden
              />
              <span className="weekly-consistency__letter" aria-hidden>
                {meta.letter}
              </span>
              <span className="visually-hidden">{status}</span>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
