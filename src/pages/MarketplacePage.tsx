import React, { useState } from 'react';
import { TemplateMeta, TemplateCategory } from '../types/template';
import { TEMPLATES } from '../data/templates';
import { TemplateFilter } from '../components/gallery/TemplateFilter';
import { TemplateSearch } from '../components/gallery/TemplateSearch';
import { TemplateCard } from '../components/gallery/TemplateCard';
import { Modal } from '../components/common/Modal';
import { Button } from '../components/common/Button';
import { TemplateScaledPreview } from '../components/templates/TemplateScaledPreview';
import { ArrowRight } from 'lucide-react';

export interface MarketplacePageProps {
  onSelectTemplate: (templateId: string) => void;
}

export const MarketplacePage: React.FC<MarketplacePageProps> = ({ onSelectTemplate }) => {
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [previewTemplate, setPreviewTemplate] = useState<TemplateMeta | null>(null);

  const filteredTemplates = TEMPLATES.filter((t) => {
    const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container" style={{ paddingTop: '20px', paddingBottom: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: '540px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 800 }}>Professional Invoice Templates</h1>
        <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
          Choose a design that fits your business. Data is preserved seamlessly when switching templates.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px',
          backgroundColor: 'var(--color-surface)',
          padding: '8px 12px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <TemplateFilter selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
        <TemplateSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      </div>

      {/* Templates Grid - Compact 230px minmax for 4-column laptop viewports */}
      {filteredTemplates.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
            gap: '14px',
          }}
        >
          {filteredTemplates.map((t) => (
            <TemplateCard
              key={t.id}
              template={t}
              onPreview={setPreviewTemplate}
              onSelect={(tpl) => onSelectTemplate(tpl.id)}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div
          style={{
            textAlign: 'center',
            padding: '36px 20px',
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-lg)',
            border: '1px dashed var(--color-border)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <h3 style={{ fontSize: '16px', fontWeight: 700 }}>No templates found</h3>
          <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
            Try another search or category filter.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
          >
            Reset Filters
          </Button>
        </div>
      )}

      {/* Full Preview Modal */}
      <Modal
        isOpen={!!previewTemplate}
        onClose={() => setPreviewTemplate(null)}
        title={previewTemplate ? `Template Preview: ${previewTemplate.name}` : ''}
        maxWidth="680px"
      >
        {previewTemplate && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ backgroundColor: '#F8FAFC', padding: '8px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <TemplateScaledPreview templateId={previewTemplate.id} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: '12px', fontWeight: 600 }}>Category: {previewTemplate.category}</p>
                <p style={{ fontSize: '11.5px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>{previewTemplate.description}</p>
              </div>
              <Button
                variant="primary"
                size="sm"
                rightIcon={<ArrowRight size={14} />}
                onClick={() => {
                  const tplId = previewTemplate.id;
                  setPreviewTemplate(null);
                  onSelectTemplate(tplId);
                }}
              >
                Use This Template
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
