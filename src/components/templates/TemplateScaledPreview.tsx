import React, { useRef, useEffect, useState } from 'react';
import { InvoiceData, TemplateId } from '../../types/invoice';
import { DEFAULT_INVOICE } from '../../data/defaultInvoice';
import { TemplateRenderer } from './TemplateRenderer';

export interface TemplateScaledPreviewProps {
  templateId: TemplateId;
  invoice?: InvoiceData;
  scaleOverride?: number;
}

export const TemplateScaledPreview: React.FC<TemplateScaledPreviewProps> = ({
  templateId,
  invoice,
  scaleOverride,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(0.3);

  const sampleData: InvoiceData = invoice
    ? { ...invoice, template: templateId }
    : { ...DEFAULT_INVOICE, template: templateId };

  useEffect(() => {
    if (scaleOverride) {
      setScale(scaleOverride);
      return;
    }

    const updateScale = () => {
      if (containerRef.current && containerRef.current.clientWidth > 0) {
        const containerWidth = containerRef.current.clientWidth;
        const a4WidthPx = 794; // 210mm in px at 96DPI
        const calculatedScale = containerWidth / a4WidthPx;
        setScale(calculatedScale);
      }
    };

    updateScale();

    let resizeObserver: ResizeObserver | null = null;
    if (containerRef.current && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => updateScale());
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener('resize', updateScale);
    return () => {
      window.removeEventListener('resize', updateScale);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [scaleOverride]);

  // Exact A4 width (210mm = 793.7px) and height (297mm = 1122.5px) multiplied by scale
  const containerWidthPx = Math.round(793.7 * scale);
  const containerHeightPx = Math.round(1122.5 * scale);

  return (
    <div
      ref={containerRef}
      className="template-scaled-container"
      style={{
        width: `${containerWidthPx}px`,
        height: `${containerHeightPx}px`,
        aspectRatio: 'unset',
        border: 'none',
        boxShadow: 'none',
      }}
    >
      <div
        className="template-scaled-inner"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        <TemplateRenderer invoice={sampleData} templateId={templateId} />
      </div>
    </div>
  );
};
