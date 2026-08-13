import React from 'react';
import { Building2, User, FileText, List, Percent, FileSignature, Check, Lock } from 'lucide-react';
import { BuilderSection, useInvoice } from '../../state/InvoiceContext';

export interface BuilderNavigationProps {
  activeSection: BuilderSection;
  onSelectSection: (section: BuilderSection) => void;
}

export const BuilderNavigation: React.FC<BuilderNavigationProps> = ({
  activeSection,
  onSelectSection,
}) => {
  const { completion, isSectionUnlocked, setToastMessage } = useInvoice();

  const sections: { id: BuilderSection; label: string; icon: React.ReactNode }[] = [
    { id: 'business', label: 'Business', icon: <Building2 size={16} /> },
    { id: 'customer', label: 'Customer', icon: <User size={16} /> },
    { id: 'details', label: 'Invoice Details', icon: <FileText size={16} /> },
    { id: 'items', label: 'Items', icon: <List size={16} /> },
    { id: 'discount-tax', label: 'Discount & Tax', icon: <Percent size={16} /> },
    { id: 'notes-terms', label: 'Notes & Terms', icon: <FileSignature size={16} /> },
  ];

  const handleSectionClick = (secId: BuilderSection, unlocked: boolean) => {
    if (unlocked) {
      onSelectSection(secId);
    } else {
      setToastMessage({
        type: 'warning',
        text: 'Please complete the required fields in the current section to unlock the next step.',
      });
    }
  };

  return (
    <nav
      className="builder-sidebar no-print"
      aria-label="Invoice Sections Navigation"
      style={{
        width: '200px',
        backgroundColor: '#FFFFFF',
        borderRight: '1px solid #E2E8F0',
        padding: '16px 10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        flexShrink: 0,
      }}
    >
      {sections.map((sec) => {
        const isComplete = completion[sec.id as keyof typeof completion];
        const isUnlocked = isSectionUnlocked(sec.id);
        const isActive = activeSection === sec.id;

        return (
          <button
            key={sec.id}
            onClick={() => handleSectionClick(sec.id, isUnlocked)}
            type="button"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: '10px 12px',
              borderRadius: '8px',
              border: '1px solid transparent',
              backgroundColor: isActive ? '#EEF2FF' : 'transparent',
              color: isActive ? '#4F46E5' : isUnlocked ? '#475569' : '#94A3B8',
              fontWeight: isActive ? 600 : 500,
              fontSize: '13px',
              transition: 'all 150ms ease-in-out',
              textAlign: 'left',
              cursor: isUnlocked ? 'pointer' : 'not-allowed',
              opacity: isUnlocked ? 1 : 0.75,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: isActive ? '#4F46E5' : isUnlocked ? '#64748B' : '#94A3B8', display: 'flex', alignItems: 'center' }}>
                {sec.icon}
              </span>
              <span>{sec.label}</span>
            </div>

            {/* Status Indicator */}
            {!isUnlocked ? (
              <span
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  backgroundColor: '#F1F5F9',
                  color: '#94A3B8',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                title="Locked step"
              >
                <Lock size={10} />
              </span>
            ) : isComplete ? (
              <span
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  backgroundColor: '#16A34A',
                  color: '#FFFFFF',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Check size={11} strokeWidth={3} />
              </span>
            ) : (
              <span
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  backgroundColor: '#E2E8F0',
                  color: '#64748B',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: 700,
                }}
              >
                !
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
};
