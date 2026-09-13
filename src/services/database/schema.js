/**
 * App-level schema versioning (separate from IndexedDB DB_VERSION).
 * Bump when record shapes need post-open migrations.
 */
export const APP_SCHEMA_VERSION = 1;

export const SCHEMA_META_ID = 'schemaMeta';

/**
 * @param {number} fromVersion
 * @param {IDBDatabase} db
 * @param {IDBTransaction} tx
 */
export function migrateIndexedDb(fromVersion, db, tx) {
  // v1 → v2: foodLog store + date index (handled by ensureStores)
  // v2 → v3: ensure all indexes exist on already-created stores
  if (fromVersion < 3) {
    ensureFoodLogDateIndex(db, tx);
  }
}

function ensureFoodLogDateIndex(db, tx) {
  if (!db.objectStoreNames.contains('foodLog')) return;
  const store = tx.objectStore('foodLog');
  if (!store.indexNames.contains('date')) {
    store.createIndex('date', 'date', { unique: false });
  }
}
