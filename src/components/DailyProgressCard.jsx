import Card from './Card.jsx';
import ProgressBar from './ProgressBar.jsx';
import './DailyProgressCard.css';

export default function DailyProgressCard({ completedCount, totalCount }) {
  return (
    <Card className="daily-progress-card">
      <div className="daily-progress-card__header">
        <p className="daily-progress-card__label">Today&apos;s progress</p>
        <p className="daily-progress-card__count">
          {completedCount} / {totalCount} completed
        </p>
      </div>
      <ProgressBar
        value={completedCount}
        max={totalCount}
        label="Tasks completed today"
      />
    </Card>
  );
}
