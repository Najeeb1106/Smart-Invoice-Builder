import React from 'react';
import { Lock, Heart } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="container" style={{ paddingTop: '36px', paddingBottom: '48px', maxWidth: '720px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-primary)', backgroundColor: 'var(--color-primary-light)', padding: '3px 10px', borderRadius: 'var(--radius-full)', width: 'fit-content', margin: '0 auto' }}>
          About Smart Invoice Builder
        </span>
        <h1 style={{ fontSize: '28px', fontWeight: 800 }}>Privacy-First Invoicing for Everyone</h1>
        <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
          We believe creating professional invoices should be fast, simple, free, and completely secure.
        </p>
      </div>

      <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: '28px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: 'var(--shadow-sm)' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700 }}>Our Core Mission</h2>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
          Most invoice generators require users to create accounts, sign up for monthly subscriptions, or upload sensitive client data to third-party cloud servers. Smart Invoice Builder was designed differently: as a purely local-first web application where your data stays 100% inside your browser.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Lock size={24} color="var(--color-success)" />
          <h3 style={{ fontSize: '16px', fontWeight: 700 }}>100% Local Privacy</h3>
          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.45 }}>
            No user tracking or server databases. Your invoices and client data live exclusively in local storage.
          </p>
        </div>

        <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Heart size={24} color="var(--color-danger)" />
          <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Free Forever</h3>
          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.45 }}>
            Core template gallery, live builder, and high-res PDF exports are completely free to use.
          </p>
        </div>
      </div>
    </div>
  );
};
