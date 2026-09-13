import { useState } from 'react';
import Card from '../components/Card.jsx';
import DailyProgressCard from '../components/DailyProgressCard.jsx';
import GreetingHeader from '../components/GreetingHeader.jsx';
import NoteSheet from '../components/NoteSheet.jsx';
import QuickActions from '../components/QuickActions.jsx';
import TaskRow from '../components/TaskRow.jsx';
import TipCard from '../components/TipCard.jsx';
import WeeklyConsistency from '../components/WeeklyConsistency.jsx';
import WeightProgressCard from '../components/WeightProgressCard.jsx';
import { useTodayDashboard } from '../hooks/useTodayDashboard.js';
import './TodayPage.css';

export default function TodayPage() {
  const {
    loading,
    error,
    greeting,
    weightStats,
    tasks,
    completedCount,
    totalCount,
    weeklySummary,
    tip,
    todayNote,
    toggleTask,
    saveNote,
  } = useTodayDashboard();

  const [noteOpen, setNoteOpen] = useState(false);

  if (loading) {
    return (
      <div className="page today-page">
        <p className="today-page__status" aria-live="polite">
          Loading your day…
        </p>
      </div>
    );
  }

  return (
    <div className="page today-page">
      <GreetingHeader
        greetingText={greeting.text}
        dateLabel={greeting.dateLabel}
      />

      {error ? (
        <p className="today-page__error" role="alert">
          Something went wrong loading today. Your saved progress is still on
          this device — try refreshing.
        </p>
      ) : null}

      <WeightProgressCard weightStats={weightStats} />

      <section className="today-routine" aria-labelledby="today-routine-heading">
        <h2 id="today-routine-heading" className="today-routine__heading">
          Today
        </h2>
        <Card padding="none" className="today-routine__card">
          <ul className="today-routine__list">
            {tasks.map((task) => (
              <li key={task.id}>
                <TaskRow
                  title={task.title}
                  timeLabel={task.timeLabel}
                  icon={task.icon}
                  completed={task.completed}
                  onToggle={() => toggleTask(task.id)}
                />
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <DailyProgressCard
        completedCount={completedCount}
        totalCount={totalCount}
      />

      <QuickActions onAddNote={() => setNoteOpen(true)} />

      <TipCard tip={tip} />

      <WeeklyConsistency weeklySummary={weeklySummary} />

      <NoteSheet
        open={noteOpen}
        initialValue={todayNote}
        onClose={() => setNoteOpen(false)}
        onSave={saveNote}
      />
    </div>
  );
}
