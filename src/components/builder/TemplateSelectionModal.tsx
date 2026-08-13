import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useInvoice } from '../../state/InvoiceContext';
import { TEMPLATES } from '../../data/templates';
import { TemplateCategory, TemplateMeta } from '../../types/template';
import { TemplateFilter } from '../gallery/TemplateFilter';
import { TemplateSearch } from '../gallery/TemplateSearch';
import { TemplateScaledPreview } from '../templates/TemplateScaledPreview';
import { Check } from 'lucide-react';

export interface TemplateSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TemplateSelectionModal: React.FC<TemplateSelectionModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { invoice, changeTemplate } = useInvoice();
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredTemplates = TEMPLATES.filter((t) => {
    const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSelectTemplate = (template: TemplateMeta) => {
    changeTemplate(template.id);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Change Invoice Template" maxWidth="840px">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <TemplateFilter selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
          <TemplateSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '20px',
            maxHeight: '55vh',
            overflowY: 'auto',
            paddingRight: '4px',
          }}
        >
          {filteredTemplates.map((t) => {
            const isCurrent = invoice.template === t.id;
            return (
              <div
                key={t.id}
                onClick={() => handleSelectTemplate(t)}
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderRadius: 'var(--radius-md)',
                  border: `2px solid ${isCurrent ? 'var(--color-primary)' : 'var(--color-border)'}`,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  padding: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  position: 'relative',
                }}
              >
                <TemplateScaledPreview templateId={t.id} invoice={invoice} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700 }}>{t.name}</span>
                  {isCurrent && (
                    <span style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '2px 6px', borderRadius: 'var(--radius-full)', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '2px' }}>
                      <Check size={10} /> Active
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '12px', borderTop: '1px solid var(--color-border)' }}>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};
