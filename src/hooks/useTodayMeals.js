import { useCallback, useEffect, useState } from 'react';
import {
  ensureTodaySlots,
  setSlotEaten,
  setSlotMeal,
  setSlotNote,
} from '../services/meals.js';
import { toDateKey } from '../utils/dates.js';

/**
 * Today's meal slots with eaten / substitute / note actions.
 */
export function useTodayMeals(dateKey = toDateKey()) {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const next = await ensureTodaySlots(dateKey);
      setSlots(next);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, [dateKey]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const markEaten = useCallback(
    async (slotId, eaten) => {
      const previous = slots;
      setSlots((curr) =>
        curr.map((s) => (s.slotId === slotId ? { ...s, eaten } : s)),
      );
      try {
        const updated = await setSlotEaten(dateKey, slotId, eaten);
        setSlots((curr) =>
          curr.map((s) => (s.slotId === slotId ? updated : s)),
        );
        return updated;
      } catch (err) {
        setSlots(previous);
        throw err;
      }
    },
    [dateKey, slots],
  );

  const substitute = useCallback(
    async (slotId, mealId) => {
      const updated = await setSlotMeal(dateKey, slotId, mealId);
      setSlots((curr) =>
        curr.map((s) => (s.slotId === slotId ? updated : s)),
      );
      return updated;
    },
    [dateKey],
  );

  const saveNote = useCallback(
    async (slotId, note) => {
      const updated = await setSlotNote(dateKey, slotId, note);
      setSlots((curr) =>
        curr.map((s) => (s.slotId === slotId ? updated : s)),
      );
      return updated;
    },
    [dateKey],
  );

  return {
    slots,
    loading,
    error,
    refresh,
    markEaten,
    substitute,
    saveNote,
    dateKey,
  };
}
