import Card from './Card.jsx';
import './ReviewMetricCard.css';

export default function ReviewMetricCard({
  label,
  eyebrow,
  primary,
  secondary,
  accent = 'default',
}) {
  return (
    <Card
      className={[
        'review-metric',
        accent !== 'default' ? `review-metric--${accent}` : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {eyebrow ? <p className="review-metric__eyebrow">{eyebrow}</p> : null}
      <p className="review-metric__label">{label}</p>
      <p className="review-metric__primary">{primary}</p>
      {secondary ? (
        <p className="review-metric__secondary">{secondary}</p>
      ) : null}
    </Card>
  );
}
