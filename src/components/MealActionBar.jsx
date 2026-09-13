import { Check, RefreshCw, StickyNote } from 'lucide-react';
import Button from './Button.jsx';
import './MealActionBar.css';

export default function MealActionBar({
  eaten,
  onToggleEaten,
  onSubstitute,
  onAddNote,
  disabled = false,
}) {
  return (
    <div className="meal-action-bar">
      <Button
        variant={eaten ? 'secondary' : 'primary'}
        size="lg"
        fullWidth
        disabled={disabled}
        onClick={onToggleEaten}
      >
        <Check size={18} aria-hidden />
        {eaten ? 'Eaten — tap to undo' : 'Mark as eaten'}
      </Button>
      <div className="meal-action-bar__row">
        <Button
          variant="ghost"
          size="md"
          disabled={disabled}
          onClick={onSubstitute}
        >
          <RefreshCw size={16} aria-hidden />
          Substitute
        </Button>
        <Button
          variant="ghost"
          size="md"
          disabled={disabled}
          onClick={onAddNote}
        >
          <StickyNote size={16} aria-hidden />
          Add note
        </Button>
      </div>
    </div>
  );
}
