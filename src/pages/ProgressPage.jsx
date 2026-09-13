import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';
import ConsistencyCard from '../components/ConsistencyCard.jsx';
import GoalsCard from '../components/GoalsCard.jsx';
import GoalsEditSheet from '../components/GoalsEditSheet.jsx';
import JournalSheet from '../components/JournalSheet.jsx';
import PageHeader from '../components/PageHeader.jsx';
import SleepProgressCard from '../components/SleepProgressCard.jsx';
import WeeklyReviewCard from '../components/WeeklyReviewCard.jsx';
import WeightChart from '../components/WeightChart.jsx';
import WeightLogSheet from '../components/WeightLogSheet.jsx';
import WeightSummaryCard from '../components/WeightSummaryCard.jsx';
import { useProgressDashboard } from '../hooks/useProgressDashboard.js';
import './ProgressPage.css';

export default function ProgressPage() {
  const {
    loading,
    error,
    goals,
    weightSummary,
    consistency,
    weeklyReview,
    todayJournal,
    addWeight,
    updateGoals,
    saveJournal,
  } = useProgressDashboard();

  const [weightOpen, setWeightOpen] = useState(false);
  const [goalsOpen, setGoalsOpen] = useState(false);
  const [journalOpen, setJournalOpen] = useState(false);

  return (
    <div className="page progress-page">
      <PageHeader
        title="Your progress"
        subtitle="Real trends from what you’ve logged — gentle, not daily pressure."
      />

      {loading ? (
        <p className="page-placeholder">Loading your progress…</p>
      ) : null}

      {error ? (
        <p className="progress-page__error" role="alert">
          Couldn’t load progress data. Try refreshing.
        </p>
      ) : null}

      {!loading ? (
        <>
          <WeightSummaryCard
            summary={weightSummary}
            onLogWeight={() => setWeightOpen(true)}
          />

          <WeightChart data={weightSummary?.chartData || []} />

          <GoalsCard goals={goals} onEdit={() => setGoalsOpen(true)} />

          <Link to="/goals" className="progress-page__goals-link">
            Open all goals — food, strength, sleep, routine
          </Link>

          <ConsistencyCard consistency={consistency} />

          <SleepProgressCard
            journal={todayJournal}
            consistency={consistency}
          />

          <Card className="progress-page__journal-teaser">
            <div className="progress-page__journal-head">
              <div>
                <p className="progress-page__journal-label">Journal</p>
                <p className="progress-page__journal-copy">
                  Energy, appetite, sleep, and a short note for today.
                </p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setJournalOpen(true)}
              >
                Check in
              </Button>
            </div>
            {todayJournal &&
            (todayJournal.energy != null ||
              todayJournal.appetite != null ||
              todayJournal.sleepHours != null ||
              todayJournal.note) ? (
              <ul className="progress-page__journal-today">
                {todayJournal.energy != null ? (
                  <li>Energy {todayJournal.energy}/5</li>
                ) : null}
                {todayJournal.appetite != null ? (
                  <li>Appetite {todayJournal.appetite}/5</li>
                ) : null}
                {todayJournal.sleepHours != null ? (
                  <li>
                    Sleep {todayJournal.sleepHours}h
                    {todayJournal.sleepQuality != null
                      ? ` · Q${todayJournal.sleepQuality}`
                      : ''}
                  </li>
                ) : null}
                {todayJournal.note ? <li>{todayJournal.note}</li> : null}
              </ul>
            ) : (
              <p className="progress-page__journal-empty">
                No check-in yet today.
              </p>
            )}
          </Card>

          <WeeklyReviewCard review={weeklyReview} />
        </>
      ) : null}

      <WeightLogSheet
        open={weightOpen}
        onClose={() => setWeightOpen(false)}
        onSave={addWeight}
      />
      <GoalsEditSheet
        open={goalsOpen}
        goals={goals}
        onClose={() => setGoalsOpen(false)}
        onSave={updateGoals}
      />
      <JournalSheet
        open={journalOpen}
        initial={todayJournal}
        onClose={() => setJournalOpen(false)}
        onSave={saveJournal}
      />
    </div>
  );
}
