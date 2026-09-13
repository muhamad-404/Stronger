import { Navigate, useParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';
import GuideBackLink from '../components/GuideBackLink.jsx';
import GuideArticleLink from '../components/GuideArticleLink.jsx';
import {
  getGuideCategory,
  listArticlesByCategory,
} from '../services/guide.js';
import './GuideCategoryPage.css';

export default function GuideCategoryPage() {
  const { categoryId } = useParams();
  const category = getGuideCategory(categoryId);

  if (!category) {
    return <Navigate to="/guide" replace />;
  }

  const articles = listArticlesByCategory(category.id);

  return (
    <div className="page guide-category-page">
      <GuideBackLink />
      <PageHeader title={category.title} subtitle={category.summary} />

      <div className="guide-category-page__list">
        {articles.map((article) => (
          <GuideArticleLink key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
