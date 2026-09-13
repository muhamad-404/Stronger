import { APP_SCHEMA_VERSION, SCHEMA_META_ID, migrateIndexedDb } from './schema.js';
import { wrapStorageError } from '../../utils/storageErrors.js';

export const DB_NAME = 'stronger';
/** Bump when object stores / indexes change. */
export const DB_VERSION = 3;

export const STORES = {
  dailyLogs: 'dailyLogs',
  meals: 'meals',
  workouts: 'workouts',
  weightHistory: 'weightHistory',
  goals: 'goals',
  sleepRecords: 'sleepRecords',
  appetiteRecords: 'appetiteRecords',
  energyRecords: 'energyRecords',
  notes: 'notes',
  settings: 'settings',
  foodLog: 'foodLog',
};

const STORE_CONFIG = [
  { name: STORES.dailyLogs, keyPath: 'id', autoIncrement: false },
  { name: STORES.meals, keyPath: 'id', autoIncrement: false },
  { name: STORES.workouts, keyPath: 'id', autoIncrement: false },
  { name: STORES.weightHistory, keyPath: 'id', autoIncrement: false },
  { name: STORES.goals, keyPath: 'id', autoIncrement: false },
  { name: STORES.sleepRecords, keyPath: 'id', autoIncrement: false },
  { name: STORES.appetiteRecords, keyPath: 'id', autoIncrement: false },
  { name: STORES.energyRecords, keyPath: 'id', autoIncrement: false },
  { name: STORES.notes, keyPath: 'id', autoIncrement: false },
  { name: STORES.settings, keyPath: 'id', autoIncrement: false },
  {
    name: STORES.foodLog,
    keyPath: 'id',
    autoIncrement: false,
    indexes: [{ name: 'date', keyPath: 'date', unique: false }],
  },
];

let dbPromise = null;
let openedVersion = null;

function ensureStores(db, tx) {
  STORE_CONFIG.forEach(({ name, keyPath, autoIncrement, indexes }) => {
    let store;
    if (!db.objectStoreNames.contains(name)) {
      store = db.createObjectStore(name, { keyPath, autoIncrement });
    } else if (tx) {
      store = tx.objectStore(name);
    } else {
      store = null;
    }

    if (store && indexes?.length) {
      indexes.forEach((idx) => {
        if (!store.indexNames.contains(idx.name)) {
          store.createIndex(idx.name, idx.keyPath, {
            unique: Boolean(idx.unique),
          });
        }
      });
    }
  });
}

/**
 * Opens (or reuses) the Stronger IndexedDB database.
 * @returns {Promise<IDBDatabase>}
 */
export function openDatabase() {
  if (typeof indexedDB === 'undefined') {
    return Promise.reject(
      wrapStorageError(
        new Error('IndexedDB is not available in this environment.'),
        'Local storage is unavailable in this browser.',
      ),
    );
  }

  if (dbPromise && openedVersion !== DB_VERSION) {
    dbPromise = null;
  }

  if (dbPromise) return dbPromise;

  openedVersion = DB_VERSION;
  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = request.result;
      const tx = request.transaction;
      const fromVersion = event.oldVersion || 0;
      ensureStores(db, tx);
      migrateIndexedDb(fromVersion, db, tx);
    };

    request.onsuccess = () => {
      const db = request.result;
      db.onversionchange = () => {
        db.close();
        resetDatabaseConnection();
      };
      ensureAppSchemaMeta(db)
        .then(() => resolve(db))
        .catch((err) => {
          // DB opened; meta write failure should not block the app
          console.warn('Stronger schema meta write failed', err);
          resolve(db);
        });
    };

    request.onerror = () => {
      dbPromise = null;
      openedVersion = null;
      reject(
        wrapStorageError(
          request.error || new Error('Failed to open database.'),
          'Could not open local storage on this device.',
        ),
      );
    };

    request.onblocked = () => {
      console.warn('Stronger database open is blocked by another tab.');
    };
  });

  return dbPromise;
}

/**
 * Persist app schema version after DB open (safe, additive).
 * @param {IDBDatabase} db
 */
function ensureAppSchemaMeta(db) {
  return new Promise((resolve, reject) => {
    let tx;
    try {
      tx = db.transaction(STORES.settings, 'readwrite');
    } catch (error) {
      reject(error);
      return;
    }
    const store = tx.objectStore(STORES.settings);
    const getReq = store.get(SCHEMA_META_ID);
    getReq.onsuccess = () => {
      const existing = getReq.result;
      const now = new Date().toISOString();
      const next = {
        id: SCHEMA_META_ID,
        appSchemaVersion: APP_SCHEMA_VERSION,
        dbVersion: DB_VERSION,
        createdAt: existing?.createdAt || now,
        updatedAt: now,
      };
      store.put(next);
    };
    getReq.onerror = () => reject(getReq.error);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

/**
 * Resets the cached connection (useful after close or tests).
 */
export function resetDatabaseConnection() {
  dbPromise = null;
  openedVersion = null;
}

export { APP_SCHEMA_VERSION, SCHEMA_META_ID };
