import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './GuideBackLink.css';

export default function GuideBackLink({ to = '/guide', label = 'Guide' }) {
  return (
    <Link to={to} className="guide-back-link">
      <ArrowLeft size={18} aria-hidden />
      {label}
    </Link>
  );
}
