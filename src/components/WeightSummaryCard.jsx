import Card from './Card.jsx';
import Button from './Button.jsx';
import { formatKg } from '../utils/dates.js';
import './WeightSummaryCard.css';

function formatDelta(delta) {
  if (!Number.isFinite(delta)) return '—';
  if (delta === 0) return '0 kg';
  const sign = delta > 0 ? '+' : '';
  return `${sign}${delta} kg`;
}

export default function WeightSummaryCard({ summary, onLogWeight }) {
  if (!summary) return null;

  return (
    <Card className="weight-summary">
      <div className="weight-summary__head">
        <p className="weight-summary__label">Your progress</p>
        <Button variant="ghost" size="sm" onClick={onLogWeight}>
          Log weight
        </Button>
      </div>

      <div className="weight-summary__grid">
        <div>
          <p className="weight-summary__value">
            {formatKg(summary.startingKg).replace(' kg', '')}
            <span> kg</span>
          </p>
          <p className="weight-summary__caption">Starting</p>
        </div>
        <div>
          <p className="weight-summary__value">
            {formatKg(summary.currentKg).replace(' kg', '')}
            <span> kg</span>
          </p>
          <p className="weight-summary__caption">Current</p>
        </div>
        <div>
          <p className="weight-summary__value">
            {formatKg(summary.goalKg).replace(' kg', '')}
            <span> kg</span>
          </p>
          <p className="weight-summary__caption">Goal</p>
        </div>
      </div>

      <p className="weight-summary__delta">
        {formatDelta(summary.totalChangeKg)} since you started
      </p>

      {summary.activeMilestone ? (
        <p className="weight-summary__milestone">
          {summary.remainingToMilestoneKg != null &&
          summary.remainingToMilestoneKg > 0
            ? `${formatKg(summary.remainingToMilestoneKg)} to ${summary.activeMilestone.label} (${formatKg(summary.activeMilestone.kg)})`
            : summary.remainingToMilestoneKg != null &&
                summary.remainingToMilestoneKg <= 0
              ? `You’ve reached ${summary.activeMilestone.label}`
              : null}
        </p>
      ) : null}

      <p className="weight-summary__note">
        Weight naturally fluctuates day to day. Look at the trend over weeks,
        not every single weigh-in.
      </p>
    </Card>
  );
}
