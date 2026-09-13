/**
 * Guide articles — When things feel hard + weekly progress
 */

/** @type {Array<object>} */
export const PROBLEMS_ARTICLES = [
  {
    id: 'low-appetite',
    categoryId: 'when-hard',
    title: 'When appetite is low',
    summary:
      'Practical ways to keep eating gently when hunger is quiet: smaller starts, soft foods, shakes, and predictable mealtimes.',
    keywords: [
      'low appetite',
      'not hungry',
      'full fast',
      'small portions',
      'soft foods',
      'shakes',
    ],
    order: 1,
    sections: [
      {
        id: 'start-here-appetite',
        title: 'Start here when hunger is quiet',
        defaultOpen: true,
        blocks: [
          {
            type: 'paragraph',
            text: 'Quiet appetite is common. You do not need to wait for a big hunger signal. Offer yourself something small at familiar times and let consistency lead.',
          },
          {
            type: 'list',
            items: [
              'Start smaller — a few bites still count.',
              'Eat more often with planned snacks.',
              'Use nourishing drinks between meals when solids feel heavy.',
              'Choose softer foods: daal, khichdi, yogurt, oats, mashed potato, shakes.',
            ],
          },
          {
            type: 'callout',
            tone: 'tip',
            title: 'Water timing',
            text: 'Stay hydrated through the day, but avoid large amounts of water right before a meal if it blunts your appetite.',
          },
        ],
      },
      {
        id: 'gentle-density',
        title: 'Add gentle density',
        defaultOpen: false,
        blocks: [
          {
            type: 'paragraph',
            text: 'When volume is hard, small add-ons help: peanut butter, cheese, milk, nuts, or a little ghee on familiar foods.',
          },
          {
            type: 'examples',
            items: [
              {
                title: 'Soft breakfast',
                detail: 'Yogurt with banana, or sooji with milk.',
              },
              {
                title: 'Afternoon bridge',
                detail: 'Banana shake or dates with milk.',
              },
              {
                title: 'Easy dinner',
                detail: 'Khichdi with yogurt; bedtime milk if needed.',
              },
            ],
          },
        ],
      },
      {
        id: 'tea-and-appetite',
        title: 'Tea and appetite',
        defaultOpen: false,
        blocks: [
          {
            type: 'paragraph',
            text: 'Large sweet chai near meals can blunt appetite for some people. Enjoy chai — try a smaller cup or a little more space before eating if that pattern fits you.',
          },
        ],
      },
      {
        id: 'if-it-persists',
        title: 'If it persists',
        defaultOpen: false,
        blocks: [
          {
            type: 'callout',
            tone: 'caution',
            title: 'Not a diagnosis',
            text: 'If poor appetite persists, or you notice early fullness with other concerning symptoms, unexplained weight loss, severe weakness, or dizziness/fainting, discuss with an appropriate healthcare professional. Stronger does not diagnose.',
          },
        ],
      },
    ],
    checklist: [
      'Schedule two snacks even if not hungry',
      'Keep one soft meal option ready',
      'Try a between-meal shake once',
    ],
  },

  {
    id: 'missed-meals',
    categoryId: 'when-hard',
    title: 'Missed meals without spiral',
    summary:
      'What to do after a skipped breakfast or busy day: restart at the next slot, use easy backups, and keep the day kind.',
    keywords: [
      'missed meals',
      'skipped breakfast',
      'forgot to eat',
      'busy day',
      'catch up',
      'restart',
    ],
    order: 2,
    sections: [
      {
        id: 'no-spiral',
        title: 'Missed a meal? No spiral',
        defaultOpen: true,
        blocks: [
          {
            type: 'paragraph',
            text: 'Skipping happens — exams, travel, family events, low mood. One missed meal does not erase your progress. The skill is returning gently.',
          },
          {
            type: 'list',
            items: [
              'Eat at the next planned slot instead of “making up” with extreme portions.',
              'Choose an easy backup: yogurt, banana, peanut butter toast, leftover daal, shake.',
              'Keep the rest of the day’s rhythm if you can.',
            ],
          },
        ],
      },
      {
        id: 'restart-scripts',
        title: 'Restart scripts',
        defaultOpen: false,
        blocks: [
          {
            type: 'examples',
            items: [
              {
                title: 'Skipped breakfast',
                detail: 'Have a mid-morning snack now (milk and dates, yogurt, toast), then lunch as usual.',
              },
              {
                title: 'Busy afternoon',
                detail: 'Drink a banana shake, then a simple dinner later.',
              },
              {
                title: 'Late night return home',
                detail: 'Eggs and bread, leftover khichdi, or milk with dates — then sleep.',
              },
            ],
          },
          {
            type: 'callout',
            tone: 'tip',
            title: 'Pack a backup',
            text: 'A banana, yogurt, or peanut butter sandwich in your bag prevents empty long gaps.',
          },
        ],
      },
      {
        id: 'patterns',
        title: 'If missing meals becomes a pattern',
        defaultOpen: false,
        blocks: [
          {
            type: 'paragraph',
            text: 'Look for friction: no ready food, long chai sessions replacing meals, or a schedule with no snack slots. Fix the environment before blaming willpower.',
          },
          {
            type: 'checklist',
            items: [
              'Stock 3 easy foods at home',
              'Set one soft reminder for a snack',
              'Decide a default “emergency plate”',
            ],
          },
        ],
      },
    ],
    checklist: [
      'Define your emergency plate',
      'Pack one portable snack tomorrow',
      'Return at the next mealtime after a miss',
    ],
  },

  {
    id: 'low-energy',
    categoryId: 'when-hard',
    title: 'Low energy days',
    summary:
      'Shrink the plan without abandoning it: softer food, lighter movement, and earlier rest when energy dips.',
    keywords: [
      'low energy',
      'fatigue',
      'tired',
      'exhaustion',
      'lighter day',
      'rest',
    ],
    order: 3,
    sections: [
      {
        id: 'shrink-not-stop',
        title: 'Shrink the plan, don’t abandon it',
        defaultOpen: true,
        blocks: [
          {
            type: 'paragraph',
            text: 'Low energy days are part of real life. Aim for minimum nourishment and recovery rather than a perfect training-and-cooking day.',
          },
          {
            type: 'list',
            items: [
              'Choose soft, ready foods.',
              'Swap hard workouts for a walk, stretch, or full rest.',
              'Protect an earlier bedtime if you can.',
            ],
          },
        ],
      },
      {
        id: 'minimum-plate',
        title: 'A minimum-energy plate day',
        defaultOpen: false,
        blocks: [
          {
            type: 'examples',
            items: [
              {
                title: 'Morning',
                detail: 'Milk or yogurt; banana if possible.',
              },
              {
                title: 'Midday',
                detail: 'Leftover daal/rice or a sandwich.',
              },
              {
                title: 'Afternoon',
                detail: 'Banana shake or dates with milk.',
              },
              {
                title: 'Evening',
                detail: 'Khichdi, eggs, or whatever family cooked — plus optional bedtime milk.',
              },
            ],
          },
        ],
      },
      {
        id: 'energy-caution',
        title: 'When fatigue needs care',
        defaultOpen: false,
        blocks: [
          {
            type: 'callout',
            tone: 'caution',
            title: 'Seek professional assessment when needed',
            text: 'Severe weakness, dizziness or fainting, unexplained weight loss, or other concerning symptoms should be discussed with an appropriate healthcare professional. Stronger offers practical ideas, not diagnosis.',
          },
        ],
      },
    ],
    checklist: [
      'Write your low-energy meal list',
      'Allow a rest day without guilt',
      'Prioritize one early night this week',
    ],
  },

  {
    id: 'common-problems',
    categoryId: 'when-hard',
    title: 'Common food problems',
    summary:
      'Short responses to frequent snags: not hungry, full too fast, unsettled stomach, no time, and food boredom.',
    keywords: [
      'common problems',
      'full too fast',
      'nausea',
      'no time',
      'bored',
      'food problems',
    ],
    order: 4,
    sections: [
      {
        id: 'problem-map',
        title: 'Quick problem map',
        defaultOpen: true,
        blocks: [
          {
            type: 'examples',
            items: [
              {
                title: 'I don’t feel hungry',
                detail: 'Keep mealtimes gentle and predictable. Offer something small at the usual time — consistency often returns before big hunger does.',
              },
              {
                title: 'I get full too fast',
                detail: 'Choose softer, energy-friendly foods and pause. Come back in an hour or two for a snack or shake.',
              },
              {
                title: 'Food feels unsettled',
                detail: 'Stick to mild, familiar options (yogurt, toast, banana, plain rice). Skip very spicy or oily plates until you feel steadier.',
              },
              {
                title: 'I don’t have time to cook',
                detail: 'Keep ready options: yogurt, milk, banana, dates, peanut butter toast, leftover daal or keema.',
              },
              {
                title: 'I’m bored of the same food',
                detail: 'Rotate within the same pattern — eggs one day, oats the next; chicken with rice, then daal with roti.',
              },
            ],
          },
        ],
      },
      {
        id: 'combine-strategies',
        title: 'Combine strategies',
        defaultOpen: false,
        blocks: [
          {
            type: 'paragraph',
            text: 'Most hard weeks mix several issues. Pair a soft meal with a planned snack and a ready backup. See Troubleshooting for a step-by-step reset.',
          },
          {
            type: 'callout',
            tone: 'info',
            title: 'Safety spirit',
            text: 'Stronger offers practical food ideas, not medical diagnosis. Persistent or worrying symptoms deserve professional medical assessment.',
          },
        ],
      },
    ],
    checklist: [
      'Match today’s snag to one strategy',
      'Keep mild foods available',
      'Rotate two meal patterns to reduce boredom',
    ],
  },

  {
    id: 'troubleshooting',
    categoryId: 'when-hard',
    title: 'Troubleshooting a hard week',
    summary:
      'A calm reset sequence when eating and training both feel off — stabilize food first, then sleep, then movement.',
    keywords: [
      'troubleshooting',
      'hard week',
      'reset',
      'stuck',
      'what to do',
      'plan',
    ],
    order: 5,
    sections: [
      {
        id: 'reset-order',
        title: 'Reset in this order',
        defaultOpen: true,
        blocks: [
          {
            type: 'paragraph',
            text: 'When everything feels messy, fix foundations in order: food rhythm, sleep, then training intensity.',
          },
          {
            type: 'list',
            items: [
              'Food: three soft meals + two snacks for the next three days.',
              'Sleep: protect an earlier wind-down where possible.',
              'Training: shorten sessions or rest; return when energy allows.',
            ],
          },
          {
            type: 'callout',
            tone: 'tip',
            title: 'Three-day focus',
            text: 'Do not redesign your whole life tonight. Stabilize three days, then review.',
          },
        ],
      },
      {
        id: 'check-friction',
        title: 'Check for friction',
        defaultOpen: false,
        blocks: [
          {
            type: 'checklist',
            items: [
              'Is there ready food at home?',
              'Are meal gaps longer than you planned?',
              'Is large pre-meal chai crowding appetite?',
              'Are workouts too long for this week’s capacity?',
              'Is bedtime drifting very late?',
            ],
          },
        ],
      },
      {
        id: 'sample-reset-day',
        title: 'Sample reset day',
        defaultOpen: false,
        blocks: [
          {
            type: 'examples',
            items: [
              {
                title: 'Meals',
                detail: 'Yogurt or eggs → banana shake → daal and roti → cheese toast → khichdi → milk and dates.',
              },
              {
                title: 'Movement',
                detail: 'Walk or rest; skip intense strength if depleted.',
              },
            ],
          },
        ],
      },
    ],
    checklist: [
      'Run a 3-day soft-food rhythm',
      'Remove one friction point',
      'Reintroduce training lightly afterward',
    ],
  },

  {
    id: 'common-mistakes',
    categoryId: 'when-hard',
    title: 'Common mistakes to avoid',
    summary:
      'Patterns that quietly stall progress: waiting for perfect hunger, all-or-nothing days, extreme tactics, and ignoring rest.',
    keywords: [
      'mistakes',
      'all or nothing',
      'perfection',
      'extreme',
      'skipping rest',
      'comparing',
    ],
    order: 6,
    sections: [
      {
        id: 'mistake-list',
        title: 'Mistakes that stall progress',
        defaultOpen: true,
        blocks: [
          {
            type: 'examples',
            items: [
              {
                title: 'Waiting for perfect hunger',
                detail: 'Quiet appetite may never scream. Eat on a gentle schedule.',
              },
              {
                title: 'All-or-nothing days',
                detail: 'A partial day still counts. A few bites beat a full skip.',
              },
              {
                title: 'Huge plates after empty days',
                detail: 'Extreme catch-up can feel awful and is hard to sustain. Restart at the next slot.',
              },
              {
                title: 'Chasing fake precision',
                detail: 'Calorie obsession and “perfect macros” are not required here.',
              },
              {
                title: 'High-dose supplement promises',
                detail: 'Stronger stays with food-first habits, not extreme product stacks.',
              },
              {
                title: 'Training without recovery',
                detail: 'Skipping sleep and rest days undercuts the point of strength work.',
              },
            ],
          },
        ],
      },
      {
        id: 'kinder-replacements',
        title: 'Kinder replacements',
        defaultOpen: false,
        blocks: [
          {
            type: 'list',
            items: [
              'Replace perfection with a default breakfast.',
              'Replace guilt with the next snack.',
              'Replace comparison with your own weekly consistency.',
            ],
          },
          {
            type: 'callout',
            tone: 'info',
            title: 'Tone check',
            text: 'Progress is quiet: showing up for today is enough.',
          },
        ],
      },
    ],
    checklist: [
      'Drop one all-or-nothing rule',
      'Keep food-first over extreme products',
      'Protect at least one rest habit',
    ],
  },

  {
    id: 'weekly-progress',
    categoryId: 'progress-faq',
    title: 'Weekly progress check-in',
    summary:
      'A calm weekly review: consistency, energy, strength, and how clothes feel — not fake-precision scale drama.',
    keywords: [
      'weekly progress',
      'check-in',
      'scale',
      'consistency',
      'review',
      'habits',
      'tracking',
    ],
    order: 7,
    sections: [
      {
        id: 'what-to-review',
        title: 'What to review each week',
        defaultOpen: true,
        blocks: [
          {
            type: 'paragraph',
            text: 'A short weekly check-in helps you notice patterns without obsessing over a single morning weight. Focus on habits you can influence.',
          },
          {
            type: 'list',
            items: [
              'How many days did you manage breakfast?',
              'Did snacks or shakes show up most days?',
              'Did you complete most planned strength sessions?',
              'How was sleep energy overall?',
              'Any persistent symptoms that need medical attention?',
            ],
          },
        ],
      },
      {
        id: 'scale-context',
        title: 'If you use a scale',
        defaultOpen: false,
        blocks: [
          {
            type: 'paragraph',
            text: 'Weight fluctuates with water, salt, hormones, and digestion. Weekly averages or how clothes fit can be kinder than daily reaction.',
          },
          {
            type: 'callout',
            tone: 'caution',
            title: 'Unexplained loss',
            text: 'If weight keeps falling despite effort, or other concerning symptoms appear, seek professional medical assessment. Stronger does not diagnose.',
          },
        ],
      },
      {
        id: 'next-week-adjust',
        title: 'Tiny next-week adjustments',
        defaultOpen: false,
        blocks: [
          {
            type: 'examples',
            items: [
              {
                title: 'Meals felt hard',
                detail: 'Add one shake slot and one soft dinner option.',
              },
              {
                title: 'Training slipped',
                detail: 'Book two shorter sessions instead of three long ones.',
              },
              {
                title: 'Sleep slipped',
                detail: 'Pick one earlier bedtime target for weeknights.',
              },
            ],
          },
          {
            type: 'callout',
            tone: 'tip',
            title: 'One change',
            text: 'Change one thing for the next week. Stacking ten new rules usually backfires.',
          },
        ],
      },
    ],
    checklist: [
      'Do a 10-minute weekly review',
      'Celebrate one consistency win',
      'Choose one small adjustment for next week',
    ],
  },
];
