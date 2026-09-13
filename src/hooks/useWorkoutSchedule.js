import { useMemo } from 'react';
import { getScheduledWorkoutForDate } from '../data/workouts.js';
import { formatLongDate, toDateKey } from '../utils/dates.js';

/**
 * Today's (or given date) strength schedule.
 * @param {Date} [date]
 */
export function useWorkoutSchedule(date = new Date()) {
  const dateKey = toDateKey(date);

  return useMemo(() => {
    const d = date instanceof Date ? date : new Date();
    const scheduled = getScheduledWorkoutForDate(d);
    return {
      date: d,
      dateKey,
      dateLabel: formatLongDate(d),
      ...scheduled,
      isRest: scheduled.type === 'rest',
      isStrength: scheduled.type !== 'rest',
    };
  }, [dateKey]); // eslint-disable-line react-hooks/exhaustive-deps -- date keyed by dateKey
}
