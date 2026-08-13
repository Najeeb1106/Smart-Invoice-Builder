import React from 'react';
import { InvoiceData } from '../../../types/invoice';
import { calculateInvoiceTotals } from '../../../utils/invoiceCalculations';
import { formatCurrency, formatDate } from '../../../utils/formatters';

export const ServiceProTemplate: React.FC<{ invoice: InvoiceData }> = ({ invoice }) => {
  const totals = calculateInvoiceTotals(invoice.items, invoice.discountPercent, invoice.taxPercent);
  const currency = invoice.details.currency;

  return (
    <div className="invoice-a4-page service-pro-template" style={{ padding: '24mm 20mm' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px', borderBottom: '3px solid #0891B2', paddingBottom: '16px' }}>
        <div>
          {invoice.business.logo && <img src={invoice.business.logo} alt="" style={{ maxHeight: '48px', marginBottom: '8px' }} />}
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0891B2' }}>{invoice.business.name}</h1>
          <p style={{ fontSize: '13px', color: '#475569' }}>{invoice.business.address}</p>
          <p style={{ fontSize: '13px', color: '#64748B' }}>{invoice.business.email} • {invoice.business.phone}</p>
        </div>

        <div style={{ textAlign: 'right' }}>
          <span style={{ backgroundColor: '#CFFAFE', color: '#0891B2', padding: '6px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 700 }}>
            SERVICE INVOICE
          </span>
          <p style={{ fontSize: '16px', fontWeight: 700, marginTop: '8px', color: '#0F172A' }}>#{invoice.details.invoiceNumber}</p>
          <p style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>Date: {formatDate(invoice.details.invoiceDate)}</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '28px' }}>
        <div style={{ backgroundColor: '#ECFEFF', padding: '16px', borderRadius: '8px', border: '1px solid #A5F3FC' }}>
          <p style={{ fontSize: '11px', textTransform: 'uppercase', color: '#0891B2', fontWeight: 700 }}>CLIENT ACCOUNT</p>
          <p style={{ fontSize: '15px', fontWeight: 700, color: '#0E7490', marginTop: '2px' }}>{invoice.customer.name}</p>
          <p style={{ fontSize: '13px', color: '#164E63', whiteSpace: 'pre-line' }}>{invoice.customer.address}</p>
          <p style={{ fontSize: '13px', color: '#0891B2' }}>{invoice.customer.email}</p>
        </div>

        <div style={{ padding: '16px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
          <p style={{ fontSize: '11px', textTransform: 'uppercase', color: '#64748B', fontWeight: 700 }}>SERVICE SUMMARY</p>
          <p style={{ fontSize: '13px', color: '#334155', marginTop: '2px' }}>Currency: <strong>{currency}</strong></p>
          {invoice.details.dueDate && <p style={{ fontSize: '13px', color: '#334155' }}>Due Date: <strong>{formatDate(invoice.details.dueDate)}</strong></p>}
          {invoice.details.paymentTerms && <p style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>{invoice.details.paymentTerms}</p>}
        </div>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '28px' }}>
        <thead>
          <tr style={{ backgroundColor: '#0891B2', color: '#FFFFFF', fontSize: '11px', textTransform: 'uppercase' }}>
            <th style={{ padding: '10px 12px', textAlign: 'left' }}>Service Description</th>
            <th style={{ padding: '10px 12px', textAlign: 'right', width: '60px' }}>Hours/Qty</th>
            <th style={{ padding: '10px 12px', textAlign: 'right', width: '100px' }}>Hourly Rate</th>
            <th style={{ padding: '10px 12px', textAlign: 'right', width: '110px' }}>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, idx) => (
            <tr key={item.id || idx} style={{ borderBottom: '1px solid #E2E8F0', backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#ECFEFF' }}>
              <td style={{ padding: '12px', fontSize: '14px', color: '#0F172A', fontWeight: 500 }}>{item.description}</td>
              <td style={{ padding: '12px', fontSize: '14px', textAlign: 'right', color: '#475569' }}>{item.quantity}</td>
              <td style={{ padding: '12px', fontSize: '14px', textAlign: 'right', color: '#475569' }}>{formatCurrency(item.price, currency)}</td>
              <td style={{ padding: '12px', fontSize: '14px', textAlign: 'right', fontWeight: 700, color: '#0891B2' }}>{formatCurrency(item.quantity * item.price, currency)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '32px' }}>
        <div style={{ width: '260px', backgroundColor: '#ECFEFF', padding: '16px', borderRadius: '8px', border: '1px solid #A5F3FC' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#0891B2', marginBottom: '6px' }}>
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
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#0891B2', marginBottom: '6px' }}>
              <span>Tax ({invoice.taxPercent}%):</span>
              <span>{formatCurrency(totals.taxAmount, currency)}</span>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '17px', fontWeight: 800, color: '#0891B2', borderTop: '2px solid #0891B2', paddingTop: '8px' }}>
            <span>Amount Due:</span>
            <span>{formatCurrency(totals.grandTotal, currency)}</span>
          </div>
        </div>
      </div>

      {(invoice.notes || invoice.terms) && (
        <div style={{ fontSize: '12px', color: '#475569', borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
          {invoice.notes && <p style={{ marginBottom: '4px' }}><strong>Notes:</strong> {invoice.notes}</p>}
          {invoice.terms && <p><strong>Terms:</strong> {invoice.terms}</p>}
        </div>
      )}
    </div>
  );
};
