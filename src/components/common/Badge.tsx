import React from 'react';

export interface BadgeProps {
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'primary', children }) => {
  const getStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'primary':
        return { backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)' };
      case 'success':
        return { backgroundColor: 'var(--color-success-light)', color: 'var(--color-success)' };
      case 'warning':
        return { backgroundColor: 'var(--color-warning-light)', color: 'var(--color-warning)' };
      case 'danger':
        return { backgroundColor: 'var(--color-danger-light)', color: 'var(--color-danger)' };
      case 'neutral':
        return { backgroundColor: 'var(--color-surface-hover)', color: 'var(--color-text-secondary)' };
    }
  };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '2px 10px',
        borderRadius: 'var(--radius-full)',
        fontSize: '12px',
        fontWeight: 600,
        ...getStyles(),
      }}
    >
      {children}
    </span>
  );
};
