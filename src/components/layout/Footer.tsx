import React from 'react';
import { FileText, Zap, Lock } from 'lucide-react';

export interface FooterProps {
  onNavigate?: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate = (path) => { window.location.hash = path; },
}) => {
  return (
    <footer
      style={{
        backgroundColor: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)',
        paddingTop: '24px',
        paddingBottom: '16px',
        marginTop: 'auto',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '24px',
            marginBottom: '20px',
          }}
        >
          {/* Brand Col */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div
                style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                }}
              >
                <FileText size={13} />
              </div>
              <span style={{ fontSize: '14px', fontWeight: 700 }}>Smart Invoice Builder</span>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
              A privacy-focused, local-first invoice builder for freelancers, businesses, and agencies.
            </p>
            <div style={{ display: 'flex', gap: '10px', color: 'var(--color-text-muted)', fontSize: '11px' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                <Lock size={12} color="var(--color-success)" /> Privacy First
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                <Zap size={12} color="var(--color-warning)" /> Fast & Free
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 700, marginBottom: '8px', color: 'var(--color-text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Product
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>
                <button onClick={() => onNavigate('/create')} style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                  Create Invoice
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/templates')} style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                  Template Marketplace
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/features')} style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                  Features Overview
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 700, marginBottom: '8px', color: 'var(--color-text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Company
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>
                <button onClick={() => onNavigate('/about')} style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/contact')} style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                  Contact & Support
                </button>
              </li>
            </ul>
          </div>

          {/* Security Banner */}
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 700, marginBottom: '8px', color: 'var(--color-text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Privacy & Security
            </h4>
            <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', lineHeight: 1.4 }}>
              All your invoice data stays inside your browser localStorage. No tracking or backend database.
            </p>
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid var(--color-border)',
            paddingTop: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '8px',
            fontSize: '11px',
            color: 'var(--color-text-muted)',
          }}
        >
          <span>© 2026 Smart Invoice Builder. All rights reserved.</span>
          <span>100% Free · Privacy Focused</span>
        </div>
      </div>
    </footer>
  );
};
