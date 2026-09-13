import { Link, Navigate, useParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import GuideBackLink from '../components/GuideBackLink.jsx';
import GuideExpandable from '../components/GuideExpandable.jsx';
import GuideBlocks from '../components/GuideBlocks.jsx';
import GuideCallout from '../components/GuideCallout.jsx';
import {
  getGuideArticle,
  getGuideCategory,
  listArticlesByCategory,
} from '../services/guide.js';
import './GuideArticlePage.css';

export default function GuideArticlePage() {
  const { articleId } = useParams();
  const article = getGuideArticle(articleId);

  if (!article) {
    return <Navigate to="/guide" replace />;
  }

  const category = getGuideCategory(article.categoryId);
  const related = listArticlesByCategory(article.categoryId)
    .filter((a) => a.id !== article.id)
    .slice(0, 3);

  return (
    <div className="page guide-article-page">
      <GuideBackLink
        to={
          category
            ? `/guide/category/${category.id}`
            : '/guide'
        }
        label={category?.title || 'Guide'}
      />

      <PageHeader title={article.title} subtitle={article.summary} />

      {category ? (
        <p className="guide-article-page__crumb">
          <Link to="/guide">Guide</Link>
          <span aria-hidden> · </span>
          <Link to={`/guide/category/${category.id}`}>{category.title}</Link>
        </p>
      ) : null}

      <div className="guide-article-page__sections">
        {(article.sections || []).map((section) => (
          <GuideExpandable key={section.id} section={section} />
        ))}
      </div>

      {article.checklist?.length ? (
        <section
          className="guide-article-page__checklist"
          aria-labelledby="guide-checklist-heading"
        >
          <h2 id="guide-checklist-heading" className="guide-article-page__h2">
            Try this
          </h2>
          <GuideBlocks
            blocks={[{ type: 'checklist', items: article.checklist }]}
          />
        </section>
      ) : null}

      {article.id === 'seek-medical-help' ? null : (
        <GuideCallout
          tone="caution"
          title="When to get help"
          text="Persistent poor appetite, early fullness, ongoing abdominal symptoms, unexplained weight loss, severe weakness, dizziness or fainting, or other worrying symptoms should be discussed with an appropriate healthcare professional."
        />
      )}

      {related.length ? (
        <section
          className="guide-article-page__related"
          aria-labelledby="guide-related-heading"
        >
          <h2 id="guide-related-heading" className="guide-article-page__h2">
            Related
          </h2>
          <ul className="guide-article-page__related-list">
            {related.map((item) => (
              <li key={item.id}>
                <Link to={`/guide/${item.id}`}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
