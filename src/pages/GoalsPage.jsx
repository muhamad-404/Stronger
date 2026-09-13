import { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import Button from '../components/Button.jsx';
import GoalCard from '../components/GoalCard.jsx';
import GoalFormSheet from '../components/GoalFormSheet.jsx';
import GoalCelebration from '../components/GoalCelebration.jsx';
import { useGoals } from '../hooks/useGoals.js';
import './GoalsPage.css';

export default function GoalsPage() {
  const {
    activeGoals,
    completedGoals,
    loading,
    error,
    saving,
    create,
    update,
    remove,
    setProgress,
    celebrate,
  } = useGoals();

  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetMode, setSheetMode] = useState('create');
  const [selected, setSelected] = useState(null);
  const [showCompleted, setShowCompleted] = useState(false);

  const celebrationGoal = useMemo(
    () =>
      [...activeGoals, ...completedGoals].find(
        (g) => g.isComplete && !g.celebratedAt,
      ) || null,
    [activeGoals, completedGoals],
  );

  const openCreate = () => {
    setSelected(null);
    setSheetMode('create');
    setSheetOpen(true);
  };

  const openGoal = (goal) => {
    setSelected(goal);
    setSheetMode('edit');
    setSheetOpen(true);
  };

  const handleDismissCelebration = useCallback(
    async (id) => {
      try {
        await celebrate(id);
      } catch {
        /* still dismiss visually on next refresh */
      }
    },
    [celebrate],
  );

  const handleSave = async (partial) => {
    if (sheetMode === 'create') {
      await create(partial);
    } else if (selected) {
      await update(selected.id, partial);
    }
  };

  return (
    <div className="page goals-page">
      <Link to="/more" className="goals-page__back">
        <ArrowLeft size={18} aria-hidden />
        More
      </Link>

      <PageHeader
        title="Goals"
        subtitle="Not only weight — food, strength, sleep, and routine count too."
      />

      {celebrationGoal ? (
        <GoalCelebration
          goal={celebrationGoal}
          onDismiss={handleDismissCelebration}
        />
      ) : null}

      <div className="goals-page__toolbar">
        <p className="goals-page__count">
          {loading
            ? 'Loading…'
            : `${activeGoals.length} active`}
        </p>
        <Button variant="secondary" size="sm" onClick={openCreate}>
          <Plus size={16} aria-hidden />
          Add goal
        </Button>
      </div>

      {error ? (
        <p className="goals-page__error" role="alert">
          {error}
        </p>
      ) : null}

      {loading ? (
        <p className="page-placeholder">Loading your goals…</p>
      ) : null}

      {!loading && activeGoals.length === 0 ? (
        <p className="goals-page__empty">
          No active goals yet. Add one that fits this week — or keep the
          starters and update them as you go.
        </p>
      ) : null}

      <div className="goals-page__list">
        {activeGoals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} onOpen={openGoal} />
        ))}
      </div>

      {completedGoals.length > 0 ? (
        <div className="goals-page__completed">
          <button
            type="button"
            className="goals-page__completed-toggle"
            onClick={() => setShowCompleted((v) => !v)}
            aria-expanded={showCompleted}
          >
            {showCompleted ? 'Hide' : 'Show'} reached goals (
            {completedGoals.length})
          </button>
          {showCompleted ? (
            <div className="goals-page__list">
              {completedGoals.map((goal) => (
                <GoalCard key={goal.id} goal={goal} onOpen={openGoal} />
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      <GoalFormSheet
        open={sheetOpen}
        mode={sheetMode}
        goal={selected}
        saving={saving}
        onClose={() => setSheetOpen(false)}
        onSave={handleSave}
        onDelete={
          selected ? async () => remove(selected.id) : undefined
        }
        onProgress={
          selected
            ? async (value) => setProgress(selected.id, value)
            : undefined
        }
      />
    </div>
  );
}
