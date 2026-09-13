/**
 * Guide articles — Start here
 */

/** @type {Array<object>} */
export const START_ARTICLES = [
  {
    id: 'getting-started',
    categoryId: 'start-here',
    title: 'Getting started with Stronger',
    summary:
      'A calm overview of how Stronger supports healthy weight gain with food, gentle strength, and rest — without pressure or fake precision.',
    keywords: [
      'getting started',
      'how to use',
      'overview',
      'first steps',
      'companion',
      'consistency',
    ],
    order: 1,
    sections: [
      {
        id: 'what-stronger-is',
        title: 'What Stronger is',
        defaultOpen: true,
        blocks: [
          {
            type: 'paragraph',
            text: 'Stronger is a gentle companion for young women who want to gain weight in a healthy, sustainable way. It focuses on familiar home foods, small frequent meals, light strength training, sleep, and hydration.',
          },
          {
            type: 'paragraph',
            text: 'It is not a clinic, a diet prescription, or a medical diagnosis tool. Think of it as a practical guide you can return to when days feel uneven.',
          },
          {
            type: 'callout',
            tone: 'info',
            title: 'No fake precision',
            text: 'You will not find calorie targets, “exact” macros, or high-dose supplement plans here. Progress comes from steady habits, not perfect numbers.',
          },
        ],
      },
      {
        id: 'the-three-pillars',
        title: 'The three pillars',
        defaultOpen: false,
        blocks: [
          {
            type: 'list',
            items: [
              'Food: regular meals and snacks with Pakistani and home-style options — daal, roti, eggs, yogurt, shakes, dates.',
              'Training: gentle bodyweight strength a few days a week to support muscle and appetite.',
              'Recovery: sleep, rest days, and hydration so your body can use what you eat.',
            ],
          },
          {
            type: 'callout',
            tone: 'tip',
            title: 'Start with one pillar',
            text: 'If everything feels like a lot, pick one habit first — breakfast, a bedtime snack, or two short workouts this week.',
          },
        ],
      },
      {
        id: 'how-to-use-the-guide',
        title: 'How to use this guide',
        defaultOpen: false,
        blocks: [
          {
            type: 'paragraph',
            text: 'Read Start here first, then explore Food and Training at your own pace. When appetite dips or energy feels low, open When things feel hard.',
          },
          {
            type: 'checklist',
            items: [
              'Skim Healthy weight gain so expectations feel realistic',
              'Glance at Daily rhythm for a simple day shape',
              'Bookmark one easy meal or shake you already like',
              'Note Safety so you know when to talk to a healthcare professional',
            ],
          },
        ],
      },
      {
        id: 'mindset',
        title: 'A kinder mindset',
        defaultOpen: false,
        blocks: [
          {
            type: 'paragraph',
            text: 'Some days you will eat well and train. Other days you will manage a yogurt and rest. Both count. Consistency over weeks matters more than a perfect day.',
          },
          {
            type: 'list',
            items: [
              'A few bites still count.',
              'Familiar foods beat “ideal” foods you never finish.',
              'Rest is part of the plan, not a failure.',
            ],
          },
        ],
      },
    ],
    checklist: [
      'Read this overview once without rushing',
      'Choose one small habit for this week',
      'Open Food or Daily rhythm next',
    ],
  },

  {
    id: 'healthy-weight-gain',
    categoryId: 'start-here',
    title: 'Healthy weight gain, explained gently',
    summary:
      'What healthy weight gain looks like in practice: more nourishment, gentle strength, and patience — without crash plans or extreme supplements.',
    keywords: [
      'healthy weight gain',
      'gain weight',
      'muscle',
      'patience',
      'consistency',
      'no crash diet',
    ],
    order: 2,
    sections: [
      {
        id: 'what-it-means',
        title: 'What healthy weight gain means here',
        defaultOpen: true,
        blocks: [
          {
            type: 'paragraph',
            text: 'Healthy weight gain means supporting your body with enough food, regular protein-friendly meals, and light strength work so some of the gain can go toward muscle and energy — not just forcing volume.',
          },
          {
            type: 'paragraph',
            text: 'It is usually gradual. Scales move up and down with water, sleep, and hormones. Weekly patterns matter more than a single morning number.',
          },
          {
            type: 'callout',
            tone: 'caution',
            title: 'What we avoid',
            text: 'Stronger does not promote crash “bulk” plans, prescription medicines, high-dose supplements, or calorie prescriptions that pretend to be exact.',
          },
        ],
      },
      {
        id: 'how-it-happens',
        title: 'How it usually happens',
        defaultOpen: false,
        blocks: [
          {
            type: 'list',
            items: [
              'You eat a little more often — meals plus snacks or shakes.',
              'You add gentle density (milk, peanut butter, cheese, ghee in small amounts) to familiar foods.',
              'You train lightly so muscles have a reason to grow.',
              'You sleep and rest so recovery can happen.',
            ],
          },
          {
            type: 'examples',
            items: [
              {
                title: 'Soft day pattern',
                detail: 'Breakfast eggs or oats → mid-morning banana shake → lunch daal and roti → afternoon yogurt → dinner khichdi or keema with rice → bedtime milk and dates.',
              },
              {
                title: 'Busy day pattern',
                detail: 'Toast with peanut butter → leftover daal → cheese sandwich → banana and yogurt → simple dinner → warm milk.',
              },
            ],
          },
        ],
      },
      {
        id: 'realistic-expectations',
        title: 'Realistic expectations',
        defaultOpen: false,
        blocks: [
          {
            type: 'paragraph',
            text: 'Appetite, stress, exams, travel, and illness all affect how much you can eat. Progress is rarely a straight line. Showing up for most days is enough.',
          },
          {
            type: 'callout',
            tone: 'tip',
            title: 'Track feel, not only the scale',
            text: 'Energy, how clothes fit, workout strength, and meal consistency are useful signals alongside weight.',
          },
          {
            type: 'list',
            items: [
              'Expect plateaus and quieter weeks.',
              'Do not compare your pace to someone else’s “transformation” story.',
              'If weight keeps falling or symptoms worry you, seek medical assessment.',
            ],
          },
        ],
      },
    ],
    checklist: [
      'Accept that progress is gradual',
      'Plan food + strength + rest together',
      'Skip extreme product promises',
    ],
  },

  {
    id: 'daily-routine',
    categoryId: 'start-here',
    title: 'A gentle daily rhythm',
    summary:
      'A flexible day shape with meals, snacks, optional training, and wind-down — built for real life at home, not perfection.',
    keywords: [
      'daily routine',
      'schedule',
      'rhythm',
      'meals',
      'snacks',
      'morning',
      'evening',
    ],
    order: 3,
    sections: [
      {
        id: 'day-shape',
        title: 'A simple day shape',
        defaultOpen: true,
        blocks: [
          {
            type: 'paragraph',
            text: 'You do not need a rigid timetable. Aim for a rhythm: breakfast, a mid-morning bite, lunch, an afternoon snack or shake, dinner, and an optional bedtime snack.',
          },
          {
            type: 'list',
            items: [
              'Morning: water, then breakfast within a reasonable window after waking.',
              'Midday: lunch that includes something soft and familiar (daal, rice, eggs, yogurt).',
              'Afternoon: a planned snack so the gap to dinner is not huge.',
              'Evening: dinner, then a calm wind-down and sleep-friendly routine.',
            ],
          },
          {
            type: 'callout',
            tone: 'tip',
            title: 'Chai and appetite',
            text: 'Chai is part of many days. Large, very sweet cups right before a meal can blunt appetite for some people. Enjoy tea — just leave a little space before eating if that happens to you.',
          },
        ],
      },
      {
        id: 'training-days',
        title: 'Where training fits',
        defaultOpen: false,
        blocks: [
          {
            type: 'paragraph',
            text: 'On strength days (often Mon / Wed / Fri style), train when you have a little energy — after a snack or light meal is often easier than completely empty.',
          },
          {
            type: 'list',
            items: [
              'Keep sessions short and bodyweight-friendly.',
              'Eat something afterward if you can — yogurt, milk, eggs, or a shake.',
              'Rest days are training too: walk lightly, stretch, or simply rest.',
            ],
          },
        ],
      },
      {
        id: 'low-energy-days',
        title: 'Low-energy or busy days',
        defaultOpen: false,
        blocks: [
          {
            type: 'paragraph',
            text: 'Shrink the plan, do not abandon it. Soft foods and ready options keep the rhythm alive without a big cook.',
          },
          {
            type: 'examples',
            items: [
              {
                title: 'Minimum viable day',
                detail: 'Yogurt or milk at breakfast, leftover daal or sandwich at lunch, banana shake mid-afternoon, khichdi or eggs at dinner, dates with milk at night.',
              },
              {
                title: 'Exam / travel day',
                detail: 'Pack peanut butter toast, bananas, yogurt cups, and water. Eat on a clock if hunger is quiet.',
              },
            ],
          },
        ],
      },
      {
        id: 'evening-wind-down',
        title: 'Evening wind-down',
        defaultOpen: false,
        blocks: [
          {
            type: 'checklist',
            items: [
              'Finish dinner without rushing if you can',
              'Optional bedtime snack: milk, dates, yogurt, or toast',
              'Dim screens a bit before sleep',
              'Keep water nearby, but avoid huge gulps right as you lie down',
            ],
          },
        ],
      },
    ],
    checklist: [
      'Sketch your usual meal times',
      'Add one snack slot you often skip',
      'Decide which days are training days',
    ],
  },
];
