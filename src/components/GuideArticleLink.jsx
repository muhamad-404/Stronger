import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import './GuideArticleLink.css';

export default function GuideArticleLink({ article }) {
  if (!article) return null;

  return (
    <Link to={`/guide/${article.id}`} className="guide-article-link">
      <span className="guide-article-link__text">
        <span className="guide-article-link__title">{article.title}</span>
        {article.summary ? (
          <span className="guide-article-link__desc">{article.summary}</span>
        ) : null}
      </span>
      <ChevronRight
        size={18}
        className="guide-article-link__chevron"
        aria-hidden
      />
    </Link>
  );
}
