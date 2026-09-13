import ProgressBar from './ProgressBar.jsx';
import './StepProgress.css';

export default function StepProgress({
  current,
  total,
  label,
}) {
  const safeTotal = total > 0 ? total : 1;
  const displayCurrent = Math.min(Math.max(current, 0), safeTotal);
  const value = displayCurrent;
  const progressLabel =
    label || `Step ${displayCurrent} of ${safeTotal}`;

  return (
    <div className="step-progress">
      <div className="step-progress__meta">
        <span className="step-progress__label">{progressLabel}</span>
      </div>
      <ProgressBar value={value} max={safeTotal} />
    </div>
  );
}
