import React from 'react';
import { InvoiceData } from '../../../types/invoice';
import { calculateInvoiceTotals } from '../../../utils/invoiceCalculations';
import { formatCurrency, formatDate } from '../../../utils/formatters';

export const ProfessionalGrayTemplate: React.FC<{ invoice: InvoiceData }> = ({ invoice }) => {
  const totals = calculateInvoiceTotals(invoice.items, invoice.discountPercent, invoice.taxPercent);
  const currency = invoice.details.currency;

  return (
    <div className="invoice-a4-page professional-gray-template" style={{ padding: '24mm 20mm', color: '#334155' }}>
      <div style={{ borderBottom: '1px solid #94A3B8', paddingBottom: '16px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          {invoice.business.logo && (
            <img src={invoice.business.logo} alt="" style={{ maxHeight: '48px', marginBottom: '8px' }} />
          )}
          <h1 style={{ fontSize: '22px', fontWeight: 600, color: '#1E293B' }}>{invoice.business.name}</h1>
          <p style={{ fontSize: '13px', color: '#64748B' }}>{invoice.business.address}</p>
          <p style={{ fontSize: '13px', color: '#64748B' }}>{invoice.business.email}</p>
        </div>

        <div style={{ textAlign: 'right' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 300, color: '#475569', letterSpacing: '0.05em' }}>INVOICE</h2>
          <p style={{ fontSize: '14px', fontWeight: 600, color: '#1E293B', marginTop: '2px' }}>#{invoice.details.invoiceNumber}</p>
          <p style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>Date: {formatDate(invoice.details.invoiceDate)}</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '32px' }}>
        <div>
          <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94A3B8', marginBottom: '4px' }}>FOR</p>
          <p style={{ fontSize: '15px', fontWeight: 600, color: '#1E293B' }}>{invoice.customer.name}</p>
          <p style={{ fontSize: '13px', color: '#64748B', whiteSpace: 'pre-line' }}>{invoice.customer.address}</p>
          <p style={{ fontSize: '13px', color: '#64748B' }}>{invoice.customer.email}</p>
        </div>
        <div>
          <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94A3B8', marginBottom: '4px' }}>TERMS</p>
          <p style={{ fontSize: '13px', color: '#475569' }}>Currency: <strong>{currency}</strong></p>
          {invoice.details.dueDate && <p style={{ fontSize: '13px', color: '#475569' }}>Due Date: <strong>{formatDate(invoice.details.dueDate)}</strong></p>}
          {invoice.details.paymentTerms && <p style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>{invoice.details.paymentTerms}</p>}
        </div>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '32px' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #475569', borderTop: '1px solid #475569', fontSize: '11px', textTransform: 'uppercase', color: '#475569' }}>
            <th style={{ padding: '10px 4px', textAlign: 'left' }}>Description</th>
            <th style={{ padding: '10px 4px', textAlign: 'right', width: '60px' }}>Qty</th>
            <th style={{ padding: '10px 4px', textAlign: 'right', width: '100px' }}>Rate</th>
            <th style={{ padding: '10px 4px', textAlign: 'right', width: '110px' }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, idx) => (
            <tr key={item.id || idx} style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td style={{ padding: '12px 4px', fontSize: '13px', color: '#1E293B' }}>{item.description}</td>
              <td style={{ padding: '12px 4px', fontSize: '13px', textAlign: 'right', color: '#64748B' }}>{item.quantity}</td>
              <td style={{ padding: '12px 4px', fontSize: '13px', textAlign: 'right', color: '#64748B' }}>{formatCurrency(item.price, currency)}</td>
              <td style={{ padding: '12px 4px', fontSize: '13px', textAlign: 'right', fontWeight: 600, color: '#1E293B' }}>{formatCurrency(item.quantity * item.price, currency)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '32px' }}>
        <div style={{ width: '250px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#64748B' }}>
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
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#64748B' }}>
              <span>Tax ({invoice.taxPercent}%):</span>
              <span>{formatCurrency(totals.taxAmount, currency)}</span>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 700, color: '#1E293B', borderTop: '1px solid #475569', paddingTop: '8px' }}>
            <span>Total:</span>
            <span>{formatCurrency(totals.grandTotal, currency)}</span>
          </div>
        </div>
      </div>

      {(invoice.notes || invoice.terms) && (
        <div style={{ fontSize: '12px', color: '#64748B', borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
          {invoice.notes && <p style={{ marginBottom: '4px' }}>{invoice.notes}</p>}
          {invoice.terms && <p>{invoice.terms}</p>}
        </div>
      )}
    </div>
  );
};
