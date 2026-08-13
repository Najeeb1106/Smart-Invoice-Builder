import React, { useState, useRef } from 'react';
import { Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { BuilderSection, useInvoice } from '../state/InvoiceContext';
import { BuilderToolbar } from '../components/builder/BuilderToolbar';
import { BuilderNavigation } from '../components/builder/BuilderNavigation';
import { SectionBusiness } from '../components/builder/SectionBusiness';
import { SectionCustomer } from '../components/builder/SectionCustomer';
import { SectionInvoiceDetails } from '../components/builder/SectionInvoiceDetails';
import { SectionItems } from '../components/builder/SectionItems';
import { SectionDiscountTax } from '../components/builder/SectionDiscountTax';
import { SectionNotesTerms } from '../components/builder/SectionNotesTerms';
import { LivePreviewPanel } from '../components/builder/LivePreviewPanel';
import { TemplateSelectionModal } from '../components/builder/TemplateSelectionModal';
import { Button } from '../components/common/Button';
import { generatePdfFromElement } from '../services/pdfService';
import { printInvoice } from '../services/printService';

export interface BuilderPageProps {
  onNavigate: (path: string) => void;
}

export const BuilderPage: React.FC<BuilderPageProps> = ({ onNavigate }) => {
  const [activeSection, setActiveSection] = useState<BuilderSection>('business');
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  const { isSectionUnlocked, setToastMessage } = useInvoice();
  const previewRef = useRef<HTMLDivElement>(null);

  const sectionOrder: BuilderSection[] = [
    'business',
    'customer',
    'details',
    'items',
    'discount-tax',
    'notes-terms',
  ];

  const currentSectionIndex = sectionOrder.indexOf(activeSection);

  const handleNextSection = () => {
    if (currentSectionIndex < sectionOrder.length - 1) {
      const nextSection = sectionOrder[currentSectionIndex + 1];
      if (isSectionUnlocked(nextSection)) {
        setActiveSection(nextSection);
      } else {
        setToastMessage({
          type: 'warning',
          text: 'Please complete the required fields in this step before proceeding.',
        });
      }
    }
  };

  const handlePrevSection = () => {
    if (currentSectionIndex > 0) {
      setActiveSection(sectionOrder[currentSectionIndex - 1]);
    }
  };

  const handleDownloadPdf = async () => {
    if (!previewRef.current) return;
    setIsGeneratingPdf(true);
    try {
      await generatePdfFromElement({ element: previewRef.current });
    } catch (err) {
      console.error('PDF generation error:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const renderActiveSectionForm = () => {
    switch (activeSection) {
      case 'business':
        return <SectionBusiness />;
      case 'customer':
        return <SectionCustomer />;
      case 'details':
        return <SectionInvoiceDetails />;
      case 'items':
        return <SectionItems />;
      case 'discount-tax':
        return <SectionDiscountTax />;
      case 'notes-terms':
        return <SectionNotesTerms />;
      default:
        return <SectionBusiness />;
    }
  };

  return (
    <div className="builder-layout">
      {/* Top Application Toolbar */}
      <BuilderToolbar
        onBackToTemplates={() => onNavigate('/templates')}
        onOpenTemplateModal={() => setIsTemplateModalOpen(true)}
        onDownloadPdf={handleDownloadPdf}
        onPrint={printInvoice}
        isGeneratingPdf={isGeneratingPdf}
      />

      {/* Main 3-Pane Split Workspace */}
      <div className="builder-main-workspace">
        {/* 1. Left Vertical Sidebar Navigation */}
        <BuilderNavigation
          activeSection={activeSection}
          onSelectSection={setActiveSection}
        />

        {/* 2. Center Form Container Card */}
        <div className="builder-editor-container">
          <div className="builder-form-card">
            {renderActiveSectionForm()}

            {/* Step Navigation Footer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', marginTop: '12px', borderTop: '1px solid #E2E8F0' }}>
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<ChevronLeft size={14} />}
                onClick={handlePrevSection}
                disabled={currentSectionIndex === 0}
              >
                Previous
              </Button>
              <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>
                Step {currentSectionIndex + 1} of {sectionOrder.length}
              </span>
              <Button
                variant="primary"
                size="sm"
                rightIcon={<ChevronRight size={14} />}
                onClick={handleNextSection}
                disabled={currentSectionIndex === sectionOrder.length - 1}
              >
                Next Step
              </Button>
            </div>
          </div>
        </div>

        {/* 3. Right Live Document Canvas Pane */}
        <LivePreviewPanel
          ref={previewRef}
          className={showMobilePreview ? 'show-mobile-preview' : ''}
        />
      </div>

      {/* Mobile Preview FAB Toggle Button */}
      <div
        className="mobile-fab-container no-print"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 50,
        }}
      >
        <Button
          variant="primary"
          size="md"
          leftIcon={<Eye size={16} />}
          onClick={() => setShowMobilePreview(!showMobilePreview)}
        >
          {showMobilePreview ? 'Back to Editor' : 'Preview Document'}
        </Button>
      </div>

      {/* Template Selection Modal */}
      <TemplateSelectionModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
      />

      <style>{`
        @media (min-width: 1025px) {
          .mobile-fab-container { display: none !important; }
        }
        @media (max-width: 1024px) {
          .builder-canvas-pane {
            display: ${showMobilePreview ? 'flex !important' : 'none !important'};
          }
        }
      `}</style>
    </div>
  );
};
