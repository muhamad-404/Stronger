/**
 * Guide articles — Food
 */

/** @type {Array<object>} */
export const FOOD_ARTICLES = [
  {
    id: 'food-guide',
    categoryId: 'food',
    title: 'Food basics for healthy weight gain',
    summary:
      'Build meals around familiar foods, eat more often, and add gentle density — without calorie counting or pressure.',
    keywords: [
      'food guide',
      'meals',
      'snacks',
      'density',
      'protein',
      'consistency',
      'appetite',
    ],
    order: 1,
    sections: [
      {
        id: 'core-idea',
        title: 'The core idea',
        defaultOpen: true,
        blocks: [
          {
            type: 'paragraph',
            text: 'For healthy weight gain, food is about rhythm and nourishment: regular meals, planned snacks, and soft options for low-appetite days. Familiar home foods are usually easier to finish than unfamiliar “superfood” plates.',
          },
          {
            type: 'list',
            items: [
              'Eat more often rather than forcing huge plates.',
              'Include something protein-friendly most meals (eggs, daal, yogurt, milk, chicken, keema).',
              'Add gentle density: milk, peanut butter, cheese, nuts, a little ghee.',
              'Keep ready backups for busy or low-appetite days.',
            ],
          },
          {
            type: 'callout',
            tone: 'info',
            title: 'No calorie prescriptions',
            text: 'Stronger does not assign calorie targets. Focus on consistency and how meals feel in your body.',
          },
        ],
      },
      {
        id: 'plate-pattern',
        title: 'A friendly plate pattern',
        defaultOpen: false,
        blocks: [
          {
            type: 'examples',
            items: [
              {
                title: 'Lunch template',
                detail: 'Daal or chicken + roti or rice + yogurt or salad on the side if it feels good.',
              },
              {
                title: 'Soft template',
                detail: 'Khichdi or mashed potato + eggs or yogurt + fruit.',
              },
              {
                title: 'Busy template',
                detail: 'Bread with peanut butter or cheese + milk or yogurt + banana.',
              },
            ],
          },
          {
            type: 'callout',
            tone: 'tip',
            title: 'Start smaller',
            text: 'A few bites still count. Use a smaller bowl so the portion feels friendly, then add more if you want.',
          },
        ],
      },
      {
        id: 'what-to-explore-next',
        title: 'What to explore next',
        defaultOpen: false,
        blocks: [
          {
            type: 'list',
            items: [
              'Pakistani foods — home staples that fit this approach',
              'Easy meals — low-effort options',
              'Breakfast, lunch, dinner, snacks, and shakes — slot-by-slot ideas',
              'Food boosters and tea & appetite — small upgrades and chai timing',
            ],
          },
        ],
      },
    ],
    checklist: [
      'Choose one familiar meal pattern for most days',
      'Add one snack or shake between meals',
      'Keep 2–3 ready foods at home',
    ],
  },

  {
    id: 'pakistani-foods',
    categoryId: 'food',
    title: 'Pakistani & home foods that help',
    summary:
      'Everyday staples — daal, roti, eggs, yogurt, keema, khichdi, and more — used gently for nourishing weight gain.',
    keywords: [
      'pakistani',
      'daal',
      'roti',
      'keema',
      'khichdi',
      'yogurt',
      'home food',
      'desi',
    ],
    order: 2,
    sections: [
      {
        id: 'why-home-foods',
        title: 'Why home foods work well',
        defaultOpen: true,
        blocks: [
          {
            type: 'paragraph',
            text: 'Foods you already trust are easier to eat consistently. Pakistani home cooking offers soft lentils, rice, eggs, yogurt, and meat dishes that can support weight gain without needing special products.',
          },
          {
            type: 'callout',
            tone: 'tip',
            title: 'Cook once, use twice',
            text: 'Extra daal, keema, or khichdi in the fridge makes the next meal almost automatic.',
          },
        ],
      },
      {
        id: 'staple-ideas',
        title: 'Staple ideas',
        defaultOpen: false,
        blocks: [
          {
            type: 'examples',
            items: [
              {
                title: 'Daal and roti',
                detail: 'Warm daal with roti or rice; add a spoon of ghee or a side of yogurt when appetite allows.',
              },
              {
                title: 'Eggs',
                detail: 'Soft scrambled, omelette, or boiled — quick protein with bread or paratha.',
              },
              {
                title: 'Keema',
                detail: 'Keema with soft roti or rice; leftover keema makes an easy next-day plate.',
              },
              {
                title: 'Khichdi',
                detail: 'Gentle when chewing or fullness feels hard; pair with yogurt if you like.',
              },
              {
                title: 'Yogurt (dahi)',
                detail: 'Plain or with fruit and crushed nuts; cool and easy between meals.',
              },
              {
                title: 'Dates and milk',
                detail: 'Two or three dates with milk for a familiar evening or mid-day boost.',
              },
            ],
          },
        ],
      },
      {
        id: 'spice-and-oil',
        title: 'Spice, oil, and comfort',
        defaultOpen: false,
        blocks: [
          {
            type: 'paragraph',
            text: 'Mild seasoning is fine. Very spicy or heavily oily plates can unsettle some people when appetite is already low — choose the version your stomach trusts.',
          },
          {
            type: 'list',
            items: [
              'A little ghee or butter on daal or roti can add density without a huge volume.',
              'Cool yogurt can balance a warmer plate.',
              'Rotate staples so boredom does not stall you.',
            ],
          },
        ],
      },
    ],
    checklist: [
      'List 5 home foods you already finish',
      'Cook one batch dish this week (daal, keema, or khichdi)',
      'Pair one meal with yogurt or milk',
    ],
  },

  {
    id: 'easy-meals',
    categoryId: 'food',
    title: 'Easy meals when energy is low',
    summary:
      'Low-cook, soft, and ready options for busy days, tired evenings, and quiet appetite.',
    keywords: [
      'easy meals',
      'quick',
      'low energy',
      'no cook',
      'leftovers',
      'soft foods',
    ],
    order: 3,
    sections: [
      {
        id: 'keep-it-simple',
        title: 'Keep it simple',
        defaultOpen: true,
        blocks: [
          {
            type: 'paragraph',
            text: 'When cooking feels heavy, the goal is nourishment with the least friction. Soft textures and ready items often win.',
          },
          {
            type: 'list',
            items: [
              'Yogurt with banana or honey',
              'Peanut butter on toast or roti',
              'Leftover daal heated with rice',
              'Eggs and bread',
              'Banana shake or milk with dates',
              'Cheese sandwich',
            ],
          },
        ],
      },
      {
        id: '15-minute-ideas',
        title: 'Fifteen-minute ideas',
        defaultOpen: false,
        blocks: [
          {
            type: 'examples',
            items: [
              {
                title: 'Soft scramble plate',
                detail: 'Scramble eggs, warm leftover roti, add a spoon of butter if it feels good.',
              },
              {
                title: 'Khichdi bowl',
                detail: 'Quick khichdi or leftover rice with daal mashed together; yogurt on the side.',
              },
              {
                title: 'Snack plate dinner',
                detail: 'Bread, cheese, yogurt, banana, and a few nuts — not fancy, still counts.',
              },
            ],
          },
          {
            type: 'callout',
            tone: 'tip',
            title: 'Stock the easy shelf',
            text: 'Keep yogurt, milk, bananas, dates, peanut butter, bread, and eggs available most weeks.',
          },
        ],
      },
      {
        id: 'when-cooking-is-shared',
        title: 'When someone else cooks',
        defaultOpen: false,
        blocks: [
          {
            type: 'paragraph',
            text: 'If family meals are already happening, join what is served and add a side if you need more: yogurt, an egg, milk, or fruit afterward.',
          },
          {
            type: 'list',
            items: [
              'Ask for a milder portion if spice is intense.',
              'Save leftovers for tomorrow’s easy lunch.',
              'Add a shake later if the plate felt small.',
            ],
          },
        ],
      },
    ],
    checklist: [
      'Write your top 3 no-cook options',
      'Restock easy shelf items',
      'Use leftovers for one meal this week',
    ],
  },

  {
    id: 'breakfast',
    categoryId: 'food',
    title: 'Breakfast ideas',
    summary:
      'Warm, soft, and familiar breakfasts that start the day without forcing a huge plate.',
    keywords: [
      'breakfast',
      'eggs',
      'oats',
      'paratha',
      'yogurt',
      'sooji',
      'morning',
    ],
    order: 4,
    sections: [
      {
        id: 'why-breakfast',
        title: 'Why breakfast helps',
        defaultOpen: true,
        blocks: [
          {
            type: 'paragraph',
            text: 'A morning meal opens the day’s eating window. Even a small breakfast can make snacks and lunch easier later.',
          },
          {
            type: 'callout',
            tone: 'tip',
            title: 'If mornings are hard',
            text: 'Start with milk, yogurt, or a banana. Build up to eggs or oats when it feels easier.',
          },
        ],
      },
      {
        id: 'breakfast-examples',
        title: 'Practical examples',
        defaultOpen: false,
        blocks: [
          {
            type: 'examples',
            items: [
              {
                title: 'Eggs with paratha or roti',
                detail: 'Scrambled or fried eggs with one warm roti or paratha.',
              },
              {
                title: 'Omelette and bread',
                detail: 'Soft omelette with toast; optional onion or tomato.',
              },
              {
                title: 'Oats with milk, banana, dates',
                detail: 'Creamy oats cooked in milk; fruit on top.',
              },
              {
                title: 'Yogurt with fruit and nuts',
                detail: 'Cool dahi bowl with seasonal fruit and a small handful of nuts.',
              },
              {
                title: 'Sooji with milk',
                detail: 'Soft homemade sooji — comforting when chewing feels hard.',
              },
            ],
          },
        ],
      },
      {
        id: 'breakfast-rhythm',
        title: 'Make it a rhythm',
        defaultOpen: false,
        blocks: [
          {
            type: 'list',
            items: [
              'Pick two breakfasts you actually like and rotate them.',
              'Prep fruit or soak oats the night before if mornings are rushed.',
              'Leave a gap after a large sweet chai before eating if tea blunts your appetite.',
            ],
          },
        ],
      },
    ],
    checklist: [
      'Choose a default weekday breakfast',
      'Keep eggs or yogurt ready for mornings',
      'Try one soft option for low-appetite days',
    ],
  },

  {
    id: 'lunch',
    categoryId: 'food',
    title: 'Lunch ideas',
    summary:
      'Midday plates built on daal, rice, roti, eggs, and leftovers — steady fuel without perfection.',
    keywords: ['lunch', 'daal', 'rice', 'roti', 'chicken', 'leftovers', 'midday'],
    order: 5,
    sections: [
      {
        id: 'lunch-role',
        title: 'What lunch is for',
        defaultOpen: true,
        blocks: [
          {
            type: 'paragraph',
            text: 'Lunch anchors the middle of the day. Aim for something familiar and complete enough that you are not empty for hours afterward.',
          },
          {
            type: 'list',
            items: [
              'Include a soft base: rice, roti, or khichdi.',
              'Add a protein-friendly side: daal, eggs, chicken, keema, or yogurt.',
              'If the meal is small, plan an afternoon snack or shake.',
            ],
          },
        ],
      },
      {
        id: 'lunch-examples',
        title: 'Practical examples',
        defaultOpen: false,
        blocks: [
          {
            type: 'examples',
            items: [
              {
                title: 'Daal, rice, yogurt',
                detail: 'Classic and gentle; add a little ghee if it suits you.',
              },
              {
                title: 'Chicken or keema with roti',
                detail: 'A warm plate with soft bread; leftovers help tomorrow.',
              },
              {
                title: 'Egg lunch',
                detail: 'Two eggs with bread or leftover sabzi and roti.',
              },
              {
                title: 'Leftover remix',
                detail: 'Last night’s daal or keema reheated with fresh yogurt.',
              },
            ],
          },
        ],
      },
      {
        id: 'away-from-home',
        title: 'Away from home',
        defaultOpen: false,
        blocks: [
          {
            type: 'paragraph',
            text: 'If you eat at university, work, or a relative’s house, choose the mildest available option and add a packed backup when you can.',
          },
          {
            type: 'list',
            items: [
              'Pack a banana, yogurt, or peanut butter sandwich.',
              'Prefer milder curries when spice is intense.',
              'Sip a shake later if lunch was light.',
            ],
          },
        ],
      },
    ],
    checklist: [
      'Decide a default lunch pattern',
      'Use leftovers once this week',
      'Pair lunch with an afternoon snack plan',
    ],
  },

  {
    id: 'dinner',
    categoryId: 'food',
    title: 'Dinner ideas',
    summary:
      'Evening meals that are satisfying but not overwhelming — with room for a bedtime snack if you need it.',
    keywords: ['dinner', 'evening', 'khichdi', 'keema', 'chicken', 'roti', 'family meal'],
    order: 6,
    sections: [
      {
        id: 'dinner-approach',
        title: 'A calm dinner approach',
        defaultOpen: true,
        blocks: [
          {
            type: 'paragraph',
            text: 'Dinner can be the day’s biggest meal or a softer plate if appetite is quieter at night. Either way, avoid skipping it completely when you can help it.',
          },
          {
            type: 'callout',
            tone: 'tip',
            title: 'Leave room for a snack',
            text: 'If a full dinner feels hard, eat a smaller plate and keep milk, dates, or yogurt for later.',
          },
        ],
      },
      {
        id: 'dinner-examples',
        title: 'Practical examples',
        defaultOpen: false,
        blocks: [
          {
            type: 'examples',
            items: [
              {
                title: 'Khichdi night',
                detail: 'Soft khichdi with yogurt — ideal when energy is low.',
              },
              {
                title: 'Keema or chicken with rice/roti',
                detail: 'A familiar family-style plate; save leftovers.',
              },
              {
                title: 'Daal and sabzi',
                detail: 'Daal with a mild vegetable and roti; add an egg if the plate feels light.',
              },
              {
                title: 'Simple egg dinner',
                detail: 'Omelette or scrambled eggs with bread when cooking capacity is gone.',
              },
            ],
          },
        ],
      },
      {
        id: 'after-dinner',
        title: 'After dinner',
        defaultOpen: false,
        blocks: [
          {
            type: 'list',
            items: [
              'A short walk can help you feel settled, not stuffed.',
              'Optional bedtime snack: warm milk, dates, yogurt, or toast.',
              'Very late heavy spice or huge sweet chai may disturb sleep for some people — notice your pattern.',
            ],
          },
        ],
      },
    ],
    checklist: [
      'Choose one soft dinner for hard days',
      'Keep a bedtime snack option ready',
      'Save one leftover portion for lunch',
    ],
  },

  {
    id: 'snacks',
    categoryId: 'food',
    title: 'Snacks that bridge the gaps',
    summary:
      'Small, planned snacks between meals so you do not rely on a single huge hunger signal.',
    keywords: [
      'snacks',
      'between meals',
      'dates',
      'nuts',
      'yogurt',
      'cheese',
      'banana',
    ],
    order: 7,
    sections: [
      {
        id: 'why-snacks',
        title: 'Why snacks matter',
        defaultOpen: true,
        blocks: [
          {
            type: 'paragraph',
            text: 'Many people with quiet appetite never feel “starving.” Planned snacks create more chances to nourish without waiting for a big hunger cue.',
          },
          {
            type: 'list',
            items: [
              'Morning snack between breakfast and lunch',
              'Afternoon snack between lunch and dinner',
              'Optional bedtime snack',
            ],
          },
        ],
      },
      {
        id: 'snack-examples',
        title: 'Snack ideas',
        defaultOpen: false,
        blocks: [
          {
            type: 'examples',
            items: [
              {
                title: 'Banana and peanut butter',
                detail: 'Simple, portable, and filling in a gentle way.',
              },
              {
                title: 'Yogurt cup',
                detail: 'Plain or with fruit and crushed nuts.',
              },
              {
                title: 'Dates with milk',
                detail: 'Two or three dates plus a glass of milk.',
              },
              {
                title: 'Cheese and bread',
                detail: 'A few bites of cheese with roti or toast.',
              },
              {
                title: 'Handful of nuts',
                detail: 'Small portion — easy to keep in a bag.',
              },
            ],
          },
          {
            type: 'callout',
            tone: 'info',
            title: 'Snacks vs replacing meals',
            text: 'Snacks support meals; they do not have to replace them. If a meal is missed, a snack still helps — then return to the next mealtime.',
          },
        ],
      },
      {
        id: 'snack-habit',
        title: 'Make snacks automatic',
        defaultOpen: false,
        blocks: [
          {
            type: 'checklist',
            items: [
              'Put a snack near your study or work space',
              'Set a soft reminder for afternoon if you forget',
              'Prefer ready options over snack plans that need cooking',
            ],
          },
        ],
      },
    ],
    checklist: [
      'Add one snack slot you usually skip',
      'Stock two portable snacks',
      'Try dates + milk once this week',
    ],
  },

  {
    id: 'shakes',
    categoryId: 'food',
    title: 'Nourishing shakes',
    summary:
      'Homemade milk or yogurt shakes that bridge gaps when solid food feels heavy — sip slowly, no fancy powders required.',
    keywords: [
      'shakes',
      'smoothie',
      'banana shake',
      'milk',
      'yogurt',
      'peanut butter',
      'drink',
    ],
    order: 8,
    sections: [
      {
        id: 'shake-role',
        title: 'When shakes help',
        defaultOpen: true,
        blocks: [
          {
            type: 'paragraph',
            text: 'A homemade shake can be a snack, a breakfast helper, or a post-workout option when chewing feels like too much. Sip slowly between meals rather than chugging right before a big plate.',
          },
          {
            type: 'callout',
            tone: 'info',
            title: 'No high-dose supplement focus',
            text: 'Stronger emphasizes real foods: milk, yogurt, banana, dates, peanut butter. It does not push high-dose powders or “miracle” blends.',
          },
        ],
      },
      {
        id: 'shake-examples',
        title: 'Simple shake ideas',
        defaultOpen: false,
        blocks: [
          {
            type: 'examples',
            items: [
              {
                title: 'Classic banana milkshake',
                detail: 'Banana + milk; optional honey. Blend until smooth.',
              },
              {
                title: 'Peanut butter banana',
                detail: 'Banana + milk + a spoon of peanut butter.',
              },
              {
                title: 'Yogurt fruit shake',
                detail: 'Yogurt + milk or water + seasonal fruit.',
              },
              {
                title: 'Dates milk blend',
                detail: 'Soaked dates blended with milk for natural sweetness.',
              },
            ],
          },
        ],
      },
      {
        id: 'shake-timing',
        title: 'Timing tips',
        defaultOpen: false,
        blocks: [
          {
            type: 'list',
            items: [
              'Use shakes between meals when solids feel heavy.',
              'After training, a shake can be an easy recovery snack.',
              'If a shake fills you too much before lunch or dinner, move it earlier or make it smaller.',
            ],
          },
        ],
      },
    ],
    checklist: [
      'Pick one shake recipe you like',
      'Keep bananas and milk available',
      'Use a shake on one low-appetite afternoon',
    ],
  },

  {
    id: 'food-boosters',
    categoryId: 'food',
    title: 'Gentle food boosters',
    summary:
      'Small add-ons — milk, peanut butter, cheese, nuts, eggs, ghee, dates, banana — that increase nourishment without huge volumes.',
    keywords: [
      'boosters',
      'peanut butter',
      'ghee',
      'cheese',
      'nuts',
      'milk',
      'dates',
      'density',
    ],
    order: 9,
    sections: [
      {
        id: 'booster-idea',
        title: 'Add, don’t overhaul',
        defaultOpen: true,
        blocks: [
          {
            type: 'paragraph',
            text: 'Boosters are small additions to foods you already eat. They help when large portions feel impossible. Use them gently — not as extreme “force feed” tactics.',
          },
          {
            type: 'callout',
            tone: 'caution',
            title: 'Keep amounts reasonable',
            text: 'A spoon of peanut butter or a little ghee is the spirit. Huge piles of oil or extreme portions are not the Stronger approach.',
          },
        ],
      },
      {
        id: 'booster-list',
        title: 'Booster menu',
        defaultOpen: false,
        blocks: [
          {
            type: 'examples',
            items: [
              {
                title: 'Milk or yogurt',
                detail: 'Add to oats and shakes, or sip beside a small meal.',
              },
              {
                title: 'Nuts and peanuts',
                detail: 'A small handful as a snack, or crushed over yogurt and fruit.',
              },
              {
                title: 'Peanut butter',
                detail: 'Spread on toast or blend into a banana shake.',
              },
              {
                title: 'Cheese',
                detail: 'A few bites with bread between meals.',
              },
              {
                title: 'Eggs',
                detail: 'Soft scrambled or omelette when you want protein without a heavy curry.',
              },
              {
                title: 'A little ghee or butter',
                detail: 'On daal, rice, or roti — small amounts.',
              },
              {
                title: 'Dates',
                detail: 'Two or three with milk for a quick, familiar boost.',
              },
              {
                title: 'Banana',
                detail: 'Alone, with peanut butter, or in a shake.',
              },
            ],
          },
        ],
      },
      {
        id: 'how-to-use-boosters',
        title: 'How to use them',
        defaultOpen: false,
        blocks: [
          {
            type: 'checklist',
            items: [
              'Add one booster to a meal you already eat',
              'Keep boosters visible (not buried in a cupboard)',
              'Rotate so you do not get bored of the same add-on',
            ],
          },
        ],
      },
    ],
    checklist: [
      'Choose 2 boosters to keep stocked',
      'Add one booster to today’s meal',
      'Avoid extreme oil-loading tactics',
    ],
  },

  {
    id: 'tea-appetite',
    categoryId: 'food',
    title: 'Tea, chai, and appetite',
    summary:
      'How to keep enjoying chai without letting large sweet cups crowd out meals — practical timing, not a ban.',
    keywords: [
      'tea',
      'chai',
      'appetite',
      'timing',
      'sweet tea',
      'meals',
      'caffeine',
    ],
    order: 10,
    sections: [
      {
        id: 'tea-balance',
        title: 'You can still drink tea',
        defaultOpen: true,
        blocks: [
          {
            type: 'paragraph',
            text: 'Chai is part of many Pakistani and home routines. Stronger does not say “never drink tea.” The useful skill is noticing whether a large, very sweet cup right before a meal makes food harder.',
          },
          {
            type: 'callout',
            tone: 'info',
            title: 'Common pattern',
            text: 'For some people, big sweet chai close to mealtime blunts appetite. Shifting tea a little earlier — or keeping the cup smaller — can help meals feel easier.',
          },
        ],
      },
      {
        id: 'practical-tweaks',
        title: 'Practical tweaks',
        defaultOpen: false,
        blocks: [
          {
            type: 'list',
            items: [
              'Enjoy chai between meals rather than as a meal replacement.',
              'If appetite dips before lunch or dinner, leave a short gap after tea before eating.',
              'Try a smaller cup or slightly less sugar when you are working on meal size.',
              'Pair afternoon chai with a small snack (dates, biscuit with milk, or yogurt) if tea alone fills you.',
            ],
          },
          {
            type: 'examples',
            items: [
              {
                title: 'Morning',
                detail: 'Tea after a bite of breakfast, or breakfast first if tea usually replaces food.',
              },
              {
                title: 'Evening',
                detail: 'If late sweet chai disturbs sleep or late appetite, move it earlier.',
              },
            ],
          },
        ],
      },
      {
        id: 'tea-mindset',
        title: 'Keep it kind',
        defaultOpen: false,
        blocks: [
          {
            type: 'paragraph',
            text: 'This is about awareness, not restriction culture. Tea can stay in your day. Meals need a fair chance too.',
          },
        ],
      },
    ],
    checklist: [
      'Notice whether pre-meal chai reduces your appetite',
      'Try shifting one cup earlier this week',
      'Keep tea, keep meals — adjust timing if needed',
    ],
  },
];
