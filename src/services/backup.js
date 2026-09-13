import {
  DB_NAME,
  DB_VERSION,
  STORES,
  clear,
  get,
  getAll,
  put,
} from './database/index.js';
import { downloadJson, formatBytes } from '../utils/files.js';
import { toDateKey } from '../utils/dates.js';

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
    throw new Error('Backup must be a JSON object.');
  }
  if (payload.app !== 'Stronger') {
    throw new Error('This file is not a Stronger backup.');
  }
  const version = Number(payload.version);
  if (!Number.isFinite(version) || version < 1) {
    throw new Error('Backup is missing a valid schema version.');
  }
  if (version > BACKUP_SCHEMA_VERSION) {
    throw new Error(
      `This backup uses schema v${version}. Update Stronger to import it.`,
    );
  }
  if (!payload.exportedAt || typeof payload.exportedAt !== 'string') {
    throw new Error('Backup is missing exportedAt.');
  }
  if (!payload.data || typeof payload.data !== 'object' || Array.isArray(payload.data)) {
    throw new Error('Backup is missing a data object.');
  }

  // Required store keys present as arrays (may be empty)
  const required = ['settings', 'goals', 'weightHistory', 'dailyLogs'];
  for (const key of required) {
    if (!(key in payload.data)) {
      throw new Error(`Backup is missing required data: ${key}.`);
    }
    if (!Array.isArray(payload.data[key])) {
      throw new Error(`Backup field "${key}" must be an array.`);
    }
  }

  for (const key of Object.keys(payload.data)) {
    if (!BACKUP_STORE_KEYS.includes(key)) continue;
    if (!Array.isArray(payload.data[key])) {
      throw new Error(`Backup field "${key}" must be an array.`);
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
 * Replace all local data with a validated backup.
 * Caller must confirm with the user first.
 * @param {object} payload
 */
export async function importBackup(payload) {
  const summary = validateBackup(payload);
  const data = payload.data;

  // Clear known stores, then write
  for (const key of BACKUP_STORE_KEYS) {
    await clear(STORE_BY_KEY[key]);
  }

  for (const key of BACKUP_STORE_KEYS) {
    const rows = Array.isArray(data[key]) ? data[key] : [];
    const storeName = STORE_BY_KEY[key];
    for (const row of rows) {
      if (!row || typeof row !== 'object') continue;
      if (row.id == null && row.key == null) continue;
      await put(storeName, row);
    }
  }

  const now = new Date().toISOString();
  await put(STORES.settings, {
    id: BACKUP_META_ID,
    lastBackupAt: payload.exportedAt || now,
    lastImportAt: now,
    lastBackupFilename: null,
    lastBackupRecordCount: summary.recordCount,
    updatedAt: now,
  });

  return summary;
}

/**
 * Wipe every Stronger IndexedDB object store.
 * Caller must confirm — irreversible without a backup.
 */
export async function clearAllData() {
  for (const key of BACKUP_STORE_KEYS) {
    await clear(STORE_BY_KEY[key]);
  }
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
  if (navigator.storage?.estimate) {
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
