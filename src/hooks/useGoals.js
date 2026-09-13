import { useCallback, useEffect, useState } from 'react';
import {
  createGoal,
  deleteGoal,
  getEnrichedGoals,
  markGoalCelebrated,
  setManualProgress,
  updateGoal,
} from '../services/goals.js';

export function useGoals() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const refresh = useCallback(async () => {
    setError(null);
    try {
      const rows = await getEnrichedGoals();
      setGoals(rows);
    } catch (err) {
      setError(err?.message || 'Could not load goals.');
      setGoals([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const rows = await getEnrichedGoals();
        if (!cancelled) setGoals(rows);
      } catch (err) {
        if (!cancelled) {
          setError(err?.message || 'Could not load goals.');
          setGoals([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const withSave = async (fn) => {
    setSaving(true);
    setError(null);
    try {
      await fn();
      await refresh();
    } catch (err) {
      setError(err?.message || 'Could not save.');
      throw err;
    } finally {
      setSaving(false);
    }
  };

  return {
    goals,
    activeGoals: goals.filter((g) => g.status === 'active'),
    completedGoals: goals.filter((g) => g.status === 'completed'),
    loading,
    error,
    saving,
    refresh,
    create: (partial) => withSave(() => createGoal(partial)),
    update: (id, patch) => withSave(() => updateGoal(id, patch)),
    remove: (id) => withSave(() => deleteGoal(id)),
    setProgress: (id, value) => withSave(() => setManualProgress(id, value)),
    celebrate: (id) => withSave(() => markGoalCelebrated(id)),
  };
}
