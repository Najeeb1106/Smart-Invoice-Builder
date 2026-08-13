import React from 'react';
import { InvoiceData } from '../../../types/invoice';
import { calculateInvoiceTotals } from '../../../utils/invoiceCalculations';
import { formatCurrency, formatDate } from '../../../utils/formatters';

export const CorporateBlueTemplate: React.FC<{ invoice: InvoiceData }> = ({ invoice }) => {
  const totals = calculateInvoiceTotals(invoice.items, invoice.discountPercent, invoice.taxPercent);
  const currency = invoice.details.currency;

  return (
    <div className="invoice-a4-page corporate-blue-template" style={{ padding: '24mm 20mm' }}>
      <div style={{ borderBottom: '4px solid #1E3A8A', paddingBottom: '20px', marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          {invoice.business.logo && (
            <img src={invoice.business.logo} alt="" style={{ maxHeight: '55px', marginBottom: '8px' }} />
          )}
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#1E3A8A' }}>{invoice.business.name}</h1>
          <p style={{ fontSize: '13px', color: '#475569' }}>{invoice.business.address}</p>
          <p style={{ fontSize: '13px', color: '#64748B' }}>{invoice.business.email} {invoice.business.phone ? `• ${invoice.business.phone}` : ''}</p>
        </div>

        <div style={{ textAlign: 'right', backgroundColor: '#EFF6FF', padding: '16px 20px', borderRadius: '8px', border: '1px solid #BFDBFE' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#1E3A8A' }}>INVOICE</h2>
          <p style={{ fontSize: '14px', fontWeight: 700, color: '#1E293B', marginTop: '2px' }}>#{invoice.details.invoiceNumber}</p>
          <p style={{ fontSize: '12px', color: '#3B82F6', marginTop: '4px' }}>Date: {formatDate(invoice.details.invoiceDate)}</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '28px' }}>
        <div style={{ backgroundColor: '#F8FAFC', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #1E3A8A' }}>
          <p style={{ fontSize: '11px', textTransform: 'uppercase', color: '#1E3A8A', fontWeight: 700, marginBottom: '4px' }}>Billed To:</p>
          <p style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>{invoice.customer.name}</p>
          <p style={{ fontSize: '13px', color: '#475569', whiteSpace: 'pre-line' }}>{invoice.customer.address}</p>
          <p style={{ fontSize: '13px', color: '#64748B' }}>{invoice.customer.email}</p>
        </div>

        <div style={{ backgroundColor: '#F8FAFC', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #3B82F6' }}>
          <p style={{ fontSize: '11px', textTransform: 'uppercase', color: '#3B82F6', fontWeight: 700, marginBottom: '4px' }}>Invoice Details:</p>
          <p style={{ fontSize: '13px', color: '#334155' }}>Currency: <strong>{currency}</strong></p>
          {invoice.details.dueDate && <p style={{ fontSize: '13px', color: '#334155' }}>Due Date: <strong>{formatDate(invoice.details.dueDate)}</strong></p>}
          {invoice.details.paymentTerms && <p style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>{invoice.details.paymentTerms}</p>}
        </div>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '28px' }}>
        <thead>
          <tr style={{ backgroundColor: '#1E3A8A', color: '#FFFFFF', fontSize: '12px', textTransform: 'uppercase' }}>
            <th style={{ padding: '12px', textAlign: 'left' }}>Description</th>
            <th style={{ padding: '12px', textAlign: 'right', width: '70px' }}>Qty</th>
            <th style={{ padding: '12px', textAlign: 'right', width: '110px' }}>Price</th>
            <th style={{ padding: '12px', textAlign: 'right', width: '120px' }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, idx) => (
            <tr key={item.id || idx} style={{ borderBottom: '1px solid #E2E8F0', backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#F8FAFC' }}>
              <td style={{ padding: '12px', fontSize: '14px', color: '#1E293B', fontWeight: 500 }}>{item.description}</td>
              <td style={{ padding: '12px', fontSize: '14px', textAlign: 'right', color: '#475569' }}>{item.quantity}</td>
              <td style={{ padding: '12px', fontSize: '14px', textAlign: 'right', color: '#475569' }}>{formatCurrency(item.price, currency)}</td>
              <td style={{ padding: '12px', fontSize: '14px', textAlign: 'right', fontWeight: 700, color: '#0F172A' }}>{formatCurrency(item.quantity * item.price, currency)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '32px' }}>
        <div style={{ width: '280px', backgroundColor: '#EFF6FF', padding: '16px', borderRadius: '8px', border: '1px solid #BFDBFE' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#1E3A8A', marginBottom: '6px' }}>
            <span>Subtotal:</span>
            <span>{formatCurrency(totals.subtotal, currency)}</span>
          </div>
          {totals.discountAmount > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#16A34A', marginBottom: '6px' }}>
              <span>Discount ({invoice.discountPercent}%):</span>
              <span>-{formatCurrency(totals.discountAmount, currency)}</span>
            </div>
          )}
          {totals.taxAmount > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#1E3A8A', marginBottom: '6px' }}>
              <span>Tax ({invoice.taxPercent}%):</span>
              <span>{formatCurrency(totals.taxAmount, currency)}</span>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 800, color: '#1E3A8A', borderTop: '2px solid #1E3A8A', paddingTop: '10px' }}>
            <span>Grand Total:</span>
            <span>{formatCurrency(totals.grandTotal, currency)}</span>
          </div>
        </div>
      </div>

      {(invoice.notes || invoice.terms) && (
        <div style={{ fontSize: '12px', color: '#64748B', borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
          {invoice.notes && <p style={{ marginBottom: '4px' }}><strong>Notes:</strong> {invoice.notes}</p>}
          {invoice.terms && <p><strong>Terms:</strong> {invoice.terms}</p>}
        </div>
      )}
    </div>
  );
};
