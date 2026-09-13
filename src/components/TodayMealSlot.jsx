import { Link } from 'react-router-dom';
import { Check, ChevronRight } from 'lucide-react';
import './TodayMealSlot.css';

export default function TodayMealSlot({
  slot,
  onToggleEaten,
}) {
  if (!slot) return null;
  const meal = slot.meal;

  return (
    <div
      className={[
        'today-meal-slot',
        slot.eaten ? 'today-meal-slot--eaten' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <button
        type="button"
        className={[
          'today-meal-slot__check',
          slot.eaten ? 'today-meal-slot__check--on' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        aria-pressed={slot.eaten}
        aria-label={slot.eaten ? 'Mark as not eaten' : 'Mark as eaten'}
        onClick={() => onToggleEaten?.(slot.slotId, !slot.eaten)}
      >
        {slot.eaten ? <Check size={14} strokeWidth={2.5} /> : null}
      </button>

      <Link
        to={meal ? `/eat/meal/${meal.id}?slot=${slot.slotId}` : '/eat/browse'}
        className="today-meal-slot__main"
      >
        <span className="today-meal-slot__label">{slot.label}</span>
        <span className="today-meal-slot__title">
          {meal?.title || 'Choose a meal'}
        </span>
        {meal?.description ? (
          <span className="today-meal-slot__desc">{meal.description}</span>
        ) : null}
      </Link>

      <ChevronRight
        className="today-meal-slot__chevron"
        size={18}
        aria-hidden
      />
    </div>
  );
}
