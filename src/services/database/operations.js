import { openDatabase } from './db.js';

function runTransaction(storeName, mode, executor) {
  return openDatabase().then(
    (db) =>
      new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, mode);
        const store = tx.objectStore(storeName);
        let result;

        try {
          result = executor(store);
        } catch (error) {
          reject(error);
          return;
        }

        if (result instanceof IDBRequest) {
          result.onsuccess = () => {
            resolve(result.result);
          };
          result.onerror = () => {
            reject(result.error);
          };
        } else {
          resolve(result);
        }

        tx.onerror = () => {
          reject(tx.error);
        };
        tx.onabort = () => {
          reject(tx.error || new Error('Transaction aborted.'));
        };
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
