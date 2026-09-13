import { useRef } from 'react';
import Button from './Button.jsx';
import { useDialogA11y } from '../hooks/useDialogA11y.js';
import './SubstituteSheet.css';

export default function SubstituteSheet({
  open,
  alternatives = [],
  currentMealId,
  onClose,
  onSelect,
}) {
  const panelRef = useRef(null);
  useDialogA11y({ open, onClose, panelRef });

  if (!open) return null;

  return (
    <div
      className="substitute-sheet"
      role="dialog"
      aria-modal="true"
      aria-labelledby="substitute-sheet-title"
      aria-describedby="substitute-sheet-hint"
    >
      <button
        type="button"
        className="substitute-sheet__backdrop"
        aria-label="Close"
        onClick={onClose}
      />
      <div className="substitute-sheet__panel" ref={panelRef}>
        <h2 id="substitute-sheet-title" className="substitute-sheet__title">
          Choose a substitute
        </h2>
        <p id="substitute-sheet-hint" className="substitute-sheet__hint">
          Same meal type — pick what feels doable today.
        </p>
        <ul className="substitute-sheet__list">
          {alternatives.map((meal) => {
            const isCurrent = meal.id === currentMealId;
            return (
              <li key={meal.id}>
                <button
                  type="button"
                  className={[
                    'substitute-sheet__item',
                    isCurrent ? 'substitute-sheet__item--current' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  aria-current={isCurrent ? 'true' : undefined}
                  onClick={() => onSelect(meal.id)}
                >
                  <span className="substitute-sheet__item-title">
                    {meal.title}
                    {isCurrent ? (
                      <span className="substitute-sheet__current-tag">
                        {' '}
                        (current)
                      </span>
                    ) : null}
                  </span>
                  <span className="substitute-sheet__item-desc">
                    {meal.description}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        {!alternatives.length ? (
          <p className="substitute-sheet__empty">
            No other options in this category yet.
          </p>
        ) : null}
        <Button variant="ghost" fullWidth onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
