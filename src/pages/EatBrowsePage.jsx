import EatBackLink from '../components/EatBackLink.jsx';
import FilterChips from '../components/FilterChips.jsx';
import MealCard from '../components/MealCard.jsx';
import PageHeader from '../components/PageHeader.jsx';
import { useMealCatalog } from '../hooks/useMealCatalog.js';
import './EatSubpage.css';

export default function EatBrowsePage() {
  const {
    meals,
    category,
    easy,
    pakistani,
    setCategory,
    setEasy,
    setPakistani,
  } = useMealCatalog();

  return (
    <div className="page eat-subpage">
      <EatBackLink />
      <PageHeader
        title="Meal ideas"
        subtitle="Practical Pakistani and home foods — pick what feels doable."
      />

      <FilterChips
        category={category}
        easy={easy}
        pakistani={pakistani}
        onCategoryChange={setCategory}
        onEasyChange={setEasy}
        onPakistaniChange={setPakistani}
      />

      <p className="eat-subpage__meta">{meals.length} ideas</p>

      <div className="eat-subpage__meal-list">
        {meals.map((meal) => (
          <MealCard key={meal.id} meal={meal} />
        ))}
      </div>

      {!meals.length ? (
        <p className="page-placeholder">
          No meals match these filters. Try clearing Easy or Pakistani.
        </p>
      ) : null}
    </div>
  );
}
