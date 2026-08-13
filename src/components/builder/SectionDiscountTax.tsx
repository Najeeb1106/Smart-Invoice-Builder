import React from 'react';
import { Input } from '../common/Input';
import { useInvoice } from '../../state/InvoiceContext';
import { calculateInvoiceTotals } from '../../utils/invoiceCalculations';
import { formatCurrency } from '../../utils/formatters';

export const SectionDiscountTax: React.FC = () => {
  const { invoice, updateDiscountTax } = useInvoice();
  const currency = invoice.details.currency;
  const totals = calculateInvoiceTotals(invoice.items, invoice.discountPercent, invoice.taxPercent);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '2px' }}>Discount & Tax</h3>
        <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
          Apply optional discount and tax percentages to adjust invoice totals.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <Input
          label="Discount Rate (%)"
          type="number"
          min="0"
          max="100"
          step="any"
          placeholder="0"
          value={invoice.discountPercent || ''}
          onChange={(e) => updateDiscountTax(parseFloat(e.target.value) || 0, invoice.taxPercent)}
        />
        <Input
          label="Tax Rate (%)"
          type="number"
          min="0"
          max="100"
          step="any"
          placeholder="0"
          value={invoice.taxPercent || ''}
          onChange={(e) => updateDiscountTax(invoice.discountPercent, parseFloat(e.target.value) || 0)}
        />
      </div>

      {/* Summary Breakdown Box */}
      <div
        style={{
          backgroundColor: 'var(--color-surface)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)',
          padding: '16px 18px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-primary)', borderBottom: '1px solid var(--color-border)', paddingBottom: '6px' }}>
          Totals Summary
        </h4>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
          <span>Subtotal:</span>
          <span style={{ fontWeight: 600 }}>{formatCurrency(totals.subtotal, currency)}</span>
        </div>
        {totals.discountAmount > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--color-success)' }}>
            <span>Discount ({invoice.discountPercent}%):</span>
            <span style={{ fontWeight: 600 }}>-{formatCurrency(totals.discountAmount, currency)}</span>
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
          <span>Taxable Base:</span>
          <span>{formatCurrency(totals.taxableAmount, currency)}</span>
        </div>
        {totals.taxAmount > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
            <span>Tax ({invoice.taxPercent}%):</span>
            <span>{formatCurrency(totals.taxAmount, currency)}</span>
          </div>
        )}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '16px',
            fontWeight: 800,
            color: 'var(--color-primary)',
            borderTop: '1px solid var(--color-border)',
            paddingTop: '10px',
            marginTop: '2px',
          }}
        >
          <span>Grand Total:</span>
          <span>{formatCurrency(totals.grandTotal, currency)}</span>
        </div>
      </div>
    </div>
  );
};
