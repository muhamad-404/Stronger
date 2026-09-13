import './Field.css';

export default function Field({
  id,
  label,
  error,
  hint,
  type = 'text',
  value,
  onChange,
  inputMode,
  placeholder,
  autoComplete,
  suffix,
  min,
  max,
  step,
  disabled = false,
  ...props
}) {
  const describedBy = [
    error ? `${id}-error` : null,
    hint && !error ? `${id}-hint` : null,
  ]
    .filter(Boolean)
    .join(' ') || undefined;

  return (
    <div className={['field', error ? 'field--error' : ''].filter(Boolean).join(' ')}>
      <label className="field__label" htmlFor={id}>
        {label}
      </label>
      <div className="field__control">
        <input
          id={id}
          className="field__input"
          type={type}
          value={value}
          onChange={onChange}
          inputMode={inputMode}
          placeholder={placeholder}
          autoComplete={autoComplete}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          {...props}
        />
        {suffix ? <span className="field__suffix">{suffix}</span> : null}
      </div>
      {error ? (
        <p id={`${id}-error`} className="field__error" role="alert">
          {error}
        </p>
      ) : null}
      {hint && !error ? (
        <p id={`${id}-hint`} className="field__hint">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
