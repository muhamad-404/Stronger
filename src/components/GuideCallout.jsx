import './GuideCallout.css';

const TONE_LABEL = {
  tip: 'Tip',
  info: 'Note',
  caution: 'Important',
};

export default function GuideCallout({ tone = 'info', title, text }) {
  const safeTone = TONE_LABEL[tone] ? tone : 'info';
  const heading = title || TONE_LABEL[safeTone];

  return (
    <aside
      className={`guide-callout guide-callout--${safeTone}`}
      role={safeTone === 'caution' ? 'note' : undefined}
    >
      <p className="guide-callout__label">{heading}</p>
      {text ? <p className="guide-callout__text">{text}</p> : null}
    </aside>
  );
}
