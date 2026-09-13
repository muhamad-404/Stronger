import Card from './Card.jsx';
import ProgressBar from './ProgressBar.jsx';
import { formatKg } from '../utils/dates.js';
import './WeightProgressCard.css';

export default function WeightProgressCard({ weightStats }) {
  if (!weightStats) {
    return (
      <Card className="weight-progress-card">
        <p className="weight-progress-card__label">Your progress</p>
        <p className="weight-progress-card__empty">
          Your weight goal will appear here after setup.
        </p>
      </Card>
    );
  }

  const { currentKg, milestoneKg, percent, deltaKg } = weightStats;
  const deltaLabel =
    deltaKg === 0
      ? 'Right where you started — every day still counts.'
      : deltaKg > 0
        ? `+${formatKg(deltaKg).replace(' kg', '')} kg since you started`
        : `${formatKg(deltaKg).replace(' kg', '')} kg since you started`;

  return (
    <Card className="weight-progress-card">
      <p className="weight-progress-card__label">Your progress</p>
      <p className="weight-progress-card__range">
        <span>{formatKg(currentKg)}</span>
        <span className="weight-progress-card__arrow" aria-hidden>
          →
        </span>
        <span>{formatKg(milestoneKg)}</span>
      </p>
      <p className="weight-progress-card__caption">First milestone</p>
      <ProgressBar
        value={percent}
        max={100}
        label="Milestone progress"
        className="weight-progress-card__bar"
      />
      <p className="weight-progress-card__delta">{deltaLabel}</p>
    </Card>
  );
}
