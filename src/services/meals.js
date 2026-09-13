import { get, put, STORES } from './database/index.js';
import {
  getMealById,
  getSlotMeta,
  MEAL_SLOTS,
  pickSuggestedMeal,
} from '../data/meals.js';
import { setTaskCompleted } from './dailyLog.js';
import { toDateKey } from '../utils/dates.js';

export function slotRecordId(dateKey, slotId) {
  return `${dateKey}_${slotId}`;
}

function emptySlot(dateKey, slotId, mealId) {
  return {
    id: slotRecordId(dateKey, slotId),
    date: dateKey,
    slotId,
    mealId,
    eaten: false,
    note: '',
    updatedAt: new Date().toISOString(),
  };
}

/**
 * @param {string} dateKey
 * @param {string} slotId
 */
export async function getSlotRecord(dateKey, slotId) {
  return (await get(STORES.meals, slotRecordId(dateKey, slotId))) || null;
}

/**
 * Ensure today's meal slots exist with suggested meals.
 * @param {string} [dateKey]
 */
export async function ensureTodaySlots(dateKey = toDateKey()) {
  const slots = [];

  for (const meta of MEAL_SLOTS) {
    let record = await getSlotRecord(dateKey, meta.id);
    if (!record) {
      const suggested = pickSuggestedMeal(dateKey, meta.id, meta.category);
      record = emptySlot(dateKey, meta.id, suggested?.id || null);
      await put(STORES.meals, record);
    } else if (!record.mealId) {
      const suggested = pickSuggestedMeal(dateKey, meta.id, meta.category);
      record = {
        ...record,
        mealId: suggested?.id || null,
        updatedAt: new Date().toISOString(),
      };
      await put(STORES.meals, record);
    }
    slots.push(enrichSlot(record));
  }

  return slots;
}

function enrichSlot(record) {
  const meta = getSlotMeta(record.slotId);
  const meal = record.mealId ? getMealById(record.mealId) : null;
  return {
    ...record,
    label: meta?.label || record.slotId,
    category: meta?.category || meal?.category || null,
    meal,
  };
}

/**
 * @param {string} [dateKey]
 */
export async function getTodayMealSlots(dateKey = toDateKey()) {
  return ensureTodaySlots(dateKey);
}

/**
 * @param {string} dateKey
 * @param {string} slotId
 * @param {string} mealId
 */
export async function setSlotMeal(dateKey, slotId, mealId) {
  const existing =
    (await getSlotRecord(dateKey, slotId)) ||
    emptySlot(dateKey, slotId, mealId);
  const next = {
    ...existing,
    id: slotRecordId(dateKey, slotId),
    date: dateKey,
    slotId,
    mealId,
    updatedAt: new Date().toISOString(),
  };
  await put(STORES.meals, next);
  return enrichSlot(next);
}

/**
 * @param {string} dateKey
 * @param {string} slotId
 * @param {boolean} eaten
 */
export async function setSlotEaten(dateKey, slotId, eaten) {
  const existing =
    (await getSlotRecord(dateKey, slotId)) ||
    emptySlot(
      dateKey,
      slotId,
      pickSuggestedMeal(dateKey, slotId, getSlotMeta(slotId)?.category)?.id,
    );
  const next = {
    ...existing,
    id: slotRecordId(dateKey, slotId),
    date: dateKey,
    slotId,
    eaten: Boolean(eaten),
    updatedAt: new Date().toISOString(),
  };
  await put(STORES.meals, next);
  await setTaskCompleted(dateKey, slotId, Boolean(eaten));
  return enrichSlot(next);
}

/**
 * @param {string} dateKey
 * @param {string} slotId
 * @param {string} note
 */
export async function setSlotNote(dateKey, slotId, note) {
  const existing =
    (await getSlotRecord(dateKey, slotId)) ||
    emptySlot(
      dateKey,
      slotId,
      pickSuggestedMeal(dateKey, slotId, getSlotMeta(slotId)?.category)?.id,
    );
  const next = {
    ...existing,
    id: slotRecordId(dateKey, slotId),
    date: dateKey,
    slotId,
    note: String(note ?? '').trim(),
    updatedAt: new Date().toISOString(),
  };
  await put(STORES.meals, next);
  return enrichSlot(next);
}

/**
 * Find today's slot that currently uses this meal (if any).
 * @param {string} mealId
 * @param {string} [dateKey]
 */
export async function findSlotByMealId(mealId, dateKey = toDateKey()) {
  const slots = await ensureTodaySlots(dateKey);
  return slots.find((s) => s.mealId === mealId) || null;
}
