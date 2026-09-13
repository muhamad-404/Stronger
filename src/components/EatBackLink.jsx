import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './EatBackLink.css';

export default function EatBackLink({ to = '/eat', label = 'Food' }) {
  return (
    <Link to={to} className="eat-back-link">
      <ArrowLeft size={18} aria-hidden />
      {label}
    </Link>
  );
}
