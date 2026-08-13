import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className = '',
  id,
  style,
  ...props
}, ref) => {
  const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    width: '100%',
  };

  const inputWrapperStyle: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  };

  const inputStyle: React.CSSProperties = {
    height: '32px', /* Ultra-compact 32px input height */
    borderRadius: '6px',
    paddingLeft: leftIcon ? '32px' : '10px',
    paddingRight: rightIcon ? '32px' : '10px',
    border: `1px solid ${error ? '#DC2626' : '#E2E8F0'}`,
    backgroundColor: '#FFFFFF',
    color: '#0F172A',
    fontSize: '12px',
    width: '100%',
    transition: 'border-color 150ms ease-in-out, box-shadow 150ms ease-in-out',
    ...style,
  };

  return (
    <div style={containerStyle}>
      {label && (
        <label
          htmlFor={inputId}
          style={{
            fontSize: '11px',
            fontWeight: 600,
            color: '#0F172A',
          }}
        >
          {label}
        </label>
      )}
      <div style={inputWrapperStyle}>
        {leftIcon && (
          <span
            style={{
              position: 'absolute',
              left: '8px',
              color: '#64748B',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          style={inputStyle}
          className={`ui-input ${className}`}
          {...props}
        />
        {rightIcon && (
          <span
            style={{
              position: 'absolute',
              right: '8px',
              color: '#64748B',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {rightIcon}
          </span>
        )}
      </div>
      {error ? (
        <span style={{ fontSize: '10px', color: '#DC2626', marginTop: '1px' }}>
          {error}
        </span>
      ) : helperText ? (
        <span style={{ fontSize: '10px', color: '#64748B', marginTop: '1px' }}>
          {helperText}
        </span>
      ) : null}
    </div>
  );
});

Input.displayName = 'Input';
