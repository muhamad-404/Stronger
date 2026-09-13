import { useEffect } from 'react';
import './GoalCelebration.css';

/**
 * Quiet acknowledgment when a goal is first completed — not a party popup.
 */
export default function GoalCelebration({ goal, onDismiss }) {
  useEffect(() => {
    if (!goal) return undefined;
    const timer = setTimeout(() => {
      onDismiss?.(goal.id);
    }, 5200);
    return () => clearTimeout(timer);
  }, [goal, onDismiss]);

  if (!goal) return null;

  return (
    <div
      className="goal-celebration"
      role="status"
      aria-live="polite"
    >
      <p className="goal-celebration__eyebrow">Milestone</p>
      <p className="goal-celebration__title">{goal.title}</p>
      <p className="goal-celebration__copy">
        You reached this one. Take a breath — then keep going at your pace.
      </p>
      <button
        type="button"
        className="goal-celebration__dismiss"
        onClick={() => onDismiss?.(goal.id)}
      >
        Got it
      </button>
    </div>
  );
}
