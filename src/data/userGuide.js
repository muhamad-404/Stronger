/**
 * End-user how-to guide for Stronger.
 * Plain language — how to use the app, not medical advice.
 */

/**
 * @typedef {{ type: 'p', text: string }} UserGuideParagraph
 * @typedef {{ type: 'ul' | 'ol', items: string[] }} UserGuideList
 * @typedef {{ type: 'callout', tone?: 'info' | 'tip' | 'caution', title?: string, text: string }} UserGuideCallout
 * @typedef {{ type: 'link', to: string, label: string }} UserGuideLink
 * @typedef {{ type: 'steps', items: { title: string, body: string }[] }} UserGuideSteps
 * @typedef {UserGuideParagraph | UserGuideList | UserGuideCallout | UserGuideLink | UserGuideSteps} UserGuideBlock
 * @typedef {{ id: string, title: string, summary: string, blocks: UserGuideBlock[] }} UserGuideSection
 */

/** @type {UserGuideSection[]} */
export const USER_GUIDE_SECTIONS = [
  {
    id: 'welcome',
    title: 'Welcome to Stronger',
    summary: 'What this app is for, and what it is not.',
    blocks: [
      {
        type: 'p',
        text: 'Stronger is a gentle companion for healthy weight gain. It helps you plan meals with familiar home foods, do simple strength training at home, sleep a little more steadily, and notice progress over weeks — without calorie counting, diets that feel punishing, or guilt when a day is imperfect.',
      },
      {
        type: 'p',
        text: 'The app is designed to feel calm and practical. You use it on your phone (or computer) in the browser. You can also install it like an app on your home screen.',
      },
      {
        type: 'callout',
        tone: 'info',
        title: 'Not medical advice',
        text: 'Stronger shares practical habits and ideas. It does not diagnose illness, prescribe medicine, or replace a doctor, dietitian, or other healthcare professional. If you have concerning symptoms, unexplained weight loss, pain, dizziness, or anything that worries you, please talk with a professional.',
      },
      {
        type: 'ul',
        items: [
          'No calorie targets or food “scores.”',
          'Focus on consistency: regular meals, gentle strength, sleep, and patience.',
          'Pakistani and home-style food ideas sit beside everyday options like eggs, yogurt, oats, and shakes.',
          'Hard days are expected — the Problem solver and Guide are there when things feel stuck.',
        ],
      },
    ],
  },
  {
    id: 'before-you-start',
    title: 'Things to know before you start',
    summary: 'Privacy, where your data lives, and how to keep it safe.',
    blocks: [
      {
        type: 'p',
        text: 'Everything you enter — weight, food, workouts, sleep, notes — stays on this device in your browser. Stronger does not upload your personal health or progress data to a server.',
      },
      {
        type: 'callout',
        tone: 'caution',
        title: 'Protect your progress',
        text: 'Because data lives on this device, clearing site data, uninstalling the browser, switching phones without a backup, or running out of storage can erase your history. Export a backup regularly from More → Settings → Data & backup.',
      },
      {
        type: 'ul',
        items: [
          'Use the same browser (and same phone/computer) when you can.',
          'Export a backup file every week or two and keep it somewhere safe (Downloads, Files, cloud folder you control).',
          'If you get a new phone, import that backup file before you start fresh.',
          'Stronger works offline for daily use once the page has loaded; install it for easier access.',
        ],
      },
    ],
  },
  {
    id: 'first-setup',
    title: 'First-time setup',
    summary: 'The short questions you answer when you open Stronger for the first time.',
    blocks: [
      {
        type: 'p',
        text: 'The first time you open Stronger, you go through a short setup. Answer honestly — you can change most of this later in Settings.',
      },
      {
        type: 'steps',
        items: [
          {
            title: 'Your name',
            body: 'A preferred name so Today can greet you warmly. It stays on this device.',
          },
          {
            title: 'Current weight',
            body: 'Your starting weight in kilograms. This begins your weight history.',
          },
          {
            title: 'Height',
            body: 'Optional context for your profile. You can update it later.',
          },
          {
            title: 'Goal weight',
            body: 'Where you hope to move toward over time. Stronger also suggests a gentler first milestone so the path feels reachable.',
          },
          {
            title: 'Wake and bedtime',
            body: 'Rough times you usually wake and sleep. These shape your daily routine checklist and sleep defaults.',
          },
          {
            title: 'Confirm and begin',
            body: 'Review your answers, finish setup, and land on Today — your home screen.',
          },
        ],
      },
      {
        type: 'callout',
        tone: 'tip',
        text: 'If you leave mid-setup, Stronger tries to remember where you were so you can continue later on the same device.',
      },
    ],
  },
  {
    id: 'navigation',
    title: 'How to move around the app',
    summary: 'The five tabs at the bottom and the More menu.',
    blocks: [
      {
        type: 'p',
        text: 'At the bottom of the screen you will see five tabs. That is your main map of Stronger.',
      },
      {
        type: 'ul',
        items: [
          'Today — your daily checklist, weight snapshot, tips, and shortcuts.',
          'Eat — food ideas, today’s food log, low-appetite help, and boosters.',
          'Move — Workout A, Workout B, today’s plan, and live workout sessions.',
          'Progress — weight chart, consistency, journal check-in, weekly review entry.',
          'More — Problem solver, Sleep, Weekly review, Guide, Goals, Settings, and this User guide.',
        ],
      },
      {
        type: 'p',
        text: 'Inside Eat and Move, use the back links at the top to return to the section home. Inside Settings and many More pages, use the back link to return to More or Settings.',
      },
    ],
  },
  {
    id: 'today',
    title: 'Today — your daily home',
    summary: 'Check off your rhythm, use shortcuts, and see the week at a glance.',
    blocks: [
      {
        type: 'p',
        text: 'Today is where most days should begin. It shows a greeting, how your weight is trending toward your first milestone, and a simple checklist for the day.',
      },
      {
        type: 'steps',
        items: [
          {
            title: 'Weight progress card',
            body: 'A calm look at where you are versus your starting point and first milestone. Detailed logging lives under Progress.',
          },
          {
            title: 'Today checklist',
            body: 'Tap each row (meals, snacks, workout or rest, sleep cues, and similar items based on your routine) to mark it done. Partial days still count — consistency beats perfection.',
          },
          {
            title: 'Daily progress',
            body: 'Shows how many checklist items you finished today.',
          },
          {
            title: 'Quick actions',
            body: 'Jump straight to logging food, logging weight, starting a workout, opening Need help (Problem solver), or adding a short note for today.',
          },
          {
            title: 'Tip of the day',
            body: 'A small practical nudge — open it when you want inspiration, skip it when you do not.',
          },
          {
            title: 'Weekly consistency',
            body: 'A simple view of recent days so you can see rhythm without obsessing over one off day.',
          },
        ],
      },
      {
        type: 'link',
        to: '/',
        label: 'Open Today',
      },
    ],
  },
  {
    id: 'eat',
    title: 'Eat — food without calorie counting',
    summary: 'Log meals, browse ideas, and get help when appetite is low.',
    blocks: [
      {
        type: 'p',
        text: 'Eat is your food home. Stronger never asks you to count calories. Instead it helps you notice meals and snacks, pick familiar foods, and keep going on low-appetite days.',
      },
      {
        type: 'steps',
        items: [
          {
            title: 'Food home',
            body: 'See today’s meal and snack consistency at a glance, open the full food log, or jump into breakfast, lunch, dinner, snacks, shakes, and more.',
          },
          {
            title: 'Appetite is low?',
            body: 'The peach-colored banner at the top of Eat opens gentle ideas and softer foods when eating feels hard.',
          },
          {
            title: 'Food log (Today’s log)',
            body: 'Open “Open log” or “Food log.” Switch dates if you need to fix yesterday. Add foods with Add, mark items eaten, edit or remove entries, and use meal ideas to add a suggested meal quickly.',
          },
          {
            title: 'Browse meal ideas',
            body: 'Browse by category (breakfast, lunch, dinner, snacks, and so on). Open a meal to read ingredients and notes, then add it to your log when it fits.',
          },
          {
            title: 'Boosters',
            body: 'Simple ways to make meals more nourishing (for example adding milk, nuts, oil, or yogurt) without forcing huge portions.',
          },
          {
            title: 'Food problems',
            body: 'Shortcuts into common food struggles; deeper help also lives in Problem solver and the Guide articles.',
          },
        ],
      },
      {
        type: 'callout',
        tone: 'tip',
        title: 'A good food day',
        text: 'Aim for regular meals and snacks you can actually finish or mostly finish. If you only manage a shake and a few bites, log that honestly — it still helps you see patterns.',
      },
      {
        type: 'link',
        to: '/eat',
        label: 'Open Eat',
      },
    ],
  },
  {
    id: 'move',
    title: 'Move — gentle strength at home',
    summary: 'Workout A and B, rest days, and how to run a session.',
    blocks: [
      {
        type: 'p',
        text: 'Move is built around about three gentle strength sessions a week — not hard cardio. Two programs alternate: Workout A and Workout B. Rest days are part of the plan.',
      },
      {
        type: 'steps',
        items: [
          {
            title: 'Train kindly reminder',
            body: 'Read the safety points on the Move home. Stop if something feels sharp or wrong, and seek professional advice when needed.',
          },
          {
            title: 'Today’s plan',
            body: 'Shows whether today is a workout day or a rest day. On workout days you can open the workout or tap Start workout.',
          },
          {
            title: 'Workout A and Workout B',
            body: 'Open either program to see the full list of exercises. Tap an exercise for how-to guidance.',
          },
          {
            title: 'Running a session',
            body: 'Start the session, check off sets as you go, note what you actually did if it differs from the target, mark exercises complete, then finish the workout so it saves to your history.',
          },
          {
            title: 'Rest days',
            body: 'No strength session is required. A gentle walk is optional. Recovery supports progress as much as training.',
          },
        ],
      },
      {
        type: 'callout',
        tone: 'info',
        title: 'Missed a workout?',
        text: 'Do not punish yourself with a double session. Open Problem solver → “I missed my workout” or simply do the next scheduled day when you can.',
      },
      {
        type: 'link',
        to: '/move',
        label: 'Open Move',
      },
    ],
  },
  {
    id: 'progress',
    title: 'Progress — trends, not daily pressure',
    summary: 'Weight, goals, consistency, journal, and the weekly review doorway.',
    blocks: [
      {
        type: 'p',
        text: 'Progress shows the bigger picture. Weight moves slowly and can bounce day to day — Stronger emphasizes trends and consistency, not one weigh-in.',
      },
      {
        type: 'steps',
        items: [
          {
            title: 'Log weight',
            body: 'Use Log weight on the summary card. Weigh at a similar time of day when you can (for example morning). One skipped day is fine.',
          },
          {
            title: 'Weight chart',
            body: 'A simple chart of recent weigh-ins so you can see direction over time.',
          },
          {
            title: 'Goals snapshot',
            body: 'Edit your main weight-related goals here, or open the full Goals page for food, strength, sleep, and routine goals.',
          },
          {
            title: 'Consistency',
            body: 'How steadily you have been logging food, movement, and related habits — a rhythm check, not a grade.',
          },
          {
            title: 'Journal check-in',
            body: 'Quickly rate energy and appetite, note sleep hours/quality, and leave a short note for today.',
          },
          {
            title: 'Weekly review',
            body: 'Open the full weekly review to look back calmly and write a short reflection.',
          },
        ],
      },
      {
        type: 'link',
        to: '/progress',
        label: 'Open Progress',
      },
    ],
  },
  {
    id: 'more',
    title: 'More — help, sleep, guide, goals, settings',
    summary: 'Everything that is not in the main four tabs.',
    blocks: [
      {
        type: 'p',
        text: 'More is the hub for tools you use as needed: Problem solver, Sleep & recovery, Weekly review, Guide (articles), Goals, Settings, and this User guide.',
      },
      {
        type: 'ul',
        items: [
          'Use Problem solver when today feels stuck.',
          'Use Sleep to log nights and see your week.',
          'Use Weekly review once a week for reflection.',
          'Use Guide when you want to learn (food, training, sleep, hard days, safety).',
          'Use Goals to track more than weight alone.',
          'Use Settings to update profile, routine, backups, and install options.',
        ],
      },
      {
        type: 'link',
        to: '/more',
        label: 'Open More',
      },
    ],
  },
  {
    id: 'solver',
    title: 'Problem solver — help for hard moments',
    summary: 'Pick what is going on and get calm next steps.',
    blocks: [
      {
        type: 'p',
        text: 'When appetite is quiet, a meal is missed, energy is low, or the week went sideways, open Problem solver. Choose the situation that fits best. You will see things to try today, what to try next, what not to worry about, and when it may be wise to seek professional advice.',
      },
      {
        type: 'p',
        text: 'Situations include: not feeling hungry, feeling full quickly, not finishing a meal, missing a meal, feeling too tired to exercise, missing a workout, sleeping badly, not having time to cook, not knowing what to eat, struggling to eat enough, and a disrupted routine.',
      },
      {
        type: 'callout',
        tone: 'tip',
        title: 'How to use it well',
        text: 'Pick one small action from “try this today.” Do not try to fix everything at once. Related Guide articles appear at the bottom when you want to read more.',
      },
      {
        type: 'link',
        to: '/solver',
        label: 'Open Problem solver',
      },
    ],
  },
  {
    id: 'sleep',
    title: 'Sleep & recovery',
    summary: 'Log bedtime, wake time, and quality; see your week.',
    blocks: [
      {
        type: 'p',
        text: 'Sleep supports appetite, energy, and training. Open Sleep & recovery from More. Log tonight or last night with bedtime, wake time, and how the night felt. Your week view shows rhythm without demanding perfect nights.',
      },
      {
        type: 'ul',
        items: [
          'Use your usual wake and bed times from setup as a starting point.',
          'A rough log is better than none — estimate if you must.',
          'Read the practical habits on the page, or open the full sleep article in Guide.',
          'If you slept badly, Problem solver has a dedicated path.',
        ],
      },
      {
        type: 'link',
        to: '/sleep',
        label: 'Open Sleep & recovery',
      },
    ],
  },
  {
    id: 'weekly-review',
    title: 'Weekly review',
    summary: 'A calm look at the week, then a short reflection.',
    blocks: [
      {
        type: 'p',
        text: 'Once a week (for example Sunday evening or Monday morning), open Weekly review from More or Progress. Stronger summarizes weight change, food consistency, workouts, and sleep for that week.',
      },
      {
        type: 'steps',
        items: [
          {
            title: 'Browse weeks',
            body: 'Move to previous weeks if you want history. The current week updates as you keep logging.',
          },
          {
            title: 'Read the metrics',
            body: 'Treat them as information, not a score. Flat weight weeks happen. Missed workouts happen.',
          },
          {
            title: 'Write a reflection',
            body: 'What went well, what was difficult, what you might change next, optional notes, and a focus for next week.',
          },
          {
            title: 'Save',
            body: 'Save so your reflection stays with that week on this device.',
          },
        ],
      },
      {
        type: 'link',
        to: '/review',
        label: 'Open Weekly review',
      },
    ],
  },
  {
    id: 'guide',
    title: 'Guide — articles to learn from',
    summary: 'How the Guide differs from this User guide.',
    blocks: [
      {
        type: 'p',
        text: 'The Guide (under More) is a library of practical articles: getting started, food, training, sleep, hard days, progress questions, and safety. Search or browse by topic. Expand sections inside an article to read more.',
      },
      {
        type: 'ul',
        items: [
          'This User guide (the page you are reading) explains how to use Stronger’s screens and flows.',
          'The Guide explains healthy habits, meal ideas, training kindness, and what to do when life is hard.',
          'Use both: User guide when you are lost in the app; Guide when you want advice about food, sleep, or training.',
        ],
      },
      {
        type: 'link',
        to: '/guide',
        label: 'Open Guide',
      },
    ],
  },
  {
    id: 'goals',
    title: 'Goals — more than the scale',
    summary: 'Create and track goals for food, strength, sleep, and routine.',
    blocks: [
      {
        type: 'p',
        text: 'Goals live under More (and are linked from Progress). Weight goals matter, but Stronger also encourages goals like regular breakfasts, finishing workouts, steadier sleep, or a calmer routine.',
      },
      {
        type: 'steps',
        items: [
          {
            title: 'Add a goal',
            body: 'Tap add, choose a type, write a clear title, and set a simple target you can measure.',
          },
          {
            title: 'Update progress',
            body: 'Open a goal and update how far along you are as the week goes.',
          },
          {
            title: 'Celebrate completion',
            body: 'When a goal completes, acknowledge it — then set a new gentle goal if you like.',
          },
          {
            title: 'Completed list',
            body: 'You can show past completed goals so wins are not forgotten.',
          },
        ],
      },
      {
        type: 'link',
        to: '/goals',
        label: 'Open Goals',
      },
    ],
  },
  {
    id: 'settings',
    title: 'Settings — profile, routine, data, and app',
    summary: 'Change your details, protect backups, and install Stronger.',
    blocks: [
      {
        type: 'p',
        text: 'Open More → Settings. Your details stay on this device.',
      },
      {
        type: 'steps',
        items: [
          {
            title: 'Profile',
            body: 'Update name, height, weight-related details, and goal weight when life changes.',
          },
          {
            title: 'Goals (settings)',
            body: 'Adjust milestone-style weight goals connected to your profile.',
          },
          {
            title: 'Routine',
            body: 'Change wake time and bedtime so Today and Sleep match your real life.',
          },
          {
            title: 'Data & backup',
            body: 'Export a backup file, import a previous backup, see storage notes, or clear all local data (this resets the app — export first).',
          },
          {
            title: 'App',
            body: 'Install Stronger to your home screen when your browser offers it, and read about privacy and the app.',
          },
        ],
      },
      {
        type: 'callout',
        tone: 'caution',
        title: 'Clearing data',
        text: 'Clear all data erases progress on this device and returns you to setup. Only do this if you mean to start over — and only after exporting a backup if you might want the old data later.',
      },
      {
        type: 'link',
        to: '/settings',
        label: 'Open Settings',
      },
    ],
  },
  {
    id: 'daily-rhythm',
    title: 'A simple daily rhythm',
    summary: 'How a typical day can look when using Stronger well.',
    blocks: [
      {
        type: 'ol',
        items: [
          'Open Today. Check your greeting and checklist.',
          'Eat breakfast (or a shake / soft option). Log it in Eat.',
          'Through the day: log lunch, dinner, and snacks when you can. Use Browse if you need ideas.',
          'On a workout day: open Move → Start workout. On a rest day: rest without guilt.',
          'Log weight a few times a week from Progress (not necessarily every day).',
          'In the evening: mark sleep-related checklist items, log sleep when you wake, or journal briefly on Progress.',
          'If something feels hard: More → Problem solver (or Need help on Today).',
        ],
      },
      {
        type: 'p',
        text: 'Once a week: open Weekly review, read the summary, write a short reflection, and pick one gentle focus for next week.',
      },
      {
        type: 'p',
        text: 'Every week or two: More → Settings → Data & backup → export a backup.',
      },
    ],
  },
  {
    id: 'success-tips',
    title: 'Tips for using Stronger well',
    summary: 'Habits that make the app helpful instead of stressful.',
    blocks: [
      {
        type: 'ul',
        items: [
          'Log imperfect days. Incomplete meals and missed workouts are useful information, not failure.',
          'Prefer steady meals over “perfect” plates.',
          'Use low-appetite tools early instead of waiting until you feel worse.',
          'Strength + rest beats random hard cardio for this style of plan.',
          'Judge progress over weeks, not single mornings on the scale.',
          'Read Guide articles when curious; use Problem solver when stuck in the moment.',
          'Keep backups. Your future self will thank you.',
          'Install the app on your phone if you can, so Stronger is one tap away.',
        ],
      },
    ],
  },
  {
    id: 'faq',
    title: 'Common questions',
    summary: 'Short answers to things people often wonder.',
    blocks: [
      {
        type: 'steps',
        items: [
          {
            title: 'Do I have to finish every checklist item?',
            body: 'No. The checklist is a guide. Doing most of it most days is the aim.',
          },
          {
            title: 'Why doesn’t Stronger show calories?',
            body: 'On purpose. The focus is regular nourishing food and habits you can keep, not number chasing.',
          },
          {
            title: 'Can I use Stronger on two phones?',
            body: 'Data does not sync automatically. Export a backup from one device and import it on the other if you need to move.',
          },
          {
            title: 'What if my weight goes down or stays flat?',
            body: 'Short-term dips and plateaus are common. Check food consistency, sleep, stress, and illness. Keep logging and review the week. Seek professional help if weight loss is unexplained or you feel unwell.',
          },
          {
            title: 'Is the Guide the same as this User guide?',
            body: 'No. This User guide teaches the app. The Guide teaches food, training, sleep, hard days, and safety topics.',
          },
          {
            title: 'What if I feel unwell or unsafe?',
            body: 'Stop and seek appropriate medical help. Open Guide → Safety for when to seek help. Stronger is not emergency care.',
          },
        ],
      },
    ],
  },
];
