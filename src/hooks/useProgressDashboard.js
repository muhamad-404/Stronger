import { useCallback, useEffect, useState } from 'react';
import {
  buildWeeklyReview,
  buildWeightSummary,
  computeWeeklyConsistency,
  getJournalForDate,
  getWeightGoals,
  getWeightHistory,
  logWeight,
  saveJournalEntry,
  saveWeightGoals,
} from '../services/progress.js';
import { toDateKey } from '../utils/dates.js';

/**
 * Progress dashboard data + mutations.
 */
export function useProgressDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);
  const [goals, setGoals] = useState(null);
  const [history, setHistory] = useState([]);
  const [weightSummary, setWeightSummary] = useState(null);
  const [consistency, setConsistency] = useState(null);
  const [weeklyReview, setWeeklyReview] = useState(null);
  const [todayJournal, setTodayJournal] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const [{ profile: p, goals: g }, hist, cons, review, journal] =
        await Promise.all([
          getWeightGoals(),
          getWeightHistory(),
          computeWeeklyConsistency(7),
          buildWeeklyReview(),
          getJournalForDate(toDateKey()),
        ]);
      setProfile(p);
      setGoals(g);
      setHistory(hist);
      setWeightSummary(buildWeightSummary(hist, g, p));
      setConsistency(cons);
      setWeeklyReview(review);
      setTodayJournal(journal);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addWeight = useCallback(
    async (payload) => {
      await logWeight(payload);
      await refresh();
    },
    [refresh],
  );

  const updateGoals = useCallback(
    async (partial) => {
      const next = await saveWeightGoals(partial);
      setGoals(next);
      await refresh();
      return next;
    },
    [refresh],
  );

  const saveJournal = useCallback(
    async (payload) => {
      const next = await saveJournalEntry({
        date: toDateKey(),
        ...payload,
      });
      setTodayJournal(next);
      await refresh();
      return next;
    },
    [refresh],
  );

  return {
    loading,
    error,
    profile,
    goals,
    history,
    weightSummary,
    consistency,
    weeklyReview,
    todayJournal,
    addWeight,
    updateGoals,
    saveJournal,
    refresh,
  };
}
