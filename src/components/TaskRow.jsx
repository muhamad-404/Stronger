import { Check } from 'lucide-react';
import './TaskRow.css';

export default function TaskRow({
  title,
  timeLabel,
  icon: Icon,
  completed,
  onToggle,
}) {
  return (
    <button
      type="button"
      className={[
        'task-row',
        completed ? 'task-row--completed' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={onToggle}
      aria-pressed={completed}
      aria-label={`${title}, ${timeLabel}. ${
        completed ? 'Completed' : 'Not completed'
      }. Activate to toggle.`}
    >
      <span className="task-row__icon" aria-hidden>
        {Icon ? <Icon size={20} strokeWidth={2} /> : null}
      </span>
      <span className="task-row__text">
        <span className="task-row__title">{title}</span>
        <span className="task-row__time">{timeLabel}</span>
      </span>
      <span
        className={[
          'task-row__check',
          completed ? 'task-row__check--on' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        aria-hidden
      >
        {completed ? <Check size={14} strokeWidth={2.5} /> : null}
      </span>
    </button>
  );
}
