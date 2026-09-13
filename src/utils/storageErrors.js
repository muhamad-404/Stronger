/**
 * User-facing storage / IndexedDB error helpers.
 * Data can still be lost (cleared site data, full disk, etc.) — be honest.
 */

export class StorageError extends Error {
  /**
   * @param {string} message
   * @param {{ code?: string, cause?: unknown }} [options]
   */
  constructor(message, options = {}) {
    super(message);
    this.name = 'StorageError';
    this.code = options.code || 'STORAGE_ERROR';
    if (options.cause !== undefined) {
      this.cause = options.cause;
    }
  }
}

/**
 * Map raw browser errors to calm, actionable copy.
 * @param {unknown} err
 * @param {string} [fallback]
 * @returns {string}
 */
export function formatStorageError(err, fallback) {
  const raw =
    err && typeof err === 'object' && 'message' in err
      ? String(err.message || '')
      : String(err || '');
  const name =
    err && typeof err === 'object' && 'name' in err
      ? String(err.name || '')
      : '';
  const code =
    err && typeof err === 'object' && 'code' in err
      ? String(err.code || '')
      : '';

  const blob = `${name} ${code} ${raw}`.toLowerCase();

  if (
    blob.includes('quota') ||
    blob.includes(' QuotaExceeded') ||
    name === 'QuotaExceededError'
  ) {
    return 'This device is low on storage. Free some space, or export a backup and clear old data.';
  }

  if (
    blob.includes('indexeddb') &&
    (blob.includes('not available') || blob.includes('undefined'))
  ) {
    return 'Local storage is unavailable in this browser. Try another browser, or turn off private/incognito mode.';
  }

  if (blob.includes('blocked') || blob.includes('versionchange')) {
    return 'Storage is busy in another tab. Close other Stronger tabs and try again.';
  }

  if (blob.includes('abort')) {
    return 'The save was interrupted. Please try again.';
  }

  if (blob.includes('not a stronger backup') || blob.includes('schema')) {
    return raw || fallback || 'That backup file could not be used.';
  }

  if (err instanceof StorageError && err.message) {
    return err.message;
  }

  if (raw && raw.length < 160 && !blob.includes('internal')) {
    return raw;
  }

  return (
    fallback ||
    'Something went wrong saving on this device. Export a backup if you can, then try again.'
  );
}

/**
 * @param {unknown} err
 * @param {string} [fallback]
 */
export function wrapStorageError(err, fallback) {
  if (err instanceof StorageError) return err;
  return new StorageError(formatStorageError(err, fallback), {
    cause: err,
    code:
      err && typeof err === 'object' && 'name' in err
        ? String(err.name)
        : 'STORAGE_ERROR',
  });
}
