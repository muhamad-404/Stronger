import { useCallback, useEffect, useState } from 'react';
import {
  getWeeklyReviewBundle,
  saveWeekReflection,
  getWeekRange,
  shiftWeekStart,
} from '../services/weeklyReview.js';

export function useWeeklyReview(initialWeekStart) {
  const [weekStart, setWeekStart] = useState(
    () => initialWeekStart || getWeekRange().weekStart,
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState(null);
  const [reflection, setReflection] = useState(null);

  const refresh = useCallback(async () => {
    setError(null);
    try {
      const bundle = await getWeeklyReviewBundle(weekStart);
      setSummary(bundle.summary);
      setReflection(bundle.reflection);
    } catch (err) {
      setError(err?.message || 'Could not load weekly review.');
    } finally {
      setLoading(false);
    }
  }, [weekStart]);

  useEffect(() => {
    setLoading(true);
    refresh();
  }, [refresh]);

  const goPrev = () => setWeekStart((s) => shiftWeekStart(s, -1));
  const goNext = () => {
    const current = getWeekRange().weekStart;
    setWeekStart((s) => {
      const next = shiftWeekStart(s, 1);
      return next > current ? current : next;
    });
  };
  const goThisWeek = () => setWeekStart(getWeekRange().weekStart);

  const saveReflection = useCallback(
    async (partial) => {
      setSaving(true);
      setError(null);
      try {
        const next = await saveWeekReflection(weekStart, partial);
        setReflection(next);
        return next;
      } catch (err) {
        setError(err?.message || 'Could not save reflection.');
        throw err;
      } finally {
        setSaving(false);
      }
    },
    [weekStart],
  );

  return {
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
    refresh,
  };
}
