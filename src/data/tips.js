/**
 * Static daily tips — rotate by day; never store as user progress.
 */

export const DAILY_TIPS = [
  'A few bites still count. Consistency matters more than a perfect plate.',
  'Pair a snack you like with something nourishing — make it easy to say yes.',
  'Drink water with meals, but leave room for food if appetite is low.',
  'A short walk after eating can help you feel settled, not stuffed.',
  'Rest is training too. Protect your bedtime when you can.',
  'If a meal feels hard, start with one familiar home food you trust.',
  'Progress is quiet: showing up for today is enough.',
  'Warm foods — dal, khichdi, porridge — are gentle when appetite dips.',
  'Stretch your shoulders and breathe slowly before your workout.',
  'Log how you feel, not just the number on the scale.',
  'Invite someone to share a meal — company can make eating easier.',
  'Keep a ready snack nearby so hunger doesn’t catch you empty-handed.',
];

/**
 * @param {number} dayOfYear
 * @returns {{ id: string, text: string }}
 */
export function getTipForDay(dayOfYear) {
  const index = ((dayOfYear % DAILY_TIPS.length) + DAILY_TIPS.length) % DAILY_TIPS.length;
  return {
    id: `tip_${index}`,
    text: DAILY_TIPS[index],
  };
}
