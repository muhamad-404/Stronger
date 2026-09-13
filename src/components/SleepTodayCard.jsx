import Card from './Card.jsx';
import Button from './Button.jsx';
import './SleepTodayCard.css';

function hasSleepData(record) {
  return (
    record &&
    (record.hours != null ||
      record.bedtime ||
      record.wakeTime ||
      record.quality != null)
  );
}

export default function SleepTodayCard({ record, onLog }) {
  const logged = hasSleepData(record);

  return (
    <Card className="sleep-today">
      <div className="sleep-today__head">
        <div>
          <p className="sleep-today__label">Today’s sleep</p>
          <p className="sleep-today__sub">
            Night ending this morning — log when you wake.
          </p>
        </div>
        <Button variant="secondary" size="sm" onClick={onLog}>
          {logged ? 'Edit' : 'Log'}
        </Button>
      </div>

      {logged ? (
        <dl className="sleep-today__grid">
          <div>
            <dt>Bedtime</dt>
            <dd>{record.bedtime || '—'}</dd>
          </div>
          <div>
            <dt>Wake</dt>
            <dd>{record.wakeTime || '—'}</dd>
          </div>
          <div>
            <dt>Duration</dt>
            <dd>{record.hours != null ? `${record.hours}h` : '—'}</dd>
          </div>
          <div>
            <dt>Quality</dt>
            <dd>{record.quality != null ? `${record.quality}/5` : '—'}</dd>
          </div>
        </dl>
      ) : (
        <p className="sleep-today__empty">
          No sleep logged yet for today.
        </p>
      )}

      {logged && record.note ? (
        <p className="sleep-today__note">{record.note}</p>
      ) : null}
    </Card>
  );
}
