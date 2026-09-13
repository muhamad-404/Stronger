import { Link } from 'react-router-dom';
import './MealCard.css';

export default function MealCard({ meal, to }) {
  if (!meal) return null;
  const href = to || `/eat/meal/${meal.id}`;

  return (
    <Link to={href} className="meal-card">
      <div className="meal-card__body">
        <p className="meal-card__category">{meal.category}</p>
        <h3 className="meal-card__title">{meal.title}</h3>
        <p className="meal-card__desc">{meal.description}</p>
        <div className="meal-card__tags">
          {meal.proteinSource ? (
            <span className="meal-card__tag">{meal.proteinSource}</span>
          ) : null}
          {meal.easyWhenAppetiteLow ? (
            <span className="meal-card__tag meal-card__tag--soft">Easy</span>
          ) : null}
          {meal.pakistani ? (
            <span className="meal-card__tag">Home-style</span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
