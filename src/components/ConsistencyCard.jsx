import Card from './Card.jsx';
import ProgressBar from './ProgressBar.jsx';
import './ConsistencyCard.css';

function Row({ label, value }) {
  const display = value == null ? '—' : `${value}%`;
  return (
    <div className="consistency-card__row">
      <div className="consistency-card__row-head">
        <span>{label}</span>
        <strong>{display}</strong>
      </div>
      <ProgressBar
        value={value == null ? 0 : value}
        max={100}
        label={label}
      />
    </div>
  );
}

export default function ConsistencyCard({ consistency }) {
  if (!consistency) return null;

  return (
    <Card className="consistency-card">
      <p className="consistency-card__label">Consistency · last 7 days</p>
      <Row label="Food" value={consistency.foodPercent} />
      <Row label="Workout" value={consistency.workoutPercent} />
      <Row label="Sleep" value={consistency.sleepPercent} />
      <Row label="Routine" value={consistency.routinePercent} />
      <p className="consistency-card__hint">
        Based on what you logged — empty days simply leave room to grow.
      </p>
    </Card>
  );
}
