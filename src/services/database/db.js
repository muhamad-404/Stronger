export const DB_NAME = 'stronger';
export const DB_VERSION = 2;

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

function upgrade(db) {
  STORE_CONFIG.forEach(({ name, keyPath, autoIncrement, indexes }) => {
    let store;
    if (!db.objectStoreNames.contains(name)) {
      store = db.createObjectStore(name, { keyPath, autoIncrement });
    } else {
      store = null;
    }

    if (store && indexes?.length) {
      indexes.forEach((idx) => {
        if (!store.indexNames.contains(idx.name)) {
          store.createIndex(idx.name, idx.keyPath, { unique: Boolean(idx.unique) });
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
    return Promise.reject(new Error('IndexedDB is not available in this environment.'));
  }

  if (dbPromise && openedVersion !== DB_VERSION) {
    dbPromise = null;
  }

  if (dbPromise) return dbPromise;

  openedVersion = DB_VERSION;
  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      upgrade(db);

      const tx = request.transaction;
      if (tx && db.objectStoreNames.contains(STORES.foodLog)) {
        const store = tx.objectStore(STORES.foodLog);
        if (!store.indexNames.contains('date')) {
          store.createIndex('date', 'date', { unique: false });
        }
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      dbPromise = null;
      openedVersion = null;
      reject(request.error || new Error('Failed to open database.'));
    };

    request.onblocked = () => {
      console.warn('Stronger database open is blocked by another tab.');
    };
  });

  return dbPromise;
}

/**
 * Resets the cached connection (useful after close or tests).
 */
export function resetDatabaseConnection() {
  dbPromise = null;
  openedVersion = null;
}
