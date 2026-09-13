import { Scale, Utensils, Dumbbell, Moon, ListChecks } from 'lucide-react';
import Card from './Card.jsx';
import Button from './Button.jsx';
import ProgressBar from './ProgressBar.jsx';
import { formatGoalProgress } from '../services/goals.js';
import './GoalCard.css';

const CATEGORY_META = {
  weight: { label: 'Weight', Icon: Scale },
  food: { label: 'Food', Icon: Utensils },
  strength: { label: 'Strength', Icon: Dumbbell },
  sleep: { label: 'Sleep', Icon: Moon },
  routine: { label: 'Routine', Icon: ListChecks },
};

export default function GoalCard({ goal, onOpen }) {
  if (!goal) return null;
  const meta = CATEGORY_META[goal.category] || CATEGORY_META.routine;
  const Icon = meta.Icon;
  const trackingLabel =
    goal.tracking === 'auto' ? 'Linked to your logs' : 'Manual tracking';

  return (
    <Card className="goal-card" padding="md">
      <div className="goal-card__top">
        <span className={`goal-card__cat goal-card__cat--${goal.category}`}>
          <Icon size={14} strokeWidth={2} aria-hidden />
          {meta.label}
        </span>
        <span
          className={[
            'goal-card__status',
            goal.status === 'completed' ? 'goal-card__status--done' : '',
            goal.status === 'paused' ? 'goal-card__status--paused' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {goal.status === 'completed'
            ? 'Reached'
            : goal.status === 'paused'
              ? 'Paused'
              : 'Active'}
        </span>
      </div>

      <h3 className="goal-card__title">{goal.title}</h3>

      <ProgressBar
        value={goal.hasLive || goal.tracking === 'manual' ? goal.percent : 0}
        max={100}
        showValue
        label={
          goal.hasLive || goal.tracking === 'manual'
            ? formatGoalProgress(goal)
            : 'No logged data yet'
        }
      />

      <div className="goal-card__meta">
        <span>{trackingLabel}</span>
        {goal.targetDate ? <span>By {goal.targetDate}</span> : null}
      </div>

      <Button variant="secondary" size="sm" fullWidth onClick={() => onOpen(goal)}>
        {goal.tracking === 'manual' ? 'Update progress' : 'Details'}
      </Button>
    </Card>
  );
}
