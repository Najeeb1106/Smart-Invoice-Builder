import React from 'react';
import { InvoiceData } from '../../../types/invoice';
import { calculateInvoiceTotals } from '../../../utils/invoiceCalculations';
import { formatCurrency, formatDate } from '../../../utils/formatters';

export const FreelancerMinimalTemplate: React.FC<{ invoice: InvoiceData }> = ({ invoice }) => {
  const totals = calculateInvoiceTotals(invoice.items, invoice.discountPercent, invoice.taxPercent);
  const currency = invoice.details.currency;

  return (
    <div className="invoice-a4-page freelancer-minimal-template" style={{ padding: '28mm 20mm' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
        <div>
          {invoice.business.logo && (
            <img src={invoice.business.logo} alt="" style={{ maxHeight: '44px', marginBottom: '12px' }} />
          )}
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#2563EB', letterSpacing: '-0.03em' }}>{invoice.business.name}</h1>
          <p style={{ fontSize: '13px', color: '#4B5563', marginTop: '2px' }}>{invoice.business.email} {invoice.business.phone ? `• ${invoice.business.phone}` : ''}</p>
        </div>

        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#2563EB', backgroundColor: '#EFF6FF', padding: '4px 12px', borderRadius: '12px' }}>
            INVOICE #{invoice.details.invoiceNumber}
          </span>
          <p style={{ fontSize: '12px', color: '#6B7280', marginTop: '8px' }}>Date: {formatDate(invoice.details.invoiceDate)}</p>
        </div>
      </div>

      <div style={{ borderLeft: '3px solid #2563EB', paddingLeft: '16px', marginBottom: '36px' }}>
        <p style={{ fontSize: '11px', textTransform: 'uppercase', color: '#2563EB', fontWeight: 700, letterSpacing: '0.05em' }}>PREPARED FOR</p>
        <p style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginTop: '2px' }}>{invoice.customer.name}</p>
        <p style={{ fontSize: '13px', color: '#4B5563', whiteSpace: 'pre-line' }}>{invoice.customer.address}</p>
        <p style={{ fontSize: '13px', color: '#6B7280' }}>{invoice.customer.email}</p>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '32px' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #E5E7EB', fontSize: '11px', textTransform: 'uppercase', color: '#6B7280' }}>
            <th style={{ padding: '10px 0', textAlign: 'left' }}>Work Description</th>
            <th style={{ padding: '10px 0', textAlign: 'right', width: '60px' }}>Qty</th>
            <th style={{ padding: '10px 0', textAlign: 'right', width: '100px' }}>Rate</th>
            <th style={{ padding: '10px 0', textAlign: 'right', width: '110px' }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, idx) => (
            <tr key={item.id || idx} style={{ borderBottom: '1px solid #F3F4F6' }}>
              <td style={{ padding: '14px 0', fontSize: '14px', color: '#1F2937', fontWeight: 500 }}>{item.description}</td>
              <td style={{ padding: '14px 0', fontSize: '14px', textAlign: 'right', color: '#4B5563' }}>{item.quantity}</td>
              <td style={{ padding: '14px 0', fontSize: '14px', textAlign: 'right', color: '#4B5563' }}>{formatCurrency(item.price, currency)}</td>
              <td style={{ padding: '14px 0', fontSize: '14px', textAlign: 'right', fontWeight: 700, color: '#111827' }}>{formatCurrency(item.quantity * item.price, currency)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '36px' }}>
        <div style={{ width: '260px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#4B5563' }}>
            <span>Subtotal:</span>
            <span>{formatCurrency(totals.subtotal, currency)}</span>
          </div>
          {totals.discountAmount > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#16A34A' }}>
              <span>Discount ({invoice.discountPercent}%):</span>
              <span>-{formatCurrency(totals.discountAmount, currency)}</span>
            </div>
          )}
          {totals.taxAmount > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#4B5563' }}>
              <span>Tax ({invoice.taxPercent}%):</span>
              <span>{formatCurrency(totals.taxAmount, currency)}</span>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 800, color: '#2563EB', borderTop: '2px solid #E5E7EB', paddingTop: '10px' }}>
            <span>Total:</span>
            <span>{formatCurrency(totals.grandTotal, currency)}</span>
          </div>
        </div>
      </div>

      {(invoice.notes || invoice.terms) && (
        <div style={{ fontSize: '12px', color: '#6B7280', borderTop: '1px solid #F3F4F6', paddingTop: '16px' }}>
          {invoice.notes && <p style={{ marginBottom: '4px' }}>{invoice.notes}</p>}
          {invoice.terms && <p>{invoice.terms}</p>}
        </div>
      )}
    </div>
  );
};
