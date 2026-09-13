import Card from './Card.jsx';
import ProgressBar from './ProgressBar.jsx';
import './FoodDaySummary.css';

export default function FoodDaySummary({ summary }) {
  if (!summary) return null;

  return (
    <Card className="food-day-summary">
      <p className="food-day-summary__label">Daily food summary</p>
      <ul className="food-day-summary__stats">
        <li>
          <span>Meals completed</span>
          <strong>
            {summary.mealsCompleted} / {summary.mealsTotal}
          </strong>
        </li>
        <li>
          <span>Snacks completed</span>
          <strong>
            {summary.snacksCompleted} / {summary.snacksTotal}
          </strong>
        </li>
        <li>
          <span>Protein-containing meals</span>
          <strong>{summary.proteinMealsCompleted}</strong>
        </li>
        <li>
          <span>Nourishing drinks</span>
          <strong>{summary.drinksCompleted}</strong>
        </li>
      </ul>
      <div className="food-day-summary__consistency">
        <div className="food-day-summary__consistency-head">
          <span>Eating consistency</span>
          <strong>{summary.consistencyScore}%</strong>
        </div>
        <ProgressBar
          value={summary.consistencyScore}
          max={100}
          label="Eating consistency"
        />
        <p className="food-day-summary__hint">
          Based on planned meals and snacks checked off today.
        </p>
      </div>
    </Card>
  );
}
