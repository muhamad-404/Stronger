import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import GuideBlocks from './GuideBlocks.jsx';
import './GuideExpandable.css';

export default function GuideExpandable({ section }) {
  const panelId = useId();
  const [open, setOpen] = useState(Boolean(section?.defaultOpen));

  if (!section) return null;

  return (
    <div
      className={[
        'guide-expandable',
        open ? 'guide-expandable--open' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <button
        type="button"
        className="guide-expandable__trigger"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="guide-expandable__title">{section.title}</span>
        <ChevronDown
          size={18}
          className="guide-expandable__chevron"
          aria-hidden
        />
      </button>
      <div
        id={panelId}
        className="guide-expandable__panel"
        hidden={!open}
      >
        {open ? <GuideBlocks blocks={section.blocks} /> : null}
      </div>
    </div>
  );
}
