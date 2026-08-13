import React from 'react';
import { Shield, Zap, Printer, Lock, ArrowRight, CheckCircle, Sparkles, LayoutGrid } from 'lucide-react';
import { Button } from '../components/common/Button';
import { TemplateScaledPreview } from '../components/templates/TemplateScaledPreview';
import { TemplateCarousel } from '../components/gallery/TemplateCarousel';
import { TEMPLATES } from '../data/templates';
import { InvoiceData } from '../types/invoice';

const SAMPLE_MARKETING_INVOICE: InvoiceData = {
  business: {
    name: 'CODRIX DEV',
    email: 'contact@codrixdev.com',
    phone: '+92 300 1234567',
    address: '100 Innovation Park, Tech Zone, Lahore',
    taxNumber: 'TAX-99887766',
  },
  customer: {
    name: 'Najeeb Tahir',
    email: 'najeeb.tahir@example.com',
    phone: '+92 321 7654321',
    address: '45 Commercial Boulevard, Suite 302, Lahore',
  },
  details: {
    invoiceNumber: 'INV-20260813-001',
    currency: 'USD',
    invoiceDate: '2026-08-13',
    dueDate: '2026-08-27',
    paymentTerms: 'Payment due within 14 days of invoice issue date via Bank Transfer.',
  },
  items: [
    { id: 'item-1', description: 'Laptop', quantity: 2, price: 500 },
    { id: 'item-2', description: 'Mouse', quantity: 3, price: 20 },
  ],
  discountPercent: 10,
  taxPercent: 5,
  notes: 'Thank you for doing business with CODRIX DEV.',
  terms: 'Late payments may incur a 1.5% interest charge.',
  template: 'modern',
};

export interface LandingPageProps {
  onNavigate: (path: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const benefits = [
    {
      icon: <Zap size={20} color="var(--color-primary)" />,
      title: 'Create in Seconds',
      description: 'Streamlined form editor with instant calculation updates and zero unnecessary fields.',
    },
    {
      icon: <Sparkles size={20} color="var(--color-primary)" />,
      title: '12 Professional Templates',
      description: 'Visually distinct document designs crafted for corporate, agency, freelancer, and retail needs.',
    },
    {
      icon: <Printer size={20} color="var(--color-primary)" />,
      title: 'PDF Export & Print',
      description: 'Generate high-resolution multi-page A4 PDFs or print directly with clean print styles.',
    },
    {
      icon: <Lock size={20} color="var(--color-success)" />,
      title: 'Privacy First',
      description: 'Your invoice data stays inside your browser. No server tracking or database lock-in.',
    },
  ];

  const steps = [
    { num: '01', title: 'Choose Template', desc: 'Select from 12 distinct professional invoice designs.' },
    { num: '02', title: 'Enter Details', desc: 'Fill in business, customer, logo, and line item details.' },
    { num: '03', title: 'Customize & Calculate', desc: 'Automatic subtotal, discount, and tax calculations.' },
    { num: '04', title: 'Download or Print', desc: 'Export high-res PDF or print instantly.' },
  ];

  const industries = [
    'Freelancer', 'Retail', 'Restaurant', 'Construction',
    'Consultant', 'Agency', 'Real Estate', 'Education',
    'Healthcare', 'Photography', 'IT & Software', 'Beauty & Salon',
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* 1. Viewport-Fitted Hero Section */}
      <section
        style={{
          backgroundColor: 'var(--color-surface)',
          borderBottom: '1px solid var(--color-border)',
          height: 'calc(100vh - 44px)',
          maxHeight: 'calc(100vh - 44px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '12px 0',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        <div className="container hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px', alignItems: 'center', width: '100%', height: '100%', maxHeight: '100%' }}>
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '500px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-primary-light)',
                color: 'var(--color-primary)',
                fontSize: '12px',
                fontWeight: 600,
                width: 'fit-content',
              }}
            >
              <Shield size={13} /> 100% Free · Privacy Focused
            </div>

            <h1 style={{ fontSize: '2.15rem', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--color-text-primary)' }}>
              Create Professional Invoices in Seconds
            </h1>

            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.45 }}>
              Create beautiful invoices for freelancers, businesses, agencies, consultants, retailers, service providers, and more.
            </p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', paddingTop: '4px' }}>
              <Button
                variant="primary"
                size="md"
                rightIcon={<ArrowRight size={16} />}
                onClick={() => onNavigate('/create')}
              >
                Create Free Invoice
              </Button>
              <Button
                variant="outline"
                size="md"
                leftIcon={<LayoutGrid size={16} />}
                onClick={() => onNavigate('/templates')}
              >
                Browse Templates
              </Button>
            </div>
          </div>

          {/* Right Column: Live Invoice Preview Frame */}
          <div
            style={{
              boxShadow: 'var(--shadow-xl)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              border: '1px solid var(--color-border)',
              backgroundColor: '#FFFFFF',
              width: '100%',
              maxHeight: 'calc(100vh - 84px)',
              display: 'flex',
              flexDirection: 'column',
              margin: 'auto 0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', backgroundColor: '#F1F5F9', borderBottom: '1px solid #CBD5E1', flexShrink: 0 }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#EF4444' }} />
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#F59E0B' }} />
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }} />
              <span style={{ fontSize: '11px', color: '#64748B', marginLeft: '4px', fontWeight: 600, fontFamily: 'monospace' }}>
                live-sample-preview (Codrix Dev)
              </span>
            </div>
            <div style={{ padding: '0', width: '100%', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
              <TemplateScaledPreview templateId="modern" invoice={SAMPLE_MARKETING_INVOICE} scaleOverride={0.40} />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Full-Screen Benefits Section */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--color-background)',
          borderBottom: '1px solid var(--color-border)',
          padding: '40px 0',
        }}
      >
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '36px', width: '100%' }}>
          <div style={{ textAlign: 'center', maxWidth: '580px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '8px' }}>Why Choose Smart Invoice Builder?</h2>
            <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)' }}>
              Built with modern productivity standards to give you a fast, reliable, and privacy-first invoicing experience.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            {benefits.map((b, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)',
                  padding: '24px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-primary-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {b.icon}
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 700 }}>{b.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Full-Screen Modern 5-Second Horizontal Template Carousel Section */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--color-surface)',
          borderBottom: '1px solid var(--color-border)',
          padding: '40px 0',
        }}
      >
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '4px' }}>Featured Templates Showcase</h2>
              <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                Auto-playing showcase featuring 12 professional invoice layouts. Rotates every 5 seconds.
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => onNavigate('/templates')}>
              View All 12 Templates Grid
            </Button>
          </div>

          {/* Interactive 5-Second Auto-Play Animated Horizontal Carousel */}
          <TemplateCarousel
            templates={TEMPLATES}
            onSelectTemplate={(templateId) => onNavigate(`/create?template=${templateId}`)}
            onViewAll={() => onNavigate('/templates')}
          />
        </div>
      </section>

      {/* 4. Full-Screen How It Works Section */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--color-background)',
          borderBottom: '1px solid var(--color-border)',
          padding: '40px 0',
        }}
      >
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '36px', width: '100%' }}>
          <div style={{ textAlign: 'center', maxWidth: '580px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '8px' }}>How It Works</h2>
            <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)' }}>Create and export your invoice in four simple steps.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
            {steps.map((s, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)',
                  padding: '28px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <span style={{ fontSize: '28px', fontWeight: 900, color: 'var(--color-primary)' }}>
                  {s.num}
                </span>
                <h3 style={{ fontSize: '16px', fontWeight: 700 }}>{s.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.45 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Full-Screen Industries Section */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--color-surface)',
          borderBottom: '1px solid var(--color-border)',
          padding: '40px 0',
        }}
      >
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%', alignItems: 'center' }}>
          <div style={{ textAlign: 'center', maxWidth: '580px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '8px' }}>Built for Every Business</h2>
            <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)' }}>Tailored invoicing workflows for professionals in all sectors.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px', width: '100%', maxWidth: '840px' }}>
            {industries.map((ind, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 18px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-background)',
                  border: '1px solid var(--color-border)',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                }}
              >
                <CheckCircle size={16} color="var(--color-success)" />
                <span>{ind}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Full-Screen Final CTA Section */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--color-background)',
          padding: '40px 0',
        }}
      >
        <div className="container" style={{ width: '100%' }}>
          <div
            style={{
              backgroundColor: '#0F172A',
              color: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              padding: '60px 32px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
              boxShadow: 'var(--shadow-xl)',
              maxWidth: '840px',
              margin: '0 auto',
            }}
          >
            <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
              Ready to create your first invoice?
            </h2>
            <p style={{ fontSize: '16px', color: '#94A3B8', maxWidth: '520px', lineHeight: 1.55 }}>
              No account required. No hidden fees. Start creating professional invoices right in your browser.
            </p>
            <Button
              variant="primary"
              size="lg"
              rightIcon={<ArrowRight size={18} />}
              onClick={() => onNavigate('/create')}
            >
              Create Free Invoice Now
            </Button>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
