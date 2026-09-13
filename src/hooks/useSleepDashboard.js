import { useCallback, useEffect, useState } from 'react';
import {
  getDefaultSleepTimes,
  getSleepRecord,
  getSleepWeekSummary,
  saveSleepRecord,
} from '../services/sleep.js';
import { toDateKey } from '../utils/dates.js';

export function useSleepDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [today, setToday] = useState(null);
  const [week, setWeek] = useState(null);
  const [defaults, setDefaults] = useState({
    bedtime: '22:30',
    wakeTime: '07:00',
  });

  const refresh = useCallback(async () => {
    setError(null);
    try {
      const [record, summary, times] = await Promise.all([
        getSleepRecord(toDateKey()),
        getSleepWeekSummary(7),
        getDefaultSleepTimes(),
      ]);
      setToday(record);
      setWeek(summary);
      setDefaults(times);
    } catch (err) {
      setError(err?.message || 'Could not load sleep data.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    refresh();
  }, [refresh]);

  const save = useCallback(
    async (partial) => {
      setSaving(true);
      setError(null);
      try {
        await saveSleepRecord({
          date: toDateKey(),
          fromSleepModule: true,
          ...partial,
        });
        await refresh();
      } catch (err) {
        setError(err?.message || 'Could not save sleep.');
        throw err;
      } finally {
        setSaving(false);
      }
    },
    [refresh],
  );

  return {
    loading,
    error,
    saving,
    today,
    week,
    defaults,
    save,
    refresh,
  };
}
