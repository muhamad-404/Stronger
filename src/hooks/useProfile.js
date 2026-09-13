import { useCallback, useEffect, useState } from 'react';
import { openDatabase } from '../services/database/index.js';
import {
  getProfile,
  saveProfileFromSettings,
} from '../services/profile.js';

/**
 * Loads and saves the user profile for Settings.
 */
export function useProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      await openDatabase();
      const data = await getProfile();
      setProfile(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        await openDatabase();
        const data = await getProfile();
        if (cancelled) return;
        setProfile(data);
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const save = useCallback(
    async (answers) => {
      setSaving(true);
      try {
        const updated = await saveProfileFromSettings(answers, profile);
        setProfile(updated);
        setError(null);
        return updated;
      } catch (err) {
        const next = err instanceof Error ? err : new Error(String(err));
        setError(next);
        throw next;
      } finally {
        setSaving(false);
      }
    },
    [profile],
  );

  return { profile, loading, error, saving, save, refresh };
}
