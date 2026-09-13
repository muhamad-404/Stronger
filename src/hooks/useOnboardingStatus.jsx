import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { openDatabase } from '../services/database/index.js';
import { isOnboardingCompleted } from '../services/profile.js';

const OnboardingStatusContext = createContext(null);

export function OnboardingStatusProvider({ children }) {
  const [ready, setReady] = useState(false);
  const [completed, setCompleted] = useState(null);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    try {
      await openDatabase();
      const done = await isOnboardingCompleted();
      setCompleted(done);
      setError(null);
      setReady(true);
      return done;
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      setCompleted(false);
      setReady(true);
      return false;
    }
  }, []);

  const markCompleted = useCallback(() => {
    setCompleted(true);
  }, []);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        await openDatabase();
        const done = await isOnboardingCompleted();
        if (cancelled) return;
        setCompleted(done);
        setReady(true);
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err : new Error(String(err)));
        setCompleted(false);
        setReady(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(
    () => ({ ready, completed, error, refresh, markCompleted }),
    [ready, completed, error, refresh, markCompleted],
  );

  return (
    <OnboardingStatusContext.Provider value={value}>
      {children}
    </OnboardingStatusContext.Provider>
  );
}

export function useOnboardingStatus() {
  const ctx = useContext(OnboardingStatusContext);
  if (!ctx) {
    throw new Error('useOnboardingStatus must be used within OnboardingStatusProvider');
  }
  return ctx;
}
