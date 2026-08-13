import React from 'react';
import { Eye, Check, ArrowRight } from 'lucide-react';
import { TemplateMeta } from '../../types/template';
import { TemplateScaledPreview } from '../templates/TemplateScaledPreview';
import { Button } from '../common/Button';

export interface TemplateCardProps {
  template: TemplateMeta;
  isSelected?: boolean;
  onPreview: (template: TemplateMeta) => void;
  onSelect: (template: TemplateMeta) => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  isSelected = false,
  onPreview,
  onSelect,
}) => {
  return (
    <div
      style={{
        backgroundColor: 'var(--color-surface)',
        borderRadius: 'var(--radius-md)',
        border: `2px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}`,
        overflow: 'hidden',
        boxShadow: isSelected ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all var(--transition-fast)',
        position: 'relative',
      }}
      className="template-card"
    >
      {/* Browser Window Frame Box */}
      <div
        style={{
          backgroundColor: '#F1F5F9',
          borderBottom: '1px solid var(--color-border)',
          cursor: 'pointer',
        }}
        onClick={() => onPreview(template)}
      >
        {/* Browser Top Window Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 8px', backgroundColor: '#E2E8F0', borderBottom: '1px solid #CBD5E1' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#F59E0B' }} />
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }} />
          <span style={{ fontSize: '10px', color: '#64748B', marginLeft: '4px', fontWeight: 600, fontFamily: 'monospace' }}>
            {template.id}.invoice
          </span>
        </div>

        {/* Thumbnail Preview */}
        <div style={{ padding: '4px' }}>
          <TemplateScaledPreview templateId={template.id} />
        </div>
      </div>

      {/* Card Body */}
      <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
            {template.name}
          </h3>
          <span
            style={{
              fontSize: '10px',
              fontWeight: 600,
              color: 'var(--color-primary)',
              backgroundColor: 'var(--color-primary-light)',
              padding: '1px 7px',
              borderRadius: 'var(--radius-full)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            {template.category}
          </span>
        </div>

        <p
          style={{
            fontSize: '11.5px',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.35,
            flex: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {template.description}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '6px', paddingTop: '4px' }}>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Eye size={12} />}
            onClick={() => onPreview(template)}
          >
            Preview
          </Button>
          <Button
            variant={isSelected ? 'secondary' : 'primary'}
            size="sm"
            rightIcon={isSelected ? <Check size={12} /> : <ArrowRight size={12} />}
            onClick={() => onSelect(template)}
          >
            {isSelected ? 'Selected' : 'Use Template'}
          </Button>
        </div>
      </div>
    </div>
  );
};
