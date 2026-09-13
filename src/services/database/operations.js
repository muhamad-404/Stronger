import { openDatabase } from './db.js';
import { wrapStorageError } from '../../utils/storageErrors.js';

/**
 * Run a single-store IndexedDB transaction and wait until it completes.
 * Resolving only on request success (before commit) risks silent data loss.
 */
export function runTransaction(storeName, mode, executor) {
  return openDatabase().then(
    (db) =>
      new Promise((resolve, reject) => {
        let settled = false;
        const fail = (error) => {
          if (settled) return;
          settled = true;
          reject(wrapStorageError(error, 'Could not access local storage.'));
        };

        let tx;
        try {
          tx = db.transaction(storeName, mode);
        } catch (error) {
          fail(error);
          return;
        }

        const store = tx.objectStore(storeName);
        let requestResult;

        try {
          const result = executor(store);
          if (result instanceof IDBRequest) {
            result.onsuccess = () => {
              requestResult = result.result;
            };
            result.onerror = () => {
              fail(result.error);
            };
          } else {
            requestResult = result;
          }
        } catch (error) {
          try {
            tx.abort();
          } catch {
            /* ignore */
          }
          fail(error);
          return;
        }

        tx.oncomplete = () => {
          if (settled) return;
          settled = true;
          resolve(requestResult);
        };
        tx.onerror = () => fail(tx.error);
        tx.onabort = () =>
          fail(tx.error || new Error('Transaction aborted.'));
      }),
  );
}

/**
 * Multi-store readwrite transaction that commits atomically.
 * @param {string[]} storeNames
 * @param {(stores: Record<string, IDBObjectStore>) => unknown | Promise<unknown>} executor
 */
export function runMultiStoreTransaction(storeNames, executor) {
  return openDatabase().then(
    (db) =>
      new Promise((resolve, reject) => {
        let settled = false;
        const fail = (error) => {
          if (settled) return;
          settled = true;
          reject(wrapStorageError(error, 'Could not update local storage.'));
        };

        let tx;
        try {
          tx = db.transaction(storeNames, 'readwrite');
        } catch (error) {
          fail(error);
          return;
        }

        const stores = {};
        for (const name of storeNames) {
          stores[name] = tx.objectStore(name);
        }

        let requestResult;
        try {
          // IndexedDB transactions close when the sync turn ends — executor must be sync.
          requestResult = executor(stores);
          if (requestResult && typeof requestResult.then === 'function') {
            throw new Error(
              'Multi-store storage work must finish in one synchronous step.',
            );
          }
        } catch (error) {
          try {
            tx.abort();
          } catch {
            /* ignore */
          }
          fail(error);
          return;
        }

        tx.oncomplete = () => {
          if (settled) return;
          settled = true;
          resolve(requestResult);
        };
        tx.onerror = () => fail(tx.error);
        tx.onabort = () =>
          fail(tx.error || new Error('Transaction aborted.'));
      }),
  );
}

export function get(storeName, key) {
  return runTransaction(storeName, 'readonly', (store) => store.get(key));
}

export function getAll(storeName) {
  return runTransaction(storeName, 'readonly', (store) => store.getAll());
}

/**
 * Read all records matching an index key.
 * @param {string} storeName
 * @param {string} indexName
 * @param {IDBValidKey} key
 */
export function getAllByIndex(storeName, indexName, key) {
  return runTransaction(storeName, 'readonly', (store) => {
    const index = store.index(indexName);
    return index.getAll(key);
  });
}

export function add(storeName, value) {
  return runTransaction(storeName, 'readwrite', (store) => store.add(value));
}

export function put(storeName, value) {
  return runTransaction(storeName, 'readwrite', (store) => store.put(value));
}

export function remove(storeName, key) {
  return runTransaction(storeName, 'readwrite', (store) => store.delete(key));
}

export function clear(storeName) {
  return runTransaction(storeName, 'readwrite', (store) => store.clear());
}

/**
 * Clear many stores then put many rows in one atomic transaction.
 * @param {Array<{ storeName: string, rows: object[] }>} batches
 */
export function replaceStoresAtomically(batches) {
  const storeNames = [...new Set(batches.map((b) => b.storeName))];
  return runMultiStoreTransaction(storeNames, (stores) => {
    for (const { storeName, rows } of batches) {
      const store = stores[storeName];
      store.clear();
      for (const row of rows) {
        store.put(row);
      }
    }
  });
}
