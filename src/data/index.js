/**
 * Static content and seed data will live here in later phases.
 * Keep user progress out of this folder — use IndexedDB instead.
 */

export const APP_NAME = 'Stronger';

export const APP_TAGLINE = 'Eat, Train, Recover, Grow.';

export { DAILY_TIPS, getTipForDay } from './tips.js';
export { DAILY_TASK_DEFS, buildTodaysTasks, DAILY_TASK_COUNT } from './dailyTasks.js';
export {
  MEALS,
  MEAL_CATEGORIES,
  MEAL_SLOTS,
  getMealById,
  filterMeals,
  pickSuggestedMeal,
} from './meals.js';
export {
  EXERCISES,
  WORKOUT_A,
  WORKOUT_B,
  getScheduledWorkoutForDate,
  getExerciseById,
  getWorkoutById,
} from './workouts.js';
export {
  GUIDE_CATEGORIES,
  GUIDE_ARTICLES,
  getGuideCategory,
  getGuideArticle,
  listArticlesByCategory,
  searchGuide,
} from './guide/index.js';
export {
  SOLVER_PROBLEMS,
  getSolverProblem,
  listSolverProblems,
} from './problemSolver.js';
export { SLEEP_GUIDANCE, SLEEP_SAFETY_NOTE } from './sleepGuidance.js';
export { NEXT_WEEK_FOCUS_OPTIONS } from './weeklyReview.js';
