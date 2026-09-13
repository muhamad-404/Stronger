/**
 * Guide articles — Sleep & hydration
 */

/** @type {Array<object>} */
export const SLEEP_HYDRATION_ARTICLES = [
  {
    id: 'sleep',
    categoryId: 'sleep-hydration',
    title: 'Sleep for recovery and appetite',
    summary:
      'Steady sleep supports recovery, mood, and a more workable appetite — small evening habits matter more than perfect routines.',
    keywords: [
      'sleep',
      'bedtime',
      'rest',
      'recovery',
      'evening routine',
      'insomnia',
      'wind down',
    ],
    order: 1,
    sections: [
      {
        id: 'why-sleep',
        title: 'Why sleep matters here',
        defaultOpen: true,
        blocks: [
          {
            type: 'paragraph',
            text: 'Sleep helps your body recover from training and makes daily energy more stable. Many people also find appetite feels more predictable when nights are less chaotic.',
          },
          {
            type: 'callout',
            tone: 'tip',
            title: 'Progress is quiet',
            text: 'Protecting bedtime is a real part of healthy weight gain — not an optional extra.',
          },
        ],
      },
      {
        id: 'evening-habits',
        title: 'Gentle evening habits',
        defaultOpen: false,
        blocks: [
          {
            type: 'list',
            items: [
              'Aim for a roughly consistent bedtime when life allows.',
              'Dim screens a little before sleep if they wind you up.',
              'Keep the room as dark and cool as you reasonably can.',
              'Optional bedtime snack: warm milk, dates, yogurt, or toast if nights leave you empty.',
            ],
          },
          {
            type: 'callout',
            tone: 'info',
            title: 'Late chai',
            text: 'If late strong sweet chai makes sleep harder, shift that cup earlier. Enjoy tea — adjust timing to what your body needs.',
          },
        ],
      },
      {
        id: 'imperfect-nights',
        title: 'When nights are imperfect',
        defaultOpen: false,
        blocks: [
          {
            type: 'paragraph',
            text: 'Exams, family noise, stress, and travel disrupt sleep. The next day, keep meals soft and training lighter rather than punishing yourself.',
          },
          {
            type: 'list',
            items: [
              'Prioritize breakfast and a snack even if sleep was short.',
              'Skip intense workouts if you feel unsafe or exhausted.',
              'Return to your bedtime rhythm the next night without dramatic “catch-up” pressure.',
            ],
          },
        ],
      },
      {
        id: 'when-to-ask-help',
        title: 'When to ask for help',
        defaultOpen: false,
        blocks: [
          {
            type: 'paragraph',
            text: 'Ongoing severe sleep problems, loud snoring with gasping, or daytime collapse-level fatigue deserve a conversation with an appropriate healthcare professional. Stronger does not diagnose sleep disorders.',
          },
        ],
      },
    ],
    checklist: [
      'Choose a target bedtime window',
      'Decide on an optional bedtime snack',
      'Notice if late chai affects sleep',
    ],
  },

  {
    id: 'hydration',
    categoryId: 'sleep-hydration',
    title: 'Everyday hydration',
    summary:
      'Stay hydrated through the day without filling up on large amounts of water right before meals when appetite is low.',
    keywords: [
      'hydration',
      'water',
      'drink',
      'thirst',
      'before meals',
      'milk',
      'fluids',
    ],
    order: 2,
    sections: [
      {
        id: 'hydration-balance',
        title: 'Hydrate, leave room for food',
        defaultOpen: true,
        blocks: [
          {
            type: 'paragraph',
            text: 'Water matters for energy, digestion comfort, and training. At the same time, large amounts of fluid right before a meal can blunt appetite for some people.',
          },
          {
            type: 'list',
            items: [
              'Sip water across the day.',
              'If appetite is low, avoid chugging a big glass immediately before eating.',
              'Milk and yogurt also contribute fluids while adding nourishment.',
            ],
          },
          {
            type: 'callout',
            tone: 'tip',
            title: 'Simple cue',
            text: 'Keep a bottle nearby during study or work, and pair meals with smaller sips rather than a pre-meal flood.',
          },
        ],
      },
      {
        id: 'hot-weather',
        title: 'Hot weather and active days',
        defaultOpen: false,
        blocks: [
          {
            type: 'paragraph',
            text: 'In heat, thirst rises. Drink enough to feel comfortable, and add an extra snack or shake if long hot days leave you drained.',
          },
          {
            type: 'list',
            items: [
              'Rehydrate after walks or workouts.',
              'Watch for dizziness or severe weakness — those are reasons to rest and seek care if they persist or worry you.',
              'Oral rehydration is for illness contexts guided by clinicians; Stronger does not prescribe medical treatments.',
            ],
          },
        ],
      },
      {
        id: 'other-drinks',
        title: 'Other drinks',
        defaultOpen: false,
        blocks: [
          {
            type: 'examples',
            items: [
              {
                title: 'Milk',
                detail: 'Useful between meals or at bedtime for many people.',
              },
              {
                title: 'Lassi or yogurt drinks',
                detail: 'Can be nourishing; notice fullness if you drink them right before a solid meal.',
              },
              {
                title: 'Chai',
                detail: 'Enjoy it; see Tea & appetite for timing tips around meals.',
              },
            ],
          },
        ],
      },
    ],
    checklist: [
      'Sip water through the day',
      'Avoid huge pre-meal water gulps if appetite is low',
      'Use milk as a nourishing fluid option',
    ],
  },
];
