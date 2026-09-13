import { get, put, getAll, STORES } from './database/index.js';
import { isDateKey, toDateKey } from '../utils/dates.js';

function emptyLog(dateKey) {
  return {
    id: dateKey,
    date: dateKey,
    completedTaskIds: [],
    note: '',
    updatedAt: new Date().toISOString(),
  };
}

/**
 * @param {string} [dateKey]
 */
export async function getDailyLog(dateKey = toDateKey()) {
  const existing = await get(STORES.dailyLogs, dateKey);
  return existing || emptyLog(dateKey);
}

/**
 * @param {object} log
 */
export async function saveDailyLog(log) {
  const dateKey = log.date || log.id;
  if (!isDateKey(dateKey)) {
    throw new Error('Daily log needs a valid date.');
  }
  const record = {
    ...log,
    id: dateKey,
    date: dateKey,
    completedTaskIds: Array.isArray(log.completedTaskIds)
      ? log.completedTaskIds.map(String)
      : [],
    note: log.note ?? '',
    updatedAt: new Date().toISOString(),
  };
  await put(STORES.dailyLogs, record);
  return record;
}

/**
 * Set a task completed state explicitly (avoids racey toggles).
 * @param {string} dateKey
 * @param {string} taskId
 * @param {boolean} completed
 * @returns {Promise<object>}
 */
export async function setTaskCompleted(dateKey, taskId, completed) {
  const log = await getDailyLog(dateKey);
  const set = new Set(log.completedTaskIds || []);
  if (completed) set.add(taskId);
  else set.delete(taskId);
  return saveDailyLog({
    ...log,
    completedTaskIds: Array.from(set),
  });
}

/**
 * Toggle a task id on a day's log.
 * @param {string} dateKey
 * @param {string} taskId
 * @returns {Promise<object>} updated log
 */
export async function toggleTask(dateKey, taskId) {
  const log = await getDailyLog(dateKey);
  const set = new Set(log.completedTaskIds || []);
  const next = !set.has(taskId);
  return setTaskCompleted(dateKey, taskId, next);
}

/**
 * @param {string} dateKey
 * @param {string} text
 */
export async function saveTodayNote(dateKey, text) {
  const log = await getDailyLog(dateKey);
  return saveDailyLog({
    ...log,
    note: String(text ?? '').trim(),
  });
}

/**
 * Fetch logs whose date keys fall in the inclusive list.
 * @param {string[]} dateKeys
 * @returns {Promise<object[]>}
 */
export async function getLogsForDates(dateKeys) {
  const keySet = new Set(dateKeys);
  const all = await getAll(STORES.dailyLogs);
  return (all || []).filter((log) => keySet.has(log.id) || keySet.has(log.date));
}

/**
 * Convenience: logs for a contiguous key list (missing days omitted).
 * @param {string} startKey
 * @param {string} endKey
 */
export async function getLogsInRange(startKey, endKey) {
  const all = await getAll(STORES.dailyLogs);
  return (all || []).filter((log) => {
    const key = log.date || log.id;
    return key >= startKey && key <= endKey;
  });
}
