import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  addEntry,
  buildDaySummary,
  deleteEntry,
  getEntriesForDate,
  groupEntriesBySlot,
  logCatalogMeal,
  toggleEntryEaten,
  updateEntry,
} from '../services/foodLog.js';
import {
  shiftDateKey,
  toDateKey,
} from '../utils/dates.js';

/**
 * Daily food log with date navigation.
 */
export function useFoodLog(initialDateKey = toDateKey()) {
  const todayKey = toDateKey();
  const [dateKey, setDateKey] = useState(initialDateKey);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async (key = dateKey) => {
    setLoading(true);
    try {
      const rows = await getEntriesForDate(key);
      setEntries(rows);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, [dateKey]);

  useEffect(() => {
    load(dateKey);
  }, [dateKey, load]);

  const summary = useMemo(() => buildDaySummary(entries), [entries]);
  const grouped = useMemo(() => groupEntriesBySlot(entries), [entries]);

  const goPrevDay = useCallback(() => {
    setDateKey((prev) => shiftDateKey(prev, -1));
  }, []);

  const goNextDay = useCallback(() => {
    setDateKey((prev) => {
      const next = shiftDateKey(prev, 1);
      return next > todayKey ? prev : next;
    });
  }, [todayKey]);

  const goToday = useCallback(() => {
    setDateKey(todayKey);
  }, [todayKey]);

  const add = useCallback(
    async (partial) => {
      const entry = await addEntry({ ...partial, date: dateKey });
      setEntries((prev) => {
        const next = [...prev.filter((e) => e.id !== entry.id), entry];
        return next;
      });
      await load(dateKey);
      return entry;
    },
    [dateKey, load],
  );

  const edit = useCallback(
    async (id, patch) => {
      const entry = await updateEntry(id, patch);
      await load(entry.date === dateKey ? dateKey : dateKey);
      return entry;
    },
    [dateKey, load],
  );

  const remove = useCallback(
    async (id) => {
      await deleteEntry(id);
      setEntries((prev) => prev.filter((e) => e.id !== id));
      await load(dateKey);
    },
    [dateKey, load],
  );

  const toggleEaten = useCallback(
    async (id) => {
      setEntries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, eaten: !e.eaten } : e)),
      );
      try {
        await toggleEntryEaten(id);
        await load(dateKey);
      } catch (err) {
        await load(dateKey);
        throw err;
      }
    },
    [dateKey, load],
  );

  const logMeal = useCallback(
    async ({ slotId, mealId, eaten = true }) => {
      const created = await logCatalogMeal({
        dateKey,
        slotId,
        mealId,
        eaten,
      });
      await load(dateKey);
      return created;
    },
    [dateKey, load],
  );

  return {
    dateKey,
    todayKey,
    isToday: dateKey === todayKey,
    canGoNext: dateKey < todayKey,
    entries,
    grouped,
    summary,
    loading,
    error,
    setDateKey,
    goPrevDay,
    goNextDay,
    goToday,
    add,
    edit,
    remove,
    toggleEaten,
    logMeal,
    refresh: () => load(dateKey),
  };
}
