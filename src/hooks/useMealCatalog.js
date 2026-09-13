import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { filterMeals, MEAL_CATEGORIES } from '../data/meals.js';

const CATEGORY_SET = new Set(MEAL_CATEGORIES);

/**
 * Meal catalog filters driven by URL search params.
 */
export function useMealCatalog() {
  const [params, setParams] = useSearchParams();

  const category = params.get('category') || '';
  const easy = params.get('easy') === '1';
  const pakistani = params.get('pakistani') === '1';

  const filters = useMemo(
    () => ({
      category: CATEGORY_SET.has(category) ? category : undefined,
      easy: easy || undefined,
      pakistani: pakistani || undefined,
    }),
    [category, easy, pakistani],
  );

  const meals = useMemo(() => filterMeals(filters), [filters]);

  const setCategory = (next) => {
    const nextParams = new URLSearchParams(params);
    if (!next) nextParams.delete('category');
    else nextParams.set('category', next);
    setParams(nextParams, { replace: true });
  };

  const setEasy = (on) => {
    const nextParams = new URLSearchParams(params);
    if (on) nextParams.set('easy', '1');
    else nextParams.delete('easy');
    setParams(nextParams, { replace: true });
  };

  const setPakistani = (on) => {
    const nextParams = new URLSearchParams(params);
    if (on) nextParams.set('pakistani', '1');
    else nextParams.delete('pakistani');
    setParams(nextParams, { replace: true });
  };

  return {
    meals,
    category: filters.category || '',
    easy: Boolean(easy),
    pakistani: Boolean(pakistani),
    setCategory,
    setEasy,
    setPakistani,
  };
}
