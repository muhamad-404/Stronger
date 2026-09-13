import { Check, Pencil, Trash2 } from 'lucide-react';
import './FoodLogItem.css';

function portionLabel(entry) {
  if (entry.portion === 'custom' && entry.portionNote) {
    return entry.portionNote;
  }
  return entry.portion;
}

export default function FoodLogItem({
  entry,
  onToggle,
  onEdit,
  onDelete,
}) {
  if (!entry) return null;

  return (
    <div
      className={[
        'food-log-item',
        entry.eaten ? 'food-log-item--eaten' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <button
        type="button"
        className={[
          'food-log-item__check',
          entry.eaten ? 'food-log-item__check--on' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        aria-pressed={entry.eaten}
        aria-label={entry.eaten ? 'Mark as not eaten' : 'Mark as eaten'}
        onClick={() => onToggle?.(entry.id)}
      >
        {entry.eaten ? <Check size={14} strokeWidth={2.5} /> : null}
      </button>

      <div className="food-log-item__body">
        <p className="food-log-item__title">{entry.foodTitle}</p>
        <p className="food-log-item__meta">
          <span>{portionLabel(entry)}</span>
          <span aria-hidden>·</span>
          <span>{entry.time}</span>
          {entry.hasProtein ? (
            <>
              <span aria-hidden>·</span>
              <span>Protein</span>
            </>
          ) : null}
          {entry.isDrink ? (
            <>
              <span aria-hidden>·</span>
              <span>Drink</span>
            </>
          ) : null}
        </p>
        {entry.note ? <p className="food-log-item__note">{entry.note}</p> : null}
      </div>

      <div className="food-log-item__actions">
        <button
          type="button"
          className="food-log-item__icon-btn"
          aria-label={`Edit ${entry.foodTitle}`}
          onClick={() => onEdit?.(entry)}
        >
          <Pencil size={16} aria-hidden />
        </button>
        <button
          type="button"
          className="food-log-item__icon-btn"
          aria-label={`Delete ${entry.foodTitle}`}
          onClick={() => onDelete?.(entry)}
        >
          <Trash2 size={16} aria-hidden />
        </button>
      </div>
    </div>
  );
}
