import { Outlet } from 'react-router-dom';
import BottomNav from '../components/BottomNav.jsx';
import { useDatabase } from '../hooks/useDatabase.js';
import './AppLayout.css';

export default function AppLayout() {
  const { ready, error } = useDatabase();

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <main id="main-content" className="app-main" tabIndex={-1}>
        {error ? (
          <p className="app-layout__status app-layout__status--error" role="alert">
            Local storage could not start. Your progress may not save on this
            device.
          </p>
        ) : null}
        {!ready && !error ? (
          <p className="app-layout__status" aria-live="polite">
            Preparing your space…
          </p>
        ) : null}
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
