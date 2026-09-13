import { Sparkles } from 'lucide-react';
import Card from './Card.jsx';
import './TipCard.css';

export default function TipCard({ tip }) {
  if (!tip?.text) return null;

  return (
    <Card className="tip-card">
      <div className="tip-card__header">
        <Sparkles size={16} strokeWidth={2} aria-hidden />
        <p className="tip-card__label">Today&apos;s tip</p>
      </div>
      <p className="tip-card__text">{tip.text}</p>
    </Card>
  );
}
