/**
 * Home bodyweight strength catalog for Stronger.
 * No gym required. No cardio focus.
 */

export const EXERCISES = [
  {
    id: 'squats',
    name: 'Squats',
    instructions:
      'Stand with feet about hip-width apart. Sit your hips back and down as if toward a chair, then stand tall. Keep your chest comfortable and knees tracking over toes.',
    beginnerVariation: 'Use a chair: sit down slowly, then stand back up (sit-to-stand).',
    sets: 3,
    repsOrDuration: 8,
    restSeconds: 60,
    tracking: 'reps',
    commonMistakes: [
      'Knees caving inward',
      'Heels lifting off the floor',
      'Rushing the descent',
    ],
    easierAlternative: 'Chair squats or shallower sit-to-stand',
  },
  {
    id: 'chairSquats',
    name: 'Chair squats',
    instructions:
      'Stand in front of a sturdy chair. Lower until you lightly touch the seat, then stand. Keep the movement controlled.',
    beginnerVariation: 'Pause seated for a breath before standing.',
    sets: 3,
    repsOrDuration: 8,
    restSeconds: 60,
    tracking: 'reps',
    commonMistakes: [
      'Dropping heavily onto the chair',
      'Using momentum to bounce up',
      'Chair sliding — use a stable seat against a wall if needed',
    ],
    easierAlternative: 'Shallower sit-to-stand or hold the chair back for balance',
  },
  {
    id: 'gluteBridge',
    name: 'Glute bridges',
    instructions:
      'Lie on your back with knees bent and feet flat. Press through your heels to lift your hips, squeeze gently at the top, then lower with control.',
    beginnerVariation: 'Smaller lift — only raise hips a little.',
    sets: 3,
    repsOrDuration: 10,
    restSeconds: 45,
    tracking: 'reps',
    commonMistakes: [
      'Arching the lower back hard',
      'Pushing through the toes instead of heels',
      'Holding breath',
    ],
    easierAlternative: 'Shorter range of motion',
  },
  {
    id: 'inclinePushups',
    name: 'Incline / wall push-ups',
    instructions:
      'Place hands on a wall or sturdy counter, body in a straight line. Bend elbows to lower your chest toward the surface, then press away.',
    beginnerVariation: 'Wall push-ups with feet closer to the wall.',
    sets: 3,
    repsOrDuration: 8,
    restSeconds: 60,
    tracking: 'reps',
    commonMistakes: [
      'Hips sagging or sticking up',
      'Flaring elbows too wide',
      'Using an unstable surface',
    ],
    easierAlternative: 'Wall push-ups or fewer reps with full control',
  },
  {
    id: 'backpackRows',
    name: 'Backpack rows',
    instructions:
      'Hinge slightly at the hips with a packed backpack in both hands (or one side at a time). Pull the bag toward your waist, squeeze shoulder blades, then lower slowly.',
    beginnerVariation: 'Lighter bag; shorter range.',
    sets: 3,
    repsOrDuration: 8,
    restSeconds: 60,
    tracking: 'reps',
    commonMistakes: [
      'Rounding the upper back heavily',
      'Shrugging ears toward shoulders',
      'Swinging the bag',
    ],
    easierAlternative: 'Seated backpack pull toward the ribs with lighter load',
  },
  {
    id: 'reverseLunges',
    name: 'Reverse / supported lunges',
    instructions:
      'Stand tall, step one foot back, and lower until both knees bend comfortably. Push through the front foot to return. Hold a chair for balance if needed.',
    beginnerVariation: 'Small reverse step while holding a stable chair.',
    sets: 2,
    repsOrDuration: 6,
    restSeconds: 60,
    tracking: 'reps',
    perSide: true,
    commonMistakes: [
      'Front knee collapsing inward',
      'Leaning too far forward',
      'Rushing without balance',
    ],
    easierAlternative: 'Supported static split squat with chair',
  },
  {
    id: 'plank',
    name: 'Plank',
    instructions:
      'Hold a straight line from head to heels on forearms or hands. Breathe steadily. Stop if form breaks.',
    beginnerVariation: 'Knee plank or shorter holds.',
    sets: 2,
    repsOrDuration: 20,
    restSeconds: 45,
    tracking: 'time',
    commonMistakes: [
      'Hips too high or too low',
      'Holding breath',
      'Pushing through pain in wrists or shoulders',
    ],
    easierAlternative: 'Knee plank or wall plank',
  },
  {
    id: 'hipHinge',
    name: 'Hip hinge',
    instructions:
      'Soft knees, push hips back while keeping a long spine, then return to stand by driving hips forward. Think “closing a car door with your hips.”',
    beginnerVariation: 'Hands on thighs; smaller hinge.',
    sets: 3,
    repsOrDuration: 8,
    restSeconds: 60,
    tracking: 'reps',
    commonMistakes: [
      'Rounding the back',
      'Bending only at the knees (squat instead of hinge)',
      'Looking up sharply',
    ],
    easierAlternative: 'Supported hinge with hands on a chair',
  },
  {
    id: 'deadBug',
    name: 'Dead bug',
    instructions:
      'Lie on your back, arms up, knees bent above hips. Slowly extend opposite arm and leg while keeping your low back gently pressed toward the floor. Alternate sides.',
    beginnerVariation: 'Move only the arms, or only one leg at a time.',
    sets: 2,
    repsOrDuration: 6,
    restSeconds: 45,
    tracking: 'reps',
    perSide: true,
    commonMistakes: [
      'Arching the lower back',
      'Moving too fast',
      'Holding breath',
    ],
    easierAlternative: 'Heel taps with knees bent',
  },
];

export const WORKOUT_A = {
  id: 'A',
  name: 'Workout A',
  description: 'Full-body home strength — squats, pushes, pulls, and a steady core finish.',
  exerciseIds: [
    'squats',
    'gluteBridge',
    'inclinePushups',
    'backpackRows',
    'reverseLunges',
    'plank',
  ],
};

export const WORKOUT_B = {
  id: 'B',
  name: 'Workout B',
  description: 'Full-body home strength with a hip hinge focus and gentle core work.',
  exerciseIds: [
    'chairSquats',
    'hipHinge',
    'inclinePushups',
    'backpackRows',
    'gluteBridge',
    'deadBug',
  ],
};

export const WORKOUTS = {
  A: WORKOUT_A,
  B: WORKOUT_B,
};

export const WORKOUT_SAFETY = [
  'Stop if you feel sharp or significant pain — discomfort from effort is different from pain that warns you to stop.',
  'Move with control. Quality beats rushing.',
  'Use stable furniture (chair, counter, wall). Test it before loading.',
  'Progress gradually. Rest days are part of getting stronger.',
];

export function getExerciseById(id) {
  return EXERCISES.find((e) => e.id === id) || null;
}

export function getWorkoutById(id) {
  const key = String(id || '').toUpperCase();
  return WORKOUTS[key] || null;
}

export function getWorkoutExercises(workoutId) {
  const workout = getWorkoutById(workoutId);
  if (!workout) return [];
  return workout.exerciseIds
    .map((id) => getExerciseById(id))
    .filter(Boolean);
}

/**
 * ISO week number (1–53).
 * @param {Date} date
 */
export function getIsoWeekNumber(date = new Date()) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}

/**
 * Strength days: Mon(1), Wed(3), Fri(5). JS getDay: Sun=0…Sat=6.
 * @param {Date} date
 */
export function isStrengthDay(date = new Date()) {
  const day = date.getDay();
  return day === 1 || day === 3 || day === 5;
}

/**
 * Map weekday to index within Mon/Wed/Fri sequence (0,1,2).
 * @param {Date} date
 * @returns {number | null}
 */
export function getStrengthDayIndex(date = new Date()) {
  const day = date.getDay();
  if (day === 1) return 0;
  if (day === 3) return 1;
  if (day === 5) return 2;
  return null;
}

/**
 * Even ISO week: A, B, A on Mon/Wed/Fri. Odd week: B, A, B.
 * @param {Date} [date]
 * @returns {{ type: 'A'|'B'|'rest', workout: object|null, label: string }}
 */
export function getScheduledWorkoutForDate(date = new Date()) {
  if (!isStrengthDay(date)) {
    return {
      type: 'rest',
      workout: null,
      label: 'Rest & recovery',
    };
  }

  const index = getStrengthDayIndex(date);
  const evenWeek = getIsoWeekNumber(date) % 2 === 0;
  const pattern = evenWeek ? ['A', 'B', 'A'] : ['B', 'A', 'B'];
  const type = pattern[index];
  const workout = getWorkoutById(type);

  return {
    type,
    workout,
    label: workout.name,
  };
}

/**
 * Format sets × reps/time for display.
 * @param {object} exercise
 */
export function formatExerciseTarget(exercise) {
  if (!exercise) return '';
  const sets = exercise.sets;
  if (exercise.tracking === 'time') {
    return `${sets} × ${exercise.repsOrDuration}s`;
  }
  const side = exercise.perSide ? '/side' : '';
  return `${sets} × ${exercise.repsOrDuration}${side}`;
}
