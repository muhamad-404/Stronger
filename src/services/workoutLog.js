import { get, put, getAll, STORES } from './database/index.js';
import {
  getExerciseById,
  getWorkoutById,
  getWorkoutExercises,
} from '../data/workouts.js';
import { setTaskCompleted } from './dailyLog.js';
import { createId, toDateKey } from '../utils/dates.js';

function buildExerciseState(exercise) {
  const target = exercise.repsOrDuration;
  const sets = Array.from({ length: exercise.sets }, (_, index) => ({
    index,
    target,
    actual: target,
    completed: false,
  }));
  return {
    exerciseId: exercise.id,
    targetSets: exercise.sets,
    targetRepsOrSec: target,
    tracking: exercise.tracking,
    perSide: Boolean(exercise.perSide),
    sets,
    completed: false,
  };
}

function buildSessionSkeleton(workoutId, dateKey) {
  const workout = getWorkoutById(workoutId);
  if (!workout) throw new Error('Unknown workout.');
  const exercises = getWorkoutExercises(workoutId).map(buildExerciseState);
  const now = new Date().toISOString();
  return {
    id: createId('wo'),
    date: dateKey,
    workoutId: workout.id,
    status: 'in_progress',
    startedAt: now,
    completedAt: null,
    exercises,
    note: '',
    suggestedNextReps: false,
    updatedAt: now,
  };
}

/**
 * @param {string} [dateKey]
 */
export async function getHistoryForDate(dateKey = toDateKey()) {
  const all = await getAll(STORES.workouts);
  return (all || [])
    .filter((s) => s.date === dateKey)
    .sort((a, b) => String(b.startedAt).localeCompare(String(a.startedAt)));
}

/**
 * @param {string} [dateKey]
 */
export async function getActiveSession(dateKey = toDateKey()) {
  const history = await getHistoryForDate(dateKey);
  return history.find((s) => s.status === 'in_progress') || null;
}

/**
 * @param {string} id
 */
export async function getSession(id) {
  return (await get(STORES.workouts, id)) || null;
}

/**
 * Start or resume today's session for workout A/B.
 * @param {string} workoutId
 * @param {string} [dateKey]
 */
export async function startSession(workoutId, dateKey = toDateKey()) {
  const existing = await getActiveSession(dateKey);
  if (existing) {
    if (existing.workoutId === String(workoutId).toUpperCase()) {
      return existing;
    }
    // Abandon mismatched in-progress session
    existing.status = 'abandoned';
    existing.updatedAt = new Date().toISOString();
    await put(STORES.workouts, existing);
  }

  // Resume incomplete same-day completed? Always start fresh unless active.
  const completedToday = (await getHistoryForDate(dateKey)).find(
    (s) =>
      s.status === 'completed' &&
      s.workoutId === String(workoutId).toUpperCase(),
  );
  if (completedToday) {
    // Allow a new session the same day if user wants — return new
  }

  const session = buildSessionSkeleton(workoutId, dateKey);
  await put(STORES.workouts, session);
  return session;
}

/**
 * @param {object} session
 */
export async function saveSessionProgress(session) {
  const next = {
    ...session,
    updatedAt: new Date().toISOString(),
  };
  await put(STORES.workouts, next);
  return next;
}

/**
 * @param {string} sessionId
 * @param {string} exerciseId
 * @param {number} setIndex
 * @param {boolean} completed
 */
export async function completeSet(sessionId, exerciseId, setIndex, completed = true) {
  const session = await getSession(sessionId);
  if (!session) throw new Error('Session not found.');

  const exercises = session.exercises.map((ex) => {
    if (ex.exerciseId !== exerciseId) return ex;
    const sets = ex.sets.map((set) =>
      set.index === setIndex ? { ...set, completed: Boolean(completed) } : set,
    );
    const allDone = sets.every((s) => s.completed);
    return { ...ex, sets, completed: allDone };
  });

  return saveSessionProgress({ ...session, exercises });
}

/**
 * @param {string} sessionId
 * @param {string} exerciseId
 * @param {number} setIndex
 * @param {number} actual
 */
export async function updateSetActual(sessionId, exerciseId, setIndex, actual) {
  const session = await getSession(sessionId);
  if (!session) throw new Error('Session not found.');
  const value = Number(actual);
  const exercises = session.exercises.map((ex) => {
    if (ex.exerciseId !== exerciseId) return ex;
    const sets = ex.sets.map((set) =>
      set.index === setIndex
        ? { ...set, actual: Number.isFinite(value) ? value : set.actual }
        : set,
    );
    return { ...ex, sets };
  });
  return saveSessionProgress({ ...session, exercises });
}

/**
 * @param {string} sessionId
 * @param {string} exerciseId
 * @param {boolean} [skipRemaining]
 */
export async function completeExercise(
  sessionId,
  exerciseId,
  skipRemaining = false,
) {
  const session = await getSession(sessionId);
  if (!session) throw new Error('Session not found.');

  const exercises = session.exercises.map((ex) => {
    if (ex.exerciseId !== exerciseId) return ex;
    let sets = ex.sets;
    if (skipRemaining) {
      sets = sets.map((set) =>
        set.completed ? set : { ...set, completed: true },
      );
    }
    const allDone = sets.every((s) => s.completed);
    return { ...ex, sets, completed: allDone || skipRemaining };
  });

  return saveSessionProgress({ ...session, exercises });
}

/**
 * @param {string} sessionId
 * @param {{ suggestedNextReps?: boolean, note?: string }} [opts]
 */
export async function finishSession(sessionId, opts = {}) {
  const session = await getSession(sessionId);
  if (!session) throw new Error('Session not found.');

  const now = new Date().toISOString();
  const next = {
    ...session,
    status: 'completed',
    completedAt: now,
    suggestedNextReps: Boolean(opts.suggestedNextReps),
    note: opts.note !== undefined ? String(opts.note) : session.note,
    updatedAt: now,
  };
  await put(STORES.workouts, next);
  await setTaskCompleted(session.date, 'workout', true);
  return next;
}

/**
 * @param {number} [limit]
 */
export async function getRecentSessions(limit = 5) {
  const all = await getAll(STORES.workouts);
  return (all || [])
    .filter((s) => s.status === 'completed')
    .sort((a, b) => String(b.completedAt || b.startedAt).localeCompare(String(a.completedAt || a.startedAt)))
    .slice(0, limit);
}

/**
 * Session progress counts.
 * @param {object} session
 */
export function getSessionProgress(session) {
  if (!session?.exercises?.length) {
    return { completedExercises: 0, totalExercises: 0, completedSets: 0, totalSets: 0, percent: 0 };
  }
  const totalExercises = session.exercises.length;
  const completedExercises = session.exercises.filter((e) => e.completed).length;
  const totalSets = session.exercises.reduce((sum, e) => sum + e.sets.length, 0);
  const completedSets = session.exercises.reduce(
    (sum, e) => sum + e.sets.filter((s) => s.completed).length,
    0,
  );
  const percent = totalSets
    ? Math.round((completedSets / totalSets) * 100)
    : 0;
  return { completedExercises, totalExercises, completedSets, totalSets, percent };
}

/**
 * Enrich session exercise with catalog fields.
 * @param {object} sessionExercise
 */
export function enrichSessionExercise(sessionExercise) {
  const catalog = getExerciseById(sessionExercise.exerciseId);
  return { ...sessionExercise, catalog };
}
