import { get, put, getAll, STORES } from './database/index.js';
import { getEntriesForDate, buildDaySummary } from './foodLog.js';
import { getHistoryForDate } from './workoutLog.js';
import { isStrengthDay } from '../data/workouts.js';
import {
  formatWeekRangeLabel,
  getWeekRange,
  parseDateKey,
  shiftDateKey,
  shiftWeekStart,
  toDateKey,
} from '../utils/dates.js';

function round1(n) {
  return Math.round(Number(n) * 10) / 10;
}

function pct(num, den) {
  return den > 0 ? Math.round((num / den) * 100) : null;
}

function reflectionId(weekStart) {
  return `weeklyReview_${weekStart}`;
}

function keysForWeekStart(weekStart) {
  const keys = [];
  for (let i = 0; i < 7; i += 1) {
    keys.push(shiftDateKey(weekStart, i));
  }
  return {
    weekStart: keys[0],
    weekEnd: keys[6],
    dateKeys: keys,
  };
}

async function getSortedWeightHistory() {
  const all = await getAll(STORES.weightHistory);
  return (all || []).sort((a, b) => {
    const d = String(a.date).localeCompare(String(b.date));
    if (d !== 0) return d;
    return String(a.createdAt || '').localeCompare(String(b.createdAt || ''));
  });
}

/**
 * Aggregate one Mon–Sun week from IndexedDB.
 * @param {string} [weekStart] Monday date key
 */
export async function buildWeekSummary(weekStart) {
  const week = weekStart ? keysForWeekStart(weekStart) : getWeekRange();
  const todayKey = toDateKey();
  const keysThroughToday = week.dateKeys.filter((k) => k <= todayKey);
  const isCurrentWeek = week.dateKeys.includes(todayKey);

  let foodSlotsDone = 0;
  let foodSlotsPlanned = 0;
  let mealsCompleted = 0;
  let mealsPlanned = 0;
  let workoutDone = 0;
  let workoutPlanned = 0;
  let sleepDays = 0;
  let sleepHoursTotal = 0;
  let appetiteSum = 0;
  let appetiteCount = 0;
  let energySum = 0;
  let energyCount = 0;

  for (const key of week.dateKeys) {
    const date = parseDateKey(key);
    const foodEntries = await getEntriesForDate(key);
    const foodSummary = buildDaySummary(foodEntries);
    const countFoodTowardDone = !isCurrentWeek || key <= todayKey;

    if (countFoodTowardDone) {
      foodSlotsPlanned += foodSummary.slotsTotal;
      mealsPlanned += foodSummary.mealsTotal + foodSummary.snacksTotal;
      foodSlotsDone += foodSummary.slotsWithEaten;
      mealsCompleted += foodSummary.mealsCompleted + foodSummary.snacksCompleted;
    }

    if (date && isStrengthDay(date)) {
      workoutPlanned += 1;
      if (!isCurrentWeek || key <= todayKey) {
        const sessions = await getHistoryForDate(key);
        if (sessions.some((s) => s.status === 'completed')) {
          workoutDone += 1;
        }
      }
    }

    const sleep = await get(STORES.sleepRecords, key);
    if (Number.isFinite(Number(sleep?.hours))) {
      sleepDays += 1;
      sleepHoursTotal += Number(sleep.hours);
    }

    const appetite = await get(STORES.appetiteRecords, key);
    if (Number.isFinite(Number(appetite?.value))) {
      appetiteSum += Number(appetite.value);
      appetiteCount += 1;
    }

    const energy = await get(STORES.energyRecords, key);
    if (Number.isFinite(Number(energy?.value))) {
      energySum += Number(energy.value);
      energyCount += 1;
    }
  }

  const history = await getSortedWeightHistory();
  const weekWeightRows = history.filter((h) =>
    week.dateKeys.includes(h.date),
  );
  const startWeight =
    weekWeightRows.length > 0 ? Number(weekWeightRows[0].weightKg) : null;
  const latestWeight =
    weekWeightRows.length > 0
      ? Number(weekWeightRows[weekWeightRows.length - 1].weightKg)
      : null;
  const weightChange =
    startWeight != null && latestWeight != null
      ? round1(latestWeight - startWeight)
      : null;

  const foodConsistency = pct(foodSlotsDone, foodSlotsPlanned);
  const sleepConsistency = pct(
    sleepDays,
    Math.max(keysThroughToday.length, 1),
  );

  const encouragement = buildEncouragement({
    foodConsistency,
    workoutDone,
    workoutPlanned,
    sleepDays,
    weightChange,
    nightsPossible: keysThroughToday.length,
  });

  return {
    weekStart: week.weekStart,
    weekEnd: week.weekEnd,
    dateKeys: week.dateKeys,
    label: formatWeekRangeLabel(week.weekStart, week.weekEnd),
    isCurrentWeek,
    weight: {
      startKg: startWeight,
      latestKg: latestWeight,
      changeKg: weightChange,
      sampleSize: weekWeightRows.length,
    },
    food: {
      planned: mealsPlanned,
      completed: mealsCompleted,
      slotsPlanned: foodSlotsPlanned,
      slotsCompleted: foodSlotsDone,
      consistencyPercent: foodConsistency,
    },
    workout: {
      planned: workoutPlanned,
      completed: workoutDone,
    },
    sleep: {
      avgHours: sleepDays > 0 ? round1(sleepHoursTotal / sleepDays) : null,
      nightsLogged: sleepDays,
      consistencyPercent: sleepConsistency,
    },
    appetite: {
      average: appetiteCount > 0 ? round1(appetiteSum / appetiteCount) : null,
      daysLogged: appetiteCount,
    },
    energy: {
      average: energyCount > 0 ? round1(energySum / energyCount) : null,
      daysLogged: energyCount,
    },
    encouragement,
  };
}

function buildEncouragement({
  foodConsistency,
  workoutDone,
  workoutPlanned,
  sleepDays,
  weightChange,
  nightsPossible,
}) {
  const bits = [];

  if (foodConsistency == null) {
    bits.push('Food logs will appear here as you use Eat — no rush.');
  } else if (foodConsistency >= 70) {
    bits.push('Meal consistency looked steady this week.');
  } else if (foodConsistency >= 40) {
    bits.push('Some meals landed — that still builds the habit.');
  } else {
    bits.push('A lighter food week is okay. Next week can start small.');
  }

  if (workoutPlanned > 0) {
    if (workoutDone >= workoutPlanned) {
      bits.push('You covered the planned strength days.');
    } else if (workoutDone > 0) {
      bits.push('Partial training weeks still count.');
    } else {
      bits.push('No completed workouts is fine — rest and food still matter.');
    }
  }

  if (sleepDays >= Math.ceil((nightsPossible || 7) * 0.5)) {
    bits.push('Sleep logging is helping you see your rhythm.');
  }

  if (weightChange != null && Math.abs(weightChange) < 0.3) {
    bits.push(
      'Weight was fairly steady — weekly trends matter more than daily noise.',
    );
  } else if (weightChange != null && weightChange > 0) {
    bits.push('A gentle upward tick this week — keep the habits kind.');
  }

  return bits[0] || 'This week is a checkpoint, not a grade.';
}

/**
 * @param {string} weekStart
 */
export async function getWeekReflection(weekStart) {
  const row = await get(STORES.notes, reflectionId(weekStart));
  return {
    id: reflectionId(weekStart),
    weekStart,
    wentWell: row?.wentWell || '',
    difficult: row?.difficult || '',
    changeNext: row?.changeNext || '',
    notes: row?.notes || row?.text || '',
    nextWeekFocus: Array.isArray(row?.nextWeekFocus) ? row.nextWeekFocus : [],
    updatedAt: row?.updatedAt || null,
  };
}

/**
 * @param {string} weekStart
 * @param {object} partial
 */
export async function saveWeekReflection(weekStart, partial) {
  const existing = await getWeekReflection(weekStart);
  const now = new Date().toISOString();
  const record = {
    id: reflectionId(weekStart),
    type: 'weeklyReview',
    weekStart,
    date: weekStart,
    wentWell: String(partial.wentWell ?? existing.wentWell ?? '').trim(),
    difficult: String(partial.difficult ?? existing.difficult ?? '').trim(),
    changeNext: String(partial.changeNext ?? existing.changeNext ?? '').trim(),
    notes: String(partial.notes ?? existing.notes ?? '').trim(),
    text: String(partial.notes ?? existing.notes ?? '').trim(),
    nextWeekFocus: Array.isArray(partial.nextWeekFocus)
      ? partial.nextWeekFocus
      : existing.nextWeekFocus || [],
    updatedAt: now,
  };
  await put(STORES.notes, record);
  return getWeekReflection(weekStart);
}

export async function getWeeklyReviewBundle(weekStart) {
  const start = weekStart || getWeekRange().weekStart;
  const [summary, reflection] = await Promise.all([
    buildWeekSummary(start),
    getWeekReflection(start),
  ]);
  return { summary, reflection };
}

export { getWeekRange, shiftWeekStart, formatWeekRangeLabel };
