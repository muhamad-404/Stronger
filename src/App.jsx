import { Routes, Route } from 'react-router-dom';
import OnboardingGate from './components/OnboardingGate.jsx';
import AppLayout from './layouts/AppLayout.jsx';
import EatLayout from './layouts/EatLayout.jsx';
import MoveLayout from './layouts/MoveLayout.jsx';
import OnboardingLayout from './layouts/OnboardingLayout.jsx';
import TodayPage from './pages/TodayPage.jsx';
import EatPage from './pages/EatPage.jsx';
import EatTodayPage from './pages/EatTodayPage.jsx';
import EatBrowsePage from './pages/EatBrowsePage.jsx';
import MealDetailPage from './pages/MealDetailPage.jsx';
import EatLowAppetitePage from './pages/EatLowAppetitePage.jsx';
import EatBoostersPage from './pages/EatBoostersPage.jsx';
import EatProblemsPage from './pages/EatProblemsPage.jsx';
import MovePage from './pages/MovePage.jsx';
import MoveTodayPage from './pages/MoveTodayPage.jsx';
import WorkoutDetailPage from './pages/WorkoutDetailPage.jsx';
import ExerciseDetailPage from './pages/ExerciseDetailPage.jsx';
import WorkoutSessionPage from './pages/WorkoutSessionPage.jsx';
import ProgressPage from './pages/ProgressPage.jsx';
import MorePage from './pages/MorePage.jsx';
import GuidePage from './pages/GuidePage.jsx';
import GuideCategoryPage from './pages/GuideCategoryPage.jsx';
import GuideArticlePage from './pages/GuideArticlePage.jsx';
import UserGuidePage from './pages/UserGuidePage.jsx';
import ProblemSolverPage from './pages/ProblemSolverPage.jsx';
import SleepPage from './pages/SleepPage.jsx';
import WeeklyReviewPage from './pages/WeeklyReviewPage.jsx';
import GoalsPage from './pages/GoalsPage.jsx';
import SettingsHubPage from './pages/SettingsHubPage.jsx';
import SettingsProfilePage from './pages/SettingsProfilePage.jsx';
import SettingsGoalsPage from './pages/SettingsGoalsPage.jsx';
import SettingsRoutinePage from './pages/SettingsRoutinePage.jsx';
import SettingsDataPage from './pages/SettingsDataPage.jsx';
import SettingsAppPage from './pages/SettingsAppPage.jsx';
import OnboardingPage from './pages/OnboardingPage.jsx';

export default function App() {
  return (
    <OnboardingGate>
      <Routes>
        <Route element={<OnboardingLayout />}>
          <Route path="onboarding" element={<OnboardingPage />} />
        </Route>

        <Route element={<AppLayout />}>
          <Route index element={<TodayPage />} />

          <Route path="eat" element={<EatLayout />}>
            <Route index element={<EatPage />} />
            <Route path="today" element={<EatTodayPage />} />
            <Route path="browse" element={<EatBrowsePage />} />
            <Route path="meal/:mealId" element={<MealDetailPage />} />
            <Route path="low-appetite" element={<EatLowAppetitePage />} />
            <Route path="boosters" element={<EatBoostersPage />} />
            <Route path="problems" element={<EatProblemsPage />} />
          </Route>

          <Route path="move" element={<MoveLayout />}>
            <Route index element={<MovePage />} />
            <Route path="today" element={<MoveTodayPage />} />
            <Route path="a" element={<WorkoutDetailPage fixedId="A" />} />
            <Route path="b" element={<WorkoutDetailPage fixedId="B" />} />
            <Route path="exercise/:exerciseId" element={<ExerciseDetailPage />} />
            <Route path="session/:workoutId" element={<WorkoutSessionPage />} />
          </Route>

          <Route path="progress" element={<ProgressPage />} />
          <Route path="more" element={<MorePage />} />
          <Route path="solver" element={<ProblemSolverPage />} />
          <Route path="sleep" element={<SleepPage />} />
          <Route path="review" element={<WeeklyReviewPage />} />
          <Route path="guide" element={<GuidePage />} />
          <Route path="guide/category/:categoryId" element={<GuideCategoryPage />} />
          <Route path="guide/:articleId" element={<GuideArticlePage />} />
          <Route path="user-guide" element={<UserGuidePage />} />
          <Route path="goals" element={<GoalsPage />} />
          <Route path="settings" element={<SettingsHubPage />} />
          <Route path="settings/profile" element={<SettingsProfilePage />} />
          <Route path="settings/goals" element={<SettingsGoalsPage />} />
          <Route path="settings/routine" element={<SettingsRoutinePage />} />
          <Route path="settings/data" element={<SettingsDataPage />} />
          <Route path="settings/app" element={<SettingsAppPage />} />
        </Route>
      </Routes>
    </OnboardingGate>
  );
}
