import { ChevronLeft, ChevronRight } from 'lucide-react';
import { formatDateSwitcherLabel, formatLongDate, parseDateKey } from '../utils/dates.js';
import './DateSwitcher.css';

export default function DateSwitcher({
  dateKey,
  todayKey,
  canGoNext,
  onPrev,
  onNext,
  onToday,
}) {
  const date = parseDateKey(dateKey);
  const label = formatDateSwitcherLabel(dateKey, todayKey);
  const longLabel = date ? formatLongDate(date) : dateKey;

  return (
    <div className="date-switcher">
      <button
        type="button"
        className="date-switcher__nav"
        onClick={onPrev}
        aria-label="Previous day"
      >
        <ChevronLeft size={20} aria-hidden />
      </button>
      <div className="date-switcher__center">
        <p className="date-switcher__label">{label}</p>
        <p className="date-switcher__long">{longLabel}</p>
        {dateKey !== todayKey ? (
          <button type="button" className="date-switcher__today" onClick={onToday}>
            Jump to today
          </button>
        ) : null}
      </div>
      <button
        type="button"
        className="date-switcher__nav"
        onClick={onNext}
        aria-label="Next day"
        disabled={!canGoNext}
      >
        <ChevronRight size={20} aria-hidden />
      </button>
    </div>
  );
}
