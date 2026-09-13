/**
 * Stronger educational guide — category catalog.
 * Calm companion for healthy weight gain; not medical advice.
 */

/** @type {Array<{ id: string, title: string, summary: string, order: number, icon: string }>} */
export const GUIDE_CATEGORIES = [
  {
    id: 'start-here',
    title: 'Start here',
    summary: 'Getting started, healthy weight gain, and a gentle daily rhythm.',
    order: 1,
    icon: 'Compass',
  },
  {
    id: 'food',
    title: 'Food',
    summary: 'Meals, shakes, Pakistani home ideas, and simple food boosters.',
    order: 2,
    icon: 'UtensilsCrossed',
  },
  {
    id: 'training',
    title: 'Training & recovery',
    summary: 'Gentle strength at home and how rest supports progress.',
    order: 3,
    icon: 'Dumbbell',
  },
  {
    id: 'sleep-hydration',
    title: 'Sleep & hydration',
    summary: 'Steady sleep and everyday hydration habits.',
    order: 4,
    icon: 'Moon',
  },
  {
    id: 'when-hard',
    title: 'When things feel hard',
    summary: 'Low appetite, missed meals, energy dips, and common snags.',
    order: 5,
    icon: 'HeartHandshake',
  },
  {
    id: 'progress-faq',
    title: 'Progress & questions',
    summary: 'Weekly check-ins and practical answers to frequent questions.',
    order: 6,
    icon: 'MessageCircle',
  },
  {
    id: 'safety',
    title: 'Safety',
    summary: 'When to seek medical help — Stronger is not a diagnosis.',
    order: 7,
    icon: 'ShieldAlert',
  },
];
