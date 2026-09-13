import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Compass,
  Dumbbell,
  HeartHandshake,
  MessageCircle,
  Moon,
  ShieldAlert,
  UtensilsCrossed,
  BookOpen,
} from 'lucide-react';
import './GuideCategoryCard.css';

const ICONS = {
  Compass,
  UtensilsCrossed,
  Dumbbell,
  Moon,
  HeartHandshake,
  MessageCircle,
  ShieldAlert,
};

export default function GuideCategoryCard({ category, articleCount }) {
  if (!category) return null;
  const Icon = ICONS[category.icon] || BookOpen;

  return (
    <Link
      to={`/guide/category/${category.id}`}
      className="guide-category-card"
    >
      <span className="guide-category-card__icon" aria-hidden>
        <Icon size={20} strokeWidth={2} />
      </span>
      <span className="guide-category-card__text">
        <span className="guide-category-card__title">{category.title}</span>
        <span className="guide-category-card__desc">{category.summary}</span>
        {articleCount != null ? (
          <span className="guide-category-card__count">
            {articleCount} {articleCount === 1 ? 'article' : 'articles'}
          </span>
        ) : null}
      </span>
      <ChevronRight
        size={18}
        className="guide-category-card__chevron"
        aria-hidden
      />
    </Link>
  );
}
