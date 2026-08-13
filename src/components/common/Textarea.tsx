import React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({
  label,
  error,
  helperText,
  className = '',
  id,
  style,
  rows = 2,
  ...props
}, ref) => {
  const textareaId = id || (label ? `textarea-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    width: '100%',
  };

  const textareaStyle: React.CSSProperties = {
    borderRadius: '6px',
    padding: '6px 10px',
    border: `1px solid ${error ? '#DC2626' : '#E2E8F0'}`,
    backgroundColor: '#FFFFFF',
    color: '#0F172A',
    fontSize: '12px',
    width: '100%',
    resize: 'vertical',
    fontFamily: 'inherit',
    transition: 'border-color 150ms ease-in-out, box-shadow 150ms ease-in-out',
    ...style,
  };

  return (
    <div style={containerStyle}>
      {label && (
        <label
          htmlFor={textareaId}
          style={{
            fontSize: '11px',
            fontWeight: 600,
            color: '#0F172A',
          }}
        >
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        style={textareaStyle}
        className={`ui-textarea ${className}`}
        {...props}
      />
      {error ? (
        <span style={{ fontSize: '10px', color: '#DC2626' }}>{error}</span>
      ) : helperText ? (
        <span style={{ fontSize: '10px', color: '#64748B' }}>{helperText}</span>
      ) : null}
    </div>
  );
});

Textarea.displayName = 'Textarea';
