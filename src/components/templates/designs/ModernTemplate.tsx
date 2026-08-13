import React from 'react';
import { InvoiceData } from '../../../types/invoice';
import { calculateInvoiceTotals } from '../../../utils/invoiceCalculations';
import { formatCurrency, formatDate } from '../../../utils/formatters';

export const ModernTemplate: React.FC<{ invoice: InvoiceData }> = ({ invoice }) => {
  const totals = calculateInvoiceTotals(invoice.items, invoice.discountPercent, invoice.taxPercent);
  const currency = invoice.details.currency;

  return (
    <div className="invoice-a4-page modern-template">
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          {invoice.business.logo ? (
            <img
              src={invoice.business.logo}
              alt={invoice.business.name}
              style={{ maxHeight: '60px', maxWidth: '180px', objectFit: 'contain', marginBottom: '12px' }}
            />
          ) : null}
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#1E1B4B', letterSpacing: '-0.02em' }}>
            {invoice.business.name || 'Your Business Name'}
          </h1>
          <p style={{ fontSize: '13px', color: '#4B5563', whiteSpace: 'pre-line', marginTop: '4px' }}>
            {invoice.business.address}
          </p>
          <p style={{ fontSize: '13px', color: '#6B7280', marginTop: '4px' }}>
            {invoice.business.email} {invoice.business.phone ? `• ${invoice.business.phone}` : ''}
            {invoice.business.taxNumber ? ` • Tax ID: ${invoice.business.taxNumber}` : ''}
          </p>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div
            style={{
              display: 'inline-block',
              backgroundColor: '#EEF2FF',
              color: '#4F46E5',
              padding: '6px 16px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 700,
              marginBottom: '8px',
            }}
          >
            INVOICE
          </div>
          <p style={{ fontSize: '18px', fontWeight: 700, color: '#111827' }}>
            {invoice.details.invoiceNumber}
          </p>
          <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '6px' }}>
            <p><strong>Date:</strong> {formatDate(invoice.details.invoiceDate)}</p>
            {invoice.details.dueDate && <p><strong>Due Date:</strong> {formatDate(invoice.details.dueDate)}</p>}
          </div>
        </div>
      </div>

      {/* Bill To & Details Bar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
          backgroundColor: '#F8FAFC',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '32px',
          border: '1px solid #E2E8F0',
        }}
      >
        <div>
          <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#4F46E5', letterSpacing: '0.05em', marginBottom: '6px' }}>
            Billed To
          </p>
          <p style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>
            {invoice.customer.name || 'Customer Name'}
          </p>
          <p style={{ fontSize: '13px', color: '#4B5563', whiteSpace: 'pre-line', marginTop: '4px' }}>
            {invoice.customer.address}
          </p>
          <p style={{ fontSize: '13px', color: '#6B7280', marginTop: '4px' }}>
            {invoice.customer.email} {invoice.customer.phone ? `• ${invoice.customer.phone}` : ''}
          </p>
        </div>

        {invoice.details.paymentTerms && (
          <div>
            <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#4F46E5', letterSpacing: '0.05em', marginBottom: '6px' }}>
              Payment Terms
            </p>
            <p style={{ fontSize: '13px', color: '#334155' }}>
              {invoice.details.paymentTerms}
            </p>
          </div>
        )}
      </div>

      {/* Items Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '32px' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #E2E8F0', textTransform: 'uppercase', fontSize: '11px', color: '#64748B', letterSpacing: '0.05em' }}>
            <th style={{ textAlign: 'left', padding: '12px 8px' }}>Description</th>
            <th style={{ textAlign: 'right', padding: '12px 8px', width: '80px' }}>Qty</th>
            <th style={{ textAlign: 'right', padding: '12px 8px', width: '120px' }}>Unit Price</th>
            <th style={{ textAlign: 'right', padding: '12px 8px', width: '120px' }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, idx) => (
            <tr key={item.id || idx} style={{ borderBottom: '1px solid #F1F5F9' }}>
              <td style={{ padding: '14px 8px', fontSize: '14px', fontWeight: 500, color: '#1E293B' }}>
                {item.description || 'Item description'}
              </td>
              <td style={{ padding: '14px 8px', fontSize: '14px', textAlign: 'right', color: '#475569' }}>
                {item.quantity}
              </td>
              <td style={{ padding: '14px 8px', fontSize: '14px', textAlign: 'right', color: '#475569' }}>
                {formatCurrency(item.price, currency)}
              </td>
              <td style={{ padding: '14px 8px', fontSize: '14px', textAlign: 'right', fontWeight: 600, color: '#0F172A' }}>
                {formatCurrency(item.quantity * item.price, currency)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals Section */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '32px' }}>
        <div style={{ width: '280px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#475569' }}>
            <span>Subtotal:</span>
            <span>{formatCurrency(totals.subtotal, currency)}</span>
          </div>

          {totals.discountAmount > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#16A34A' }}>
              <span>Discount ({invoice.discountPercent}%):</span>
              <span>-{formatCurrency(totals.discountAmount, currency)}</span>
            </div>
          )}

          {totals.taxAmount > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#475569' }}>
              <span>Tax ({invoice.taxPercent}%):</span>
              <span>{formatCurrency(totals.taxAmount, currency)}</span>
            </div>
          )}

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '18px',
              fontWeight: 800,
              color: '#4F46E5',
              borderTop: '2px solid #E2E8F0',
              paddingTop: '12px',
              marginTop: '4px',
            }}
          >
            <span>Grand Total:</span>
            <span>{formatCurrency(totals.grandTotal, currency)}</span>
          </div>
        </div>
      </div>

      {/* Notes & Terms */}
      {(invoice.notes || invoice.terms) && (
        <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '20px', fontSize: '12px', color: '#64748B', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {invoice.notes && (
            <div>
              <strong style={{ color: '#334155' }}>Notes:</strong>
              <p style={{ marginTop: '2px', whiteSpace: 'pre-line' }}>{invoice.notes}</p>
            </div>
          )}
          {invoice.terms && (
            <div>
              <strong style={{ color: '#334155' }}>Terms & Conditions:</strong>
              <p style={{ marginTop: '2px', whiteSpace: 'pre-line' }}>{invoice.terms}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
