import './PageHeader.css';

export default function PageHeader({ title, subtitle, action }) {
  return (
    <header className="page-header">
      <div className="page-header__text">
        <p className="page-header__brand">Stronger</p>
        <h1 className="page-header__title">{title}</h1>
        {subtitle ? (
          <p className="page-header__subtitle">{subtitle}</p>
        ) : null}
      </div>
      {action ? <div className="page-header__action">{action}</div> : null}
    </header>
  );
}
