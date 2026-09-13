/**
 * Guide articles — Safety & FAQ
 */

/** @type {Array<object>} */
export const SAFETY_ARTICLES = [
  {
    id: 'seek-medical-help',
    categoryId: 'safety',
    title: 'When to seek medical help',
    summary:
      'Stronger is practical guidance, not diagnosis. Know which warning patterns deserve a conversation with an appropriate healthcare professional.',
    keywords: [
      'medical help',
      'doctor',
      'symptoms',
      'warning signs',
      'safety',
      'appetite',
      'weight loss',
      'dizziness',
    ],
    order: 1,
    sections: [
      {
        id: 'not-a-clinic',
        title: 'Stronger is not a clinic',
        defaultOpen: true,
        blocks: [
          {
            type: 'paragraph',
            text: 'Stronger offers practical food, training, sleep, and habit ideas for healthy weight gain. It does not diagnose conditions, prescribe medicines, or replace professional care.',
          },
          {
            type: 'callout',
            tone: 'info',
            title: 'Food safety spirit',
            text: 'Stronger offers practical food ideas, not medical diagnosis. If appetite problems persist, or you notice unexplained weight loss, severe weakness, ongoing digestive issues, fainting, or other concerning symptoms, please seek professional medical assessment.',
          },
        ],
      },
      {
        id: 'talk-to-professional',
        title: 'Discuss these with a healthcare professional',
        defaultOpen: false,
        blocks: [
          {
            type: 'paragraph',
            text: 'Please discuss the following with an appropriate healthcare professional. This list is educational — it is not a diagnosis checklist or an emergency protocol.',
          },
          {
            type: 'list',
            items: [
              'Persistent poor appetite',
              'Early fullness that keeps limiting intake',
              'Persistent abdominal symptoms',
              'Unexplained weight loss',
              'Severe weakness',
              'Dizziness or fainting',
              'Other concerning symptoms that worry you or your family',
            ],
          },
          {
            type: 'callout',
            tone: 'caution',
            title: 'Do not wait on worry alone',
            text: 'If something feels seriously wrong, seek urgent local medical care according to your situation. Stronger cannot assess emergencies.',
          },
        ],
      },
      {
        id: 'how-to-prepare',
        title: 'How to prepare for an appointment',
        defaultOpen: false,
        blocks: [
          {
            type: 'checklist',
            items: [
              'Note how long appetite or symptoms have lasted',
              'List foods you can still manage',
              'Mention dizziness, fainting, pain, or unexplained weight change',
              'Bring questions about training or diet changes you are considering',
            ],
          },
          {
            type: 'paragraph',
            text: 'A clinician can evaluate causes and guide safe next steps. Continue using Stronger’s gentle habits only when they fit professional advice for you.',
          },
        ],
      },
    ],
    checklist: [
      'Read the warning patterns once',
      'Seek care if listed concerns apply',
      'Use Stronger as a companion, not a diagnosis tool',
    ],
  },

  {
    id: 'faq',
    categoryId: 'progress-faq',
    title: 'Frequently asked questions',
    summary:
      'Practical answers about pace, snacks, tea, training, scales, and what Stronger does — and does not — do.',
    keywords: [
      'faq',
      'questions',
      'answers',
      'how fast',
      'supplements',
      'scale',
      'tea',
      'workout',
    ],
    order: 2,
    sections: [
      {
        id: 'faq-pace',
        title: 'How fast should I gain?',
        defaultOpen: true,
        blocks: [
          {
            type: 'paragraph',
            text: 'Healthy weight gain is usually gradual. Stronger does not prescribe a target rate or calorie number. Focus on steady meals, snacks, gentle strength, and sleep, then review weekly patterns.',
          },
          {
            type: 'callout',
            tone: 'info',
            title: 'Uneven weeks are normal',
            text: 'Stress, exams, and illness change appetite. Consistency over months matters more than one dramatic week.',
          },
        ],
      },
      {
        id: 'faq-not-hungry',
        title: 'What if I’m never hungry?',
        defaultOpen: false,
        blocks: [
          {
            type: 'paragraph',
            text: 'Use scheduled small meals and soft options. Shakes, yogurt, khichdi, and dates with milk can bridge gaps. See Low appetite for more tactics.',
          },
          {
            type: 'list',
            items: [
              'Do not wait for perfect hunger.',
              'Start with a few bites at mealtime.',
              'Seek medical help if poor appetite persists or other warning symptoms appear.',
            ],
          },
        ],
      },
      {
        id: 'faq-tea',
        title: 'Do I have to stop chai?',
        defaultOpen: false,
        blocks: [
          {
            type: 'paragraph',
            text: 'No. Enjoy chai. If large sweet cups right before meals blunt your appetite, shift timing or cup size. Tea can stay in your life alongside meals.',
          },
        ],
      },
      {
        id: 'faq-supplements',
        title: 'Should I take high-dose supplements?',
        defaultOpen: false,
        blocks: [
          {
            type: 'paragraph',
            text: 'Stronger is food-first and does not recommend high-dose supplement stacks or prescription medicines for weight gain. Ask a qualified clinician before starting any supplement or medicine.',
          },
          {
            type: 'callout',
            tone: 'caution',
            title: 'Avoid extreme product promises',
            text: 'Homemade shakes with milk, banana, dates, or peanut butter fit the Stronger approach better than miracle powders.',
          },
        ],
      },
      {
        id: 'faq-training',
        title: 'Do I need a gym?',
        defaultOpen: false,
        blocks: [
          {
            type: 'paragraph',
            text: 'No. Home bodyweight strength a few days a week (often Mon/Wed/Fri style) is enough for this companion approach. Rest days matter too.',
          },
          {
            type: 'list',
            items: [
              'Use beginner variations freely.',
              'Stop for sharp pain, dizziness, or severe weakness.',
              'Eat something after training when you can.',
            ],
          },
        ],
      },
      {
        id: 'faq-scale',
        title: 'How often should I weigh myself?',
        defaultOpen: false,
        blocks: [
          {
            type: 'paragraph',
            text: 'Only if it feels useful. Daily swings can be noisy. Some people prefer weekly checks or non-scale signals like energy, strength, and how clothes fit.',
          },
        ],
      },
      {
        id: 'faq-family-food',
        title: 'What if my family cooks differently?',
        defaultOpen: false,
        blocks: [
          {
            type: 'paragraph',
            text: 'Join familiar home meals when you can. Add yogurt, an egg, milk, fruit, or a shake if portions are small. You do not need a separate “special diet identity” for every plate.',
          },
          {
            type: 'examples',
            items: [
              {
                title: 'Family daal night',
                detail: 'Eat daal with roti or rice; add a spoon of ghee or a side of yogurt if it helps.',
              },
              {
                title: 'Light dinner served',
                detail: 'Finish what you can, then a bedtime snack of milk and dates.',
              },
            ],
          },
        ],
      },
      {
        id: 'faq-medical',
        title: 'Can Stronger replace a doctor?',
        defaultOpen: false,
        blocks: [
          {
            type: 'paragraph',
            text: 'No. Use Stronger as a calm companion for habits. For persistent poor appetite, early fullness, persistent abdominal symptoms, unexplained weight loss, severe weakness, dizziness/fainting, or other concerning symptoms, seek appropriate medical care.',
          },
        ],
      },
    ],
    checklist: [
      'Skim the questions that match your week',
      'Keep food-first habits',
      'Use Safety guidance when symptoms worry you',
    ],
  },
];
