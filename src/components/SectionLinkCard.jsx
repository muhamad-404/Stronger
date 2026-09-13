import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import './SectionLinkCard.css';

export default function SectionLinkCard({
  to,
  title,
  description,
  icon: Icon,
}) {
  return (
    <Link to={to} className="section-link-card">
      {Icon ? (
        <span className="section-link-card__icon" aria-hidden>
          <Icon size={20} strokeWidth={2} />
        </span>
      ) : null}
      <span className="section-link-card__text">
        <span className="section-link-card__title">{title}</span>
        {description ? (
          <span className="section-link-card__desc">{description}</span>
        ) : null}
      </span>
      <ChevronRight size={18} className="section-link-card__chevron" aria-hidden />
    </Link>
  );
}
