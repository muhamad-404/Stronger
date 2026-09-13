import { useEffect, useState } from 'react';
import { openDatabase } from '../services/database/index.js';

/**
 * Initializes the IndexedDB connection once on mount.
 * @returns {{ ready: boolean, error: Error | null, db: IDBDatabase | null }}
 */
export function useDatabase() {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(null);
  const [db, setDb] = useState(null);

  useEffect(() => {
    let cancelled = false;

    openDatabase()
      .then((database) => {
        if (cancelled) return;
        setDb(database);
        setReady(true);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err instanceof Error ? err : new Error(String(err)));
        setReady(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { ready, error, db };
}
