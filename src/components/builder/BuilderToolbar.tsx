import React, { useState } from 'react';
import { ChevronLeft, Save, Printer, Download, LayoutGrid } from 'lucide-react';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { useInvoice } from '../../state/InvoiceContext';
import { TEMPLATES } from '../../data/templates';

export interface BuilderToolbarProps {
  onBackToTemplates: () => void;
  onOpenTemplateModal: () => void;
  onDownloadPdf: () => void;
  onPrint: () => void;
  isGeneratingPdf?: boolean;
}

export const BuilderToolbar: React.FC<BuilderToolbarProps> = ({
  onBackToTemplates,
  onOpenTemplateModal,
  onDownloadPdf,
  onPrint,
  isGeneratingPdf = false,
}) => {
  const { invoice, saveInvoice, startNewInvoice } = useInvoice();
  const [newModalOpen, setNewModalOpen] = useState(false);

  const currentTemplateMeta = TEMPLATES.find((t) => t.id === invoice.template) || TEMPLATES[0];

  const handleConfirmNew = () => {
    startNewInvoice();
    setNewModalOpen(false);
  };

  return (
    <>
      <header
        className="builder-toolbar no-print"
        style={{
          height: '52px',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
          zIndex: 30,
          flexShrink: 0,
        }}
      >
        {/* Left: Back & Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={onBackToTemplates}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              color: '#475569',
              fontSize: '13px',
              fontWeight: 500,
            }}
          >
            <span style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#EEF2FF', color: '#4F46E5', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <ChevronLeft size={14} />
            </span>
            <span>Templates</span>
          </button>
          <span style={{ color: '#CBD5E1' }}>|</span>
          <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>
            Invoice Builder
          </h2>
        </div>

        {/* Center: Template Indicator & Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '13px', color: '#64748B' }}>
            Template: <strong style={{ color: '#0F172A' }}>{currentTemplateMeta.name}</strong>
          </span>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<LayoutGrid size={13} />}
            onClick={onOpenTemplateModal}
          >
            Change
          </Button>
        </div>

        {/* Right: Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setNewModalOpen(true)}
            style={{ color: '#64748B', fontSize: '13px', fontWeight: 500, padding: '0 8px' }}
          >
            New Invoice
          </button>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Save size={13} />}
            onClick={saveInvoice}
          >
            Save
          </Button>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Printer size={13} />}
            onClick={onPrint}
          >
            Print
          </Button>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Download size={13} />}
            isLoading={isGeneratingPdf}
            onClick={onDownloadPdf}
          >
            Download PDF
          </Button>
        </div>
      </header>

      {/* New Invoice Confirmation Modal */}
      <Modal
        isOpen={newModalOpen}
        onClose={() => setNewModalOpen(false)}
        title="Start a new invoice?"
        maxWidth="400px"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.45 }}>
            Your current invoice data will be cleared and a new invoice number generated. Are you sure you want to start fresh?
          </p>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', paddingTop: '6px' }}>
            <Button variant="outline" size="sm" onClick={() => setNewModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" size="sm" onClick={handleConfirmNew}>
              Start New Invoice
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
