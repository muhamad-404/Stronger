import EatBackLink from '../components/EatBackLink.jsx';
import PageHeader from '../components/PageHeader.jsx';
import { FOOD_BOOSTERS } from '../data/foodGuidance.js';
import './EatSubpage.css';

export default function EatBoostersPage() {
  return (
    <div className="page eat-subpage">
      <EatBackLink />
      <PageHeader
        title="Food boosters"
        subtitle="Small, familiar add-ins — not extreme portions or supplements."
      />

      <ul className="eat-subpage__guidance-list">
        {FOOD_BOOSTERS.map((item) => (
          <li key={item.id} className="eat-subpage__guidance-item">
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
