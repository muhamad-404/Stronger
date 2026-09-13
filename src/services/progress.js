import { get, put, getAll, remove, STORES, runMultiStoreTransaction } from './database/index.js';
import {
  ensureStableWeightGoals,
  getProfile,
  GOAL_ID,
} from './profile.js';
import { getEntriesForDate, buildDaySummary } from './foodLog.js';
import { getHistoryForDate } from './workoutLog.js';
import { isStrengthDay } from '../data/workouts.js';
import { DAILY_TASK_COUNT } from '../data/dailyTasks.js';
import { buildWeekSummary } from './weeklyReview.js';
import {
  createId,
  formatKg,
  listDateKeys,
  isDateKey,
  parseDateKey,
  toDateKey,
} from '../utils/dates.js';

export const GOALS_SETTINGS_ID = 'weightGoals';

function round1(n) {
  return Math.round(n * 10) / 10;
}

function sortWeightAsc(rows) {
  return [...rows].sort((a, b) => {
    const d = String(a.date).localeCompare(String(b.date));
    if (d !== 0) return d;
    return String(a.createdAt || '').localeCompare(String(b.createdAt || ''));
  });
}

function sortWeightDesc(rows) {
  return sortWeightAsc(rows).reverse();
}

/**
 * @returns {Promise<object[]>}
 */
export async function getWeightHistory() {
  const all = await getAll(STORES.weightHistory);
  return sortWeightAsc(all || []);
}

/**
 * Log a weight entry and sync profile current weight.
 */
export async function logWeight({ date, weightKg, note = '' }) {
  const dateKey = date || toDateKey();
  if (!isDateKey(dateKey)) {
    throw new Error('Weight entry needs a valid date.');
  }
  const value = Number(weightKg);
  if (!Number.isFinite(value) || value < 30 || value > 200) {
    throw new Error('Enter a weight between 30 and 200 kg.');
  }

  const now = new Date().toISOString();
  const entry = {
    id: createId('weight'),
    date: dateKey,
    weightKg: round1(value),
    note: String(note || '').trim(),
    source: 'progress',
    createdAt: now,
  };

  const profile = await getProfile();
  const storeNames = profile
    ? [STORES.weightHistory, STORES.settings]
    : [STORES.weightHistory];

  await runMultiStoreTransaction(storeNames, (stores) => {
    stores[STORES.weightHistory].put(entry);
    if (profile) {
      stores[STORES.settings].put({
        ...profile,
        currentWeightKg: entry.weightKg,
        updatedAt: now,
      });
    }
  });

  return entry;
}

/**
 * Delete a weight history entry by id.
 */
export async function deleteWeightEntry(id) {
  await remove(STORES.weightHistory, id);
}

/**
 * Build default milestones from profile.
 */
export function defaultMilestonesFromProfile(profile) {
  const start = Number(profile?.startingWeightKg ?? profile?.currentWeightKg);
  const target = Number(profile?.targetWeightKg);
  const first = Number(
    profile?.firstMilestoneKg ??
      (Number.isFinite(start) ? round1(start + Math.min(1, (target || start + 1) - start)) : null),
  );

  let m1 = Number.isFinite(first) ? first : null;
  let m2 = null;
  let longTerm = Number.isFinite(target) ? target : null;

  if (Number.isFinite(start) && Number.isFinite(target) && target > start) {
    if (!Number.isFinite(m1) || m1 <= start) {
      m1 = round1(start + Math.min(2.5, (target - start) / 3));
    }
    const mid = round1(start + (target - start) * 0.55);
    m2 = mid > m1 && mid < target ? mid : round1(Math.min(target, m1 + 2));
    if (m2 <= m1) m2 = round1(Math.min(target, m1 + 1));
    longTerm = target;
  } else if (Number.isFinite(start)) {
    m1 = m1 || round1(start + 1);
    m2 = round1(start + 3);
    longTerm = round1(start + 5);
  }

  return {
    milestone1Kg: m1,
    milestone2Kg: m2,
    longTermKg: longTerm,
  };
}

/**
 * Load editable milestones (settings id weightGoals), backfilled from profile.
 */
export async function getWeightGoals() {
  const profile = await ensureStableWeightGoals(await getProfile());
  const saved = await get(STORES.settings, GOALS_SETTINGS_ID);
  const defaults = defaultMilestonesFromProfile(profile);

  const goals = {
    id: GOALS_SETTINGS_ID,
    startingWeightKg: Number.isFinite(saved?.startingWeightKg)
      ? saved.startingWeightKg
      : profile?.startingWeightKg,
    milestone1Kg: Number.isFinite(saved?.milestone1Kg)
      ? saved.milestone1Kg
      : defaults.milestone1Kg,
    milestone2Kg: Number.isFinite(saved?.milestone2Kg)
      ? saved.milestone2Kg
      : defaults.milestone2Kg,
    longTermKg: Number.isFinite(saved?.longTermKg)
      ? saved.longTermKg
      : defaults.longTermKg,
    updatedAt: saved?.updatedAt || null,
  };

  if (!saved && profile) {
    await put(STORES.settings, {
      ...goals,
      updatedAt: new Date().toISOString(),
    });
  }

  return { profile, goals };
}

/**
 * Save editable milestones.
 */
export async function saveWeightGoals(partial) {
  const current = await get(STORES.settings, GOALS_SETTINGS_ID);
  const next = {
    id: GOALS_SETTINGS_ID,
    startingWeightKg: Number(partial.startingWeightKg ?? current?.startingWeightKg),
    milestone1Kg: Number(partial.milestone1Kg ?? current?.milestone1Kg),
    milestone2Kg: Number(partial.milestone2Kg ?? current?.milestone2Kg),
    longTermKg: Number(partial.longTermKg ?? current?.longTermKg),
    updatedAt: new Date().toISOString(),
  };

  await put(STORES.settings, next);

  // Keep primary goals + profile target in sync with long-term / m1
  const profile = await getProfile();
  if (profile) {
    await put(STORES.settings, {
      ...profile,
      startingWeightKg: Number.isFinite(next.startingWeightKg)
        ? next.startingWeightKg
        : profile.startingWeightKg,
      firstMilestoneKg: next.milestone1Kg,
      targetWeightKg: next.longTermKg,
      updatedAt: next.updatedAt,
    });
  }

  const primary = (await get(STORES.goals, GOAL_ID)) || { id: GOAL_ID };
  await put(STORES.goals, {
    ...primary,
    id: GOAL_ID,
    startingWeightKg: next.startingWeightKg,
    firstMilestoneKg: next.milestone1Kg,
    milestone2Kg: next.milestone2Kg,
    targetWeightKg: next.longTermKg,
    updatedAt: next.updatedAt,
  });

  return next;
}

/**
 * Active milestone = first milestone not yet reached (or long-term).
 */
export function resolveActiveMilestone(currentKg, goals) {
  const ordered = [
    { key: 'milestone1', label: 'Milestone 1', kg: goals.milestone1Kg },
    { key: 'milestone2', label: 'Milestone 2', kg: goals.milestone2Kg },
    { key: 'longTerm', label: 'Longer-term target', kg: goals.longTermKg },
  ].filter((m) => Number.isFinite(m.kg));

  const next = ordered.find((m) => currentKg < m.kg) || ordered[ordered.length - 1] || null;
  return next;
}

/**
 * Weight summary for dashboard.
 */
export function buildWeightSummary(history, goals, profile) {
  const starting =
    Number(goals?.startingWeightKg) ||
    Number(profile?.startingWeightKg) ||
    (history[0] ? Number(history[0].weightKg) : null);

  const latestEntry = history.length ? sortWeightDesc(history)[0] : null;
  const current =
    latestEntry != null
      ? Number(latestEntry.weightKg)
      : Number(profile?.currentWeightKg);

  const active = resolveActiveMilestone(current, goals || {});
  const totalChange =
    Number.isFinite(current) && Number.isFinite(starting)
      ? round1(current - starting)
      : null;
  const remaining =
    active && Number.isFinite(current)
      ? round1(active.kg - current)
      : null;

  return {
    startingKg: Number.isFinite(starting) ? round1(starting) : null,
    currentKg: Number.isFinite(current) ? round1(current) : null,
    goalKg: Number.isFinite(goals?.longTermKg)
      ? round1(goals.longTermKg)
      : Number.isFinite(profile?.targetWeightKg)
        ? round1(profile.targetWeightKg)
        : null,
    activeMilestone: active,
    totalChangeKg: totalChange,
    remainingToMilestoneKg: remaining,
    chartData: history.map((row) => ({
      date: row.date,
      label: formatChartLabel(row.date),
      weightKg: Number(row.weightKg),
      note: row.note || '',
    })),
    entryCount: history.length,
  };
}

function formatChartLabel(dateKey) {
  const d = parseDateKey(dateKey);
  if (!d) return dateKey;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

/** Journal: energy / appetite / sleep / note keyed by date */

export async function getJournalForDate(dateKey) {
  const [energy, appetite, sleep, note] = await Promise.all([
    get(STORES.energyRecords, dateKey),
    get(STORES.appetiteRecords, dateKey),
    get(STORES.sleepRecords, dateKey),
    get(STORES.notes, `journal_${dateKey}`),
  ]);

  return {
    date: dateKey,
    energy: energy?.value ?? null,
    appetite: appetite?.value ?? null,
    sleepHours: sleep?.hours ?? null,
    sleepQuality: sleep?.quality ?? null,
    sleepBedtime: sleep?.bedtime ?? null,
    sleepWakeTime: sleep?.wakeTime ?? null,
    note: note?.text ?? '',
  };
}

export async function saveJournalEntry({
  date,
  energy,
  appetite,
  sleepHours,
  note,
}) {
  const dateKey = date || toDateKey();
  const now = new Date().toISOString();

  if (energy != null && energy !== '') {
    await put(STORES.energyRecords, {
      id: dateKey,
      date: dateKey,
      value: Number(energy),
      updatedAt: now,
    });
  }
  if (appetite != null && appetite !== '') {
    await put(STORES.appetiteRecords, {
      id: dateKey,
      date: dateKey,
      value: Number(appetite),
      updatedAt: now,
    });
  }
  if (sleepHours != null && sleepHours !== '') {
    const existing = (await get(STORES.sleepRecords, dateKey)) || {};
    await put(STORES.sleepRecords, {
      ...existing,
      id: dateKey,
      date: dateKey,
      hours: Number(sleepHours),
      updatedAt: now,
    });
  }
  await put(STORES.notes, {
    id: `journal_${dateKey}`,
    date: dateKey,
    text: String(note || '').trim(),
    type: 'journal',
    updatedAt: now,
  });

  return getJournalForDate(dateKey);
}

export async function getJournalsForDates(dateKeys) {
  const rows = await Promise.all(dateKeys.map((k) => getJournalForDate(k)));
  return rows;
}

/**
 * Weekly consistency metrics from IndexedDB.
 */
export async function computeWeeklyConsistency(days = 7) {
  const keys = listDateKeys(days);
  let foodSlotsDone = 0;
  let foodSlotsPlanned = 0;
  let mealsDone = 0;
  let mealsPlanned = 0;
  let workoutDone = 0;
  let workoutPlanned = 0;
  let sleepDays = 0;
  let sleepHoursTotal = 0;
  let routineDone = 0;
  let routinePlanned = 0;
  let appetiteSum = 0;
  let appetiteCount = 0;
  const notes = [];

  for (const key of keys) {
    const date = parseDateKey(key);
    const foodEntries = await getEntriesForDate(key);
    const foodSummary = buildDaySummary(foodEntries);
    foodSlotsDone += foodSummary.slotsWithEaten;
    foodSlotsPlanned += foodSummary.slotsTotal;
    mealsDone += foodSummary.mealsCompleted + foodSummary.snacksCompleted;
    mealsPlanned += foodSummary.mealsTotal + foodSummary.snacksTotal;

    if (date && isStrengthDay(date)) {
      workoutPlanned += 1;
      const sessions = await getHistoryForDate(key);
      if (sessions.some((s) => s.status === 'completed')) {
        workoutDone += 1;
      }
    }

    const journal = await getJournalForDate(key);
    if (Number.isFinite(journal.sleepHours)) {
      sleepDays += 1;
      sleepHoursTotal += journal.sleepHours;
    }
    if (Number.isFinite(journal.appetite)) {
      appetiteSum += journal.appetite;
      appetiteCount += 1;
    }
    if (journal.note) {
      notes.push({ date: key, text: journal.note });
    }

    const daily = await get(STORES.dailyLogs, key);
    const completed = daily?.completedTaskIds?.length || 0;
    routineDone += completed;
    routinePlanned += DAILY_TASK_COUNT;
  }

  const pct = (num, den) =>
    den > 0 ? Math.round((num / den) * 100) : null;

  return {
    days,
    dateKeys: keys,
    foodPercent: pct(foodSlotsDone, foodSlotsPlanned),
    workoutPercent: pct(workoutDone, workoutPlanned),
    sleepPercent: pct(sleepDays, days),
    routinePercent: pct(routineDone, routinePlanned),
    mealsCompleted: mealsDone,
    mealsPlanned,
    workoutsCompleted: workoutDone,
    workoutsPlanned: workoutPlanned,
    avgSleepHours:
      sleepDays > 0 ? round1(sleepHoursTotal / sleepDays) : null,
    avgAppetite:
      appetiteCount > 0 ? round1(appetiteSum / appetiteCount) : null,
    notes: notes.slice(-5),
  };
}

/**
 * Weekly review card data (calendar week containing today).
 */
export async function buildWeeklyReview() {
  const summary = await buildWeekSummary();
  return {
    ...summary,
    avgWeightKg: summary.weight.latestKg ?? summary.weight.startKg,
    weightSampleSize: summary.weight.sampleSize,
    mealsCompleted: summary.food.completed,
    mealsPlanned: summary.food.planned,
    workoutsCompleted: summary.workout.completed,
    workoutsPlanned: summary.workout.planned,
    avgSleepHours: summary.sleep.avgHours,
    avgAppetite: summary.appetite.average,
    foodPercent: summary.food.consistencyPercent,
    notes: [],
  };
}

export { formatKg };
