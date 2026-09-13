/**
 * Static meal catalog for Stronger Food.
 * User progress lives in IndexedDB — not here.
 * No calorie numbers.
 */

export const MEAL_CATEGORIES = [
  'breakfast',
  'lunch',
  'dinner',
  'snack',
  'shake',
];

export const MEAL_SLOTS = [
  { id: 'breakfast', label: 'Breakfast', category: 'breakfast' },
  { id: 'morningSnack', label: 'Morning snack', category: 'snack' },
  { id: 'lunch', label: 'Lunch', category: 'lunch' },
  { id: 'afternoonSnack', label: 'Afternoon snack', category: 'snack' },
  { id: 'dinner', label: 'Dinner', category: 'dinner' },
  { id: 'bedtimeSnack', label: 'Bedtime snack', category: 'snack' },
];

/** @type {Array<object>} */
export const MEALS = [
  // Breakfast
  {
    id: 'bf_eggs_paratha',
    category: 'breakfast',
    title: 'Eggs with paratha',
    description: 'A familiar, filling start with protein and soft carbs.',
    ingredients: ['2 eggs', '1 paratha or roti', 'A little oil or butter', 'Salt and mild spices'],
    preparation: 'Cook eggs scrambled or fried. Warm a paratha or roti. Eat together while warm.',
    proteinSource: 'Eggs',
    easyWhenAppetiteLow: false,
    pakistani: true,
    tags: ['protein', 'home', 'warm'],
  },
  {
    id: 'bf_omelette_bread',
    category: 'breakfast',
    title: 'Omelette and bread',
    description: 'Simple omelette with bread — easy to portion.',
    ingredients: ['2 eggs', '1–2 slices bread or toast', 'Onion or tomato (optional)', 'Oil'],
    preparation: 'Whisk eggs, cook a soft omelette. Serve with bread. Add a spoon of butter if it feels good.',
    proteinSource: 'Eggs',
    easyWhenAppetiteLow: true,
    pakistani: true,
    tags: ['protein', 'easy', 'soft'],
  },
  {
    id: 'bf_oats_banana',
    category: 'breakfast',
    title: 'Oats with milk, banana and dates',
    description: 'Creamy oats with natural sweetness from fruit.',
    ingredients: ['Oats', 'Milk', 'Banana', '2–3 dates', 'Honey (optional)'],
    preparation: 'Cook oats in milk until soft. Slice banana and chopped dates on top.',
    proteinSource: 'Milk',
    easyWhenAppetiteLow: true,
    pakistani: false,
    tags: ['soft', 'sweet', 'easy'],
  },
  {
    id: 'bf_yogurt_fruit',
    category: 'breakfast',
    title: 'Yogurt with fruit and nuts',
    description: 'Cool, gentle, and ready in minutes.',
    ingredients: ['Yogurt (dahi)', 'Seasonal fruit', 'A handful of nuts', 'Honey (optional)'],
    preparation: 'Spoon yogurt into a bowl. Add chopped fruit and nuts.',
    proteinSource: 'Yogurt',
    easyWhenAppetiteLow: true,
    pakistani: true,
    tags: ['cool', 'easy', 'protein'],
  },
  {
    id: 'bf_halwa_milk',
    category: 'breakfast',
    title: 'Suji / sooji with milk',
    description: 'Soft homemade sooji — comforting when chewing feels hard.',
    ingredients: ['Sooji (semolina)', 'Milk', 'A little ghee or butter', 'Sugar or dates'],
    preparation: 'Cook sooji gently with milk until soft. Sweeten lightly. Serve warm.',
    proteinSource: 'Milk',
    easyWhenAppetiteLow: true,
    pakistani: true,
    tags: ['soft', 'warm', 'comfort'],
  },

  // Lunch
  {
    id: 'ln_chicken_rice',
    category: 'lunch',
    title: 'Chicken with rice',
    description: 'A steady plate: protein plus easy carbs.',
    ingredients: ['Chicken pieces', 'Rice', 'Onion, garlic, mild spices', 'Oil'],
    preparation: 'Cook chicken curry or stew until tender. Serve with plain rice. Start with a small plate.',
    proteinSource: 'Chicken',
    easyWhenAppetiteLow: false,
    pakistani: true,
    tags: ['protein', 'home', 'rice'],
  },
  {
    id: 'ln_daal_rice',
    category: 'lunch',
    title: 'Daal and rice',
    description: 'Soft, familiar, and kind on low-appetite days.',
    ingredients: ['Daal (masoor, moong, or mix)', 'Rice', 'Cumin, garlic', 'A spoon of ghee (optional)'],
    preparation: 'Cook daal until smooth and soft. Serve over rice. Add a little ghee if you like.',
    proteinSource: 'Lentils',
    easyWhenAppetiteLow: true,
    pakistani: true,
    tags: ['soft', 'easy', 'home'],
  },
  {
    id: 'ln_keema_roti',
    category: 'lunch',
    title: 'Keema with roti',
    description: 'Minced meat with roti — protein-forward and practical.',
    ingredients: ['Keema (beef or chicken)', 'Roti or paratha', 'Onion, spices', 'Oil'],
    preparation: 'Cook keema until done. Warm roti. Eat slowly; leftover keema keeps well.',
    proteinSource: 'Keema',
    easyWhenAppetiteLow: false,
    pakistani: true,
    tags: ['protein', 'roti'],
  },
  {
    id: 'ln_chicken_curry_roti',
    category: 'lunch',
    title: 'Chicken curry with roti',
    description: 'Home-style chicken curry you can share with family.',
    ingredients: ['Chicken', 'Onion tomato gravy', 'Roti', 'Mild spices'],
    preparation: 'Simmer chicken until tender. Soft roti helps when appetite is modest.',
    proteinSource: 'Chicken',
    easyWhenAppetiteLow: false,
    pakistani: true,
    tags: ['protein', 'home'],
  },
  {
    id: 'ln_chana_rice',
    category: 'lunch',
    title: 'Chana with rice or roti',
    description: 'Chickpeas for plant protein and steady energy.',
    ingredients: ['Chickpeas (chana)', 'Onion, tomato, spices', 'Rice or roti'],
    preparation: 'Cook chana curry until soft. Pair with rice or roti.',
    proteinSource: 'Chickpeas',
    easyWhenAppetiteLow: true,
    pakistani: true,
    tags: ['plant-protein', 'home'],
  },

  // Dinner
  {
    id: 'dn_chicken_simple',
    category: 'dinner',
    title: 'Simple chicken plate',
    description: 'Tender chicken with rice or roti — keep seasoning gentle.',
    ingredients: ['Chicken', 'Rice or roti', 'Light spices', 'Salad or yogurt (optional)'],
    preparation: 'Cook chicken until soft. Serve with a modest portion of rice or roti.',
    proteinSource: 'Chicken',
    easyWhenAppetiteLow: false,
    pakistani: true,
    tags: ['protein', 'dinner'],
  },
  {
    id: 'dn_beef_keema',
    category: 'dinner',
    title: 'Beef or chicken keema',
    description: 'Keema again at dinner if it sits well — consistency helps.',
    ingredients: ['Keema', 'Roti', 'Peas or potato (optional)'],
    preparation: 'Warm leftover keema or cook fresh. Soft roti on the side.',
    proteinSource: 'Keema',
    easyWhenAppetiteLow: false,
    pakistani: true,
    tags: ['protein', 'roti'],
  },
  {
    id: 'dn_daal_roti',
    category: 'dinner',
    title: 'Daal with roti',
    description: 'Light but nourishing — ideal when a heavy dinner feels like too much.',
    ingredients: ['Daal', 'Roti', 'A little ghee or butter'],
    preparation: 'Serve soft daal with one roti. Add ghee for extra comfort and energy.',
    proteinSource: 'Lentils',
    easyWhenAppetiteLow: true,
    pakistani: true,
    tags: ['soft', 'easy', 'home'],
  },
  {
    id: 'dn_rajma',
    category: 'dinner',
    title: 'Rajma with rice',
    description: 'Kidney beans in a mild gravy with rice.',
    ingredients: ['Rajma', 'Onion tomato gravy', 'Rice'],
    preparation: 'Cook rajma until very soft. Serve with rice. Smaller bowl is fine.',
    proteinSource: 'Rajma',
    easyWhenAppetiteLow: true,
    pakistani: true,
    tags: ['plant-protein', 'rice'],
  },
  {
    id: 'dn_aloo_protein',
    category: 'dinner',
    title: 'Potatoes with eggs or yogurt',
    description: 'Soft potatoes plus a protein side when chewing meat feels hard.',
    ingredients: ['Boiled or lightly cooked potatoes', 'Eggs or thick yogurt', 'Mild seasoning'],
    preparation: 'Serve soft potatoes with scrambled eggs or a bowl of yogurt.',
    proteinSource: 'Eggs or yogurt',
    easyWhenAppetiteLow: true,
    pakistani: true,
    tags: ['soft', 'easy', 'comfort'],
  },

  // Snacks
  {
    id: 'sn_banana',
    category: 'snack',
    title: 'Banana',
    description: 'Ready to eat — no prep when energy is low.',
    ingredients: ['1 banana'],
    preparation: 'Peel and eat. Pair with a few nuts if you can.',
    proteinSource: 'Pair with nuts or milk if possible',
    easyWhenAppetiteLow: true,
    pakistani: false,
    tags: ['easy', 'fruit', 'portable'],
  },
  {
    id: 'sn_dates',
    category: 'snack',
    title: 'Dates',
    description: 'Naturally sweet, small, and familiar.',
    ingredients: ['2–4 dates'],
    preparation: 'Eat as they are, or with a glass of milk.',
    proteinSource: 'Best with milk',
    easyWhenAppetiteLow: true,
    pakistani: true,
    tags: ['easy', 'sweet', 'small'],
  },
  {
    id: 'sn_nuts',
    category: 'snack',
    title: 'Mixed nuts',
    description: 'A small handful goes a long way.',
    ingredients: ['Almonds, walnuts, or mixed nuts'],
    preparation: 'Keep a small portion ready. Chew slowly.',
    proteinSource: 'Nuts',
    easyWhenAppetiteLow: false,
    pakistani: false,
    tags: ['protein', 'portable'],
  },
  {
    id: 'sn_peanuts',
    category: 'snack',
    title: 'Roasted peanuts',
    description: 'Easy local snack with staying power.',
    ingredients: ['Roasted peanuts', 'A pinch of salt (optional)'],
    preparation: 'A small handful between meals.',
    proteinSource: 'Peanuts',
    easyWhenAppetiteLow: false,
    pakistani: true,
    tags: ['protein', 'local'],
  },
  {
    id: 'sn_pb_toast',
    category: 'snack',
    title: 'Peanut butter toast',
    description: 'Toast with peanut butter — quick energy-dense bite.',
    ingredients: ['Bread or toast', 'Peanut butter'],
    preparation: 'Spread peanut butter on warm toast. Add banana slices if you like.',
    proteinSource: 'Peanut butter',
    easyWhenAppetiteLow: true,
    pakistani: false,
    tags: ['easy', 'quick'],
  },
  {
    id: 'sn_yogurt',
    category: 'snack',
    title: 'Yogurt cup',
    description: 'Cool dahi — gentle and protein-friendly.',
    ingredients: ['Yogurt', 'Honey or fruit (optional)'],
    preparation: 'Eat plain or lightly sweetened.',
    proteinSource: 'Yogurt',
    easyWhenAppetiteLow: true,
    pakistani: true,
    tags: ['cool', 'easy', 'protein'],
  },
  {
    id: 'sn_cheese',
    category: 'snack',
    title: 'Cheese with bread',
    description: 'A few bites of cheese with soft bread.',
    ingredients: ['Cheese slice or cubes', 'Bread'],
    preparation: 'Eat slowly. Stop when comfortably full.',
    proteinSource: 'Cheese',
    easyWhenAppetiteLow: true,
    pakistani: false,
    tags: ['protein', 'easy'],
  },
  {
    id: 'sn_milk',
    category: 'snack',
    title: 'Warm milk',
    description: 'A glass of milk between meals or before bed.',
    ingredients: ['Milk', 'Honey or dates (optional)'],
    preparation: 'Warm gently. Sip slowly.',
    proteinSource: 'Milk',
    easyWhenAppetiteLow: true,
    pakistani: true,
    tags: ['soft', 'drink', 'easy'],
  },

  // Shakes
  {
    id: 'sh_banana_milk',
    category: 'shake',
    title: 'Banana milk shake',
    description: 'Homemade shake when chewing feels like too much.',
    ingredients: ['Milk', 'Banana', 'Honey or dates (optional)'],
    preparation: 'Blend until smooth. Drink slowly between meals — not instead of all food.',
    proteinSource: 'Milk',
    easyWhenAppetiteLow: true,
    pakistani: true,
    tags: ['shake', 'easy', 'soft'],
  },
  {
    id: 'sh_yogurt_mango',
    category: 'shake',
    title: 'Yogurt fruit lassi',
    description: 'Lassi-style drink with fruit when in season.',
    ingredients: ['Yogurt', 'Milk or water', 'Mango or banana', 'Honey (optional)'],
    preparation: 'Blend yogurt with fruit until drinkable. Keep it smooth, not icy-cold if that reduces appetite.',
    proteinSource: 'Yogurt',
    easyWhenAppetiteLow: true,
    pakistani: true,
    tags: ['shake', 'cool', 'easy'],
  },
  {
    id: 'sh_dates_milk',
    category: 'shake',
    title: 'Dates and milk blend',
    description: 'Naturally sweet nourishment in a glass.',
    ingredients: ['Milk', '3–4 soft dates', 'Pinch of cardamom (optional)'],
    preparation: 'Soak dates if hard, then blend with milk. Sip between meals.',
    proteinSource: 'Milk',
    easyWhenAppetiteLow: true,
    pakistani: true,
    tags: ['shake', 'sweet', 'easy'],
  },
  {
    id: 'sh_oats_banana',
    category: 'shake',
    title: 'Oats banana shake',
    description: 'A thicker shake that still goes down easily.',
    ingredients: ['Milk', 'Banana', '2 tablespoons oats', 'Honey (optional)'],
    preparation: 'Blend until smooth. If too thick, add a splash more milk.',
    proteinSource: 'Milk',
    easyWhenAppetiteLow: true,
    pakistani: false,
    tags: ['shake', 'filling', 'easy'],
  },
  {
    id: 'sh_peanut_banana',
    category: 'shake',
    title: 'Peanut butter banana shake',
    description: 'Extra nourishing when you need something small but dense.',
    ingredients: ['Milk', 'Banana', '1 spoon peanut butter'],
    preparation: 'Blend until smooth. Share with a meal later rather than forcing a huge volume.',
    proteinSource: 'Peanut butter and milk',
    easyWhenAppetiteLow: true,
    pakistani: false,
    tags: ['shake', 'dense', 'easy'],
  },
];

export function getMealById(id) {
  return MEALS.find((m) => m.id === id) || null;
}

export function getMealsByCategory(category) {
  return MEALS.filter((m) => m.category === category);
}

/**
 * @param {{ category?: string, easy?: boolean, pakistani?: boolean }} filters
 */
export function filterMeals(filters = {}) {
  return MEALS.filter((meal) => {
    if (filters.category && meal.category !== filters.category) return false;
    if (filters.easy && !meal.easyWhenAppetiteLow) return false;
    if (filters.pakistani && !meal.pakistani) return false;
    return true;
  });
}

/**
 * Deterministic suggestion from date + slot.
 * @param {string} dateKey
 * @param {string} slotId
 * @param {string} category
 */
export function pickSuggestedMeal(dateKey, slotId, category) {
  const pool = getMealsByCategory(category);
  if (!pool.length) return null;
  const seed = `${dateKey}:${slotId}`;
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return pool[hash % pool.length];
}

export function getSlotMeta(slotId) {
  return MEAL_SLOTS.find((s) => s.id === slotId) || null;
}

export function getSubstitutesForMeal(mealId) {
  const meal = getMealById(mealId);
  if (!meal) return [];
  return getMealsByCategory(meal.category).filter((m) => m.id !== mealId);
}
