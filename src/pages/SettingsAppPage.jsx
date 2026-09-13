import { useEffect, useState } from 'react';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';
import PageHeader from '../components/PageHeader.jsx';
import SettingsBackLink from '../components/SettingsBackLink.jsx';
import GuideCallout from '../components/GuideCallout.jsx';
import { usePwaInstall } from '../hooks/usePwaInstall.js';
import { get, put, STORES } from '../services/database/index.js';
import { APP_NAME, APP_TAGLINE } from '../data/index.js';
import './SettingsPage.css';

const APP_PREFS_ID = 'appPreferences';

export default function SettingsAppPage() {
  const { canInstall, installed, promptInstall } = usePwaInstall();
  const [notifPermission, setNotifPermission] = useState(
    typeof Notification !== 'undefined' ? Notification.permission : 'unsupported',
  );
  const [prefs, setPrefs] = useState({ notificationsEnabled: false });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      const row = await get(STORES.settings, APP_PREFS_ID);
      if (row) {
        setPrefs({
          notificationsEnabled: Boolean(row.notificationsEnabled),
        });
      }
    })();
  }, []);

  const savePrefs = async (next) => {
    const record = {
      id: APP_PREFS_ID,
      ...next,
      updatedAt: new Date().toISOString(),
    };
    await put(STORES.settings, record);
    setPrefs(next);
  };

  const handleInstall = async () => {
    setError(null);
    const result = await promptInstall();
    if (result.outcome === 'unavailable') {
      setMessage(
        installed
          ? 'Stronger looks installed already.'
          : 'Install is not available in this browser yet. Use your browser’s “Add to Home Screen” or Install menu.',
      );
      return;
    }
    if (result.outcome === 'accepted') {
      setMessage('Thanks — Stronger should appear on your home screen.');
    }
  };

  const handleNotifications = async () => {
    setError(null);
    setMessage(null);
    if (typeof Notification === 'undefined') {
      setError('Notifications are not supported in this browser.');
      return;
    }
    try {
      const permission = await Notification.requestPermission();
      setNotifPermission(permission);
      if (permission === 'granted') {
        await savePrefs({ notificationsEnabled: true });
        setMessage(
          'Permission granted. Stronger can use gentle local reminders later — nothing is sent to a server.',
        );
      } else if (permission === 'denied') {
        await savePrefs({ notificationsEnabled: false });
        setMessage('Notifications are blocked in browser settings.');
      } else {
        await savePrefs({ notificationsEnabled: false });
      }
    } catch {
      setError('Could not update notification permission.');
    }
  };

  const disableNotificationsPref = async () => {
    await savePrefs({ notificationsEnabled: false });
    setMessage('Notification preference turned off on this device.');
  };

  return (
    <div className="page settings-page">
      <SettingsBackLink />
      <PageHeader
        title="App"
        subtitle="Install Stronger, manage notifications, and learn what’s local."
      />

      <Card className="settings-data__card">
        <h2 className="settings-data__h2">Install app</h2>
        <p className="settings-page__section-hint">
          Add Stronger to your home screen to open it like an app. After one
          online visit, it can keep working offline — your progress stays in
          this device’s IndexedDB, not on a remote server.
        </p>
        {installed ? (
          <p className="settings-page__success">Installed as an app.</p>
        ) : (
          <Button fullWidth onClick={handleInstall}>
            {canInstall ? 'Install Stronger' : 'Add to Home Screen'}
          </Button>
        )}
        {!installed && !canInstall ? (
          <p className="settings-page__section-hint">
            On iPhone: Share → Add to Home Screen. On desktop Chrome/Edge: use
            the install icon in the address bar when it appears, or the browser
            Install menu.
          </p>
        ) : null}
      </Card>

      <Card className="settings-data__card">
        <h2 className="settings-data__h2">Notifications</h2>
        <p className="settings-page__section-hint">
          Optional. Reminder support stays local — Stronger does not push
          personal health data to a server.
        </p>
        <p className="settings-data__meta-line">
          Browser permission:{' '}
          <strong>{notifPermission}</strong>
          {prefs.notificationsEnabled ? ' · preference on' : ' · preference off'}
        </p>
        <div className="settings-data__actions">
          <Button fullWidth variant="secondary" onClick={handleNotifications}>
            Allow notifications
          </Button>
          {prefs.notificationsEnabled ? (
            <Button fullWidth variant="ghost" onClick={disableNotificationsPref}>
              Turn preference off
            </Button>
          ) : null}
        </div>
      </Card>

      <Card className="settings-data__card">
        <h2 className="settings-data__h2">About</h2>
        <p className="settings-about__name">{APP_NAME}</p>
        <p className="settings-about__tag">{APP_TAGLINE}</p>
        <ul className="settings-about__list">
          <li>Version 0.1.0 · Progressive Web App</li>
          <li>Eat, Train, Recover, Grow.</li>
          <li>Data stored with IndexedDB on this device</li>
          <li>Works offline after the app shell is cached</li>
          <li>Not medical advice — seek professional care when needed</li>
        </ul>
        <GuideCallout
          tone="caution"
          text="Export backups from Data & backup. Personal progress must not be uploaded to GitHub or shared repositories."
        />
      </Card>

      {message ? (
        <p className="settings-page__success" role="status">
          {message}
        </p>
      ) : null}
      {error ? (
        <p className="settings-page__alert" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
