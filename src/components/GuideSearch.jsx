import { Search } from 'lucide-react';
import './GuideSearch.css';

export default function GuideSearch({ value, onChange, placeholder }) {
  return (
    <label className="guide-search">
      <span className="guide-search__icon" aria-hidden>
        <Search size={18} strokeWidth={2} />
      </span>
      <span className="visually-hidden">Search the guide</span>
      <input
        type="search"
        className="guide-search__input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || 'Search meals, sleep, appetite…'}
        autoComplete="off"
        enterKeyHint="search"
      />
    </label>
  );
}
