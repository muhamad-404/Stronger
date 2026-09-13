import { isDateKey } from '../utils/dates.js';
import { StorageError } from '../utils/storageErrors.js';

export { isDateKey };

/**
 * @param {unknown} row
 * @returns {string | null}
 */
function rowId(row) {
  if (!row || typeof row !== 'object') return null;
  if (row.id != null && String(row.id).trim() !== '') return String(row.id);
  if (row.key != null && String(row.key).trim() !== '') return String(row.key);
  return null;
}

/**
 * Store-specific soft repairs / rejects for backup rows.
 * @param {string} storeKey
 * @param {object} row
 * @returns {{ ok: true, row: object } | { ok: false, reason: string }}
 */
export function sanitizeStoreRow(storeKey, row) {
  if (!row || typeof row !== 'object' || Array.isArray(row)) {
    return { ok: false, reason: 'not_object' };
  }

  const id = rowId(row);
  if (!id) return { ok: false, reason: 'missing_id' };

  const next = { ...row, id };

  switch (storeKey) {
    case 'dailyLogs':
    case 'sleepRecords': {
      const date = isDateKey(next.date)
        ? next.date
        : isDateKey(id)
          ? id
          : null;
      if (!date) return { ok: false, reason: 'invalid_date' };
      next.date = date;
      next.id = date;
      if (storeKey === 'dailyLogs') {
        next.completedTaskIds = Array.isArray(next.completedTaskIds)
          ? next.completedTaskIds.map(String)
          : [];
        next.note = String(next.note ?? '');
      }
      return { ok: true, row: next };
    }
    case 'foodLog': {
      if (!isDateKey(next.date)) return { ok: false, reason: 'invalid_date' };
      const title = String(next.foodTitle ?? '').trim();
      if (!title) return { ok: false, reason: 'missing_foodTitle' };
      next.foodTitle = title;
      next.eaten = Boolean(next.eaten);
      next.slotId = String(next.slotId || 'breakfast');
      return { ok: true, row: next };
    }
    case 'weightHistory': {
      if (!isDateKey(next.date)) return { ok: false, reason: 'invalid_date' };
      const kg = Number(next.weightKg);
      if (!Number.isFinite(kg) || kg < 20 || kg > 250) {
        return { ok: false, reason: 'invalid_weight' };
      }
      next.weightKg = Math.round(kg * 10) / 10;
      next.note = String(next.note ?? '');
      return { ok: true, row: next };
    }
    case 'workouts': {
      if (!isDateKey(next.date)) return { ok: false, reason: 'invalid_date' };
      if (!next.workoutId) return { ok: false, reason: 'missing_workoutId' };
      if (!Array.isArray(next.exercises)) next.exercises = [];
      next.status = String(next.status || 'completed');
      return { ok: true, row: next };
    }
    case 'goals':
    case 'settings':
    case 'notes':
    case 'meals':
    case 'appetiteRecords':
    case 'energyRecords':
      return { ok: true, row: next };
    default:
      return { ok: true, row: next };
  }
}

/**
 * Deduplicate by id (first wins), drop invalid rows, report issues.
 * @param {Record<string, unknown>} data
 * @param {readonly string[]} storeKeys
 */
export function sanitizeBackupData(data, storeKeys) {
  const cleaned = {};
  const report = {
    skippedInvalid: 0,
    skippedDuplicates: 0,
    reasons: /** @type {Record<string, number>} */ ({}),
    perStore: /** @type {Record<string, { kept: number, skipped: number }>} */ ({}),
  };

  const bumpReason = (reason) => {
    report.reasons[reason] = (report.reasons[reason] || 0) + 1;
  };

  for (const key of storeKeys) {
    const raw = Array.isArray(data?.[key]) ? data[key] : [];
    const seen = new Set();
    const kept = [];
    let skipped = 0;

    for (const row of raw) {
      const result = sanitizeStoreRow(key, row);
      if (!result.ok) {
        skipped += 1;
        report.skippedInvalid += 1;
        bumpReason(result.reason);
        continue;
      }
      const id = String(result.row.id);
      if (seen.has(id)) {
        skipped += 1;
        report.skippedDuplicates += 1;
        bumpReason('duplicate_id');
        continue;
      }
      seen.add(id);
      kept.push(result.row);
    }

    cleaned[key] = kept;
    report.perStore[key] = { kept: kept.length, skipped };
  }

  return { data: cleaned, report };
}

/**
 * Throw if sanitization wiped almost everything while the file claimed data.
 * @param {object} report
 * @param {number} claimedCount
 */
export function assertSanitizationAcceptable(report, claimedCount) {
  const kept = Object.values(report.perStore).reduce(
    (sum, s) => sum + (s?.kept || 0),
    0,
  );
  const skipped = report.skippedInvalid + report.skippedDuplicates;
  if (claimedCount > 0 && kept === 0) {
    throw new StorageError(
      'None of the records in this backup could be imported. The file may be damaged.',
      { code: 'BACKUP_EMPTY_AFTER_SANITIZE' },
    );
  }
  if (claimedCount >= 5 && skipped > claimedCount * 0.9) {
    throw new StorageError(
      'Too many records in this backup are invalid. Import cancelled to protect your current data.',
      { code: 'BACKUP_TOO_CORRUPT' },
    );
  }
}
