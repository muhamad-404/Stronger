import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.jsx';
import { OnboardingStatusProvider } from './hooks/useOnboardingStatus.jsx';
import './styles/global.css';
import './styles/mobile.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <OnboardingStatusProvider>
        <App />
      </OnboardingStatusProvider>
    </HashRouter>
  </StrictMode>,
);

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {
      // Service worker registration failed — app still works online.
    });
  });
}
