import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ChevronRight,
  Database,
  Smartphone,
  Target,
  UserRound,
  Clock3,
} from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import Card from '../components/Card.jsx';
import './SettingsPage.css';

const LINKS = [
  {
    group: 'You',
    items: [
      {
        to: '/settings/profile',
        title: 'Profile',
        desc: 'Name, height, weight, and goal',
        icon: UserRound,
      },
      {
        to: '/settings/goals',
        title: 'Goals',
        desc: 'Weight milestones and goal module',
        icon: Target,
      },
      {
        to: '/settings/routine',
        title: 'Routine',
        desc: 'Wake time and bedtime',
        icon: Clock3,
      },
    ],
  },
  {
    group: 'Data & backup',
    items: [
      {
        to: '/settings/data',
        title: 'Data & backup',
        desc: 'Export, import, storage, clear data',
        icon: Database,
      },
    ],
  },
  {
    group: 'App',
    items: [
      {
        to: '/settings/app',
        title: 'App',
        desc: 'Install, notifications, about',
        icon: Smartphone,
      },
    ],
  },
];

export default function SettingsHubPage() {
  return (
    <div className="page settings-page">
      <Link to="/more" className="settings-page__back">
        <ArrowLeft size={18} aria-hidden />
        More
      </Link>

      <PageHeader
        title="Settings"
        subtitle="Your details stay on this device — export backups to keep them safe."
      />

      {LINKS.map((group) => (
        <section key={group.group} className="settings-hub__group">
          <h2 className="settings-hub__group-title">{group.group}</h2>
          <Card padding="none">
            {group.items.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.to} to={item.to} className="settings-hub__link">
                  <span className="settings-hub__icon" aria-hidden>
                    <Icon size={20} strokeWidth={2} />
                  </span>
                  <span className="settings-hub__text">
                    <span className="settings-hub__title">{item.title}</span>
                    <span className="settings-hub__desc">{item.desc}</span>
                  </span>
                  <ChevronRight size={18} className="settings-hub__chevron" />
                </Link>
              );
            })}
          </Card>
        </section>
      ))}

      <p className="settings-page__privacy">
        Stronger does not upload your health or progress data. Everything stays
        in this browser unless you export a backup yourself.
      </p>
    </div>
  );
}
