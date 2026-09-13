import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  completeExercise,
  completeSet,
  finishSession,
  getActiveSession,
  getSession,
  getSessionProgress,
  startSession,
  updateSetActual,
} from '../services/workoutLog.js';
import { toDateKey } from '../utils/dates.js';

/**
 * Active workout session state + actions.
 * @param {string} workoutId A|B
 * @param {string} [dateKey]
 */
export function useWorkoutSession(workoutId, dateKey = toDateKey()) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const active = await getActiveSession(dateKey);
      if (active && active.workoutId === String(workoutId).toUpperCase()) {
        setSession(active);
      } else {
        setSession(null);
      }
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, [dateKey, workoutId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const progress = useMemo(
    () => getSessionProgress(session),
    [session],
  );

  const start = useCallback(async () => {
    setSaving(true);
    try {
      const next = await startSession(workoutId, dateKey);
      setSession(next);
      return next;
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      throw err;
    } finally {
      setSaving(false);
    }
  }, [workoutId, dateKey]);

  const toggleSet = useCallback(
    async (exerciseId, setIndex, completed) => {
      if (!session) return;
      const next = await completeSet(session.id, exerciseId, setIndex, completed);
      setSession(next);
      return next;
    },
    [session],
  );

  const setActual = useCallback(
    async (exerciseId, setIndex, actual) => {
      if (!session) return;
      const next = await updateSetActual(
        session.id,
        exerciseId,
        setIndex,
        actual,
      );
      setSession(next);
      return next;
    },
    [session],
  );

  const markExerciseComplete = useCallback(
    async (exerciseId, skipRemaining = false) => {
      if (!session) return;
      const next = await completeExercise(
        session.id,
        exerciseId,
        skipRemaining,
      );
      setSession(next);
      return next;
    },
    [session],
  );

  const finish = useCallback(
    async (opts = {}) => {
      if (!session) return null;
      setSaving(true);
      try {
        const next = await finishSession(session.id, opts);
        setSession(next);
        return next;
      } finally {
        setSaving(false);
      }
    },
    [session],
  );

  const loadById = useCallback(async (id) => {
    const next = await getSession(id);
    setSession(next);
    return next;
  }, []);

  return {
    session,
    loading,
    error,
    saving,
    progress,
    start,
    toggleSet,
    setActual,
    markExerciseComplete,
    finish,
    refresh,
    loadById,
  };
}
