import { Link } from 'react-router-dom';
import EatBackLink from '../components/EatBackLink.jsx';
import MealCard from '../components/MealCard.jsx';
import PageHeader from '../components/PageHeader.jsx';
import { filterMeals } from '../data/meals.js';
import { LOW_APPETITE_STRATEGIES } from '../data/foodGuidance.js';
import './EatSubpage.css';

export default function EatLowAppetitePage() {
  const easyMeals = filterMeals({ easy: true }).slice(0, 8);

  return (
    <div className="page eat-subpage">
      <EatBackLink />
      <PageHeader
        title="Appetite is low?"
        subtitle="Smaller, softer, more often — without forcing extreme eating."
      />

      <Link to="/solver?problem=not-hungry" className="eat-subpage__solver-cta">
        Problem solver: I don’t feel hungry →
      </Link>

      <h2 className="eat-subpage__sections-heading">Gentle strategies</h2>
      <ul className="eat-subpage__guidance-list">
        {LOW_APPETITE_STRATEGIES.map((item) => (
          <li key={item.id} className="eat-subpage__guidance-item">
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </li>
        ))}
      </ul>

      <h2 className="eat-subpage__sections-heading">Easy foods to try</h2>
      <div className="eat-subpage__meal-list">
        {easyMeals.map((meal) => (
          <MealCard key={meal.id} meal={meal} />
        ))}
      </div>
    </div>
  );
}
