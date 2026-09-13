import { Link } from 'react-router-dom';
import { Utensils, Scale, Dumbbell, StickyNote, LifeBuoy } from 'lucide-react';
import './QuickActions.css';

export default function QuickActions({ onAddNote }) {
  return (
    <section className="quick-actions" aria-label="Quick actions">
      <h2 className="quick-actions__heading">Quick actions</h2>
      <div className="quick-actions__grid">
        <Link to="/eat" className="quick-actions__item">
          <Utensils size={20} strokeWidth={2} aria-hidden />
          <span>Log food</span>
        </Link>
        <Link to="/progress" className="quick-actions__item">
          <Scale size={20} strokeWidth={2} aria-hidden />
          <span>Log weight</span>
        </Link>
        <Link to="/move" className="quick-actions__item">
          <Dumbbell size={20} strokeWidth={2} aria-hidden />
          <span>Start workout</span>
        </Link>
        <Link to="/solver" className="quick-actions__item">
          <LifeBuoy size={20} strokeWidth={2} aria-hidden />
          <span>Need help</span>
        </Link>
        <button
          type="button"
          className="quick-actions__item"
          onClick={onAddNote}
        >
          <StickyNote size={20} strokeWidth={2} aria-hidden />
          <span>Add note</span>
        </button>
      </div>
    </section>
  );
}
