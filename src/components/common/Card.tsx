import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  padding?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverable = false,
  padding = '24px',
  style,
  className = '',
  ...props
}) => {
  const cardStyle: React.CSSProperties = {
    backgroundColor: 'var(--color-surface)',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--color-border)',
    boxShadow: 'var(--shadow-sm)',
    padding,
    transition: hoverable ? 'all var(--transition-fast)' : 'none',
    cursor: hoverable ? 'pointer' : 'default',
    ...style,
  };

  return (
    <div style={cardStyle} className={`ui-card ${className}`} {...props}>
      {children}
    </div>
  );
};
