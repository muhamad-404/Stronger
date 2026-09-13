import './FilterChips.css';

const PRIMARY = [
  { id: '', label: 'All' },
  { id: 'breakfast', label: 'Breakfast' },
  { id: 'lunch', label: 'Lunch' },
  { id: 'dinner', label: 'Dinner' },
  { id: 'snack', label: 'Snack' },
  { id: 'shake', label: 'Shake' },
];

export default function FilterChips({
  category,
  easy,
  pakistani,
  onCategoryChange,
  onEasyChange,
  onPakistaniChange,
}) {
  return (
    <div className="filter-chips">
      <div
        className="filter-chips__row"
        role="group"
        aria-label="Filter by meal type"
      >
        {PRIMARY.map((chip) => {
          const active = category === chip.id;
          return (
            <button
              key={chip.id || 'all'}
              type="button"
              aria-pressed={active}
              className={[
                'filter-chips__chip',
                active ? 'filter-chips__chip--active' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => onCategoryChange(chip.id)}
            >
              {chip.label}
            </button>
          );
        })}
      </div>
      <div
        className="filter-chips__row filter-chips__row--secondary"
        role="group"
        aria-label="Additional filters"
      >
        <button
          type="button"
          className={[
            'filter-chips__chip',
            'filter-chips__chip--toggle',
            pakistani ? 'filter-chips__chip--active' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          aria-pressed={pakistani}
          onClick={() => onPakistaniChange(!pakistani)}
        >
          Pakistani / home
        </button>
        <button
          type="button"
          className={[
            'filter-chips__chip',
            'filter-chips__chip--toggle',
            easy ? 'filter-chips__chip--active' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          aria-pressed={easy}
          onClick={() => onEasyChange(!easy)}
        >
          Easy when low appetite
        </button>
      </div>
    </div>
  );
}
