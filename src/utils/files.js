/**
 * Client-side file helpers for Stronger backups.
 * Never uploads — download/read stay on-device.
 */

/**
 * Trigger a browser download of a JSON-serializable value.
 * @param {object} data
 * @param {string} filename
 */
export function downloadJson(data, filename) {
  const text = JSON.stringify(data, null, 2);
  const blob = new Blob([text], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.rel = 'noopener';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

/**
 * Open a hidden file picker.
 * @param {{ accept?: string, multiple?: boolean }} [options]
 * @returns {Promise<File | null>}
 */
export function pickFile(options = {}) {
  const { accept = 'application/json,.json', multiple = false } = options;
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = accept;
    input.multiple = multiple;
    input.style.display = 'none';

    let settled = false;
    const finish = (file) => {
      if (settled) return;
      settled = true;
      input.remove();
      resolve(file);
    };

    input.addEventListener('change', () => {
      finish(input.files?.[0] || null);
    });
    // Some browsers fire focus without change when cancelled
    window.addEventListener(
      'focus',
      () => {
        setTimeout(() => {
          if (!input.files?.length) finish(null);
        }, 400);
      },
      { once: true },
    );

    document.body.appendChild(input);
    input.click();
  });
}

/**
 * Read a File as text.
 * @param {File} file
 * @returns {Promise<string>}
 */
export function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () =>
      reject(reader.error || new Error('Could not read file.'));
    reader.readAsText(file);
  });
}

/**
 * Parse JSON from a File with basic type checks.
 * @param {File} file
 * @returns {Promise<object>}
 */
export async function readJsonFile(file) {
  if (!file) throw new Error('No file selected.');
  const name = String(file.name || '').toLowerCase();
  const type = String(file.type || '');
  const looksJson =
    type.includes('json') ||
    name.endsWith('.json') ||
    name.endsWith('.stronger.json');
  if (!looksJson) {
    throw new Error('Please choose a Stronger JSON backup file.');
  }
  if (file.size > 25 * 1024 * 1024) {
    throw new Error('This file is too large to import safely.');
  }
  const text = await readFileAsText(file);
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error('That file is not valid JSON.');
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error('Backup must be a JSON object.');
  }
  return parsed;
}

/**
 * Format bytes for storage display.
 * @param {number} bytes
 */
export function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes < 0) return '—';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
