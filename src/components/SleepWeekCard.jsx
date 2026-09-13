import Card from './Card.jsx';
import './SleepWeekCard.css';

function shortDay(dateKey) {
  const [y, m, d] = dateKey.split('-').map(Number);
  const date = new Date(y, m - 1, d, 12);
  return date.toLocaleDateString('en-GB', { weekday: 'short' });
}

export default function SleepWeekCard({ week }) {
  if (!week) return null;
  const { history, nightsLogged, consistencyPercent, avgHours, avgQuality } =
    week;

  return (
    <Card className="sleep-week">
      <p className="sleep-week__label">This week</p>

      <div className="sleep-week__stats">
        <div>
          <p className="sleep-week__stat-value">
            {consistencyPercent != null ? `${consistencyPercent}%` : '—'}
          </p>
          <p className="sleep-week__stat-label">Logged</p>
        </div>
        <div>
          <p className="sleep-week__stat-value">
            {avgHours != null ? `${avgHours}h` : '—'}
          </p>
          <p className="sleep-week__stat-label">Avg duration</p>
        </div>
        <div>
          <p className="sleep-week__stat-value">
            {avgQuality != null ? avgQuality : '—'}
          </p>
          <p className="sleep-week__stat-label">Avg quality</p>
        </div>
      </div>

      <p className="sleep-week__count">
        {nightsLogged} of {week.days} nights logged
      </p>

      <ul className="sleep-week__strip" aria-label="Weekly sleep history">
        {history.map((night) => {
          const logged =
            night.hours != null ||
            night.quality != null ||
            night.bedtime ||
            night.wakeTime;
          const fill = night.hours != null
            ? Math.min(100, Math.round((night.hours / 9) * 100))
            : logged
              ? 40
              : 0;
          return (
            <li key={night.date} className="sleep-week__day">
              <div
                className={[
                  'sleep-week__bar',
                  logged ? 'sleep-week__bar--logged' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                style={{ height: `${Math.max(fill, logged ? 18 : 8)}%` }}
                title={
                  logged
                    ? `${night.hours != null ? `${night.hours}h` : 'Logged'}${
                        night.quality != null ? ` · Q${night.quality}` : ''
                      }`
                    : 'No log'
                }
              />
              <span className="sleep-week__dow">{shortDay(night.date)}</span>
              <span className="sleep-week__hours">
                {night.hours != null ? night.hours : '·'}
              </span>
            </li>
          );
        })}
      </ul>

      {(week.targetBed || week.targetWake) && (
        <p className="sleep-week__targets">
          Routine targets
          {week.targetBed ? ` · bed ${week.targetBed}` : ''}
          {week.targetWake ? ` · wake ${week.targetWake}` : ''}
          {week.bedConsistencyPercent != null
            ? ` · bedtime near target ${week.bedConsistencyPercent}%`
            : ''}
        </p>
      )}
    </Card>
  );
}
