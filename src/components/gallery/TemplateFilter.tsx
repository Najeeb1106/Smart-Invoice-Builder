import React from 'react';
import { TemplateCategory } from '../../types/template';

export interface TemplateFilterProps {
  selectedCategory: TemplateCategory;
  onSelectCategory: (category: TemplateCategory) => void;
}

const CATEGORIES: TemplateCategory[] = [
  'All',
  'Corporate',
  'Freelancer',
  'Services',
  'Agency',
  'IT & Software',
  'Retail',
  'Creative',
];

export const TemplateFilter: React.FC<TemplateFilterProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
      {CATEGORIES.map((cat) => {
        const isSelected = selectedCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-full)',
              fontSize: '13px',
              fontWeight: isSelected ? 600 : 500,
              backgroundColor: isSelected ? 'var(--color-primary)' : 'var(--color-surface)',
              color: isSelected ? 'var(--color-text-on-primary)' : 'var(--color-text-secondary)',
              border: `1px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}`,
              transition: 'all var(--transition-fast)',
              cursor: 'pointer',
            }}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
};
