import { get, put, remove, getAll, STORES } from './database/index.js';
import { createId, listDateKeys, toDateKey } from '../utils/dates.js';
import { GOAL_ID, getProfile } from './profile.js';
import { getWeightHistory, getWeightGoals, computeWeeklyConsistency } from './progress.js';

export const GOAL_CATEGORIES = [
  { id: 'weight', label: 'Weight' },
  { id: 'food', label: 'Food' },
  { id: 'strength', label: 'Strength' },
  { id: 'sleep', label: 'Sleep' },
  { id: 'routine', label: 'Routine' },
];

export const GOAL_STATUSES = ['active', 'completed', 'paused'];

function isUserGoal(record) {
  return record && record.id !== GOAL_ID && record.category;
}

function round1(n) {
  return Math.round(Number(n) * 10) / 10;
}

/**
 * @returns {Promise<object[]>}
 */
export async function listGoals() {
  const all = await getAll(STORES.goals);
  return (all || [])
    .filter(isUserGoal)
    .sort((a, b) => String(a.createdAt || '').localeCompare(String(b.createdAt || '')));
}

export async function getGoal(id) {
  const row = await get(STORES.goals, id);
  return isUserGoal(row) ? row : null;
}

/**
 * Seed five starter goals once, tied to real metrics where possible.
 */
export async function ensureDefaultGoals() {
  const existing = await listGoals();
  if (existing.length) return existing;

  const profile = await getProfile();
  const { goals: weightGoals } = await getWeightGoals();
  const milestone =
    Number(weightGoals?.milestone1Kg) ||
    Number(profile?.firstMilestoneKg) ||
    46;
  const now = new Date().toISOString();
  const start = toDateKey();

  const seeds = [
    {
      title: `Reach ${milestone} kg`,
      category: 'weight',
      target: milestone,
      current: Number(profile?.currentWeightKg) || Number(profile?.startingWeightKg) || 0,
      unit: 'kg',
      tracking: 'auto',
      metric: 'weight_kg',
      startDate: start,
      targetDate: null,
      status: 'active',
    },
    {
      title: 'Complete planned meals 80% of the week',
      category: 'food',
      target: 80,
      current: 0,
      unit: '%',
      tracking: 'auto',
      metric: 'food_week_pct',
      startDate: start,
      targetDate: null,
      status: 'active',
    },
    {
      title: 'Complete 3 strength workouts this week',
      category: 'strength',
      target: 3,
      current: 0,
      unit: 'workouts',
      tracking: 'auto',
      metric: 'workouts_week',
      startDate: start,
      targetDate: null,
      status: 'active',
    },
    {
      title: 'Sleep around 7–9 hours',
      category: 'sleep',
      target: 8,
      current: 0,
      unit: 'hours avg',
      tracking: 'auto',
      metric: 'sleep_hours_avg',
      startDate: start,
      targetDate: null,
      status: 'active',
    },
    {
      title: 'Follow the daily routine 5 days this week',
      category: 'routine',
      target: 5,
      current: 0,
      unit: 'days',
      tracking: 'auto',
      metric: 'routine_days_week',
      startDate: start,
      targetDate: null,
      status: 'active',
    },
  ];

  const created = [];
  for (const seed of seeds) {
    const goal = {
      id: createId('goal'),
      ...seed,
      celebratedAt: null,
      createdAt: now,
      updatedAt: now,
    };
    await put(STORES.goals, goal);
    created.push(goal);
  }
  return created;
}

export async function createGoal(partial) {
  const now = new Date().toISOString();
  const goal = {
    id: createId('goal'),
    title: String(partial.title || '').trim(),
    category: partial.category || 'routine',
    target: Number(partial.target) || 0,
    current: Number(partial.current) || 0,
    unit: String(partial.unit || '').trim() || 'units',
    startDate: partial.startDate || toDateKey(),
    targetDate: partial.targetDate || null,
    status: partial.status || 'active',
    tracking: partial.tracking || 'manual',
    metric: partial.metric || null,
    celebratedAt: null,
    createdAt: now,
    updatedAt: now,
  };
  if (!goal.title) throw new Error('Add a goal title.');
  await put(STORES.goals, goal);
  return goal;
}

export async function updateGoal(id, patch) {
  const existing = await getGoal(id);
  if (!existing) throw new Error('Goal not found.');
  const next = {
    ...existing,
    ...patch,
    id: existing.id,
    title:
      patch.title !== undefined
        ? String(patch.title).trim()
        : existing.title,
    updatedAt: new Date().toISOString(),
  };
  if (!next.title) throw new Error('Add a goal title.');
  await put(STORES.goals, next);
  return next;
}

export async function deleteGoal(id) {
  const existing = await getGoal(id);
  if (!existing) return null;
  await remove(STORES.goals, id);
  return existing;
}

export async function setManualProgress(id, current) {
  const value = Number(current);
  if (!Number.isFinite(value) || value < 0) {
    throw new Error('Enter a valid progress value.');
  }
  const existing = await getGoal(id);
  if (!existing) throw new Error('Goal not found.');

  let status = existing.status;
  if (status === 'active' && value >= Number(existing.target)) {
    status = 'completed';
  }

  return updateGoal(id, {
    current: value,
    status,
    tracking: 'manual',
  });
}

/**
 * Live metric values from app data (no fake numbers).
 */
export async function computeLiveMetrics() {
  const [history, consistency, profile] = await Promise.all([
    getWeightHistory(),
    computeWeeklyConsistency(7),
    getProfile(),
  ]);

  const latest =
    history.length > 0
      ? Number(history[history.length - 1].weightKg)
      : Number(profile?.currentWeightKg) || null;

  // Routine days: days in last 7 with at least half the daily tasks done
  const keys = listDateKeys(7);
  let routineDays = 0;
  for (const key of keys) {
    const log = await get(STORES.dailyLogs, key);
    const done = log?.completedTaskIds?.length || 0;
    if (done >= 4) routineDays += 1;
  }

  return {
    weight_kg: latest,
    food_week_pct: consistency.foodPercent,
    workouts_week: consistency.workoutsCompleted,
    sleep_hours_avg: consistency.avgSleepHours,
    routine_days_week: routineDays,
  };
}

/**
 * Attach live current values + percent for display.
 */
export function enrichGoal(goal, metrics) {
  let current = Number(goal.current) || 0;
  let hasLive = false;

  if (goal.tracking === 'auto' && goal.metric && metrics) {
    const live = metrics[goal.metric];
    if (live != null && Number.isFinite(Number(live))) {
      current = Number(live);
      hasLive = true;
    }
  }

  const target = Number(goal.target) || 0;
  let percent = 0;
  let isComplete = goal.status === 'completed';

  if (goal.metric === 'weight_kg' && target > 0 && hasLive) {
    const start = Number(goal.startWeight);
    const floor = Number.isFinite(start) ? start : Math.min(current, target);
    const span = target - floor;
    if (span > 0) {
      percent = Math.min(
        100,
        Math.max(0, Math.round(((current - floor) / span) * 100)),
      );
    } else if (current >= target) {
      percent = 100;
    }
    if (current >= target) isComplete = true;
  } else if (goal.metric === 'sleep_hours_avg') {
    // “Around 7–9 hours” — complete when weekly average sits in range
    if (hasLive) {
      if (current >= 7 && current <= 9) {
        percent = 100;
        isComplete = true;
      } else if (current < 7) {
        percent = Math.min(99, Math.round((current / 7) * 100));
      } else {
        // Above 9 — still near target, not fully “regular”
        percent = Math.max(40, Math.round(100 - (current - 9) * 15));
      }
    }
  } else if (target > 0 && (hasLive || goal.tracking === 'manual')) {
    percent = Math.min(100, Math.max(0, Math.round((current / target) * 100)));
    if (percent >= 100) isComplete = true;
  }

  let status = goal.status;
  if (status === 'active' && isComplete) {
    status = 'completed';
  }

  return {
    ...goal,
    current: round1(current),
    percent,
    status,
    hasLive: goal.tracking === 'manual' ? true : hasLive,
    isComplete: status === 'completed' || isComplete,
  };
}

/**
 * Load goals with live progress; persist auto-completion when reached.
 */
export async function getEnrichedGoals() {
  await ensureDefaultGoals();
  const [goals, metrics, weightGoals, profile] = await Promise.all([
    listGoals(),
    computeLiveMetrics(),
    getWeightGoals(),
    getProfile(),
  ]);

  const startWeight =
    Number(weightGoals.goals?.startingWeightKg) ||
    Number(profile?.startingWeightKg) ||
    null;

  const enriched = [];
  for (const goal of goals) {
    const withStart =
      goal.metric === 'weight_kg'
        ? { ...goal, startWeight }
        : goal;
    let next = enrichGoal(withStart, metrics);

    if (
      goal.tracking === 'auto' &&
      goal.status === 'active' &&
      next.isComplete
    ) {
      const saved = await updateGoal(goal.id, {
        current: next.current,
        status: 'completed',
      });
      next = enrichGoal({ ...saved, startWeight }, metrics);
    }

    enriched.push(next);
  }

  return enriched;
}

export async function markGoalCelebrated(id) {
  return updateGoal(id, { celebratedAt: new Date().toISOString() });
}

export function formatGoalProgress(goal) {
  if (!goal.hasLive && goal.tracking === 'auto') {
    return 'Waiting on logs';
  }
  if (goal.metric === 'sleep_hours_avg') {
    return `${goal.current} h avg (aim 7–9)`;
  }
  if (goal.unit === '%') {
    return `${goal.current}% / ${goal.target}%`;
  }
  if (goal.unit === 'kg') {
    return `${goal.current} → ${goal.target} kg`;
  }
  return `${goal.current} / ${goal.target} ${goal.unit}`;
}
