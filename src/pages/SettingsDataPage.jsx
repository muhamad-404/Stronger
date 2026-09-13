import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';
import PageHeader from '../components/PageHeader.jsx';
import SettingsBackLink from '../components/SettingsBackLink.jsx';
import ConfirmDialog from '../components/ConfirmDialog.jsx';
import GuideCallout from '../components/GuideCallout.jsx';
import {
  clearAllData,
  exportBackup,
  getBackupMeta,
  getStorageInfo,
  importBackup,
  validateBackup,
} from '../services/backup.js';
import { pickFile, readJsonFile } from '../utils/files.js';
import { formatStorageError } from '../utils/storageErrors.js';
import { useOnboardingStatus } from '../hooks/useOnboardingStatus.jsx';
import './SettingsPage.css';

function formatWhen(iso) {
  if (!iso) return 'Never';
  try {
    return new Date(iso).toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

export default function SettingsDataPage() {
  const navigate = useNavigate();
  const { refresh: refreshOnboarding } = useOnboardingStatus();
  const [meta, setMeta] = useState(null);
  const [storage, setStorage] = useState(null);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  const [importOpen, setImportOpen] = useState(false);
  const [importPayload, setImportPayload] = useState(null);
  const [importSummary, setImportSummary] = useState(null);

  const [clearOpen, setClearOpen] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const [m, s] = await Promise.all([getBackupMeta(), getStorageInfo()]);
      setMeta(m);
      setStorage(s);
    } catch (err) {
      setError(formatStorageError(err, 'Could not read storage details.'));
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleExport = async () => {
    setBusy(true);
    setError(null);
    setStatus(null);
    try {
      const { filename } = await exportBackup();
      setStatus(`Backup downloaded as ${filename}. Keep it somewhere safe.`);
      await refresh();
    } catch (err) {
      setError(formatStorageError(err, 'Could not export backup.'));
    } finally {
      setBusy(false);
    }
  };

  const handlePickImport = async () => {
    setError(null);
    setStatus(null);
    try {
      const file = await pickFile({ accept: 'application/json,.json' });
      if (!file) return;
      const payload = await readJsonFile(file);
      const summary = validateBackup(payload);
      setImportPayload(payload);
      setImportSummary(summary);
      setImportOpen(true);
    } catch (err) {
      setError(formatStorageError(err, 'Could not read that backup.'));
    }
  };

  const confirmImport = async () => {
    if (!importPayload) return;
    setBusy(true);
    setError(null);
    try {
      const summary = await importBackup(importPayload);
      setImportOpen(false);
      setImportPayload(null);
      setImportSummary(null);
      const skipBits = [];
      if (summary.skippedInvalid) {
        skipBits.push(`${summary.skippedInvalid} invalid skipped`);
      }
      if (summary.skippedDuplicates) {
        skipBits.push(`${summary.skippedDuplicates} duplicates skipped`);
      }
      const skipNote = skipBits.length ? ` (${skipBits.join(', ')})` : '';
      setStatus(
        `Import complete — ${summary.recordCount} records restored${skipNote}. Reloading…`,
      );
      await refreshOnboarding();
      await refresh();
      window.setTimeout(() => {
        window.location.assign('./');
      }, 600);
    } catch (err) {
      setError(formatStorageError(err, 'Import failed.'));
    } finally {
      setBusy(false);
    }
  };

  const confirmClear = async () => {
    setBusy(true);
    setError(null);
    try {
      await clearAllData();
      setClearOpen(false);
      setStatus('All local data cleared.');
      await refreshOnboarding();
      navigate('/onboarding', { replace: true });
    } catch (err) {
      setError(formatStorageError(err, 'Could not clear data.'));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="page settings-page">
      <SettingsBackLink />
      <PageHeader
        title="Data & backup"
        subtitle="Your progress lives in this browser. Export regularly so a cleared cache does not erase it."
      />

      <GuideCallout
        tone="info"
        title="Privacy & limits"
        text="Stronger never uploads your personal health or progress data. Backups stay on your device unless you share the file yourself. Clearing site data, full disks, or browser/OS resets can still erase local records — export backups often."
      />

      <Card className="settings-data__card">
        <h2 className="settings-data__h2">Backup</h2>
        <dl className="settings-data__meta">
          <div>
            <dt>Last backup</dt>
            <dd>{formatWhen(meta?.lastBackupAt)}</dd>
          </div>
          {meta?.lastImportAt ? (
            <div>
              <dt>Last import</dt>
              <dd>{formatWhen(meta.lastImportAt)}</dd>
            </div>
          ) : null}
          {meta?.lastBackupRecordCount != null ? (
            <div>
              <dt>Records in last backup</dt>
              <dd>{meta.lastBackupRecordCount}</dd>
            </div>
          ) : null}
        </dl>

        <div className="settings-data__actions">
          <Button fullWidth onClick={handleExport} disabled={busy}>
            Export backup
          </Button>
          <Button
            fullWidth
            variant="secondary"
            onClick={handlePickImport}
            disabled={busy}
          >
            Import backup
          </Button>
        </div>
      </Card>

      <Card className="settings-data__card">
        <h2 className="settings-data__h2">Storage information</h2>
        {storage ? (
          <dl className="settings-data__meta">
            <div>
              <dt>Database</dt>
              <dd>
                {storage.dbName} · db v{storage.dbVersion}
                {storage.appSchemaVersion != null
                  ? ` · app schema v${storage.appSchemaVersion}`
                  : ''}
              </dd>
            </div>
            <div>
              <dt>Local records</dt>
              <dd>{storage.totalRecords}</dd>
            </div>
            <div>
              <dt>Estimated size</dt>
              <dd>{storage.estimatedLabel}</dd>
            </div>
            {storage.usageLabel ? (
              <div>
                <dt>Browser storage used</dt>
                <dd>
                  {storage.usageLabel}
                  {storage.quotaLabel ? ` / ${storage.quotaLabel}` : ''}
                </dd>
              </div>
            ) : null}
          </dl>
        ) : (
          <p className="page-placeholder">Loading storage…</p>
        )}
        {storage?.counts ? (
          <ul className="settings-data__counts">
            {Object.entries(storage.counts).map(([key, count]) => (
              <li key={key}>
                <span>{key}</span>
                <strong>{count}</strong>
              </li>
            ))}
          </ul>
        ) : null}
      </Card>

      <Card className="settings-data__card settings-data__card--danger">
        <h2 className="settings-data__h2">Clear all data</h2>
        <p className="settings-data__warn">
          Removes profile, logs, workouts, sleep, goals, and settings from this
          device. This cannot be undone unless you have a backup file.
        </p>
        <Button
          fullWidth
          variant="secondary"
          className="settings-data__clear-btn"
          onClick={() => setClearOpen(true)}
          disabled={busy}
        >
          Clear all data…
        </Button>
      </Card>

      {status ? (
        <p className="settings-page__success" role="status">
          {status}
        </p>
      ) : null}
      {error ? (
        <p className="settings-page__alert" role="alert">
          {error}
        </p>
      ) : null}

      <ConfirmDialog
        open={importOpen}
        tone="default"
        busy={busy}
        title="Replace all local data?"
        body={
          <div>
            <p>
              Importing will overwrite everything currently saved in this
              browser with the backup from{' '}
              <strong>{formatWhen(importSummary?.exportedAt)}</strong>.
            </p>
            <p>
              About <strong>{importSummary?.recordCount ?? 0}</strong> records
              will be restored. If import fails, Stronger tries to restore your
              previous data automatically.
            </p>
          </div>
        }
        confirmLabel="Import and replace"
        cancelLabel="Keep current data"
        onCancel={() => {
          if (busy) return;
          setImportOpen(false);
          setImportPayload(null);
          setImportSummary(null);
        }}
        onConfirm={confirmImport}
      />

      <ConfirmDialog
        open={clearOpen}
        tone="danger"
        busy={busy}
        title="Clear all Stronger data?"
        body="This permanently deletes local progress on this device. Export a backup first if you might need it later."
        confirmLabel="Clear everything"
        cancelLabel="Cancel"
        onCancel={() => {
          if (!busy) setClearOpen(false);
        }}
        onConfirm={confirmClear}
      />
    </div>
  );
}
