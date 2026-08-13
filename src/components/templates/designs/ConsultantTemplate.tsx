import React from 'react';
import { InvoiceData } from '../../../types/invoice';
import { calculateInvoiceTotals } from '../../../utils/invoiceCalculations';
import { formatCurrency, formatDate } from '../../../utils/formatters';

export const ConsultantTemplate: React.FC<{ invoice: InvoiceData }> = ({ invoice }) => {
  const totals = calculateInvoiceTotals(invoice.items, invoice.discountPercent, invoice.taxPercent);
  const currency = invoice.details.currency;

  return (
    <div className="invoice-a4-page consultant-template" style={{ padding: '28mm 22mm', color: '#1E293B', fontFamily: 'serif' }}>
      {/* Formal Letterhead */}
      <div style={{ textAlign: 'center', borderBottom: '1px solid #334155', paddingBottom: '20px', marginBottom: '32px' }}>
        {invoice.business.logo && (
          <img src={invoice.business.logo} alt="" style={{ maxHeight: '50px', margin: '0 auto 12px' }} />
        )}
        <h1 style={{ fontSize: '26px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#0F172A' }}>
          {invoice.business.name || 'CONSULTING ADVISORS'}
        </h1>
        <p style={{ fontSize: '12px', fontFamily: 'sans-serif', color: '#64748B', marginTop: '4px' }}>
          {invoice.business.address} | {invoice.business.email}
        </p>
      </div>

      {/* Statement Meta Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '36px', fontFamily: 'sans-serif' }}>
        <div>
          <p style={{ fontSize: '11px', textTransform: 'uppercase', color: '#94A3B8', fontWeight: 700, letterSpacing: '0.05em' }}>CLIENT STATEMENT FOR</p>
          <p style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', marginTop: '4px' }}>{invoice.customer.name}</p>
          <p style={{ fontSize: '13px', color: '#475569', whiteSpace: 'pre-line' }}>{invoice.customer.address}</p>
          <p style={{ fontSize: '13px', color: '#64748B' }}>{invoice.customer.email}</p>
        </div>

        <div style={{ textAlign: 'right' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#334155', letterSpacing: '0.05em' }}>STATEMENT OF INVOICE</h3>
          <p style={{ fontSize: '14px', fontWeight: 600, color: '#0F172A', marginTop: '4px' }}>Ref No: {invoice.details.invoiceNumber}</p>
          <p style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>Issued Date: {formatDate(invoice.details.invoiceDate)}</p>
          {invoice.details.dueDate && <p style={{ fontSize: '12px', color: '#64748B' }}>Due Date: {formatDate(invoice.details.dueDate)}</p>}
        </div>
      </div>

      {/* Itemized Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '32px', fontFamily: 'sans-serif' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #334155', fontSize: '11px', textTransform: 'uppercase', color: '#334155', letterSpacing: '0.05em' }}>
            <th style={{ padding: '10px 4px', textAlign: 'left' }}>Consulting Services Rendered</th>
            <th style={{ padding: '10px 4px', textAlign: 'right', width: '60px' }}>Units</th>
            <th style={{ padding: '10px 4px', textAlign: 'right', width: '110px' }}>Fee Rate</th>
            <th style={{ padding: '10px 4px', textAlign: 'right', width: '110px' }}>Total (Fee)</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, idx) => (
            <tr key={item.id || idx} style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td style={{ padding: '12px 4px', fontSize: '13px', color: '#0F172A', fontWeight: 500 }}>{item.description}</td>
              <td style={{ padding: '12px 4px', fontSize: '13px', textAlign: 'right', color: '#475569' }}>{item.quantity}</td>
              <td style={{ padding: '12px 4px', fontSize: '13px', textAlign: 'right', color: '#475569' }}>{formatCurrency(item.price, currency)}</td>
              <td style={{ padding: '12px 4px', fontSize: '13px', textAlign: 'right', fontWeight: 600, color: '#0F172A' }}>{formatCurrency(item.quantity * item.price, currency)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '40px', fontFamily: 'sans-serif' }}>
        <div style={{ width: '260px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#475569' }}>
            <span>Subtotal Fees:</span>
            <span>{formatCurrency(totals.subtotal, currency)}</span>
          </div>
          {totals.discountAmount > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#16A34A' }}>
              <span>Fee Adjustment ({invoice.discountPercent}%):</span>
              <span>-{formatCurrency(totals.discountAmount, currency)}</span>
            </div>
          )}
          {totals.taxAmount > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#475569' }}>
              <span>Applicable Tax ({invoice.taxPercent}%):</span>
              <span>{formatCurrency(totals.taxAmount, currency)}</span>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '17px', fontWeight: 700, color: '#0F172A', borderTop: '2px solid #334155', paddingTop: '10px' }}>
            <span>Net Statement Total:</span>
            <span>{formatCurrency(totals.grandTotal, currency)}</span>
          </div>
        </div>
      </div>

      {(invoice.notes || invoice.terms) && (
        <div style={{ fontSize: '12px', color: '#64748B', borderTop: '1px solid #CBD5E1', paddingTop: '16px', fontFamily: 'sans-serif' }}>
          {invoice.notes && <p style={{ marginBottom: '6px' }}><strong>Note:</strong> {invoice.notes}</p>}
          {invoice.terms && <p><strong>Terms:</strong> {invoice.terms}</p>}
        </div>
      )}
    </div>
  );
};
