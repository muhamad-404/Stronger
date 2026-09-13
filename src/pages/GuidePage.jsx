import { useDeferredValue, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import GuideSearch from '../components/GuideSearch.jsx';
import GuideCategoryCard from '../components/GuideCategoryCard.jsx';
import GuideArticleLink from '../components/GuideArticleLink.jsx';
import GuideCallout from '../components/GuideCallout.jsx';
import {
  GUIDE_CATEGORIES,
  listArticlesByCategory,
  searchGuide,
} from '../services/guide.js';
import './GuidePage.css';

export default function GuidePage() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const results = useMemo(
    () => searchGuide(deferredQuery),
    [deferredQuery],
  );
  const searching = deferredQuery.trim().length > 0;

  const categories = useMemo(
    () => [...GUIDE_CATEGORIES].sort((a, b) => a.order - b.order),
    [],
  );

  return (
    <div className="page guide-page">
      <Link to="/more" className="guide-page__back">
        <ArrowLeft size={18} aria-hidden />
        More
      </Link>

      <PageHeader
        title="Guide"
        subtitle="Practical reference for food, training, sleep, and hard days — open what you need."
      />

      <GuideSearch value={query} onChange={setQuery} />

      <Link to="/solver" className="guide-page__solver-cta">
        Need help right now? Open the Problem solver →
      </Link>

      <GuideCallout
        tone="info"
        title="Not medical advice"
        text="Stronger shares practical habits, not diagnoses or prescriptions. If concerning symptoms persist, talk with an appropriate healthcare professional."
      />

      {searching ? (
        <section className="guide-page__results" aria-live="polite">
          <h2 className="guide-page__section-title">
            {results.length
              ? `${results.length} result${results.length === 1 ? '' : 's'}`
              : 'No matches'}
          </h2>
          {results.length === 0 ? (
            <p className="guide-page__empty">
              Try a shorter word — appetite, sleep, shake, tea, workout.
            </p>
          ) : (
            <div className="guide-page__list">
              {results.map((article) => (
                <GuideArticleLink key={article.id} article={article} />
              ))}
            </div>
          )}
        </section>
      ) : (
        <section className="guide-page__categories" aria-label="Guide topics">
          <h2 className="guide-page__section-title">Browse by topic</h2>
          <div className="guide-page__list">
            {categories.map((category) => (
              <GuideCategoryCard
                key={category.id}
                category={category}
                articleCount={listArticlesByCategory(category.id).length}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
