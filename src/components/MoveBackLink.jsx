import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './MoveBackLink.css';

export default function MoveBackLink({ to = '/move', label = 'Move' }) {
  return (
    <Link to={to} className="move-back-link">
      <ArrowLeft size={18} aria-hidden />
      {label}
    </Link>
  );
}
