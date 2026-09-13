import { Coffee, Cookie, Sun, Apple, Dumbbell, UtensilsCrossed, Moon, BedDouble } from 'lucide-react';
import { addMinutesToTime } from '../utils/dates.js';

/**
 * Canonical daily routine tasks (ids are stable for IndexedDB).
 */
export const DAILY_TASK_DEFS = [
  {
    id: 'breakfast',
    title: 'Breakfast',
    icon: Coffee,
    offsetFromWake: 0,
  },
  {
    id: 'morningSnack',
    title: 'Morning snack',
    icon: Cookie,
    offsetFromWake: 150,
  },
  {
    id: 'lunch',
    title: 'Lunch',
    icon: Sun,
    offsetFromWake: 300,
  },
  {
    id: 'afternoonSnack',
    title: 'Afternoon snack',
    icon: Apple,
    offsetFromWake: 480,
  },
  {
    id: 'workout',
    title: 'Workout',
    icon: Dumbbell,
    offsetFromWake: 540,
  },
  {
    id: 'dinner',
    title: 'Dinner',
    icon: UtensilsCrossed,
    offsetFromWake: 660,
  },
  {
    id: 'bedtimeSnack',
    title: 'Bedtime snack',
    icon: Moon,
    useBedOffset: -60,
  },
  {
    id: 'sleep',
    title: 'Sleep',
    icon: BedDouble,
    useBedOffset: 0,
  },
];

/**
 * Build today's ordered tasks with approximate time labels.
 * @param {string} [wakeTime]
 * @param {string} [bedTime]
 * @returns {Array<{ id: string, title: string, icon: import('lucide-react').LucideIcon, timeLabel: string }>}
 */
export function buildTodaysTasks(wakeTime = '07:00', bedTime = '22:30') {
  return DAILY_TASK_DEFS.map((def) => {
    let timeLabel;
    if (typeof def.useBedOffset === 'number') {
      timeLabel = addMinutesToTime(bedTime, def.useBedOffset, '22:30');
    } else {
      timeLabel = addMinutesToTime(wakeTime, def.offsetFromWake ?? 0, '07:00');
    }

    return {
      id: def.id,
      title: def.title,
      icon: def.icon,
      timeLabel,
    };
  });
}

export const DAILY_TASK_COUNT = DAILY_TASK_DEFS.length;
