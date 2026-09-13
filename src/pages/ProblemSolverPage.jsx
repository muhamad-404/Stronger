import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, LifeBuoy } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import GuideCallout from '../components/GuideCallout.jsx';
import SolverSectionCard from '../components/SolverSectionCard.jsx';
import {
  SOLVER_GENERAL_SAFETY,
  getSolverProblem,
  listSolverProblems,
} from '../services/problemSolver.js';
import { getGuideArticle } from '../services/guide.js';
import './ProblemSolverPage.css';

export default function ProblemSolverPage() {
  const problems = useMemo(() => listSolverProblems(), []);
  const [params, setParams] = useSearchParams();
  const selectedId = params.get('problem') || '';
  const active = selectedId ? getSolverProblem(selectedId) : null;

  const selectProblem = (id) => {
    setParams({ problem: id });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearProblem = () => {
    setParams({});
  };

  return (
    <div className="page solver-page">
      <Link to="/more" className="solver-page__back">
        <ArrowLeft size={18} aria-hidden />
        More
      </Link>

      <PageHeader
        title="Problem solver"
        subtitle="Pick what you’re dealing with — get calm, practical next steps."
      />

      {!active ? (
        <>
          <div className="solver-page__intro-row">
            <LifeBuoy size={18} aria-hidden className="solver-page__intro-icon" />
            <p className="solver-page__intro">
              No guilt, no diagnosis — just options you can try today.
            </p>
          </div>

          <div className="solver-page__picker" role="list">
            {problems.map((problem) => (
              <button
                key={problem.id}
                type="button"
                role="listitem"
                className="solver-page__problem"
                onClick={() => selectProblem(problem.id)}
              >
                <span className="solver-page__problem-title">{problem.title}</span>
                <span className="solver-page__problem-summary">
                  {problem.summary}
                </span>
              </button>
            ))}
          </div>

          <GuideCallout tone="info" text={SOLVER_GENERAL_SAFETY} />
        </>
      ) : (
        <div className="solver-page__detail">
          <button
            type="button"
            className="solver-page__change"
            onClick={clearProblem}
          >
            ← Choose a different problem
          </button>

          <header className="solver-page__detail-head">
            <p className="solver-page__eyebrow">Problem</p>
            <h2 className="solver-page__detail-title">{active.title}</h2>
            <p className="solver-page__detail-summary">{active.summary}</p>
          </header>

          <section
            className="solver-page__try"
            aria-labelledby="solver-try-heading"
          >
            <h3 id="solver-try-heading" className="solver-page__try-title">
              Try this today
            </h3>
            <ol className="solver-page__try-list">
              {active.tryThisToday.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>

          <div className="solver-page__sections">
            {active.sections.map((section) => (
              <SolverSectionCard key={section.id} section={section} />
            ))}
          </div>

          {active.relatedGuideIds?.length ? (
            <section
              className="solver-page__related"
              aria-labelledby="solver-related-heading"
            >
              <h3
                id="solver-related-heading"
                className="solver-page__related-title"
              >
                Related guide
              </h3>
              <ul className="solver-page__related-list">
                {active.relatedGuideIds.map((id) => {
                  const article = getGuideArticle(id);
                  return (
                    <li key={id}>
                      <Link to={`/guide/${id}`}>{article?.title || id}</Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          ) : null}

          <GuideCallout
            tone="caution"
            title="If this keeps happening"
            text={
              active.id === 'not-hungry' ||
              active.id === 'full-quickly' ||
              active.id === 'struggling-enough'
                ? 'If this happens persistently or you regularly feel full after very small amounts, discuss it with a healthcare professional.'
                : SOLVER_GENERAL_SAFETY
            }
          />
        </div>
      )}
    </div>
  );
}
