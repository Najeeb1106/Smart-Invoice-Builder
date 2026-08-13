import React from 'react';
import { Shield, Zap, Printer, FileText, ArrowRight, Lock, Layout } from 'lucide-react';
import { Button } from '../components/common/Button';

export interface FeaturesPageProps {
  onNavigate: (path: string) => void;
}

export const FeaturesPage: React.FC<FeaturesPageProps> = ({ onNavigate }) => {
  const featureList = [
    {
      icon: <Layout size={24} color="var(--color-primary)" />,
      title: '12 Professional Templates',
      desc: 'Distinct visual designs created for corporate, agency, freelancer, consulting, retail, and tech businesses.',
    },
    {
      icon: <Zap size={24} color="var(--color-primary)" />,
      title: 'Real-Time Pure Math Engine',
      desc: 'Subtotal, discount (%), taxable base, and tax (%) calculated automatically with zero precision rounding issues.',
    },
    {
      icon: <Lock size={24} color="var(--color-success)" />,
      title: '100% Local Storage & Privacy',
      desc: 'All invoice state is stored safely in browser localStorage. No external database, tracking, or cloud lock-in.',
    },
    {
      icon: <Printer size={24} color="var(--color-primary)" />,
      title: 'A4 PDF Export & Native Print',
      desc: 'Export multi-page high-resolution PDFs with zero clipping, or launch clean browser print dialogs.',
    },
    {
      icon: <FileText size={24} color="var(--color-primary)" />,
      title: 'Drag & Drop Logo Compressor',
      desc: 'Upload company logos (PNG, JPG, WebP up to 5MB) with automatic client-side resizing and optimization.',
    },
    {
      icon: <Shield size={24} color="var(--color-primary)" />,
      title: 'Multi-Currency Support',
      desc: 'Switch effortlessly between USD, PKR, EUR, GBP, AED, and SAR with strict monetary formatting.',
    },
  ];

  return (
    <div className="container" style={{ paddingTop: '36px', paddingBottom: '48px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-text-primary)' }}>
          Powerful Features for Effortless Invoicing
        </h1>
        <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
          Smart Invoice Builder is designed from the ground up to give you speed, precision, and complete control over your document generation.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        {featureList.map((f, i) => (
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
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-primary-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {f.icon}
            </div>
            <h3 style={{ fontSize: '17px', fontWeight: 700 }}>{f.title}</h3>
            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{f.desc}</p>
          </div>
        ))}
      </div>

      <div
        style={{
          backgroundColor: 'var(--color-surface)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-border)',
          padding: '32px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '4px' }}>Ready to create your invoice?</h2>
          <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Experience modern invoicing with zero account setup required.</p>
        </div>
        <Button variant="primary" size="md" rightIcon={<ArrowRight size={16} />} onClick={() => onNavigate('/create')}>
          Create Free Invoice
        </Button>
      </div>
    </div>
  );
};
