import React from 'react';
import { InvoiceData } from '../../../types/invoice';
import { calculateInvoiceTotals } from '../../../utils/invoiceCalculations';
import { formatCurrency, formatDate } from '../../../utils/formatters';

export const ExecutiveTemplate: React.FC<{ invoice: InvoiceData }> = ({ invoice }) => {
  const totals = calculateInvoiceTotals(invoice.items, invoice.discountPercent, invoice.taxPercent);
  const currency = invoice.details.currency;

  return (
    <div className="invoice-a4-page executive-template" style={{ padding: 0, overflow: 'hidden' }}>
      {/* Dark Header Banner */}
      <div style={{ backgroundColor: '#0F172A', color: '#FFFFFF', padding: '32px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          {invoice.business.logo && (
            <img src={invoice.business.logo} alt="" style={{ maxHeight: '50px', marginBottom: '12px' }} />
          )}
          <h1 style={{ fontSize: '24px', fontWeight: 700, letterSpacing: '-0.02em', color: '#FFFFFF' }}>{invoice.business.name}</h1>
          <p style={{ fontSize: '13px', color: '#94A3B8', marginTop: '4px' }}>{invoice.business.address}</p>
        </div>

        <div style={{ textAlign: 'right' }}>
          <span style={{ backgroundColor: '#D97706', color: '#FFFFFF', padding: '4px 12px', borderRadius: '4px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            INVOICE
          </span>
          <p style={{ fontSize: '20px', fontWeight: 700, marginTop: '8px', color: '#F8FAFC' }}>#{invoice.details.invoiceNumber}</p>
          <p style={{ fontSize: '12px', color: '#CBD5E1', marginTop: '4px' }}>Issued: {formatDate(invoice.details.invoiceDate)}</p>
        </div>
      </div>

      <div style={{ padding: '24mm 20mm' }}>
        {/* Client & Metadata Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '32px' }}>
          <div>
            <p style={{ fontSize: '11px', textTransform: 'uppercase', color: '#D97706', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '6px' }}>CLIENT DETAILS</p>
            <p style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A' }}>{invoice.customer.name}</p>
            <p style={{ fontSize: '13px', color: '#475569', whiteSpace: 'pre-line', marginTop: '4px' }}>{invoice.customer.address}</p>
            <p style={{ fontSize: '13px', color: '#64748B', marginTop: '4px' }}>{invoice.customer.email}</p>
          </div>

          <div style={{ borderLeft: '3px solid #D97706', paddingLeft: '16px' }}>
            <p style={{ fontSize: '11px', textTransform: 'uppercase', color: '#D97706', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '6px' }}>PAYMENT DETAILS</p>
            <p style={{ fontSize: '13px', color: '#334155' }}>Currency: <strong>{currency}</strong></p>
            {invoice.details.dueDate && <p style={{ fontSize: '13px', color: '#334155' }}>Due Date: <strong>{formatDate(invoice.details.dueDate)}</strong></p>}
            {invoice.details.paymentTerms && <p style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>{invoice.details.paymentTerms}</p>}
          </div>
        </div>

        {/* Table */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '32px' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '2px solid #D97706', fontSize: '11px', textTransform: 'uppercase', color: '#0F172A', fontWeight: 700 }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Description</th>
              <th style={{ padding: '12px', textAlign: 'right', width: '70px' }}>Qty</th>
              <th style={{ padding: '12px', textAlign: 'right', width: '110px' }}>Rate</th>
              <th style={{ padding: '12px', textAlign: 'right', width: '120px' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, i) => (
              <tr key={item.id || i} style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '12px', fontSize: '14px', color: '#1E293B', fontWeight: 500 }}>{item.description}</td>
                <td style={{ padding: '12px', fontSize: '14px', textAlign: 'right', color: '#475569' }}>{item.quantity}</td>
                <td style={{ padding: '12px', fontSize: '14px', textAlign: 'right', color: '#475569' }}>{formatCurrency(item.price, currency)}</td>
                <td style={{ padding: '12px', fontSize: '14px', textAlign: 'right', fontWeight: 700, color: '#0F172A' }}>{formatCurrency(item.quantity * item.price, currency)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '32px' }}>
          <div style={{ width: '280px', backgroundColor: '#F8FAFC', padding: '16px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#475569', marginBottom: '8px' }}>
              <span>Subtotal:</span>
              <span>{formatCurrency(totals.subtotal, currency)}</span>
            </div>
            {totals.discountAmount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#16A34A', marginBottom: '8px' }}>
                <span>Discount ({invoice.discountPercent}%):</span>
                <span>-{formatCurrency(totals.discountAmount, currency)}</span>
              </div>
            )}
            {totals.taxAmount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#475569', marginBottom: '8px' }}>
                <span>Tax ({invoice.taxPercent}%):</span>
                <span>{formatCurrency(totals.taxAmount, currency)}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 800, color: '#0F172A', borderTop: '2px solid #D97706', paddingTop: '10px' }}>
              <span>Total Due:</span>
              <span style={{ color: '#D97706' }}>{formatCurrency(totals.grandTotal, currency)}</span>
            </div>
          </div>
        </div>

        {(invoice.notes || invoice.terms) && (
          <div style={{ fontSize: '12px', color: '#64748B', borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
            {invoice.notes && <p style={{ marginBottom: '6px' }}><strong>Notes:</strong> {invoice.notes}</p>}
            {invoice.terms && <p><strong>Terms:</strong> {invoice.terms}</p>}
          </div>
        )}
      </div>
    </div>
  );
};
