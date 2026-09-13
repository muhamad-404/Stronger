import Card from './Card.jsx';
import Button from './Button.jsx';
import { formatKg } from '../utils/dates.js';
import './GoalsCard.css';

export default function GoalsCard({ goals, onEdit }) {
  if (!goals) return null;

  return (
    <Card className="goals-card">
      <div className="goals-card__head">
        <p className="goals-card__label">Milestones</p>
        <Button variant="ghost" size="sm" onClick={onEdit}>
          Edit
        </Button>
      </div>
      <ul className="goals-card__list">
        <li>
          <span>Starting</span>
          <strong>{formatKg(goals.startingWeightKg)}</strong>
        </li>
        <li>
          <span>Milestone 1</span>
          <strong>{formatKg(goals.milestone1Kg)}</strong>
        </li>
        <li>
          <span>Milestone 2</span>
          <strong>{formatKg(goals.milestone2Kg)}</strong>
        </li>
        <li>
          <span>Longer-term</span>
          <strong>{formatKg(goals.longTermKg)}</strong>
        </li>
      </ul>
    </Card>
  );
}
