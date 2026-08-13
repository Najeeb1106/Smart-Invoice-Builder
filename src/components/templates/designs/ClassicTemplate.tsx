import React from 'react';
import { InvoiceData } from '../../../types/invoice';
import { calculateInvoiceTotals } from '../../../utils/invoiceCalculations';
import { formatCurrency, formatDate } from '../../../utils/formatters';

export const ClassicTemplate: React.FC<{ invoice: InvoiceData }> = ({ invoice }) => {
  const totals = calculateInvoiceTotals(invoice.items, invoice.discountPercent, invoice.taxPercent);
  const currency = invoice.details.currency;

  return (
    <div className="invoice-a4-page classic-template" style={{ border: '1px solid #1E293B', padding: '30mm 20mm' }}>
      {/* Top Banner */}
      <div style={{ borderBottom: '3px double #1E293B', paddingBottom: '20px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          {invoice.business.logo && (
            <img src={invoice.business.logo} alt="" style={{ maxHeight: '50px', marginBottom: '8px' }} />
          )}
          <h1 style={{ fontSize: '26px', fontFamily: 'serif', fontWeight: 700, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {invoice.business.name || 'COMPANY NAME'}
          </h1>
          <p style={{ fontSize: '12px', color: '#475569' }}>{invoice.business.address}</p>
          <p style={{ fontSize: '12px', color: '#475569' }}>{invoice.business.email} | {invoice.business.phone}</p>
        </div>

        <div style={{ textAlign: 'right' }}>
          <h2 style={{ fontSize: '28px', fontFamily: 'serif', fontWeight: 700, color: '#1E293B', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            INVOICE
          </h2>
          <p style={{ fontSize: '14px', fontWeight: 600, color: '#334155', marginTop: '4px' }}>
            #{invoice.details.invoiceNumber}
          </p>
          <p style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
            Date: {formatDate(invoice.details.invoiceDate)}
          </p>
        </div>
      </div>

      {/* Bill To Box */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '28px', border: '1px solid #CBD5E1', padding: '16px' }}>
        <div>
          <h4 style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748B', marginBottom: '6px' }}>
            Invoice To:
          </h4>
          <p style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>{invoice.customer.name}</p>
          <p style={{ fontSize: '13px', color: '#475569', whiteSpace: 'pre-line' }}>{invoice.customer.address}</p>
          <p style={{ fontSize: '13px', color: '#64748B' }}>{invoice.customer.email}</p>
        </div>
        <div style={{ borderLeft: '1px solid #CBD5E1', paddingLeft: '16px' }}>
          <h4 style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748B', marginBottom: '6px' }}>
            Payment Information:
          </h4>
          <p style={{ fontSize: '13px', color: '#334155' }}>Currency: <strong>{currency}</strong></p>
          {invoice.details.dueDate && <p style={{ fontSize: '13px', color: '#334155' }}>Due Date: <strong>{formatDate(invoice.details.dueDate)}</strong></p>}
          {invoice.details.paymentTerms && <p style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>{invoice.details.paymentTerms}</p>}
        </div>
      </div>

      {/* Structured Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px', border: '1px solid #94A3B8' }}>
        <thead>
          <tr style={{ backgroundColor: '#F1F5F9', borderBottom: '1px solid #94A3B8', fontSize: '12px', textTransform: 'uppercase', color: '#1E293B' }}>
            <th style={{ padding: '10px', textAlign: 'left', borderRight: '1px solid #CBD5E1' }}>Item & Description</th>
            <th style={{ padding: '10px', textAlign: 'center', width: '70px', borderRight: '1px solid #CBD5E1' }}>Qty</th>
            <th style={{ padding: '10px', textAlign: 'right', width: '110px', borderRight: '1px solid #CBD5E1' }}>Rate</th>
            <th style={{ padding: '10px', textAlign: 'right', width: '110px' }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, i) => (
            <tr key={item.id || i} style={{ borderBottom: '1px solid #CBD5E1' }}>
              <td style={{ padding: '10px', fontSize: '13px', borderRight: '1px solid #CBD5E1', color: '#0F172A' }}>{item.description}</td>
              <td style={{ padding: '10px', fontSize: '13px', textAlign: 'center', borderRight: '1px solid #CBD5E1', color: '#475569' }}>{item.quantity}</td>
              <td style={{ padding: '10px', fontSize: '13px', textAlign: 'right', borderRight: '1px solid #CBD5E1', color: '#475569' }}>{formatCurrency(item.price, currency)}</td>
              <td style={{ padding: '10px', fontSize: '13px', textAlign: 'right', fontWeight: 600, color: '#0F172A' }}>{formatCurrency(item.quantity * item.price, currency)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals Summary */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '32px' }}>
        <table style={{ width: '260px', borderCollapse: 'collapse', fontSize: '13px' }}>
          <tbody>
            <tr>
              <td style={{ padding: '6px 0', color: '#475569' }}>Subtotal:</td>
              <td style={{ padding: '6px 0', textAlign: 'right', fontWeight: 600 }}>{formatCurrency(totals.subtotal, currency)}</td>
            </tr>
            {totals.discountAmount > 0 && (
              <tr>
                <td style={{ padding: '6px 0', color: '#16A34A' }}>Discount ({invoice.discountPercent}%):</td>
                <td style={{ padding: '6px 0', textAlign: 'right', color: '#16A34A' }}>-{formatCurrency(totals.discountAmount, currency)}</td>
              </tr>
            )}
            {totals.taxAmount > 0 && (
              <tr>
                <td style={{ padding: '6px 0', color: '#475569' }}>Tax ({invoice.taxPercent}%):</td>
                <td style={{ padding: '6px 0', textAlign: 'right' }}>{formatCurrency(totals.taxAmount, currency)}</td>
              </tr>
            )}
            <tr style={{ borderTop: '2px solid #0F172A', borderBottom: '2px solid #0F172A' }}>
              <td style={{ padding: '10px 0', fontWeight: 700, fontSize: '16px', color: '#0F172A' }}>TOTAL:</td>
              <td style={{ padding: '10px 0', textAlign: 'right', fontWeight: 700, fontSize: '16px', color: '#0F172A' }}>{formatCurrency(totals.grandTotal, currency)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {(invoice.notes || invoice.terms) && (
        <div style={{ fontSize: '12px', color: '#475569', borderTop: '1px solid #CBD5E1', paddingTop: '16px' }}>
          {invoice.notes && <p style={{ marginBottom: '8px' }}><strong>Note:</strong> {invoice.notes}</p>}
          {invoice.terms && <p><strong>Terms:</strong> {invoice.terms}</p>}
        </div>
      )}
    </div>
  );
};
