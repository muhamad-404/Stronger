import { Outlet } from 'react-router-dom';
import './OnboardingLayout.css';

export default function OnboardingLayout() {
  return (
    <div className="app-shell onboarding-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <main id="main-content" className="onboarding-main" tabIndex={-1}>
        <Outlet />
      </main>
    </div>
  );
}
