/**
 * Formats a Date as YYYY-MM-DD in local time.
 * @param {Date} [date]
 * @returns {string}
 */
export function toDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const DATE_KEY_RE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * True when value is a real local calendar YYYY-MM-DD key.
 * @param {unknown} value
 * @returns {boolean}
 */
export function isDateKey(value) {
  if (typeof value !== 'string' || !DATE_KEY_RE.test(value)) return false;
  const [y, m, d] = value.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  return (
    dt.getFullYear() === y &&
    dt.getMonth() === m - 1 &&
    dt.getDate() === d
  );
}

/**
 * Creates a simple unique id for local records.
 * @param {string} [prefix]
 * @returns {string}
 */
export function createId(prefix = 'id') {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Long date like "Monday, 14 September"
 * @param {Date} [date]
 * @returns {string}
 */
export function formatLongDate(date = new Date()) {
  const weekday = date.toLocaleDateString('en-GB', { weekday: 'long' });
  const day = date.getDate();
  const month = date.toLocaleDateString('en-GB', { month: 'long' });
  return `${weekday}, ${day} ${month}`;
}

/**
 * @param {Date} [date]
 * @returns {'morning' | 'afternoon' | 'evening'}
 */
export function getGreetingPeriod(date = new Date()) {
  const hour = date.getHours();
  if (hour < 12) return 'morning';
  if (hour < 17) return 'afternoon';
  return 'evening';
}

/**
 * @param {'morning' | 'afternoon' | 'evening'} period
 * @returns {string}
 */
export function getGreetingLabel(period) {
  if (period === 'afternoon') return 'Good afternoon';
  if (period === 'evening') return 'Good evening';
  return 'Good morning';
}

/**
 * Parse HH:MM into minutes from midnight.
 * @param {string} time
 * @returns {number | null}
 */
export function parseTimeToMinutes(time) {
  if (!time || typeof time !== 'string') return null;
  const match = /^(\d{1,2}):(\d{2})$/.exec(time.trim());
  if (!match) return null;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours > 23 || minutes > 59) return null;
  return hours * 60 + minutes;
}

/**
 * Format minutes-from-midnight as HH:MM (24h).
 * @param {number} totalMinutes
 * @returns {string}
 */
export function formatMinutesAsTime(totalMinutes) {
  const day = ((totalMinutes % (24 * 60)) + 24 * 60) % (24 * 60);
  const hours = Math.floor(day / 60);
  const minutes = day % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

/**
 * Add minutes to an HH:MM time string.
 * @param {string} time
 * @param {number} minutesToAdd
 * @param {string} [fallback='08:00']
 * @returns {string}
 */
export function addMinutesToTime(time, minutesToAdd, fallback = '08:00') {
  const base = parseTimeToMinutes(time);
  if (base === null) {
    const fallbackBase = parseTimeToMinutes(fallback) ?? 8 * 60;
    return formatMinutesAsTime(fallbackBase + minutesToAdd);
  }
  return formatMinutesAsTime(base + minutesToAdd);
}

/**
 * List the last `count` local date keys ending today (oldest → newest).
 * @param {number} [count=7]
 * @param {Date} [fromDate]
 * @returns {string[]}
 */
export function listDateKeys(count = 7, fromDate = new Date()) {
  const keys = [];
  for (let i = count - 1; i >= 0; i -= 1) {
    const d = new Date(fromDate);
    d.setHours(12, 0, 0, 0);
    d.setDate(d.getDate() - i);
    keys.push(toDateKey(d));
  }
  return keys;
}

/**
 * Day of year 0–365 for tip rotation.
 * @param {Date} [date]
 * @returns {number}
 */
export function getDayOfYear(date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

/**
 * Format kg for display.
 * @param {number} value
 * @returns {string}
 */
export function formatKg(value) {
  if (!Number.isFinite(value)) return '—';
  const rounded = Math.round(value * 10) / 10;
  return `${rounded % 1 === 0 ? rounded.toFixed(0) : rounded.toFixed(1)} kg`;
}

/**
 * Parse YYYY-MM-DD to local Date at noon.
 * @param {string} dateKey
 * @returns {Date | null}
 */
export function parseDateKey(dateKey) {
  if (!dateKey || typeof dateKey !== 'string') return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateKey);
  if (!match) return null;
  const date = new Date(
    Number(match[1]),
    Number(match[2]) - 1,
    Number(match[3]),
    12,
    0,
    0,
    0,
  );
  return Number.isNaN(date.getTime()) ? null : date;
}

/**
 * Shift a date key by N days.
 * @param {string} dateKey
 * @param {number} deltaDays
 * @returns {string}
 */
export function shiftDateKey(dateKey, deltaDays) {
  const date = parseDateKey(dateKey) || new Date();
  date.setDate(date.getDate() + deltaDays);
  return toDateKey(date);
}

/**
 * Short label like "14 Sep" or "Today".
 * @param {string} dateKey
 * @param {string} [todayKey]
 */
export function formatDateSwitcherLabel(dateKey, todayKey = toDateKey()) {
  if (dateKey === todayKey) return 'Today';
  const date = parseDateKey(dateKey);
  if (!date) return dateKey;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

/**
 * Current local HH:MM.
 * @param {Date} [date]
 */
export function currentTimeLabel(date = new Date()) {
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

/**
 * Monday–Sunday week containing `fromDate` (local).
 * @param {Date} [fromDate]
 * @returns {{ weekStart: string, weekEnd: string, dateKeys: string[], monday: Date }}
 */
export function getWeekRange(fromDate = new Date()) {
  const d = new Date(fromDate);
  d.setHours(12, 0, 0, 0);
  const day = d.getDay(); // 0 = Sun
  const diffToMon = day === 0 ? -6 : 1 - day;
  const monday = new Date(d);
  monday.setDate(d.getDate() + diffToMon);

  const dateKeys = [];
  for (let i = 0; i < 7; i += 1) {
    const x = new Date(monday);
    x.setDate(monday.getDate() + i);
    dateKeys.push(toDateKey(x));
  }

  return {
    weekStart: dateKeys[0],
    weekEnd: dateKeys[6],
    dateKeys,
    monday,
  };
}

/**
 * Shift a Monday week start by N weeks.
 * @param {string} weekStart
 * @param {number} deltaWeeks
 */
export function shiftWeekStart(weekStart, deltaWeeks) {
  return shiftDateKey(weekStart, deltaWeeks * 7);
}

/**
 * Human label for a Mon–Sun range.
 * @param {string} weekStart
 * @param {string} weekEnd
 */
export function formatWeekRangeLabel(weekStart, weekEnd) {
  const a = parseDateKey(weekStart);
  const b = parseDateKey(weekEnd);
  if (!a || !b) return `${weekStart} – ${weekEnd}`;
  const sameMonth = a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
  const start = a.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  });
  const end = sameMonth
    ? String(b.getDate())
    : b.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
      });
  return `${start} – ${end}`;
}

