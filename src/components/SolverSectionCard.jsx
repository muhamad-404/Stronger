import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import GuideCallout from './GuideCallout.jsx';
import './SolverSectionCard.css';

export default function SolverSectionCard({ section }) {
  const panelId = useId();
  const [open, setOpen] = useState(Boolean(section?.defaultOpen));

  if (!section) return null;

  return (
    <div
      className={[
        'solver-section',
        open ? 'solver-section--open' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <button
        type="button"
        className="solver-section__trigger"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="solver-section__title">{section.title}</span>
        <ChevronDown
          size={18}
          className="solver-section__chevron"
          aria-hidden
        />
      </button>

      {open ? (
        <div id={panelId} className="solver-section__panel">
          {section.intro ? (
            <p className="solver-section__intro">{section.intro}</p>
          ) : null}

          {section.steps?.length ? (
            <ol className="solver-section__steps">
              {section.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          ) : null}

          {section.bullets?.length ? (
            <ul className="solver-section__bullets">
              {section.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}

          {section.callout ? (
            <GuideCallout
              tone={section.callout.tone}
              title={section.callout.title}
              text={section.callout.text}
            />
          ) : null}
        </div>
      ) : (
        <div id={panelId} hidden />
      )}
    </div>
  );
}
