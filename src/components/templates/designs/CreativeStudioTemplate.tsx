import React from 'react';
import { InvoiceData } from '../../../types/invoice';
import { calculateInvoiceTotals } from '../../../utils/invoiceCalculations';
import { formatCurrency, formatDate } from '../../../utils/formatters';

export const CreativeStudioTemplate: React.FC<{ invoice: InvoiceData }> = ({ invoice }) => {
  const totals = calculateInvoiceTotals(invoice.items, invoice.discountPercent, invoice.taxPercent);
  const currency = invoice.details.currency;

  return (
    <div className="invoice-a4-page creative-studio-template" style={{ padding: '0', overflow: 'hidden' }}>
      <div style={{ backgroundColor: '#7C3AED', color: '#FFFFFF', padding: '32px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          {invoice.business.logo && (
            <img src={invoice.business.logo} alt="" style={{ maxHeight: '48px', marginBottom: '8px' }} />
          )}
          <h1 style={{ fontSize: '26px', fontWeight: 900, letterSpacing: '-0.02em', color: '#FFFFFF' }}>{invoice.business.name}</h1>
          <p style={{ fontSize: '13px', color: '#DDD6FE', marginTop: '2px' }}>{invoice.business.address}</p>
        </div>

        <div style={{ textAlign: 'right' }}>
          <span style={{ backgroundColor: '#5B21B6', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 800, letterSpacing: '0.1em' }}>
            INVOICE
          </span>
          <p style={{ fontSize: '18px', fontWeight: 700, marginTop: '8px', color: '#F3E8FF' }}>#{invoice.details.invoiceNumber}</p>
          <p style={{ fontSize: '12px', color: '#DDD6FE', marginTop: '2px' }}>Date: {formatDate(invoice.details.invoiceDate)}</p>
        </div>
      </div>

      <div style={{ padding: '24mm 20mm' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
          <div>
            <p style={{ fontSize: '11px', textTransform: 'uppercase', color: '#7C3AED', fontWeight: 800, letterSpacing: '0.05em' }}>CLIENT STATEMENT</p>
            <p style={{ fontSize: '16px', fontWeight: 700, color: '#1E1B4B', marginTop: '4px' }}>{invoice.customer.name}</p>
            <p style={{ fontSize: '13px', color: '#4C1D95', whiteSpace: 'pre-line' }}>{invoice.customer.address}</p>
            <p style={{ fontSize: '13px', color: '#6D28D9' }}>{invoice.customer.email}</p>
          </div>

          <div style={{ backgroundColor: '#F5F3FF', padding: '16px', borderRadius: '12px', border: '1px solid #DDD6FE' }}>
            <p style={{ fontSize: '11px', textTransform: 'uppercase', color: '#7C3AED', fontWeight: 800 }}>TERMS</p>
            <p style={{ fontSize: '13px', color: '#4C1D95', marginTop: '2px' }}>Currency: <strong>{currency}</strong></p>
            {invoice.details.dueDate && <p style={{ fontSize: '13px', color: '#4C1D95' }}>Due Date: <strong>{formatDate(invoice.details.dueDate)}</strong></p>}
            {invoice.details.paymentTerms && <p style={{ fontSize: '12px', color: '#6D28D9', marginTop: '4px' }}>{invoice.details.paymentTerms}</p>}
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '32px' }}>
          <thead>
            <tr style={{ backgroundColor: '#F5F3FF', color: '#7C3AED', fontSize: '11px', textTransform: 'uppercase', fontWeight: 800 }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Deliverable / Service</th>
              <th style={{ padding: '12px', textAlign: 'right', width: '60px' }}>Qty</th>
              <th style={{ padding: '12px', textAlign: 'right', width: '100px' }}>Rate</th>
              <th style={{ padding: '12px', textAlign: 'right', width: '110px' }}>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, idx) => (
              <tr key={item.id || idx} style={{ borderBottom: '1px solid #EDE9FE' }}>
                <td style={{ padding: '12px', fontSize: '14px', color: '#1E1B4B', fontWeight: 600 }}>{item.description}</td>
                <td style={{ padding: '12px', fontSize: '14px', textAlign: 'right', color: '#5B21B6' }}>{item.quantity}</td>
                <td style={{ padding: '12px', fontSize: '14px', textAlign: 'right', color: '#5B21B6' }}>{formatCurrency(item.price, currency)}</td>
                <td style={{ padding: '12px', fontSize: '14px', textAlign: 'right', fontWeight: 700, color: '#7C3AED' }}>{formatCurrency(item.quantity * item.price, currency)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '32px' }}>
          <div style={{ width: '280px', backgroundColor: '#F5F3FF', padding: '16px', borderRadius: '12px', border: '1px solid #DDD6FE' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#5B21B6', marginBottom: '6px' }}>
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
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#5B21B6', marginBottom: '6px' }}>
                <span>Tax ({invoice.taxPercent}%):</span>
                <span>{formatCurrency(totals.taxAmount, currency)}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 900, color: '#7C3AED', borderTop: '2px solid #7C3AED', paddingTop: '10px' }}>
              <span>TOTAL DUE:</span>
              <span>{formatCurrency(totals.grandTotal, currency)}</span>
            </div>
          </div>
        </div>

        {(invoice.notes || invoice.terms) && (
          <div style={{ fontSize: '12px', color: '#6D28D9', borderTop: '1px solid #EDE9FE', paddingTop: '16px' }}>
            {invoice.notes && <p style={{ marginBottom: '4px' }}>{invoice.notes}</p>}
            {invoice.terms && <p>{invoice.terms}</p>}
          </div>
        )}
      </div>
    </div>
  );
};
