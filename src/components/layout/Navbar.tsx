import React, { useState, useEffect } from 'react';
import { FileText, Menu, X, Plus } from 'lucide-react';
import { Button } from '../common/Button';

export interface NavbarProps {
  activePath?: string;
  onNavigate?: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePath = '/',
  onNavigate = (path) => { window.location.hash = path; },
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Templates', path: '/templates' },
    { label: 'Features', path: '/features' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        boxShadow: scrolled ? 'var(--shadow-md)' : 'none',
        transition: 'box-shadow var(--transition-normal)',
      }}
    >
      <div
        className="container"
        style={{
          height: '44px', /* Ultra-compact 44px Navbar height */
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand Logo */}
        <button
          onClick={() => handleLinkClick('/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            textDecoration: 'none',
          }}
        >
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
            }}
          >
            <FileText size={14} />
          </div>
          <span
            style={{
              fontSize: '14px',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.02em',
            }}
          >
            Smart Invoice Builder
          </span>
        </button>

        {/* Desktop Nav Links */}
        <nav
          aria-label="Main Navigation"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => handleLinkClick(link.path)}
              style={{
                fontSize: '12px',
                fontWeight: activePath === link.path ? 600 : 500,
                color: activePath === link.path ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                position: 'relative',
                padding: '2px 0',
              }}
            >
              {link.label}
              {activePath === link.path && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    backgroundColor: 'var(--color-primary)',
                    borderRadius: 'var(--radius-full)',
                  }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="desktop-actions">
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Plus size={13} />}
            onClick={() => handleLinkClick('/create')}
          >
            Create Invoice
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
          style={{
            padding: '4px',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--color-text-primary)',
            display: 'none',
          }}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: '44px 0 0 0',
            backgroundColor: 'var(--color-surface)',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            zIndex: 99,
            borderTop: '1px solid var(--color-border)',
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => handleLinkClick(link.path)}
              style={{
                fontSize: '14px',
                fontWeight: activePath === link.path ? 600 : 500,
                color: activePath === link.path ? 'var(--color-primary)' : 'var(--color-text-primary)',
                textAlign: 'left',
                padding: '8px 0',
                borderBottom: '1px solid var(--color-border)',
              }}
            >
              {link.label}
            </button>
          ))}
          <Button
            variant="primary"
            size="md"
            leftIcon={<Plus size={15} />}
            onClick={() => handleLinkClick('/create')}
            style={{ marginTop: '8px', width: '100%' }}
          >
            Create Invoice
          </Button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav, .desktop-actions {
            display: none !important;
          }
          .mobile-menu-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
};
