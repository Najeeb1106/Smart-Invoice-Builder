import React, { useState } from 'react';
import { Upload, Trash2 } from 'lucide-react';
import { Input } from '../common/Input';
import { Textarea } from '../common/Textarea';
import { Select } from '../common/Select';
import { Button } from '../common/Button';
import { useInvoice } from '../../state/InvoiceContext';
import { processLogoFile } from '../../utils/imageCompressor';

export const SectionBusiness: React.FC = () => {
  const { invoice, updateBusiness } = useInvoice();
  const [logoError, setLogoError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLogoError(null);
    setIsProcessing(true);

    try {
      const result = await processLogoFile(file);
      updateBusiness({ logo: result.dataUrl });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setLogoError(err.message);
      } else {
        setLogoError('Failed to process image file.');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRemoveLogo = () => {
    updateBusiness({ logo: undefined });
    setLogoError(null);
  };

  const countryOptions = [
    { value: '', label: 'Select country' },
    { value: 'United States', label: 'United States' },
    { value: 'Pakistan', label: 'Pakistan' },
    { value: 'United Kingdom', label: 'United Kingdom' },
    { value: 'Canada', label: 'Canada' },
    { value: 'Australia', label: 'Australia' },
    { value: 'Germany', label: 'Germany' },
    { value: 'United Arab Emirates', label: 'United Arab Emirates' },
    { value: 'Saudi Arabia', label: 'Saudi Arabia' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', marginBottom: '4px' }}>Business Information</h3>
        <p style={{ fontSize: '13px', color: '#64748B' }}>
          Enter your company details as they should appear on the invoice.
        </p>
      </div>

      {/* Logo Dropzone Component */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label style={{ fontSize: '12px', fontWeight: 600, color: '#0F172A' }}>
          Company Logo
        </label>
        {invoice.business.logo ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              backgroundColor: '#FFFFFF',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '6px',
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '4px',
                }}
              >
                <img
                  src={invoice.business.logo}
                  alt="Uploaded company logo"
                  style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                />
              </div>
              <div>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A', display: 'block' }}>
                  Company Logo
                </span>
                <span style={{ fontSize: '11px', color: '#16A34A', fontWeight: 500 }}>
                  Ready to display on invoice
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <label htmlFor="replace-logo-input" style={{ cursor: 'pointer' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '32px',
                    padding: '0 12px',
                    fontSize: '12px',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    backgroundColor: 'transparent',
                    color: '#0F172A',
                    fontWeight: 500,
                  }}
                >
                  Replace
                </span>
                <input
                  id="replace-logo-input"
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  onChange={handleLogoUpload}
                  style={{ display: 'none' }}
                />
              </label>
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<Trash2 size={13} />}
                onClick={handleRemoveLogo}
                style={{ color: '#DC2626', fontSize: '12px' }}
              >
                Remove
              </Button>
            </div>
          </div>
        ) : (
          <label
            htmlFor="logo-upload-input"
            style={{
              border: '1.5px dashed #CBD5E1',
              borderRadius: '8px',
              padding: '24px',
              textAlign: 'center',
              backgroundColor: '#F8FAFC',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 150ms ease-in-out',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#EEF2FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#4F46E5',
              }}
            >
              <Upload size={16} />
            </div>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>
              {isProcessing ? 'Processing image...' : 'Click to upload or drag logo here'}
            </span>
            <span style={{ fontSize: '11px', color: '#64748B' }}>
              Supports PNG, JPG, JPEG, or WebP up to 5 MB
            </span>
            <input
              id="logo-upload-input"
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/webp"
              onChange={handleLogoUpload}
              disabled={isProcessing}
              style={{ display: 'none' }}
            />
          </label>
        )}
        {logoError && (
          <span style={{ fontSize: '11px', color: '#DC2626' }}>{logoError}</span>
        )}
      </div>

      {/* Business Name */}
      <Input
        label="Business Name *"
        placeholder="e.g. CODRIX DEV"
        value={invoice.business.name}
        onChange={(e) => updateBusiness({ name: e.target.value })}
        required
      />

      {/* Email & Phone (2-Column) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <Input
          label="Email Address"
          type="email"
          placeholder="contact@company.com"
          value={invoice.business.email}
          onChange={(e) => updateBusiness({ email: e.target.value })}
        />
        <Input
          label="Phone Number"
          placeholder="+1 (555) 000-0000"
          value={invoice.business.phone}
          onChange={(e) => updateBusiness({ phone: e.target.value })}
        />
      </div>

      {/* Street Address */}
      <Textarea
        label="Street Address"
        rows={2}
        placeholder="Street name, City, Country"
        value={invoice.business.address}
        onChange={(e) => updateBusiness({ address: e.target.value })}
      />

      {/* City, State, Zip (3-Column Layout from Screenshot) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
        <Input
          label="City"
          placeholder="City"
          value={invoice.business.city || ''}
          onChange={(e) => updateBusiness({ city: e.target.value })}
        />
        <Input
          label="State / Province"
          placeholder="State"
          value={invoice.business.state || ''}
          onChange={(e) => updateBusiness({ state: e.target.value })}
        />
        <Input
          label="ZIP / Postal Code"
          placeholder="ZIP Code"
          value={invoice.business.zip || ''}
          onChange={(e) => updateBusiness({ zip: e.target.value })}
        />
      </div>

      {/* Country Select */}
      <Select
        label="Country"
        options={countryOptions}
        value={invoice.business.country || ''}
        onChange={(e) => updateBusiness({ country: e.target.value })}
      />

      {/* Tax ID & Website (2-Column Layout from Screenshot) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <Input
          label="Tax ID (Optional)"
          placeholder="e.g. TAX-99887766"
          value={invoice.business.taxNumber}
          onChange={(e) => updateBusiness({ taxNumber: e.target.value })}
        />
        <Input
          label="Website (Optional)"
          placeholder="e.g. www.company.com"
          value={invoice.business.website || ''}
          onChange={(e) => updateBusiness({ website: e.target.value })}
        />
      </div>
    </div>
  );
};
