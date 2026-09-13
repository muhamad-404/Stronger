import { Link } from 'react-router-dom';
import {
  CalendarDays,
  Coffee,
  Cookie,
  HeartHandshake,
  Leaf,
  Moon,
  Sparkles,
  Sun,
  UtensilsCrossed,
  Wheat,
  BookOpen,
} from 'lucide-react';
import Card from '../components/Card.jsx';
import PageHeader from '../components/PageHeader.jsx';
import SectionLinkCard from '../components/SectionLinkCard.jsx';
import { useFoodLog } from '../hooks/useFoodLog.js';
import './EatPage.css';

export default function EatPage() {
  const { summary, loading, entries } = useFoodLog();

  return (
    <div className="page eat-page">
      <PageHeader
        title="Food"
        subtitle="What can I eat today — with familiar home foods, no calorie counting."
      />

      <Link to="/eat/low-appetite" className="eat-page__appetite-cta">
        <HeartHandshake size={20} aria-hidden />
        <span>
          <strong>Appetite is low?</strong>
          <span>Gentle ideas and softer foods</span>
        </span>
      </Link>

      <section className="eat-page__today" aria-labelledby="eat-today-heading">
        <div className="eat-page__section-head">
          <h2 id="eat-today-heading">Today&apos;s food log</h2>
          <Link to="/eat/today" className="eat-page__see-all">
            Open log
          </Link>
        </div>
        {loading ? (
          <p className="page-placeholder">Loading today’s log…</p>
        ) : (
          <Card>
            <div className="eat-page__summary-grid">
              <div>
                <p className="eat-page__summary-value">
                  {summary.mealsCompleted}/{summary.mealsTotal}
                </p>
                <p className="eat-page__summary-label">Meals</p>
              </div>
              <div>
                <p className="eat-page__summary-value">
                  {summary.snacksCompleted}/{summary.snacksTotal}
                </p>
                <p className="eat-page__summary-label">Snacks</p>
              </div>
              <div>
                <p className="eat-page__summary-value">
                  {summary.consistencyScore}%
                </p>
                <p className="eat-page__summary-label">Consistency</p>
              </div>
            </div>
            <p className="eat-page__today-count">
              {entries.filter((e) => e.eaten).length} foods marked eaten today
            </p>
            <Link to="/eat/today" className="eat-page__log-cta">
              Log what you ate →
            </Link>
          </Card>
        )}
      </section>

      <section className="eat-page__sections" aria-label="Food sections">
        <h2 className="eat-page__sections-title">Explore</h2>
        <div className="eat-page__links">
          <SectionLinkCard
            to="/eat/today"
            title="Food log"
            description="Today’s meals, snacks, and portions"
            icon={CalendarDays}
          />
          <SectionLinkCard
            to="/eat/browse?category=breakfast"
            title="Breakfast ideas"
            description="Eggs, oats, yogurt, paratha"
            icon={Coffee}
          />
          <SectionLinkCard
            to="/eat/browse?category=lunch"
            title="Lunch ideas"
            description="Daal, chicken, keema, chana"
            icon={Sun}
          />
          <SectionLinkCard
            to="/eat/browse?category=dinner"
            title="Dinner ideas"
            description="Comfort plates for evening"
            icon={Moon}
          />
          <SectionLinkCard
            to="/eat/browse?category=snack"
            title="Snacks"
            description="Banana, dates, nuts, yogurt"
            icon={Cookie}
          />
          <SectionLinkCard
            to="/eat/browse?category=shake"
            title="Homemade shakes"
            description="When chewing feels like too much"
            icon={Sparkles}
          />
          <SectionLinkCard
            to="/eat/browse?pakistani=1"
            title="Pakistani food ideas"
            description="Home-style meals you already know"
            icon={Wheat}
          />
          <SectionLinkCard
            to="/eat/low-appetite"
            title="Easy foods when appetite is low"
            description="Softer options and calm strategies"
            icon={Leaf}
          />
          <SectionLinkCard
            to="/eat/boosters"
            title="Food boosters"
            description="Small add-ins that help nourish"
            icon={UtensilsCrossed}
          />
          <SectionLinkCard
            to="/eat/problems"
            title="Food problems"
            description="What to try when eating feels hard"
            icon={HeartHandshake}
          />
          <SectionLinkCard
            to="/guide/category/food"
            title="Full food guide"
            description="Breakfast through shakes, tea, and boosters"
            icon={BookOpen}
          />
        </div>
      </section>
    </div>
  );
}
