import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import GuideCallout from '../components/GuideCallout.jsx';
import SleepTodayCard from '../components/SleepTodayCard.jsx';
import SleepWeekCard from '../components/SleepWeekCard.jsx';
import SleepLogSheet from '../components/SleepLogSheet.jsx';
import { useSleepDashboard } from '../hooks/useSleepDashboard.js';
import {
  SLEEP_GUIDANCE,
  SLEEP_SAFETY_NOTE,
} from '../data/sleepGuidance.js';
import './SleepPage.css';

export default function SleepPage() {
  const { loading, error, saving, today, week, defaults, save } =
    useSleepDashboard();
  const [logOpen, setLogOpen] = useState(false);

  return (
    <div className="page sleep-page">
      <Link to="/more" className="sleep-page__back">
        <ArrowLeft size={18} aria-hidden />
        More
      </Link>

      <PageHeader
        title="Sleep & recovery"
        subtitle="A steadier night supports meals, energy, and training — without perfect nights."
      />

      {loading ? (
        <p className="page-placeholder">Loading your sleep log…</p>
      ) : null}

      {error ? (
        <p className="sleep-page__error" role="alert">
          {error}
        </p>
      ) : null}

      {!loading ? (
        <>
          <SleepTodayCard record={today} onLog={() => setLogOpen(true)} />
          <SleepWeekCard week={week} />

          <section
            className="sleep-page__guidance"
            aria-labelledby="sleep-guidance-heading"
          >
            <h2 id="sleep-guidance-heading" className="sleep-page__section-title">
              Practical habits
            </h2>
            <ul className="sleep-page__guidance-list">
              {SLEEP_GUIDANCE.map((item) => (
                <li key={item.id} className="sleep-page__guidance-item">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </li>
              ))}
            </ul>
          </section>

          <div className="sleep-page__links">
            <Link to="/guide/sleep" className="sleep-page__guide-link">
              Read the full sleep guide →
            </Link>
            <Link
              to="/solver?problem=slept-badly"
              className="sleep-page__guide-link"
            >
              Slept badly? Open problem solver →
            </Link>
          </div>

          <GuideCallout tone="info" text={SLEEP_SAFETY_NOTE} />
        </>
      ) : null}

      <SleepLogSheet
        open={logOpen}
        initial={today}
        defaults={defaults}
        saving={saving}
        onClose={() => setLogOpen(false)}
        onSave={save}
      />
    </div>
  );
}
