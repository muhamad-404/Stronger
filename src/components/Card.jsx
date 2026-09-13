import './Card.css';

export default function Card({
  children,
  className = '',
  padding = 'md',
  as: Component = 'div',
  ...props
}) {
  const classes = ['card', `card--pad-${padding}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}
