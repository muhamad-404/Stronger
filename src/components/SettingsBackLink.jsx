import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './SettingsBackLink.css';

export default function SettingsBackLink({ to = '/settings', label = 'Settings' }) {
  return (
    <Link to={to} className="settings-back-link">
      <ArrowLeft size={18} aria-hidden />
      {label}
    </Link>
  );
}
