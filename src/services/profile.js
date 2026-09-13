import { get, put, remove, getAll, STORES, runMultiStoreTransaction } from './database/index.js';
import { createId, toDateKey } from '../utils/dates.js';

export const SETTINGS_KEYS = {
  app: 'app',
  profile: 'profile',
  onboardingDraft: 'onboardingDraft',
};

export const GOAL_ID = 'primary';

/**
 * @param {number} weightKg
 * @param {number} heightCm
 * @returns {number | null}
 */
export function calculateBmi(weightKg, heightCm) {
  if (!Number.isFinite(weightKg) || !Number.isFinite(heightCm) || heightCm <= 0) {
    return null;
  }
  // Integer arithmetic avoids float noise (e.g. 48kg / 1.6m² → 18.8)
  return Math.round((weightKg * 100000) / (heightCm * heightCm)) / 10;
}

/**
 * Gentle first milestone: +1 kg toward target, never past target.
 * @param {number} currentWeightKg
 * @param {number} targetWeightKg
 * @returns {number}
 */
export function calculateFirstMilestone(currentWeightKg, targetWeightKg) {
  const delta = Math.min(1, targetWeightKg - currentWeightKg);
  return Math.round((currentWeightKg + Math.max(0, delta)) * 10) / 10;
}

export async function getAppSettings() {
  return (await get(STORES.settings, SETTINGS_KEYS.app)) || null;
}

export async function isOnboardingCompleted() {
  const app = await getAppSettings();
  return Boolean(app?.onboardingCompleted);
}

export async function getProfile() {
  return (await get(STORES.settings, SETTINGS_KEYS.profile)) || null;
}

export async function getOnboardingDraft() {
  return (await get(STORES.settings, SETTINGS_KEYS.onboardingDraft)) || null;
}

/**
 * @param {{ step: number, answers: object }} draft
 */
export async function saveOnboardingDraft(draft) {
  return put(STORES.settings, {
    id: SETTINGS_KEYS.onboardingDraft,
    step: draft.step,
    answers: draft.answers,
    updatedAt: new Date().toISOString(),
  });
}

export async function clearOnboardingDraft() {
  return remove(STORES.settings, SETTINGS_KEYS.onboardingDraft);
}

/**
 * Builds a normalized profile record from form answers (onboarding).
 * Sets stable startingWeightKg + firstMilestoneKg.
 * @param {object} answers
 */
export function buildProfileRecord(answers) {
  const currentWeightKg = Number(answers.currentWeightKg);
  const heightCm = Number(answers.heightCm);
  const targetWeightKg = Number(answers.targetWeightKg);
  const now = new Date().toISOString();
  const startingWeightKg = currentWeightKg;
  const firstMilestoneKg = calculateFirstMilestone(
    startingWeightKg,
    targetWeightKg,
  );

  return {
    id: SETTINGS_KEYS.profile,
    preferredName: String(answers.preferredName || '').trim(),
    currentWeightKg,
    startingWeightKg,
    heightCm,
    targetWeightKg,
    wakeTime: answers.wakeTime,
    bedTime: answers.bedTime,
    bmi: calculateBmi(currentWeightKg, heightCm),
    firstMilestoneKg,
    updatedAt: now,
  };
}

/**
 * Completes onboarding: profile, goals, weight history, app flag; clears draft.
 * @param {object} answers
 */
export async function completeOnboarding(answers) {
  const profile = buildProfileRecord(answers);
  const now = profile.updatedAt;
  const weightEntry = {
    id: createId('weight'),
    date: toDateKey(),
    weightKg: profile.currentWeightKg,
    source: 'onboarding',
    createdAt: now,
  };
  const goal = {
    id: GOAL_ID,
    currentWeightKg: profile.currentWeightKg,
    startingWeightKg: profile.startingWeightKg,
    targetWeightKg: profile.targetWeightKg,
    firstMilestoneKg: profile.firstMilestoneKg,
    heightCm: profile.heightCm,
    updatedAt: now,
  };
  const app = {
    id: SETTINGS_KEYS.app,
    onboardingCompleted: true,
    completedAt: now,
  };

  await runMultiStoreTransaction(
    [STORES.settings, STORES.goals, STORES.weightHistory],
    (stores) => {
      stores[STORES.settings].put(profile);
      stores[STORES.settings].put(app);
      stores[STORES.settings].delete(SETTINGS_KEYS.onboardingDraft);
      stores[STORES.goals].put(goal);
      stores[STORES.weightHistory].put(weightEntry);
    },
  );

  return profile;
}

/**
 * Updates profile from Settings; preserves starting + first milestone.
 * @param {object} answers
 * @param {object | null} previousProfile
 */
export async function saveProfileFromSettings(answers, previousProfile = null) {
  const currentWeightKg = Number(answers.currentWeightKg);
  const heightCm = Number(answers.heightCm);
  const targetWeightKg = Number(answers.targetWeightKg);
  const now = new Date().toISOString();

  let startingWeightKg = previousProfile?.startingWeightKg;
  if (!Number.isFinite(startingWeightKg)) {
    startingWeightKg = await resolveStartingWeight(
      previousProfile,
      currentWeightKg,
    );
  }

  let firstMilestoneKg = previousProfile?.firstMilestoneKg;
  if (!Number.isFinite(firstMilestoneKg)) {
    firstMilestoneKg = calculateFirstMilestone(startingWeightKg, targetWeightKg);
  }

  const profile = {
    id: SETTINGS_KEYS.profile,
    preferredName: String(answers.preferredName || '').trim(),
    currentWeightKg,
    startingWeightKg,
    heightCm,
    targetWeightKg,
    wakeTime: answers.wakeTime,
    bedTime: answers.bedTime,
    bmi: calculateBmi(currentWeightKg, heightCm),
    firstMilestoneKg,
    updatedAt: now,
  };

  const goal = {
    id: GOAL_ID,
    currentWeightKg: profile.currentWeightKg,
    startingWeightKg: profile.startingWeightKg,
    targetWeightKg: profile.targetWeightKg,
    firstMilestoneKg: profile.firstMilestoneKg,
    heightCm: profile.heightCm,
    updatedAt: now,
  };

  const weightChanged =
    !previousProfile ||
    previousProfile.currentWeightKg !== profile.currentWeightKg;

  const weightEntry = weightChanged
    ? {
        id: createId('weight'),
        date: toDateKey(),
        weightKg: profile.currentWeightKg,
        source: 'settings',
        createdAt: now,
      }
    : null;

  const storeNames = weightEntry
    ? [STORES.settings, STORES.goals, STORES.weightHistory]
    : [STORES.settings, STORES.goals];

  await runMultiStoreTransaction(storeNames, (stores) => {
    stores[STORES.settings].put(profile);
    stores[STORES.goals].put(goal);
    if (weightEntry) {
      stores[STORES.weightHistory].put(weightEntry);
    }
  });

  return profile;
}

/**
 * Backfill starting weight from history when missing on older profiles.
 * @param {object | null} profile
 * @param {number} fallback
 */
async function resolveStartingWeight(profile, fallback) {
  if (Number.isFinite(profile?.startingWeightKg)) {
    return profile.startingWeightKg;
  }

  const history = await getAll(STORES.weightHistory);
  if (history?.length) {
    const sorted = [...history].sort((a, b) => {
      const dateCmp = String(a.date).localeCompare(String(b.date));
      if (dateCmp !== 0) return dateCmp;
      return String(a.createdAt || '').localeCompare(String(b.createdAt || ''));
    });
    const oldest = Number(sorted[0].weightKg);
    if (Number.isFinite(oldest)) return oldest;
  }

  if (Number.isFinite(profile?.currentWeightKg)) {
    return profile.currentWeightKg;
  }

  return fallback;
}

/**
 * Ensure profile has stable startingWeightKg / firstMilestoneKg persisted.
 * @param {object | null} profile
 * @returns {Promise<object | null>}
 */
export async function ensureStableWeightGoals(profile) {
  if (!profile) return null;

  let next = { ...profile };
  let dirty = false;

  if (!Number.isFinite(next.startingWeightKg)) {
    next.startingWeightKg = await resolveStartingWeight(
      profile,
      profile.currentWeightKg,
    );
    dirty = true;
  }

  if (!Number.isFinite(next.firstMilestoneKg)) {
    next.firstMilestoneKg = calculateFirstMilestone(
      next.startingWeightKg,
      next.targetWeightKg,
    );
    dirty = true;
  }

  if (dirty) {
    next.updatedAt = new Date().toISOString();
    await put(STORES.settings, next);
  }

  return next;
}

/**
 * Latest logged weight, falling back to profile.currentWeightKg.
 * @param {object | null} profile
 */
export async function getLatestWeightKg(profile) {
  const history = await getAll(STORES.weightHistory);
  if (history?.length) {
    const sorted = [...history].sort((a, b) => {
      const dateCmp = String(b.date).localeCompare(String(a.date));
      if (dateCmp !== 0) return dateCmp;
      return String(b.createdAt || '').localeCompare(String(a.createdAt || ''));
    });
    const latest = Number(sorted[0].weightKg);
    if (Number.isFinite(latest)) return latest;
  }
  return Number.isFinite(profile?.currentWeightKg)
    ? profile.currentWeightKg
    : null;
}

/**
 * Progress toward first milestone from starting weight.
 * @param {number} currentKg
 * @param {number} startingKg
 * @param {number} milestoneKg
 */
export function computeMilestoneProgress(currentKg, startingKg, milestoneKg) {
  const span = milestoneKg - startingKg;
  const gained = currentKg - startingKg;
  if (!Number.isFinite(span) || span <= 0) {
    return {
      percent: currentKg >= milestoneKg ? 100 : 0,
      deltaKg: Number.isFinite(gained) ? Math.round(gained * 10) / 10 : 0,
    };
  }
  const percent = Math.min(100, Math.max(0, Math.round((gained / span) * 100)));
  return {
    percent,
    deltaKg: Math.round(gained * 10) / 10,
  };
}
