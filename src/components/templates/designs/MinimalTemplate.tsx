import React from 'react';
import { InvoiceData } from '../../../types/invoice';
import { calculateInvoiceTotals } from '../../../utils/invoiceCalculations';
import { formatCurrency, formatDate } from '../../../utils/formatters';

export const MinimalTemplate: React.FC<{ invoice: InvoiceData }> = ({ invoice }) => {
  const totals = calculateInvoiceTotals(invoice.items, invoice.discountPercent, invoice.taxPercent);
  const currency = invoice.details.currency;

  return (
    <div className="invoice-a4-page minimal-template" style={{ padding: '32mm 24mm', color: '#0F172A' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '48px' }}>
        <div>
          {invoice.business.logo && (
            <img src={invoice.business.logo} alt="" style={{ maxHeight: '44px', marginBottom: '16px' }} />
          )}
          <h1 style={{ fontSize: '20px', fontWeight: 600, letterSpacing: '-0.01em' }}>{invoice.business.name}</h1>
          <p style={{ fontSize: '13px', color: '#64748B', marginTop: '4px' }}>{invoice.business.email}</p>
        </div>

        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#94A3B8' }}>Invoice No.</p>
          <p style={{ fontSize: '16px', fontWeight: 600, marginTop: '2px' }}>{invoice.details.invoiceNumber}</p>
          <p style={{ fontSize: '13px', color: '#64748B', marginTop: '8px' }}>{formatDate(invoice.details.invoiceDate)}</p>
        </div>
      </div>

      <div style={{ marginBottom: '48px' }}>
        <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#94A3B8', marginBottom: '6px' }}>Billed To</p>
        <p style={{ fontSize: '16px', fontWeight: 600 }}>{invoice.customer.name}</p>
        <p style={{ fontSize: '13px', color: '#64748B', marginTop: '2px', whiteSpace: 'pre-line' }}>{invoice.customer.address}</p>
        <p style={{ fontSize: '13px', color: '#64748B' }}>{invoice.customer.email}</p>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '40px' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #E2E8F0', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#94A3B8' }}>
            <th style={{ textAlign: 'left', paddingBottom: '12px' }}>Description</th>
            <th style={{ textAlign: 'right', paddingBottom: '12px', width: '60px' }}>Qty</th>
            <th style={{ textAlign: 'right', paddingBottom: '12px', width: '100px' }}>Price</th>
            <th style={{ textAlign: 'right', paddingBottom: '12px', width: '100px' }}>Total</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, idx) => (
            <tr key={item.id || idx} style={{ borderBottom: '1px solid #F8FAFC' }}>
              <td style={{ padding: '16px 0', fontSize: '14px', color: '#334155' }}>{item.description}</td>
              <td style={{ padding: '16px 0', fontSize: '14px', textAlign: 'right', color: '#64748B' }}>{item.quantity}</td>
              <td style={{ padding: '16px 0', fontSize: '14px', textAlign: 'right', color: '#64748B' }}>{formatCurrency(item.price, currency)}</td>
              <td style={{ padding: '16px 0', fontSize: '14px', textAlign: 'right', fontWeight: 600 }}>{formatCurrency(item.quantity * item.price, currency)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '48px' }}>
        <div style={{ width: '240px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#64748B' }}>
            <span>Subtotal</span>
            <span>{formatCurrency(totals.subtotal, currency)}</span>
          </div>
          {totals.discountAmount > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#16A34A' }}>
              <span>Discount</span>
              <span>-{formatCurrency(totals.discountAmount, currency)}</span>
            </div>
          )}
          {totals.taxAmount > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#64748B' }}>
              <span>Tax</span>
              <span>{formatCurrency(totals.taxAmount, currency)}</span>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 700, borderTop: '1px solid #0F172A', paddingTop: '12px' }}>
            <span>Total</span>
            <span>{formatCurrency(totals.grandTotal, currency)}</span>
          </div>
        </div>
      </div>

      {(invoice.notes || invoice.terms) && (
        <div style={{ fontSize: '12px', color: '#94A3B8', borderTop: '1px solid #F1F5F9', paddingTop: '24px' }}>
          {invoice.notes && <p style={{ marginBottom: '8px' }}>{invoice.notes}</p>}
          {invoice.terms && <p>{invoice.terms}</p>}
        </div>
      )}
    </div>
  );
};
