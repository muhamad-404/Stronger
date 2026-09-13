import { Link } from 'react-router-dom';
import {
  BookOpen,
  CalendarRange,
  ChevronRight,
  LifeBuoy,
  Moon,
  Settings,
  Target,
} from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import Card from '../components/Card.jsx';
import './MorePage.css';

export default function MorePage() {
  return (
    <div className="page">
      <PageHeader
        title="More"
        subtitle="Help, sleep, guide, and goals."
      />
      <Card padding="none">
        <Link to="/solver" className="more-link">
          <span className="more-link__icon" aria-hidden>
            <LifeBuoy size={20} strokeWidth={2} />
          </span>
          <span className="more-link__text">
            <span className="more-link__title">Problem solver</span>
            <span className="more-link__desc">
              Not hungry, missed a meal, tired — practical next steps
            </span>
          </span>
          <ChevronRight
            className="more-link__chevron"
            size={18}
            aria-hidden
          />
        </Link>
        <Link to="/sleep" className="more-link">
          <span className="more-link__icon" aria-hidden>
            <Moon size={20} strokeWidth={2} />
          </span>
          <span className="more-link__text">
            <span className="more-link__title">Sleep & recovery</span>
            <span className="more-link__desc">
              Bedtime, wake time, quality, and weekly rhythm
            </span>
          </span>
          <ChevronRight
            className="more-link__chevron"
            size={18}
            aria-hidden
          />
        </Link>
        <Link to="/review" className="more-link">
          <span className="more-link__icon" aria-hidden>
            <CalendarRange size={20} strokeWidth={2} />
          </span>
          <span className="more-link__text">
            <span className="more-link__title">Weekly review</span>
            <span className="more-link__desc">
              Weight, food, workouts, sleep, and reflection
            </span>
          </span>
          <ChevronRight
            className="more-link__chevron"
            size={18}
            aria-hidden
          />
        </Link>
        <Link to="/guide" className="more-link">
          <span className="more-link__icon" aria-hidden>
            <BookOpen size={20} strokeWidth={2} />
          </span>
          <span className="more-link__text">
            <span className="more-link__title">Guide</span>
            <span className="more-link__desc">
              Food, training, sleep, hard days, and safety
            </span>
          </span>
          <ChevronRight
            className="more-link__chevron"
            size={18}
            aria-hidden
          />
        </Link>
        <Link to="/goals" className="more-link">
          <span className="more-link__icon" aria-hidden>
            <Target size={20} strokeWidth={2} />
          </span>
          <span className="more-link__text">
            <span className="more-link__title">Goals</span>
            <span className="more-link__desc">
              Weight, food, strength, sleep, and routine
            </span>
          </span>
          <ChevronRight
            className="more-link__chevron"
            size={18}
            aria-hidden
          />
        </Link>
        <Link to="/settings" className="more-link">
          <span className="more-link__icon" aria-hidden>
            <Settings size={20} strokeWidth={2} />
          </span>
          <span className="more-link__text">
            <span className="more-link__title">Settings</span>
            <span className="more-link__desc">
              Profile, backup, install app, and privacy
            </span>
          </span>
          <ChevronRight
            className="more-link__chevron"
            size={18}
            aria-hidden
          />
        </Link>
      </Card>
    </div>
  );
}
