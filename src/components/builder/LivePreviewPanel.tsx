import React, { forwardRef } from 'react';
import { useInvoice } from '../../state/InvoiceContext';
import { TemplateRenderer } from '../templates/TemplateRenderer';

export const LivePreviewPanel = forwardRef<HTMLDivElement, { className?: string }>(
  ({ className = '' }, ref) => {
    const { invoice } = useInvoice();

    return (
      <div className={`builder-canvas-pane ${className}`}>
        {/* Top Header Bar */}
        <div
          style={{
            width: '100%',
            backgroundColor: '#E2E8F0',
            borderBottom: '1px solid #CBD5E1',
            padding: '4px 12px',
            textAlign: 'center',
            fontSize: '10px',
            fontWeight: 700,
            color: '#64748B',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            flexShrink: 0,
            marginBottom: '6px',
          }}
          className="no-print"
        >
          DOCUMENT PREVIEW (A4 SCALE)
        </div>

        {/* Scaled A4 Document Paper - 0.58 Scale for Zero Scroll */}
        <div
          ref={ref}
          className="preview-panel-container"
          style={{
            transform: 'scale(0.58)',
            transformOrigin: 'top center',
            boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.1), 0 4px 6px -2px rgba(15, 23, 42, 0.05)',
            borderRadius: '2px',
            backgroundColor: '#FFFFFF',
          }}
        >
          <TemplateRenderer invoice={invoice} />
        </div>
      </div>
    );
  }
);

LivePreviewPanel.displayName = 'LivePreviewPanel';
