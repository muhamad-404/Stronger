import { get, put, remove, getAll, getAllByIndex, STORES } from './database/index.js';
import { getMealById, MEAL_SLOTS } from '../data/meals.js';
import { setTaskCompleted } from './dailyLog.js';
import { createId, currentTimeLabel, toDateKey } from '../utils/dates.js';

export const PORTIONS = ['small', 'normal', 'large', 'custom'];

export const MEAL_SLOT_IDS = new Set(['breakfast', 'lunch', 'dinner']);
export const SNACK_SLOT_IDS = new Set([
  'morningSnack',
  'afternoonSnack',
  'bedtimeSnack',
]);

const DRINK_HINT =
  /\b(milk|lassi|shake|drink|yogurt drink|chai|juice)\b/i;

/**
 * @param {object | null} meal
 * @param {string} foodTitle
 */
export function inferHasProtein(meal, foodTitle = '') {
  if (meal?.proteinSource && String(meal.proteinSource).trim()) return true;
  if (meal?.tags?.includes('protein')) return true;
  return /\b(eggs?|chicken|keema|beef|fish|daal|dal|chana|rajma|yogurt|dahi|cheese|paneer|peanuts?|nuts?|milk|lentils?)\b/i.test(
    foodTitle,
  );
}

/**
 * @param {object | null} meal
 * @param {string} foodTitle
 */
export function inferIsDrink(meal, foodTitle = '') {
  if (meal?.category === 'shake') return true;
  if (meal?.tags?.includes('shake') || meal?.tags?.includes('drink')) return true;
  return DRINK_HINT.test(foodTitle) || DRINK_HINT.test(meal?.title || '');
}

function normalizeEntry(partial, existing = null) {
  const now = new Date().toISOString();
  const meal = partial.mealId ? getMealById(partial.mealId) : existing?.mealId
    ? getMealById(existing.mealId)
    : null;
  const foodTitle = String(
    partial.foodTitle ?? existing?.foodTitle ?? '',
  ).trim();
  const portion = PORTIONS.includes(partial.portion)
    ? partial.portion
    : existing?.portion || 'normal';

  return {
    id: existing?.id || partial.id || createId('flog'),
    date: partial.date || existing?.date || toDateKey(),
    slotId: partial.slotId || existing?.slotId || 'breakfast',
    mealId:
      partial.mealId !== undefined
        ? partial.mealId
        : existing?.mealId ?? null,
    foodTitle,
    portion,
    portionNote: String(
      partial.portionNote ?? existing?.portionNote ?? '',
    ).trim(),
    eaten:
      partial.eaten !== undefined
        ? Boolean(partial.eaten)
        : existing
          ? Boolean(existing.eaten)
          : true,
    time: partial.time || existing?.time || currentTimeLabel(),
    note: String(partial.note ?? existing?.note ?? '').trim(),
    hasProtein:
      partial.hasProtein !== undefined
        ? Boolean(partial.hasProtein)
        : existing?.hasProtein !== undefined
          ? Boolean(existing.hasProtein)
          : inferHasProtein(meal, foodTitle),
    isDrink:
      partial.isDrink !== undefined
        ? Boolean(partial.isDrink)
        : existing?.isDrink !== undefined
          ? Boolean(existing.isDrink)
          : inferIsDrink(meal, foodTitle),
    createdAt: existing?.createdAt || now,
    updatedAt: now,
  };
}

/**
 * @param {string} dateKey
 * @returns {Promise<object[]>}
 */
export async function getEntriesForDate(dateKey) {
  let rows = [];
  try {
    rows = await getAllByIndex(STORES.foodLog, 'date', dateKey);
  } catch {
    const all = await getAll(STORES.foodLog);
    rows = (all || []).filter((row) => row.date === dateKey);
  }

  return (rows || []).sort((a, b) => {
    const slotOrder =
      MEAL_SLOTS.findIndex((s) => s.id === a.slotId) -
      MEAL_SLOTS.findIndex((s) => s.id === b.slotId);
    if (slotOrder !== 0) return slotOrder;
    return String(a.createdAt).localeCompare(String(b.createdAt));
  });
}

/**
 * @param {object} partial
 */
export async function addEntry(partial) {
  const entry = normalizeEntry(partial);
  if (!entry.foodTitle) {
    throw new Error('Food title is required.');
  }
  await put(STORES.foodLog, entry);
  await syncSlotTaskFromLog(entry.date, entry.slotId);
  return entry;
}

/**
 * @param {string} id
 * @param {object} patch
 */
export async function updateEntry(id, patch) {
  const existing = await get(STORES.foodLog, id);
  if (!existing) throw new Error('Entry not found.');
  const next = normalizeEntry({ ...patch, id }, existing);
  if (!next.foodTitle) throw new Error('Food title is required.');
  await put(STORES.foodLog, next);
  await syncSlotTaskFromLog(next.date, next.slotId);
  if (existing.slotId !== next.slotId || existing.date !== next.date) {
    await syncSlotTaskFromLog(existing.date, existing.slotId);
  }
  return next;
}

/**
 * @param {string} id
 */
export async function deleteEntry(id) {
  const existing = await get(STORES.foodLog, id);
  if (!existing) return null;
  await remove(STORES.foodLog, id);
  await syncSlotTaskFromLog(existing.date, existing.slotId);
  return existing;
}

/**
 * @param {string} id
 */
export async function toggleEntryEaten(id) {
  const existing = await get(STORES.foodLog, id);
  if (!existing) throw new Error('Entry not found.');
  return updateEntry(id, { eaten: !existing.eaten });
}

/**
 * Log a catalog meal as ingredient lines (or title if none).
 * @param {{ dateKey: string, slotId: string, mealId: string, eaten?: boolean }} opts
 */
export async function logCatalogMeal({
  dateKey,
  slotId,
  mealId,
  eaten = true,
}) {
  const meal = getMealById(mealId);
  if (!meal) throw new Error('Meal not found.');

  const lines =
    Array.isArray(meal.ingredients) && meal.ingredients.length
      ? meal.ingredients
      : [meal.title];

  const created = [];
  for (const line of lines) {
    const entry = await addEntry({
      date: dateKey,
      slotId,
      mealId: meal.id,
      foodTitle: line,
      portion: 'normal',
      eaten,
      hasProtein: inferHasProtein(meal, line),
      isDrink: inferIsDrink(meal, line),
    });
    created.push(entry);
  }
  return created;
}

/**
 * Sync Home checklist task from eaten log items in a slot.
 * @param {string} dateKey
 * @param {string} slotId
 */
export async function syncSlotTaskFromLog(dateKey, slotId) {
  const entries = await getEntriesForDate(dateKey);
  const hasEaten = entries.some(
    (e) => e.slotId === slotId && e.eaten,
  );
  await setTaskCompleted(dateKey, slotId, hasEaten);
}

/**
 * Build daily food summary (no nutrition numbers).
 * @param {object[]} entries
 */
export function buildDaySummary(entries = []) {
  const bySlot = new Map();
  MEAL_SLOTS.forEach((slot) => {
    bySlot.set(slot.id, []);
  });
  entries.forEach((entry) => {
    if (!bySlot.has(entry.slotId)) bySlot.set(entry.slotId, []);
    bySlot.get(entry.slotId).push(entry);
  });

  let mealsCompleted = 0;
  let snacksCompleted = 0;
  let proteinMealsCompleted = 0;
  let drinksCompleted = 0;
  let slotsWithEaten = 0;

  MEAL_SLOTS.forEach((slot) => {
    const list = bySlot.get(slot.id) || [];
    const hasEaten = list.some((e) => e.eaten);
    if (hasEaten) {
      slotsWithEaten += 1;
      if (MEAL_SLOT_IDS.has(slot.id)) mealsCompleted += 1;
      if (SNACK_SLOT_IDS.has(slot.id)) snacksCompleted += 1;
      if (list.some((e) => e.eaten && e.hasProtein)) {
        proteinMealsCompleted += 1;
      }
    }
  });

  drinksCompleted = entries.filter((e) => e.eaten && e.isDrink).length;

  const consistencyScore = Math.round(
    (slotsWithEaten / MEAL_SLOTS.length) * 100,
  );

  return {
    mealsCompleted,
    mealsTotal: 3,
    snacksCompleted,
    snacksTotal: 3,
    proteinMealsCompleted,
    drinksCompleted,
    consistencyScore,
    slotsWithEaten,
    slotsTotal: MEAL_SLOTS.length,
  };
}

/**
 * Group entries by slot id in MEAL_SLOTS order.
 * @param {object[]} entries
 */
export function groupEntriesBySlot(entries = []) {
  return MEAL_SLOTS.map((slot) => ({
    slot,
    entries: entries.filter((e) => e.slotId === slot.id),
  }));
}
