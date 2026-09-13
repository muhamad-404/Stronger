import { get, put, STORES } from './database/index.js';
import {
  isDateKey,
  listDateKeys,
  parseTimeToMinutes,
  toDateKey,
} from '../utils/dates.js';
import { getProfile } from './profile.js';
import { setTaskCompleted } from './dailyLog.js';

function round1(n) {
  return Math.round(Number(n) * 10) / 10;
}

/**
 * Overnight duration in hours from HH:MM bedtime → wake time.
 * @param {string} bedtime
 * @param {string} wakeTime
 * @returns {number | null}
 */
export function estimateSleepHours(bedtime, wakeTime) {
  const bed = parseTimeToMinutes(bedtime);
  const wake = parseTimeToMinutes(wakeTime);
  if (bed == null || wake == null) return null;
  let minutes = wake - bed;
  if (minutes <= 0) minutes += 24 * 60;
  return round1(minutes / 60);
}

function emptyRecord(dateKey) {
  return {
    id: dateKey,
    date: dateKey,
    bedtime: null,
    wakeTime: null,
    hours: null,
    quality: null,
    note: '',
    updatedAt: null,
  };
}

/**
 * @param {string} [dateKey]
 * @returns {Promise<object>}
 */
export async function getSleepRecord(dateKey = toDateKey()) {
  const row = await get(STORES.sleepRecords, dateKey);
  if (!row) return emptyRecord(dateKey);
  return {
    id: dateKey,
    date: dateKey,
    bedtime: row.bedtime ?? null,
    wakeTime: row.wakeTime ?? null,
    hours: Number.isFinite(Number(row.hours)) ? Number(row.hours) : null,
    quality: Number.isFinite(Number(row.quality)) ? Number(row.quality) : null,
    note: row.note || '',
    updatedAt: row.updatedAt || null,
  };
}

/**
 * Save / merge a sleep log for a wake-day date key.
 * Preserves fields when journal only updates hours.
 * @param {object} partial
 */
export async function saveSleepRecord(partial) {
  const dateKey = partial.date || toDateKey();
  if (!isDateKey(dateKey)) {
    throw new Error('Sleep log needs a valid date.');
  }
  const existing = (await get(STORES.sleepRecords, dateKey)) || {};
  const now = new Date().toISOString();

  const bedtime =
    partial.bedtime !== undefined
      ? partial.bedtime || null
      : existing.bedtime ?? null;
  const wakeTime =
    partial.wakeTime !== undefined
      ? partial.wakeTime || null
      : existing.wakeTime ?? null;

  let hours =
    partial.hours !== undefined &&
    partial.hours !== null &&
    partial.hours !== ''
      ? Number(partial.hours)
      : existing.hours != null
        ? Number(existing.hours)
        : null;

  if (partial.fromSleepModule && bedtime && wakeTime) {
    const estimated = estimateSleepHours(bedtime, wakeTime);
    if (estimated != null) hours = estimated;
  } else if (
    hours == null &&
    bedtime &&
    wakeTime &&
    (partial.bedtime !== undefined || partial.wakeTime !== undefined)
  ) {
    const estimated = estimateSleepHours(bedtime, wakeTime);
    if (estimated != null) hours = estimated;
  }

  if (hours != null && (!Number.isFinite(hours) || hours < 0 || hours > 24)) {
    throw new Error('Enter a sleep duration between 0 and 24 hours.');
  }

  let quality =
    partial.quality !== undefined
      ? partial.quality === null || partial.quality === ''
        ? null
        : Number(partial.quality)
      : existing.quality ?? null;

  if (quality != null && (quality < 1 || quality > 5 || !Number.isFinite(quality))) {
    throw new Error('Sleep quality should be 1–5.');
  }

  const note =
    partial.note !== undefined
      ? String(partial.note || '').trim()
      : existing.note || '';

  const record = {
    id: dateKey,
    date: dateKey,
    bedtime,
    wakeTime,
    hours: hours != null && Number.isFinite(hours) ? round1(hours) : null,
    quality,
    note,
    updatedAt: now,
  };

  await put(STORES.sleepRecords, record);

  // Mark Today "Sleep" task when logging for today with usable data
  if (dateKey === toDateKey() && (record.hours != null || record.bedtime)) {
    try {
      await setTaskCompleted(dateKey, 'sleep', true);
    } catch {
      /* non-blocking */
    }
  }

  return record;
}

/**
 * @param {number} [days]
 * @returns {Promise<object[]>}
 */
export async function getSleepHistory(days = 7) {
  const keys = listDateKeys(days);
  const rows = await Promise.all(keys.map((k) => getSleepRecord(k)));
  return rows;
}

/**
 * Weekly sleep stats for the module + Progress.
 * @param {number} [days]
 */
export async function getSleepWeekSummary(days = 7) {
  const history = await getSleepHistory(days);
  const logged = history.filter(
    (r) => r.hours != null || r.quality != null || r.bedtime || r.wakeTime,
  );
  const withHours = history.filter((r) => Number.isFinite(r.hours));
  const withQuality = history.filter((r) => Number.isFinite(r.quality));

  const avgHours =
    withHours.length > 0
      ? round1(
          withHours.reduce((sum, r) => sum + r.hours, 0) / withHours.length,
        )
      : null;
  const avgQuality =
    withQuality.length > 0
      ? round1(
          withQuality.reduce((sum, r) => sum + r.quality, 0) /
            withQuality.length,
        )
      : null;

  const profile = await getProfile();
  const targetBed = profile?.bedTime || null;
  const targetWake = profile?.wakeTime || null;

  let bedOnTarget = 0;
  let wakeOnTarget = 0;
  let timingChecks = 0;

  for (const row of logged) {
    if (row.bedtime && targetBed) {
      timingChecks += 1;
      if (withinMinutes(row.bedtime, targetBed, 45)) bedOnTarget += 1;
    }
    if (row.wakeTime && targetWake) {
      if (withinMinutes(row.wakeTime, targetWake, 45)) wakeOnTarget += 1;
    }
  }

  const nightsLogged = logged.length;
  const consistencyPercent =
    days > 0 ? Math.round((nightsLogged / days) * 100) : null;

  return {
    days,
    history,
    nightsLogged,
    consistencyPercent,
    avgHours,
    avgQuality,
    targetBed,
    targetWake,
    bedConsistencyPercent:
      timingChecks > 0
        ? Math.round((bedOnTarget / timingChecks) * 100)
        : null,
    wakeConsistencyPercent:
      logged.filter((r) => r.wakeTime && targetWake).length > 0
        ? Math.round(
            (wakeOnTarget /
              logged.filter((r) => r.wakeTime && targetWake).length) *
              100,
          )
        : null,
  };
}

function withinMinutes(a, b, windowMinutes) {
  const am = parseTimeToMinutes(a);
  const bm = parseTimeToMinutes(b);
  if (am == null || bm == null) return false;
  let diff = Math.abs(am - bm);
  if (diff > 12 * 60) diff = 24 * 60 - diff;
  return diff <= windowMinutes;
}

export async function getDefaultSleepTimes() {
  const profile = await getProfile();
  return {
    bedtime: profile?.bedTime || '22:30',
    wakeTime: profile?.wakeTime || '07:00',
  };
}
