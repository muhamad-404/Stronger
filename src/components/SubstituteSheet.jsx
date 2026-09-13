import Button from './Button.jsx';
import './SubstituteSheet.css';

export default function SubstituteSheet({
  open,
  alternatives = [],
  currentMealId,
  onClose,
  onSelect,
}) {
  if (!open) return null;

  return (
    <div
      className="substitute-sheet"
      role="dialog"
      aria-modal="true"
      aria-labelledby="substitute-sheet-title"
    >
      <button
        type="button"
        className="substitute-sheet__backdrop"
        aria-label="Close"
        onClick={onClose}
      />
      <div className="substitute-sheet__panel">
        <h2 id="substitute-sheet-title" className="substitute-sheet__title">
          Choose a substitute
        </h2>
        <p className="substitute-sheet__hint">
          Same meal type — pick what feels doable today.
        </p>
        <ul className="substitute-sheet__list">
          {alternatives.map((meal) => (
            <li key={meal.id}>
              <button
                type="button"
                className={[
                  'substitute-sheet__item',
                  meal.id === currentMealId
                    ? 'substitute-sheet__item--current'
                    : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => onSelect(meal.id)}
              >
                <span className="substitute-sheet__item-title">{meal.title}</span>
                <span className="substitute-sheet__item-desc">
                  {meal.description}
                </span>
              </button>
            </li>
          ))}
        </ul>
        {!alternatives.length ? (
          <p className="substitute-sheet__empty">No other options in this category yet.</p>
        ) : null}
        <Button variant="ghost" fullWidth onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
