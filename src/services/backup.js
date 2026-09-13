import {
  APP_SCHEMA_VERSION,
  DB_NAME,
  DB_VERSION,
  STORES,
  get,
  getAll,
  put,
  replaceStoresAtomically,
} from './database/index.js';
import { downloadJson, formatBytes } from '../utils/files.js';
import { toDateKey } from '../utils/dates.js';
import { StorageError, formatStorageError } from '../utils/storageErrors.js';
import {
  assertSanitizationAcceptable,
  sanitizeBackupData,
} from './backupSanitize.js';

/** Backup envelope schema — bump when shape changes incompatibly. */
export const BACKUP_SCHEMA_VERSION = 1;

export const BACKUP_META_ID = 'backupMeta';

export const BACKUP_STORE_KEYS = Object.freeze([
  'settings',
  'goals',
  'dailyLogs',
  'foodLog',
  'workouts',
  'weightHistory',
  'sleepRecords',
  'appetiteRecords',
  'energyRecords',
  'notes',
  'meals',
]);

const STORE_BY_KEY = {
  settings: STORES.settings,
  goals: STORES.goals,
  dailyLogs: STORES.dailyLogs,
  foodLog: STORES.foodLog,
  workouts: STORES.workouts,
  weightHistory: STORES.weightHistory,
  sleepRecords: STORES.sleepRecords,
  appetiteRecords: STORES.appetiteRecords,
  energyRecords: STORES.energyRecords,
  notes: STORES.notes,
  meals: STORES.meals,
};

/**
 * @returns {Promise<object>}
 */
export async function collectAllStoreData() {
  const data = {};
  for (const key of BACKUP_STORE_KEYS) {
    const storeName = STORE_BY_KEY[key];
    data[key] = (await getAll(storeName)) || [];
  }
  return data;
}

/**
 * Build a Stronger backup envelope (does not download).
 */
export async function buildBackupEnvelope() {
  const data = await collectAllStoreData();
  return {
    app: 'Stronger',
    version: BACKUP_SCHEMA_VERSION,
    dbVersion: DB_VERSION,
    appSchemaVersion: APP_SCHEMA_VERSION,
    exportedAt: new Date().toISOString(),
    data,
  };
}

/**
 * Export all IndexedDB data as a JSON download and record last backup time.
 */
export async function exportBackup() {
  const envelope = await buildBackupEnvelope();
  const stamp = toDateKey().replace(/-/g, '');
  const filename = `stronger-backup-${stamp}.json`;
  downloadJson(envelope, filename);

  const meta = {
    id: BACKUP_META_ID,
    lastBackupAt: envelope.exportedAt,
    lastBackupFilename: filename,
    lastBackupRecordCount: countRecords(envelope.data),
    updatedAt: envelope.exportedAt,
  };
  await put(STORES.settings, meta);
  return { filename, meta, envelope };
}

function countRecords(data) {
  return BACKUP_STORE_KEYS.reduce(
    (sum, key) => sum + (Array.isArray(data?.[key]) ? data[key].length : 0),
    0,
  );
}

/**
 * Validate a parsed backup object. Throws on failure.
 * @param {object} payload
 */
export function validateBackup(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    throw new StorageError('Backup must be a JSON object.', {
      code: 'BACKUP_SHAPE',
    });
  }
  if (payload.app !== 'Stronger') {
    throw new StorageError('This file is not a Stronger backup.', {
      code: 'BACKUP_APP',
    });
  }
  const version = Number(payload.version);
  if (!Number.isFinite(version) || version < 1) {
    throw new StorageError('Backup is missing a valid schema version.', {
      code: 'BACKUP_VERSION',
    });
  }
  if (version > BACKUP_SCHEMA_VERSION) {
    throw new StorageError(
      `This backup uses schema v${version}. Update Stronger to import it.`,
      { code: 'BACKUP_VERSION_AHEAD' },
    );
  }
  if (!payload.exportedAt || typeof payload.exportedAt !== 'string') {
    throw new StorageError('Backup is missing exportedAt.', {
      code: 'BACKUP_EXPORTED_AT',
    });
  }
  if (
    !payload.data ||
    typeof payload.data !== 'object' ||
    Array.isArray(payload.data)
  ) {
    throw new StorageError('Backup is missing a data object.', {
      code: 'BACKUP_DATA',
    });
  }

  const required = ['settings', 'goals', 'weightHistory', 'dailyLogs'];
  for (const key of required) {
    if (!(key in payload.data)) {
      throw new StorageError(`Backup is missing required data: ${key}.`, {
        code: 'BACKUP_MISSING_STORE',
      });
    }
    if (!Array.isArray(payload.data[key])) {
      throw new StorageError(`Backup field "${key}" must be an array.`, {
        code: 'BACKUP_STORE_TYPE',
      });
    }
  }

  for (const key of Object.keys(payload.data)) {
    if (!BACKUP_STORE_KEYS.includes(key)) continue;
    if (!Array.isArray(payload.data[key])) {
      throw new StorageError(`Backup field "${key}" must be an array.`, {
        code: 'BACKUP_STORE_TYPE',
      });
    }
  }

  return {
    version,
    exportedAt: payload.exportedAt,
    recordCount: countRecords(payload.data),
    storeCounts: Object.fromEntries(
      BACKUP_STORE_KEYS.map((key) => [
        key,
        Array.isArray(payload.data[key]) ? payload.data[key].length : 0,
      ]),
    ),
  };
}

/**
 * Prepare sanitized batches for import. Pure aside from throwing.
 * @param {object} payload
 */
export function prepareImport(payload) {
  const summary = validateBackup(payload);
  const { data, report } = sanitizeBackupData(payload.data, BACKUP_STORE_KEYS);
  assertSanitizationAcceptable(report, summary.recordCount);

  const now = new Date().toISOString();
  const settingsRows = [...data.settings];
  const metaIndex = settingsRows.findIndex((r) => r.id === BACKUP_META_ID);
  const meta = {
    id: BACKUP_META_ID,
    lastBackupAt: payload.exportedAt || now,
    lastImportAt: now,
    lastBackupFilename: null,
    lastBackupRecordCount: countRecords(data),
    lastImportSkippedInvalid: report.skippedInvalid,
    lastImportSkippedDuplicates: report.skippedDuplicates,
    updatedAt: now,
  };
  if (metaIndex >= 0) settingsRows[metaIndex] = { ...settingsRows[metaIndex], ...meta };
  else settingsRows.push(meta);
  data.settings = settingsRows;

  const batches = BACKUP_STORE_KEYS.map((key) => ({
    storeName: STORE_BY_KEY[key],
    rows: data[key] || [],
  }));

  return {
    summary: {
      ...summary,
      recordCount: countRecords(data),
      skippedInvalid: report.skippedInvalid,
      skippedDuplicates: report.skippedDuplicates,
      sanitizeReport: report,
    },
    batches,
    data,
  };
}

/**
 * Replace all local data with a validated backup.
 * Snapshots current data first and restores it if the write fails.
 * @param {object} payload
 */
export async function importBackup(payload) {
  const prepared = prepareImport(payload);
  const snapshot = await collectAllStoreData();
  const snapshotBatches = BACKUP_STORE_KEYS.map((key) => ({
    storeName: STORE_BY_KEY[key],
    rows: Array.isArray(snapshot[key]) ? snapshot[key] : [],
  }));

  try {
    await replaceStoresAtomically(prepared.batches);
  } catch (error) {
    try {
      await replaceStoresAtomically(snapshotBatches);
    } catch (restoreError) {
      throw new StorageError(
        `${formatStorageError(error, 'Import failed.')} Restore also failed — export from another device if you have a backup.`,
        {
          code: 'BACKUP_IMPORT_AND_RESTORE_FAILED',
          cause: { importError: error, restoreError },
        },
      );
    }
    throw new StorageError(
      formatStorageError(
        error,
        'Import failed. Your previous data was restored.',
      ),
      { code: 'BACKUP_IMPORT_ROLLED_BACK', cause: error },
    );
  }

  return prepared.summary;
}

/**
 * Wipe every Stronger IndexedDB object store in one transaction.
 * Caller must confirm — irreversible without a backup.
 */
export async function clearAllData() {
  await replaceStoresAtomically(
    BACKUP_STORE_KEYS.map((key) => ({
      storeName: STORE_BY_KEY[key],
      rows: [],
    })),
  );
}

/**
 * @returns {Promise<object | null>}
 */
export async function getBackupMeta() {
  return (await get(STORES.settings, BACKUP_META_ID)) || null;
}

/**
 * Approximate on-device storage usage for Stronger data.
 */
export async function getStorageInfo() {
  const data = await collectAllStoreData();
  const counts = Object.fromEntries(
    BACKUP_STORE_KEYS.map((key) => [key, data[key]?.length || 0]),
  );
  const totalRecords = countRecords(data);
  let estimatedBytes = 0;
  try {
    estimatedBytes = new Blob([JSON.stringify(data)]).size;
  } catch {
    estimatedBytes = 0;
  }

  let quota = null;
  let usage = null;
  if (typeof navigator !== 'undefined' && navigator.storage?.estimate) {
    try {
      const est = await navigator.storage.estimate();
      quota = est.quota ?? null;
      usage = est.usage ?? null;
    } catch {
      /* ignore */
    }
  }

  return {
    dbName: DB_NAME,
    dbVersion: DB_VERSION,
    appSchemaVersion: APP_SCHEMA_VERSION,
    counts,
    totalRecords,
    estimatedBytes,
    estimatedLabel: formatBytes(estimatedBytes),
    quota,
    usage,
    usageLabel: usage != null ? formatBytes(usage) : null,
    quotaLabel: quota != null ? formatBytes(quota) : null,
  };
}

export { sanitizeBackupData, sanitizeStoreRow } from './backupSanitize.js';
