import { NavLink } from 'react-router-dom';
import { Home, Utensils, Dumbbell, LineChart, MoreHorizontal } from 'lucide-react';
import './BottomNav.css';

const NAV_ITEMS = [
  { to: '/', label: 'Today', icon: Home, end: true },
  { to: '/eat', label: 'Eat', icon: Utensils },
  { to: '/move', label: 'Move', icon: Dumbbell },
  { to: '/progress', label: 'Progress', icon: LineChart },
  { to: '/more', label: 'More', icon: MoreHorizontal },
];

export default function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Main">
      <ul className="bottom-nav__list">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <li key={to} className="bottom-nav__item">
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                [
                  'bottom-nav__link',
                  isActive ? 'bottom-nav__link--active' : '',
                ]
                  .filter(Boolean)
                  .join(' ')
              }
            >
              <Icon className="bottom-nav__icon" strokeWidth={2} aria-hidden />
              <span className="bottom-nav__label">{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
