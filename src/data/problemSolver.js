/**
 * Problem Solver catalog for Stronger.
 * Practical, non-diagnostic guidance. Not medical advice.
 */

/** Shared safety line used when appetite/fullness patterns persist. */
export const SOLVER_SAFETY_FOOTER =
  'If this happens persistently or you regularly feel full after very small amounts, discuss it with a healthcare professional.';

export const SOLVER_GENERAL_SAFETY =
  'Stronger offers practical ideas, not a diagnosis. Persistent poor appetite, early fullness, ongoing abdominal symptoms, unexplained weight loss, severe weakness, dizziness or fainting, or other concerning symptoms should be discussed with an appropriate healthcare professional.';

/**
 * @typedef {{ id: string, title: string, defaultOpen?: boolean, intro?: string, steps?: string[], bullets?: string[], callout?: { tone: string, title?: string, text: string } }} SolverSection
 * @typedef {{ id: string, title: string, summary: string, order: number, keywords: string[], tryThisToday: string[], sections: SolverSection[], relatedGuideIds?: string[] }} SolverProblem
 */

/** @type {SolverProblem[]} */
export const SOLVER_PROBLEMS = [
  {
    id: 'not-hungry',
    title: "I don't feel hungry",
    summary: 'Quiet appetite is common — you can still nourish gently without waiting for a big hunger signal.',
    order: 1,
    keywords: ['hungry', 'appetite', 'stomach', 'eat'],
    tryThisToday: [
      "Don't wait for strong hunger.",
      'Eat smaller portions.',
      'Add an extra snack.',
      'Try a nourishing shake between meals.',
      'Choose easier-to-eat foods.',
      'Avoid filling up on water or tea immediately before meals.',
    ],
    sections: [
      {
        id: 'right-now',
        title: 'What to do right now',
        defaultOpen: true,
        intro: 'Pick one small option you can manage in the next hour.',
        steps: [
          'Have a few bites of something soft: yogurt, banana, khichdi, or toast.',
          'Or sip a homemade milk or yogurt shake slowly.',
          'Sit with the food for a short while — even partial intake counts.',
        ],
      },
      {
        id: 'next',
        title: 'What to try next meal / day',
        defaultOpen: false,
        steps: [
          'Keep mealtimes predictable even when hunger is quiet.',
          'Plan two snacks and one shake as bridges between meals.',
          'Use familiar home foods: eggs, daal, roti with a little ghee, dates with milk.',
          'Add gentle density when solids go down: peanut butter, cheese, milk in oats.',
        ],
      },
      {
        id: 'dont-worry',
        title: 'What not to worry about',
        defaultOpen: false,
        bullets: [
          'Missing a “big hunger” feeling for a day does not mean you failed.',
          'Small portions still move you forward.',
          'You do not need to force a huge plate.',
        ],
      },
      {
        id: 'medical',
        title: 'When it may need professional advice',
        defaultOpen: false,
        intro:
          'Appetite can fluctuate for many everyday reasons. Stronger does not assume a medical cause.',
        bullets: [
          'Appetite stays very low for a prolonged period',
          'You regularly feel full after very small amounts',
          'There is unexplained weight loss, severe weakness, or dizziness/fainting',
          'Abdominal symptoms keep interfering with eating',
        ],
        callout: {
          tone: 'caution',
          title: 'Talk with a professional',
          text: SOLVER_SAFETY_FOOTER,
        },
      },
    ],
    relatedGuideIds: ['low-appetite', 'shakes', 'easy-meals'],
  },
  {
    id: 'full-quickly',
    title: 'I feel full quickly',
    summary: 'Early fullness is frustrating — smaller, softer, more frequent options often help more than bigger plates.',
    order: 2,
    keywords: ['full', 'fullness', 'stomach', 'early satiety'],
    tryThisToday: [
      'Stop at comfortable fullness — save the rest for later.',
      'Switch to a softer or smaller plate.',
      'Come back in 1–2 hours for a snack or shake.',
      'Skip large drinks right before eating.',
    ],
    sections: [
      {
        id: 'right-now',
        title: 'What to do right now',
        defaultOpen: true,
        steps: [
          'Pause without guilt when you feel full.',
          'Keep the leftover nearby for a later snack.',
          'Try a few more bites only if they still feel okay — never force.',
        ],
      },
      {
        id: 'next',
        title: 'What to try next meal / day',
        defaultOpen: false,
        steps: [
          'Choose softer foods: daal, yogurt, oats, mashed potato, banana shake.',
          'Eat a little more often instead of aiming for one large meal.',
          'Add energy-friendly toppings in small amounts (milk, peanut butter, cheese).',
          'Eat slowly and stop at “enough for now.”',
        ],
      },
      {
        id: 'dont-worry',
        title: 'What not to worry about',
        defaultOpen: false,
        bullets: [
          'Leaving food on the plate is allowed.',
          'Finishing later still counts as consistency.',
          'One early-fullness meal does not define your week.',
        ],
      },
      {
        id: 'medical',
        title: 'When it may need professional advice',
        defaultOpen: false,
        bullets: [
          'Early fullness happens most days and keeps limiting intake',
          'Persistent abdominal discomfort accompanies meals',
          'Unexplained weight loss or severe weakness appears',
        ],
        callout: {
          tone: 'caution',
          title: 'Talk with a professional',
          text: SOLVER_SAFETY_FOOTER,
        },
      },
    ],
    relatedGuideIds: ['low-appetite', 'food-boosters', 'seek-medical-help'],
  },
  {
    id: 'couldnt-finish',
    title: "I couldn't finish my meal",
    summary: 'Partial meals still count. Protect the next snack rather than rewriting the whole day.',
    order: 3,
    keywords: ['finish', 'leftover', 'partial', 'meal'],
    tryThisToday: [
      'Save what you could not finish.',
      'Have a small snack or shake later.',
      'Keep the next mealtime as planned.',
      'Choose something easier if the plate felt heavy.',
    ],
    sections: [
      {
        id: 'right-now',
        title: 'What to do right now',
        defaultOpen: true,
        steps: [
          'Store leftovers for later — they are part of today’s plan.',
          'Drink a little milk or have yogurt if solids felt like too much.',
          'Note what felt hard (volume, spice, texture) for next time.',
        ],
      },
      {
        id: 'next',
        title: 'What to try next meal / day',
        defaultOpen: false,
        steps: [
          'Start with a smaller serving and add more only if it feels okay.',
          'Pair a soft item with a familiar staple (daal + a little rice).',
          'Schedule a mid-afternoon snack so one unfinished meal is less of a gap.',
        ],
      },
      {
        id: 'dont-worry',
        title: 'What not to worry about',
        defaultOpen: false,
        bullets: [
          'You are not “behind” for stopping when full.',
          'Consistency is about returning to the next eating time, not perfect plates.',
        ],
      },
      {
        id: 'medical',
        title: 'When it may need professional advice',
        defaultOpen: false,
        bullets: [
          'You almost never finish even small meals',
          'Pain, vomiting, or ongoing stomach symptoms accompany eating',
          'Weight keeps dropping without explanation',
        ],
        callout: {
          tone: 'caution',
          text: SOLVER_GENERAL_SAFETY,
        },
      },
    ],
    relatedGuideIds: ['missed-meals', 'easy-meals'],
  },
  {
    id: 'missed-meal',
    title: 'I missed a meal',
    summary: 'Missed meals happen. Bridge the gap kindly and return to your rhythm at the next chance.',
    order: 4,
    keywords: ['missed', 'skipped', 'forgot', 'meal'],
    tryThisToday: [
      'Eat something small as soon as you can.',
      'Do not “make up” with an oversized forced meal.',
      'Keep the next planned snack or meal.',
      'Use ready options: banana, yogurt, dates, peanut butter toast, leftover daal.',
    ],
    sections: [
      {
        id: 'right-now',
        title: 'What to do right now',
        defaultOpen: true,
        steps: [
          'Have a bridge snack within the next hour if possible.',
          'A shake or milk with dates works when cooking feels like too much.',
          'Drink water through the day, but avoid chugging a large amount right before you eat.',
        ],
      },
      {
        id: 'next',
        title: 'What to try next meal / day',
        defaultOpen: false,
        steps: [
          'Put simple backups where you can see them (yogurt, fruit, nuts).',
          'Decide tomorrow’s breakfast the night before.',
          'If mornings are rushed, keep a shake recipe you can make in 5 minutes.',
        ],
      },
      {
        id: 'dont-worry',
        title: 'What not to worry about',
        defaultOpen: false,
        bullets: [
          'One missed meal does not erase your progress.',
          'You do not need to punish yourself with extra training or skipping later meals.',
        ],
      },
      {
        id: 'medical',
        title: 'When it may need professional advice',
        defaultOpen: false,
        bullets: [
          'Meals are missed most days because of nausea, pain, or extreme fullness',
          'Dizziness or fainting follows skipped eating',
        ],
        callout: {
          tone: 'caution',
          text: SOLVER_GENERAL_SAFETY,
        },
      },
    ],
    relatedGuideIds: ['missed-meals', 'snacks', 'shakes'],
  },
  {
    id: 'too-tired-exercise',
    title: 'I feel too tired to exercise',
    summary: 'Rest can be the right choice. Gentle movement is optional — recovery still supports your goals.',
    order: 5,
    keywords: ['tired', 'fatigue', 'exercise', 'workout', 'energy'],
    tryThisToday: [
      'Skip or shorten the session without guilt.',
      'Prioritize a meal or snack and some water.',
      'Take a short easy walk only if it feels restorative.',
      'Protect sleep tonight.',
    ],
    sections: [
      {
        id: 'right-now',
        title: 'What to do right now',
        defaultOpen: true,
        steps: [
          'Choose rest if you feel drained, dizzy, or unwell.',
          'Eat something with carbs and protein when you can (eggs and bread, yogurt and banana).',
          'Lie down or sit quietly for a few minutes if you feel lightheaded.',
        ],
      },
      {
        id: 'next',
        title: 'What to try next meal / day',
        defaultOpen: false,
        steps: [
          'Move your strength session to the next planned training day.',
          'Check that meals around workouts are not getting skipped.',
          'Aim for a steadier bedtime so energy has a chance to return.',
        ],
      },
      {
        id: 'dont-worry',
        title: 'What not to worry about',
        defaultOpen: false,
        bullets: [
          'Rest days are part of getting stronger.',
          'Missing one workout does not undo your week.',
          'You do not have to “earn” food with exercise.',
        ],
      },
      {
        id: 'medical',
        title: 'When it may need professional advice',
        defaultOpen: false,
        bullets: [
          'Severe or ongoing weakness',
          'Dizziness or fainting with activity',
          'Exhaustion that does not improve with rest and regular meals',
        ],
        callout: {
          tone: 'caution',
          text: SOLVER_GENERAL_SAFETY,
        },
      },
    ],
    relatedGuideIds: ['low-energy', 'rest-recovery', 'workout-guide'],
  },
  {
    id: 'missed-workout',
    title: 'I missed my workout',
    summary: 'Life interrupts plans. Resume at the next session — no need to double up harshly.',
    order: 6,
    keywords: ['missed workout', 'skipped training', 'strength'],
    tryThisToday: [
      'Leave today’s session behind.',
      'Do not stack two hard workouts to “catch up.”',
      'Keep eating and sleeping on track.',
      'Mark the next Mon/Wed/Fri-style session on your plan.',
    ],
    sections: [
      {
        id: 'right-now',
        title: 'What to do right now',
        defaultOpen: true,
        steps: [
          'Acknowledge the miss and move on.',
          'If you have 10 gentle minutes and feel okay, a short mobility or walk is optional — not required.',
        ],
      },
      {
        id: 'next',
        title: 'What to try next meal / day',
        defaultOpen: false,
        steps: [
          'Return to Workout A or B on the next scheduled day.',
          'Start with a comfortable number of reps — consistency beats intensity.',
          'Prep a simple post-session snack (yogurt, banana, milk).',
        ],
      },
      {
        id: 'dont-worry',
        title: 'What not to worry about',
        defaultOpen: false,
        bullets: [
          'Progress is measured across weeks, not a single calendar day.',
          'You still support weight gain with food and rest when training pauses.',
        ],
      },
      {
        id: 'medical',
        title: 'When it may need professional advice',
        defaultOpen: false,
        bullets: [
          'You stop training because of pain, fainting, or severe weakness',
          'Breathing problems or chest discomfort appear with exertion — seek urgent care as appropriate',
        ],
        callout: {
          tone: 'caution',
          text: SOLVER_GENERAL_SAFETY,
        },
      },
    ],
    relatedGuideIds: ['workout-guide', 'rest-recovery'],
  },
  {
    id: 'slept-badly',
    title: 'I slept badly',
    summary: 'A rough night asks for a gentler day — food and rest first, pressure last.',
    order: 7,
    keywords: ['sleep', 'insomnia', 'tired', 'night'],
    tryThisToday: [
      'Keep breakfast simple and familiar.',
      'Lower the bar for workouts if you feel wiped.',
      'Use soft foods and snacks to stay consistent.',
      'Aim for a calmer wind-down tonight.',
    ],
    sections: [
      {
        id: 'right-now',
        title: 'What to do right now',
        defaultOpen: true,
        steps: [
          'Eat something easy even if appetite is muted (oats, eggs, yogurt).',
          'Hydrate steadily through the morning.',
          'Dim the expectation for a perfect training session.',
        ],
      },
      {
        id: 'next',
        title: 'What to try next meal / day',
        defaultOpen: false,
        steps: [
          'Keep caffeine earlier in the day if it affects your sleep.',
          'Protect a regular bedtime window when you can.',
          'A light bedtime snack (milk, banana, yogurt) may help some people feel settled.',
        ],
      },
      {
        id: 'dont-worry',
        title: 'What not to worry about',
        defaultOpen: false,
        bullets: [
          'One poor night is common and recoverable.',
          'You do not need to “fix” sleep with extreme routines.',
        ],
      },
      {
        id: 'medical',
        title: 'When it may need professional advice',
        defaultOpen: false,
        bullets: [
          'Sleep problems are severe or long-lasting',
          'Daytime exhaustion comes with dizziness, fainting, or unexplained weight change',
        ],
        callout: {
          tone: 'caution',
          text: SOLVER_GENERAL_SAFETY,
        },
      },
    ],
    relatedGuideIds: ['sleep', 'daily-routine'],
  },
  {
    id: 'no-time-food',
    title: "I don't have time to prepare food",
    summary: 'Speed meals and ready backups keep consistency alive on busy days.',
    order: 8,
    keywords: ['time', 'busy', 'cook', 'prepare', 'quick'],
    tryThisToday: [
      'Use a no-cook option: yogurt, milk, banana, dates, cheese, peanut butter toast.',
      'Warm leftovers if you have them.',
      'Blend a quick banana–milk shake.',
      'Skip elaborate recipes today.',
    ],
    sections: [
      {
        id: 'right-now',
        title: 'What to do right now',
        defaultOpen: true,
        steps: [
          'Open something ready within 5 minutes.',
          'Eat it calmly — rushed still counts.',
          'Pack one snack in your bag for later.',
        ],
      },
      {
        id: 'next',
        title: 'What to try next meal / day',
        defaultOpen: false,
        steps: [
          'Batch one pot (daal or keema) when you have a free hour.',
          'Keep shelf-stable backups: oats, peanut butter, milk, dates.',
          'Choose recipes with 3–5 ingredients on weekdays.',
        ],
      },
      {
        id: 'dont-worry',
        title: 'What not to worry about',
        defaultOpen: false,
        bullets: [
          'Simple food is still nourishing food.',
          'You do not need a perfect homemade spread every day.',
        ],
      },
      {
        id: 'medical',
        title: 'When it may need professional advice',
        defaultOpen: false,
        bullets: [
          'Busyness is not a medical issue — but if you are also dizzy, fainting, or unable to keep food down, seek care',
        ],
        callout: {
          tone: 'info',
          text: SOLVER_GENERAL_SAFETY,
        },
      },
    ],
    relatedGuideIds: ['easy-meals', 'snacks', 'shakes'],
  },
  {
    id: 'dont-know-what',
    title: "I don't know what to eat",
    summary: 'Decision fatigue is real. Use a short default menu instead of inventing every plate.',
    order: 9,
    keywords: ['what to eat', 'ideas', 'menu', 'confused'],
    tryThisToday: [
      'Pick one default: eggs + bread, daal + roti, yogurt + banana, or a milkshake.',
      'Add one booster if you can (peanut butter, cheese, dates).',
      'Repeat foods you already tolerate — variety can wait.',
    ],
    sections: [
      {
        id: 'right-now',
        title: 'What to do right now',
        defaultOpen: true,
        steps: [
          'Choose from three familiar options only.',
          'Open the Food browse or Guide meal articles if you want inspiration later — eat first.',
        ],
        bullets: [
          'Breakfast default: eggs or oats with milk',
          'Lunch/dinner default: daal, chicken, or keema with roti/rice',
          'Snack default: banana, yogurt, or dates with milk',
        ],
      },
      {
        id: 'next',
        title: 'What to try next meal / day',
        defaultOpen: false,
        steps: [
          'Write a 5-item “always works” list on your phone.',
          'Rotate within the same pattern rather than hunting novelty.',
          'Use Pakistani / home filters in Food when you want ideas fast.',
        ],
      },
      {
        id: 'dont-worry',
        title: 'What not to worry about',
        defaultOpen: false,
        bullets: [
          'Repeating the same meals is fine.',
          'You do not need a new recipe every day to make progress.',
        ],
      },
      {
        id: 'medical',
        title: 'When it may need professional advice',
        defaultOpen: false,
        bullets: [
          'Uncertainty about food is normal; seek care if fear of eating, pain, or persistent inability to eat develops',
        ],
        callout: {
          tone: 'caution',
          text: SOLVER_GENERAL_SAFETY,
        },
      },
    ],
    relatedGuideIds: ['food-guide', 'pakistani-foods', 'breakfast'],
  },
  {
    id: 'struggling-enough',
    title: 'I am struggling to eat enough',
    summary: 'Focus on frequency and easier density — not forcing giant meals in one sitting.',
    order: 10,
    keywords: ['enough', 'intake', 'gain', 'struggle', 'volume'],
    tryThisToday: [
      'Add one extra snack.',
      'Include one homemade shake.',
      'Use a booster on a familiar food.',
      'Keep portions friendly so you can return later.',
    ],
    sections: [
      {
        id: 'right-now',
        title: 'What to do right now',
        defaultOpen: true,
        steps: [
          'Have a snack even if the last meal was unfinished.',
          'Blend banana + milk (± peanut butter or dates).',
          'Add a spoon of something energy-friendly to what you already eat.',
        ],
      },
      {
        id: 'next',
        title: 'What to try next meal / day',
        defaultOpen: false,
        steps: [
          'Aim for meals + snacks on a simple schedule.',
          'Prefer soft, familiar foods when volume feels hard.',
          'Track consistency in Stronger — not perfection.',
        ],
      },
      {
        id: 'dont-worry',
        title: 'What not to worry about',
        defaultOpen: false,
        bullets: [
          'Weight changes slowly; daily scale swings are noisy.',
          'You are not behind for having a lower-intake day.',
        ],
      },
      {
        id: 'medical',
        title: 'When it may need professional advice',
        defaultOpen: false,
        intro:
          'Struggling to eat enough can have many causes. This app does not diagnose them.',
        bullets: [
          'Intake stays very limited despite trying softer foods and snacks',
          'Early fullness is constant',
          'Unexplained weight loss, severe weakness, or fainting occurs',
        ],
        callout: {
          tone: 'caution',
          title: 'Talk with a professional',
          text: SOLVER_SAFETY_FOOTER,
        },
      },
    ],
    relatedGuideIds: ['food-boosters', 'shakes', 'healthy-weight-gain'],
  },
  {
    id: 'routine-disrupted',
    title: 'My routine was disrupted',
    summary: 'Travel, guests, stress, or busy weeks happen. Rebuild with one anchor habit at a time.',
    order: 11,
    keywords: ['routine', 'disrupted', 'travel', 'schedule', 'off track'],
    tryThisToday: [
      'Pick one anchor: breakfast, a snack, or bedtime.',
      'Use the simplest foods available where you are.',
      'Skip “all or nothing” thinking.',
      'Resume workouts on the next easy day.',
    ],
    sections: [
      {
        id: 'right-now',
        title: 'What to do right now',
        defaultOpen: true,
        steps: [
          'Choose one doable action in the next hour (snack, water, short rest).',
          'Let go of matching a perfect checklist today.',
        ],
      },
      {
        id: 'next',
        title: 'What to try next meal / day',
        defaultOpen: false,
        steps: [
          'Restore mealtimes first, then training.',
          'Reuse your default menu until life settles.',
          'Open Goals or Today tomorrow and tick what is realistic only.',
        ],
      },
      {
        id: 'dont-worry',
        title: 'What not to worry about',
        defaultOpen: false,
        bullets: [
          'Disrupted weeks are part of real life, not a character flaw.',
          'Returning gently beats restarting with harsh rules.',
        ],
      },
      {
        id: 'medical',
        title: 'When it may need professional advice',
        defaultOpen: false,
        bullets: [
          'Disruption includes concerning physical symptoms that do not settle',
          'You feel unable to eat or stay safe — seek appropriate care',
        ],
        callout: {
          tone: 'caution',
          text: SOLVER_GENERAL_SAFETY,
        },
      },
    ],
    relatedGuideIds: ['daily-routine', 'troubleshooting', 'weekly-progress'],
  },
];

export function getSolverProblem(id) {
  return SOLVER_PROBLEMS.find((p) => p.id === id) || null;
}

export function listSolverProblems() {
  return [...SOLVER_PROBLEMS].sort((a, b) => a.order - b.order);
}
