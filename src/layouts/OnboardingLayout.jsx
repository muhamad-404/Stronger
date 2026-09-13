import { Outlet } from 'react-router-dom';
import './OnboardingLayout.css';

export default function OnboardingLayout() {
  return (
    <div className="app-shell onboarding-shell">
      <main className="onboarding-main">
        <Outlet />
      </main>
    </div>
  );
}
