import { Link } from 'react-router-dom';
import EatBackLink from '../components/EatBackLink.jsx';
import PageHeader from '../components/PageHeader.jsx';
import {
  FOOD_PROBLEMS,
  FOOD_SAFETY_NOTE,
} from '../data/foodGuidance.js';
import './EatSubpage.css';

export default function EatProblemsPage() {
  return (
    <div className="page eat-subpage">
      <EatBackLink />
      <PageHeader
        title="When eating feels hard"
        subtitle="Practical ideas — not a diagnosis. Be kind to yourself."
      />

      <Link to="/solver?problem=not-hungry" className="eat-subpage__solver-cta">
        Open Problem solver for step-by-step help →
      </Link>

      <ul className="eat-subpage__guidance-list">
        {FOOD_PROBLEMS.map((item) => (
          <li key={item.id} className="eat-subpage__guidance-item">
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </li>
        ))}
      </ul>

      <p className="eat-subpage__safety">{FOOD_SAFETY_NOTE}</p>
    </div>
  );
}
