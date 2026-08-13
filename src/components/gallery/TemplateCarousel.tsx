import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, CheckCircle2, Sparkles, LayoutGrid } from 'lucide-react';
import { TemplateMeta } from '../../types/template';
import { TemplateScaledPreview } from '../templates/TemplateScaledPreview';
import { Button } from '../common/Button';

export interface TemplateCarouselProps {
  templates: TemplateMeta[];
  onSelectTemplate: (templateId: string) => void;
  onViewAll: () => void;
}

export const TemplateCarousel: React.FC<TemplateCarouselProps> = ({
  templates,
  onSelectTemplate,
  onViewAll,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [key, setKey] = useState<number>(0); // Re-triggers CSS progress animation

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % templates.length);
    setKey((prev) => prev + 1);
  }, [templates.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + templates.length) % templates.length);
    setKey((prev) => prev + 1);
  }, [templates.length]);

  const handleGoTo = (index: number) => {
    setActiveIndex(index);
    setKey((prev) => prev + 1);
  };

  // 5-second Auto-Play Timer
  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [isHovered, handleNext]);

  const currentTemplate = templates[activeIndex] || templates[0];

  const templateHighlights: Record<string, string[]> = {
    modern: ['Indigo Accent Bar', 'Clean Metric Layout', 'Optimized for Agency & Tech'],
    classic: ['Serif Heading Styling', 'Formal Corporate Header', 'Standard Financial Format'],
    minimal: ['Monochrome Line Art', 'Ultra Clean Layout', 'Ideal for Freelancers'],
    bold: ['High Contrast Headers', 'Prominent Totals Box', 'Creative Studio Design'],
    corporate: ['Dual Tone Accent', 'Tax & Registration Fields', 'Enterprise Standard'],
    creative: ['Vibrant Purple Palette', 'Modern Rounded Badges', 'Design & Marketing'],
    compact: ['Dense Data Grid', 'Multi-Line Item Support', 'Retail & Wholesale'],
    elegant: ['Sophisticated Layout', 'Subtle Border Accents', 'Consulting & Legal'],
    tech: ['Monospace Metadata', 'Dark Accent Headers', 'Software & Hardware'],
    retail: ['Itemized Quantity Grid', 'Discount Highlight Row', 'E-commerce & Shops'],
    simple: ['Zero Distractions', 'Fast Single-Page Render', 'General Purpose'],
    startup: ['Modern Pill Badges', 'SaaS Friendly Theme', 'Ventures & Agencies'],
  };

  const highlights = templateHighlights[currentTemplate.id] || [
    'Instant Auto-Calculation',
    'High-Resolution PDF Export',
    'A4 Standard Print Layout',
  ];

  return (
    <div
      className="template-carousel-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: 'var(--color-surface)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-xl)',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 5-Second Progress Bar at Top */}
      <div style={{ height: '4px', backgroundColor: '#E2E8F0', width: '100%', position: 'relative' }}>
        <div
          key={key}
          style={{
            height: '100%',
            backgroundColor: 'var(--color-primary)',
            width: '100%',
            animation: isHovered ? 'none' : 'progress5s 5s linear infinite',
            transformOrigin: 'left center',
          }}
        />
      </div>

      {/* Main Slide Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '32px',
          padding: '24px 32px',
          alignItems: 'center',
          minHeight: '440px',
        }}
        className="carousel-grid"
      >
        {/* Left Column: Live Document Frame */}
        <div
          style={{
            backgroundColor: '#F8FAFC',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-md)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Top Window Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 12px', backgroundColor: '#E2E8F0', borderBottom: '1px solid #CBD5E1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#F59E0B' }} />
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }} />
              <span style={{ fontSize: '11px', color: '#64748B', marginLeft: '6px', fontWeight: 600, fontFamily: 'monospace' }}>
                {currentTemplate.id}-template.invoice
              </span>
            </div>
            <span style={{ fontSize: '10px', color: '#64748B', fontWeight: 700 }}>
              AUTO-SLIDE (5s)
            </span>
          </div>

          {/* Scaled Preview Frame */}
          <div style={{ padding: '10px', display: 'flex', justifyContent: 'center', backgroundColor: '#F8FAFC' }}>
            <TemplateScaledPreview templateId={currentTemplate.id} scaleOverride={0.34} />
          </div>
        </div>

        {/* Right Column: Template Info & CTA */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--color-primary)',
                backgroundColor: 'var(--color-primary-light)',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <Sparkles size={12} /> {currentTemplate.category} Template
            </span>

            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>
              {String(activeIndex + 1).padStart(2, '0')} / {String(templates.length).padStart(2, '0')}
            </span>
          </div>

          <div>
            <h3 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: '8px', letterSpacing: '-0.02em' }}>
              {currentTemplate.name}
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
              {currentTemplate.description}
            </p>
          </div>

          {/* Highlights Checklist */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '4px' }}>
            {highlights.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--color-text-primary)', fontWeight: 500 }}>
                <CheckCircle2 size={15} color="var(--color-primary)" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* Actions Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '12px' }}>
            <Button
              variant="primary"
              size="md"
              rightIcon={<ArrowRight size={16} />}
              onClick={() => onSelectTemplate(currentTemplate.id)}
            >
              Use {currentTemplate.name}
            </Button>
            <Button variant="outline" size="md" leftIcon={<LayoutGrid size={15} />} onClick={onViewAll}>
              View All 12
            </Button>
          </div>
        </div>
      </div>

      {/* Footer Navigation Bar (Arrows + Dots) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 24px',
          backgroundColor: '#F8FAFC',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '6px 12px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--color-border)',
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
          }}
        >
          <ChevronLeft size={16} /> Prev
        </button>

        {/* Dot Indicators */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {templates.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => handleGoTo(idx)}
              title={t.name}
              style={{
                width: idx === activeIndex ? '24px' : '8px',
                height: '8px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: idx === activeIndex ? 'var(--color-primary)' : '#CBD5E1',
                transition: 'all 250ms ease-in-out',
              }}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '6px 12px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--color-border)',
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
          }}
        >
          Next <ChevronRight size={16} />
        </button>
      </div>

      <style>{`
        @keyframes progress5s {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        @media (max-width: 1024px) {
          .carousel-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
