import React from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  options,
  error,
  helperText,
  className = '',
  id,
  style,
  ...props
}, ref) => {
  const selectId = id || (label ? `select-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    width: '100%',
  };

  const selectStyle: React.CSSProperties = {
    height: '32px',
    borderRadius: '6px',
    paddingLeft: '10px',
    paddingRight: '28px',
    border: `1px solid ${error ? '#DC2626' : '#E2E8F0'}`,
    backgroundColor: '#FFFFFF',
    color: '#0F172A',
    fontSize: '12px',
    width: '100%',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%206B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 8px center',
    cursor: 'pointer',
    ...style,
  };

  return (
    <div style={containerStyle}>
      {label && (
        <label
          htmlFor={selectId}
          style={{
            fontSize: '11px',
            fontWeight: 600,
            color: '#0F172A',
          }}
        >
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={selectId}
        style={selectStyle}
        className={`ui-select ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error ? (
        <span style={{ fontSize: '10px', color: '#DC2626' }}>{error}</span>
      ) : helperText ? (
        <span style={{ fontSize: '10px', color: '#64748B' }}>{helperText}</span>
      ) : null}
    </div>
  );
});

Select.displayName = 'Select';
