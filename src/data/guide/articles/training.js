/**
 * Guide articles — Training & recovery
 */

/** @type {Array<object>} */
export const TRAINING_ARTICLES = [
  {
    id: 'workout-guide',
    categoryId: 'training',
    title: 'Gentle strength at home',
    summary:
      'Bodyweight strength a few days a week to support muscle, appetite, and confidence — no gym required.',
    keywords: [
      'workout',
      'strength',
      'bodyweight',
      'home training',
      'monday',
      'wednesday',
      'friday',
      'muscle',
    ],
    order: 1,
    sections: [
      {
        id: 'why-strength',
        title: 'Why gentle strength helps',
        defaultOpen: true,
        blocks: [
          {
            type: 'paragraph',
            text: 'Light strength training gives your body a reason to build muscle as you eat more consistently. It can also support appetite and how steady you feel day to day.',
          },
          {
            type: 'paragraph',
            text: 'Stronger focuses on home-friendly bodyweight work — not intense cardio marathons or exhausting gym culture.',
          },
          {
            type: 'callout',
            tone: 'info',
            title: 'Consistency over intensity',
            text: 'Short sessions done regularly beat rare heroic workouts. Rest if you feel unwell, dizzy, or unusually weak.',
          },
        ],
      },
      {
        id: 'simple-schedule',
        title: 'A simple A/B style week',
        defaultOpen: false,
        blocks: [
          {
            type: 'paragraph',
            text: 'A common rhythm is strength on Monday, Wednesday, and Friday, with rest or light walking on other days. Alternate movement patterns so the body recovers.',
          },
          {
            type: 'examples',
            items: [
              {
                title: 'Day A ideas',
                detail: 'Squats or chair squats, incline/wall push-ups, glute bridges, easy core hold.',
              },
              {
                title: 'Day B ideas',
                detail: 'Reverse lunges or step-backs, rows with a towel/bag if available, hip hinges/good mornings, shoulder taps or bird-dog.',
              },
            ],
          },
          {
            type: 'list',
            items: [
              'Warm up with a few minutes of easy movement.',
              'Use beginner variations whenever you need them (chair squats, wall push-ups).',
              'Breathe steadily; do not rush reps.',
            ],
          },
        ],
      },
      {
        id: 'around-meals',
        title: 'Training around meals',
        defaultOpen: false,
        blocks: [
          {
            type: 'list',
            items: [
              'A small snack before training often feels better than completely empty.',
              'Afterward, try yogurt, milk, eggs, or a banana shake if you can.',
              'Skip hard sessions when illness, fainting feelings, or severe fatigue show up — seek care if symptoms concern you.',
            ],
          },
          {
            type: 'callout',
            tone: 'tip',
            title: 'Form first',
            text: 'Shallower range and slower reps are fine. Pain is a stop signal; mild effort is the goal.',
          },
        ],
      },
      {
        id: 'progress-markers',
        title: 'How progress shows up',
        defaultOpen: false,
        blocks: [
          {
            type: 'list',
            items: [
              'You complete the session more often.',
              'Movements feel more controlled.',
              'You can add a rep or use a slightly harder variation over time.',
            ],
          },
        ],
      },
    ],
    checklist: [
      'Pick Mon/Wed/Fri or another 3-day pattern',
      'Learn one squat and one push variation',
      'Plan a post-workout snack',
    ],
  },

  {
    id: 'rest-recovery',
    categoryId: 'training',
    title: 'Rest and recovery',
    summary:
      'Rest days, sleep, and lighter weeks are part of training — they help your body use food and rebuild.',
    keywords: [
      'rest',
      'recovery',
      'rest day',
      'soreness',
      'deload',
      'walking',
      'stretch',
    ],
    order: 2,
    sections: [
      {
        id: 'rest-is-training',
        title: 'Rest is part of the plan',
        defaultOpen: true,
        blocks: [
          {
            type: 'paragraph',
            text: 'Muscles adapt between sessions. Sleep, food, and rest days are not laziness — they are how strength and healthy weight gain stick.',
          },
          {
            type: 'list',
            items: [
              'Keep non-training days lighter: walk, stretch, or fully rest.',
              'Protect bedtime when you can.',
              'Eat on rest days too — recovery still needs nourishment.',
            ],
          },
        ],
      },
      {
        id: 'soreness',
        title: 'Normal soreness vs warning signs',
        defaultOpen: false,
        blocks: [
          {
            type: 'paragraph',
            text: 'Mild muscle soreness after new movements can be normal. Sharp pain, joint pain, dizziness, fainting, or severe weakness are different — stop and seek appropriate medical help if those appear.',
          },
          {
            type: 'callout',
            tone: 'caution',
            title: 'Listen early',
            text: 'If a movement hurts sharply, switch to an easier variation or rest. Pushing through warning signals is not progress.',
          },
        ],
      },
      {
        id: 'lighter-weeks',
        title: 'Lighter weeks',
        defaultOpen: false,
        blocks: [
          {
            type: 'examples',
            items: [
              {
                title: 'Exam week',
                detail: 'Two short sessions instead of three; keep meals and sleep as steady as possible.',
              },
              {
                title: 'Travel week',
                detail: 'Walk more, do a mini bodyweight circuit if space allows, return to your A/B rhythm afterward.',
              },
              {
                title: 'Low-energy week',
                detail: 'Prioritize food and sleep; training can shrink without guilt.',
              },
            ],
          },
        ],
      },
    ],
    checklist: [
      'Schedule rest days on purpose',
      'Keep eating on rest days',
      'Use easier variations when sore',
    ],
  },
];
