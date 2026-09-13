import './ProgressBar.css';

export default function ProgressBar({
  value = 0,
  max = 100,
  label,
  showValue = false,
  className = '',
}) {
  const safeMax = max > 0 ? max : 100;
  const clamped = Math.min(Math.max(Number(value) || 0, 0), safeMax);
  const percent = Math.round((clamped / safeMax) * 100);

  return (
    <div className={['progress', className].filter(Boolean).join(' ')}>
      {(label || showValue) && (
        <div className="progress__meta">
          {label ? <span className="progress__label">{label}</span> : <span />}
          {showValue ? (
            <span className="progress__value">{percent}%</span>
          ) : null}
        </div>
      )}
      <div
        className="progress__track"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={safeMax}
        aria-valuenow={clamped}
        aria-valuetext={`${percent} percent`}
        aria-label={label || 'Progress'}
      >
        <div
          className="progress__fill"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
