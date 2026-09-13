/**
 * Node-side reliability checks for backup validate/sanitize + storage errors.
 * Run: node scripts/test-data-reliability.mjs
 */
import assert from 'node:assert/strict';
import {
  BACKUP_SCHEMA_VERSION,
  BACKUP_STORE_KEYS,
  prepareImport,
  validateBackup,
} from '../src/services/backup.js';
import {
  assertSanitizationAcceptable,
  sanitizeBackupData,
  sanitizeStoreRow,
} from '../src/services/backupSanitize.js';
import {
  formatStorageError,
  StorageError,
} from '../src/utils/storageErrors.js';
import { isDateKey } from '../src/utils/dates.js';

let passed = 0;
function ok(label) {
  passed += 1;
  console.log(`  ✓ ${label}`);
}

function envelope(overrides = {}) {
  return {
    app: 'Stronger',
    version: BACKUP_SCHEMA_VERSION,
    dbVersion: 3,
    exportedAt: '2026-09-14T00:00:00.000Z',
    data: {
      settings: [{ id: 'profile', name: 'A' }],
      goals: [{ id: 'primary', type: 'weight' }],
      weightHistory: [
        { id: 'w1', date: '2026-09-10', weightKg: 52 },
      ],
      dailyLogs: [
        { id: '2026-09-10', date: '2026-09-10', completedTaskIds: [] },
      ],
      foodLog: [],
      workouts: [],
      sleepRecords: [],
      appetiteRecords: [],
      energyRecords: [],
      notes: [],
      meals: [],
    },
    ...overrides,
  };
}

console.log('Data reliability checks\n');

// --- dates ---
assert.equal(isDateKey('2026-09-14'), true);
assert.equal(isDateKey('2026-02-30'), false);
assert.equal(isDateKey('nope'), false);
ok('isDateKey rejects invalid calendars');

// --- validateBackup ---
assert.throws(() => validateBackup(null), /JSON object/);
assert.throws(() => validateBackup({ app: 'Other' }), /not a Stronger/);
assert.throws(
  () => validateBackup(envelope({ version: 99 })),
  /Update Stronger/,
);
assert.throws(
  () =>
    validateBackup(
      envelope({
        data: {
          settings: [],
          goals: [],
          weightHistory: 'bad',
          dailyLogs: [],
        },
      }),
    ),
  /must be an array/,
);
ok('validateBackup rejects malformed envelopes');

const summary = validateBackup(envelope());
assert.equal(summary.recordCount >= 4, true);
ok('validateBackup accepts a valid envelope');

// --- sanitize: missing fields / duplicates ---
const { data, report } = sanitizeBackupData(
  {
    foodLog: [
      { id: 'a', date: '2026-09-10', foodTitle: 'Eggs' },
      { id: 'a', date: '2026-09-10', foodTitle: 'Dup' },
      { id: 'b', date: 'bad-date', foodTitle: 'X' },
      { foodTitle: 'no id', date: '2026-09-10' },
      { id: 'c', date: '2026-09-10' },
      null,
      'string',
    ],
    weightHistory: [
      { id: 'w', date: '2026-09-10', weightKg: 999 },
      { id: 'w2', date: '2026-09-10', weightKg: 55.55 },
    ],
    dailyLogs: [{ id: '2026-09-10', completedTaskIds: 'oops' }],
  },
  BACKUP_STORE_KEYS,
);

assert.equal(data.foodLog.length, 1);
assert.equal(data.foodLog[0].foodTitle, 'Eggs');
assert.equal(report.skippedDuplicates >= 1, true);
assert.equal(report.skippedInvalid >= 3, true);
assert.equal(data.weightHistory.length, 1);
assert.equal(data.weightHistory[0].weightKg, 55.6);
assert.deepEqual(data.dailyLogs[0].completedTaskIds, []);
ok('sanitize drops invalid / duplicate rows and repairs soft fields');

assert.equal(sanitizeStoreRow('workouts', { id: '1', date: '2026-09-10' }).ok, false);
ok('sanitize rejects workouts missing workoutId');

assert.throws(
  () =>
    assertSanitizationAcceptable(
      {
        skippedInvalid: 10,
        skippedDuplicates: 0,
        perStore: { foodLog: { kept: 0, skipped: 10 } },
      },
      10,
    ),
  /None of the records/,
);
ok('assertSanitizationAcceptable blocks empty-after-sanitize');

// --- prepareImport merges meta ---
const prepared = prepareImport(envelope());
assert.ok(prepared.batches.length === BACKUP_STORE_KEYS.length);
assert.ok(
  prepared.data.settings.some((r) => r.id === 'backupMeta' && r.lastImportAt),
);
ok('prepareImport builds atomic batches + backup meta');

// --- storage errors ---
assert.match(
  formatStorageError({ name: 'QuotaExceededError', message: 'quota' }),
  /low on storage/i,
);
assert.match(
  formatStorageError(new StorageError('Custom friendly')),
  /Custom friendly/,
);
assert.match(
  formatStorageError({ name: 'UnknownError', message: 'x'.repeat(400) }),
  /Something went wrong saving/,
);
ok('formatStorageError maps quota and long internals');

console.log(`\n${passed} checks passed.`);
