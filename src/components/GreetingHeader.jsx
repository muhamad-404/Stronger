import './GreetingHeader.css';

export default function GreetingHeader({ greetingText, dateLabel }) {
  return (
    <header className="greeting-header">
      <p className="greeting-header__brand">Stronger</p>
      <h1 className="greeting-header__title">{greetingText}</h1>
      <p className="greeting-header__date">{dateLabel}</p>
    </header>
  );
}
