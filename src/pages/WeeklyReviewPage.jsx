import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import Card from '../components/Card.jsx';
import Button from '../components/Button.jsx';
import GuideCallout from '../components/GuideCallout.jsx';
import ReviewMetricCard from '../components/ReviewMetricCard.jsx';
import { useWeeklyReview } from '../hooks/useWeeklyReview.js';
import { NEXT_WEEK_FOCUS_OPTIONS } from '../data/weeklyReview.js';
import { formatKg } from '../utils/dates.js';
import { getWeekRange } from '../services/weeklyReview.js';
import './WeeklyReviewPage.css';

function formatChange(changeKg) {
  if (changeKg == null) return 'Need two weigh-ins';
  if (Math.abs(changeKg) < 0.05) return 'About the same';
  const sign = changeKg > 0 ? '+' : '';
  return `${sign}${changeKg.toFixed(1)} kg`;
}

export default function WeeklyReviewPage() {
  const {
    weekStart,
    loading,
    saving,
    error,
    summary,
    reflection,
    goPrev,
    goNext,
    goThisWeek,
    saveReflection,
  } = useWeeklyReview();

  const [form, setForm] = useState({
    wentWell: '',
    difficult: '',
    changeNext: '',
    notes: '',
    nextWeekFocus: [],
  });
  const [savedMsg, setSavedMsg] = useState(null);

  useEffect(() => {
    if (!reflection) return;
    setForm({
      wentWell: reflection.wentWell || '',
      difficult: reflection.difficult || '',
      changeNext: reflection.changeNext || '',
      notes: reflection.notes || '',
      nextWeekFocus: reflection.nextWeekFocus || [],
    });
    setSavedMsg(null);
  }, [reflection]);

  const thisWeekStart = getWeekRange().weekStart;
  const canGoNext = weekStart < thisWeekStart;

  const updateField = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
    setSavedMsg(null);
  };

  const toggleFocus = (id) => {
    setForm((prev) => {
      const set = new Set(prev.nextWeekFocus);
      if (set.has(id)) set.delete(id);
      else set.add(id);
      return { ...prev, nextWeekFocus: Array.from(set) };
    });
    setSavedMsg(null);
  };

  const handleSave = async () => {
    try {
      await saveReflection(form);
      setSavedMsg('Saved for this week.');
    } catch {
      /* error surfaced via hook */
    }
  };

  const weight = summary?.weight;
  const food = summary?.food;
  const workout = summary?.workout;
  const sleep = summary?.sleep;

  return (
    <div className="page weekly-review-page">
      <Link to="/progress" className="weekly-review-page__back">
        <ArrowLeft size={18} aria-hidden />
        Progress
      </Link>

      <PageHeader
        title="Weekly review"
        subtitle="A calm look at what actually happened — not a scorecard."
      />

      <div className="weekly-review-page__nav">
        <button
          type="button"
          className="weekly-review-page__nav-btn"
          onClick={goPrev}
          aria-label="Previous week"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="weekly-review-page__nav-center">
          <p className="weekly-review-page__nav-label">
            {summary?.label || 'This week'}
          </p>
          {summary?.isCurrentWeek ? (
            <p className="weekly-review-page__nav-tag">In progress</p>
          ) : weekStart !== thisWeekStart ? (
            <button
              type="button"
              className="weekly-review-page__nav-jump"
              onClick={goThisWeek}
            >
              Jump to this week
            </button>
          ) : null}
        </div>
        <button
          type="button"
          className="weekly-review-page__nav-btn"
          onClick={goNext}
          disabled={!canGoNext}
          aria-label="Next week"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {loading ? (
        <p className="page-placeholder">Gathering this week’s logs…</p>
      ) : null}

      {error ? (
        <p className="weekly-review-page__error" role="alert">
          {error}
        </p>
      ) : null}

      {!loading && summary ? (
        <>
          <GuideCallout tone="tip" text={summary.encouragement} />

          <section
            className="weekly-review-page__metrics"
            aria-label="Week summary"
          >
            <ReviewMetricCard
              eyebrow="Weight"
              label="Change"
              accent="blush"
              primary={formatChange(weight.changeKg)}
              secondary={
                weight.startKg != null && weight.latestKg != null
                  ? `${formatKg(weight.startKg)} → ${formatKg(weight.latestKg)}`
                  : weight.sampleSize
                    ? 'Only one weigh-in this week'
                    : 'No weigh-ins logged this week'
              }
            />

            <ReviewMetricCard
              eyebrow="Food"
              label="Consistency"
              accent="sage"
              primary={
                food.consistencyPercent != null
                  ? `${food.consistencyPercent}%`
                  : '—'
              }
              secondary={`${food.completed} completed · ${food.planned} planned slots`}
            />

            <ReviewMetricCard
              eyebrow="Workout"
              label="Sessions"
              accent="warm"
              primary={`${workout.completed} / ${workout.planned}`}
              secondary={
                workout.planned === 0
                  ? 'No strength days in this range'
                  : 'Planned Mon / Wed / Fri-style days'
              }
            />

            <ReviewMetricCard
              eyebrow="Sleep"
              label="Average"
              primary={
                sleep.avgHours != null ? `${sleep.avgHours} h` : '—'
              }
              secondary={
                sleep.consistencyPercent != null
                  ? `${sleep.nightsLogged} nights · ${sleep.consistencyPercent}% logged`
                  : 'No sleep logs yet'
              }
            />

            <ReviewMetricCard
              eyebrow="Appetite"
              label="Average"
              primary={
                summary.appetite.average != null
                  ? `${summary.appetite.average} / 5`
                  : '—'
              }
              secondary={
                summary.appetite.daysLogged
                  ? `${summary.appetite.daysLogged} check-ins`
                  : 'Log via Progress journal'
              }
            />

            <ReviewMetricCard
              eyebrow="Energy"
              label="Average"
              primary={
                summary.energy.average != null
                  ? `${summary.energy.average} / 5`
                  : '—'
              }
              secondary={
                summary.energy.daysLogged
                  ? `${summary.energy.daysLogged} check-ins`
                  : 'Log via Progress journal'
              }
            />
          </section>

          <Card className="weekly-review-page__reflect">
            <h2 className="weekly-review-page__h2">Reflection</h2>
            <p className="weekly-review-page__hint">
              Missed tasks do not mean failure. Notice patterns with kindness.
            </p>

            <label className="weekly-review-page__textarea-label" htmlFor="wr-well">
              What went well?
            </label>
            <textarea
              id="wr-well"
              className="weekly-review-page__textarea"
              rows={3}
              value={form.wentWell}
              onChange={updateField('wentWell')}
              placeholder="A meal that felt easy, a workout you finished, calmer evenings…"
            />

            <label className="weekly-review-page__textarea-label" htmlFor="wr-hard">
              What was difficult?
            </label>
            <textarea
              id="wr-hard"
              className="weekly-review-page__textarea"
              rows={3}
              value={form.difficult}
              onChange={updateField('difficult')}
              placeholder="Low appetite days, busy schedule, rough sleep…"
            />

            <label className="weekly-review-page__textarea-label" htmlFor="wr-change">
              What should I change next week?
            </label>
            <textarea
              id="wr-change"
              className="weekly-review-page__textarea"
              rows={3}
              value={form.changeNext}
              onChange={updateField('changeNext')}
              placeholder="One small adjustment is enough."
            />

            <label className="weekly-review-page__textarea-label" htmlFor="wr-notes">
              Extra notes
            </label>
            <textarea
              id="wr-notes"
              className="weekly-review-page__textarea"
              rows={2}
              value={form.notes}
              onChange={updateField('notes')}
              placeholder="Anything else worth remembering…"
            />
          </Card>

          <Card className="weekly-review-page__focus">
            <h2 className="weekly-review-page__h2">Next week focus</h2>
            <p className="weekly-review-page__hint">
              Pick one or two — not everything at once.
            </p>
            <div className="weekly-review-page__chips">
              {NEXT_WEEK_FOCUS_OPTIONS.map((opt) => {
                const active = form.nextWeekFocus.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    type="button"
                    className={[
                      'weekly-review-page__chip',
                      active ? 'weekly-review-page__chip--active' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    aria-pressed={active}
                    onClick={() => toggleFocus(opt.id)}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </Card>

          <div className="weekly-review-page__save">
            {savedMsg ? (
              <p className="weekly-review-page__saved">{savedMsg}</p>
            ) : (
              <span />
            )}
            <Button onClick={handleSave} disabled={saving} fullWidth>
              {saving ? 'Saving…' : 'Save reflection'}
            </Button>
          </div>
        </>
      ) : null}
    </div>
  );
}
