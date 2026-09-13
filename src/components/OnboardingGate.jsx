import { useMemo } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useOnboardingStatus } from '../hooks/useOnboardingStatus.jsx';
import './OnboardingGate.css';

/**
 * Redirects incomplete users to onboarding and completed users away from it.
 */
export default function OnboardingGate({ children }) {
  const { ready, completed } = useOnboardingStatus();
  const location = useLocation();
  const onOnboarding = location.pathname.startsWith('/onboarding');

  const redirect = useMemo(() => {
    if (!ready || completed === null) return null;
    if (!completed && !onOnboarding) {
      return <Navigate to="/onboarding" replace />;
    }
    if (completed && onOnboarding) {
      return <Navigate to="/" replace />;
    }
    return null;
  }, [ready, completed, onOnboarding]);

  if (!ready || completed === null) {
    return (
      <div className="app-shell">
        <div className="onboarding-gate__loading" aria-live="polite">
          Preparing your space…
        </div>
      </div>
    );
  }

  if (redirect) return redirect;

  return children;
}
