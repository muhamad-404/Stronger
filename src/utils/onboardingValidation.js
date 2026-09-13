const NAME_MAX = 40;
const WEIGHT_MIN = 30;
const WEIGHT_MAX = 200;
const HEIGHT_MIN = 120;
const HEIGHT_MAX = 220;
const LARGE_GAIN_KG = 15;

const TIME_PATTERN = /^\d{2}:\d{2}$/;

function parseNumber(value) {
  if (value === '' || value === null || value === undefined) return NaN;
  const n = typeof value === 'number' ? value : Number(String(value).trim());
  return n;
}

/**
 * @param {string} name
 * @returns {string | null} error message or null
 */
export function validatePreferredName(name) {
  const trimmed = String(name || '').trim();
  if (!trimmed) return 'Please enter a name we can use.';
  if (trimmed.length > NAME_MAX) return `Keep it under ${NAME_MAX} characters.`;
  return null;
}

/**
 * @param {string | number} value
 * @param {string} label
 * @returns {string | null}
 */
export function validateWeightKg(value, label = 'Weight') {
  if (value === '' || value === null || value === undefined) {
    return `Enter your ${label.toLowerCase()} in kg.`;
  }
  const n = parseNumber(value);
  if (!Number.isFinite(n)) return `${label} must be a number.`;
  if (n < WEIGHT_MIN || n > WEIGHT_MAX) {
    return `${label} should be between ${WEIGHT_MIN} and ${WEIGHT_MAX} kg.`;
  }
  return null;
}

/**
 * @param {string | number} value
 * @returns {string | null}
 */
export function validateHeightCm(value) {
  if (value === '' || value === null || value === undefined) {
    return 'Enter your height in cm.';
  }
  const n = parseNumber(value);
  if (!Number.isFinite(n)) return 'Height must be a number.';
  if (n < HEIGHT_MIN || n > HEIGHT_MAX) {
    return `Height should be between ${HEIGHT_MIN} and ${HEIGHT_MAX} cm.`;
  }
  return null;
}

/**
 * @param {string | number} target
 * @param {string | number} current
 * @returns {string | null}
 */
export function validateTargetWeightKg(target, current) {
  const baseError = validateWeightKg(target, 'Target weight');
  if (baseError) return baseError;

  const targetN = parseNumber(target);
  const currentN = parseNumber(current);
  if (Number.isFinite(currentN) && targetN <= currentN) {
    return 'Choose a target a little higher than your current weight.';
  }
  return null;
}

/**
 * @param {string} value
 * @param {string} label
 * @returns {string | null}
 */
export function validateTime(value, label = 'Time') {
  if (!value || !String(value).trim()) {
    return `Choose your ${label.toLowerCase()}.`;
  }
  if (!TIME_PATTERN.test(String(value).trim())) {
    return `Enter a valid ${label.toLowerCase()}.`;
  }
  return null;
}

/**
 * Soft supportive note when the gain goal is large — not a clinical warning.
 * @param {string | number} current
 * @param {string | number} target
 * @returns {string | null}
 */
export function getLargeGainNote(current, target) {
  const currentN = parseNumber(current);
  const targetN = parseNumber(target);
  if (!Number.isFinite(currentN) || !Number.isFinite(targetN)) return null;
  if (targetN - currentN > LARGE_GAIN_KG) {
    return 'That’s a meaningful journey — we’ll take it one gentle step at a time.';
  }
  return null;
}

/**
 * Validate a single onboarding step field set.
 * @param {number} step
 * @param {object} answers
 * @returns {string | null}
 */
export function validateOnboardingStep(step, answers) {
  switch (step) {
    case 0:
      return validatePreferredName(answers.preferredName);
    case 1:
      return validateWeightKg(answers.currentWeightKg, 'Current weight');
    case 2:
      return validateHeightCm(answers.heightCm);
    case 3:
      return validateTargetWeightKg(
        answers.targetWeightKg,
        answers.currentWeightKg,
      );
    case 4:
      return validateTime(answers.wakeTime, 'Wake-up time');
    case 5:
      return validateTime(answers.bedTime, 'Bedtime');
    default:
      return null;
  }
}

/**
 * Validate all profile fields (Settings form).
 * @param {object} answers
 * @returns {Record<string, string>}
 */
export function validateProfileForm(answers) {
  const errors = {};
  const nameErr = validatePreferredName(answers.preferredName);
  if (nameErr) errors.preferredName = nameErr;

  const weightErr = validateWeightKg(answers.currentWeightKg, 'Current weight');
  if (weightErr) errors.currentWeightKg = weightErr;

  const heightErr = validateHeightCm(answers.heightCm);
  if (heightErr) errors.heightCm = heightErr;

  const targetErr = validateTargetWeightKg(
    answers.targetWeightKg,
    answers.currentWeightKg,
  );
  if (targetErr) errors.targetWeightKg = targetErr;

  const wakeErr = validateTime(answers.wakeTime, 'Wake-up time');
  if (wakeErr) errors.wakeTime = wakeErr;

  const bedErr = validateTime(answers.bedTime, 'Bedtime');
  if (bedErr) errors.bedTime = bedErr;

  return errors;
}

export const VALIDATION_LIMITS = {
  NAME_MAX,
  WEIGHT_MIN,
  WEIGHT_MAX,
  HEIGHT_MIN,
  HEIGHT_MAX,
};
