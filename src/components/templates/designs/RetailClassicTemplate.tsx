import React from 'react';
import { InvoiceData } from '../../../types/invoice';
import { calculateInvoiceTotals } from '../../../utils/invoiceCalculations';
import { formatCurrency, formatDate } from '../../../utils/formatters';

export const RetailClassicTemplate: React.FC<{ invoice: InvoiceData }> = ({ invoice }) => {
  const totals = calculateInvoiceTotals(invoice.items, invoice.discountPercent, invoice.taxPercent);
  const currency = invoice.details.currency;

  return (
    <div className="invoice-a4-page retail-classic-template" style={{ padding: '20mm 16mm', color: '#111827', fontSize: '13px' }}>
      {/* Receipt Header */}
      <div style={{ textAlign: 'center', borderBottom: '2px dashed #9CA3AF', paddingBottom: '16px', marginBottom: '20px' }}>
        {invoice.business.logo && (
          <img src={invoice.business.logo} alt="" style={{ maxHeight: '44px', margin: '0 auto 8px' }} />
        )}
        <h1 style={{ fontSize: '22px', fontWeight: 800, textTransform: 'uppercase', color: '#DC2626' }}>
          {invoice.business.name || 'RETAIL STORE'}
        </h1>
        <p style={{ fontSize: '12px', color: '#4B5563' }}>{invoice.business.address}</p>
        <p style={{ fontSize: '12px', color: '#4B5563' }}>Tel: {invoice.business.phone} | {invoice.business.email}</p>
      </div>

      {/* Invoice & Customer Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E5E7EB', paddingBottom: '12px', marginBottom: '16px' }}>
        <div>
          <p style={{ fontSize: '11px', color: '#6B7280', textTransform: 'uppercase' }}>CUSTOMER:</p>
          <p style={{ fontWeight: 700, fontSize: '14px' }}>{invoice.customer.name}</p>
          <p style={{ fontSize: '12px', color: '#4B5563' }}>{invoice.customer.phone}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '11px', color: '#6B7280', textTransform: 'uppercase' }}>RECEIPT #:</p>
          <p style={{ fontWeight: 700, fontSize: '14px', color: '#DC2626' }}>{invoice.details.invoiceNumber}</p>
          <p style={{ fontSize: '12px', color: '#4B5563' }}>Date: {formatDate(invoice.details.invoiceDate)}</p>
        </div>
      </div>

      {/* Itemized Receipt Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #111827', fontSize: '11px', textTransform: 'uppercase' }}>
            <th style={{ textAlign: 'left', padding: '8px 0' }}>ITEM</th>
            <th style={{ textAlign: 'center', padding: '8px 0', width: '50px' }}>QTY</th>
            <th style={{ textAlign: 'right', padding: '8px 0', width: '80px' }}>PRICE</th>
            <th style={{ textAlign: 'right', padding: '8px 0', width: '90px' }}>TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, idx) => (
            <tr key={item.id || idx} style={{ borderBottom: '1px dashed #E5E7EB' }}>
              <td style={{ padding: '8px 0', fontWeight: 500 }}>{item.description}</td>
              <td style={{ padding: '8px 0', textAlign: 'center', color: '#4B5563' }}>{item.quantity}</td>
              <td style={{ padding: '8px 0', textAlign: 'right', color: '#4B5563' }}>{formatCurrency(item.price, currency)}</td>
              <td style={{ padding: '8px 0', textAlign: 'right', fontWeight: 700 }}>{formatCurrency(item.quantity * item.price, currency)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals Summary */}
      <div style={{ borderTop: '2px dashed #9CA3AF', paddingTop: '12px', marginBottom: '24px' }}>
        <div style={{ width: '220px', marginLeft: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4B5563' }}>
            <span>SUBTOTAL:</span>
            <span>{formatCurrency(totals.subtotal, currency)}</span>
          </div>
          {totals.discountAmount > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16A34A' }}>
              <span>DISCOUNT ({invoice.discountPercent}%):</span>
              <span>-{formatCurrency(totals.discountAmount, currency)}</span>
            </div>
          )}
          {totals.taxAmount > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4B5563' }}>
              <span>TAX ({invoice.taxPercent}%):</span>
              <span>{formatCurrency(totals.taxAmount, currency)}</span>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 800, color: '#DC2626', borderTop: '1px solid #111827', paddingTop: '8px', marginTop: '4px' }}>
            <span>TOTAL:</span>
            <span>{formatCurrency(totals.grandTotal, currency)}</span>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', borderTop: '1px solid #E5E7EB', paddingTop: '12px', fontSize: '11px', color: '#6B7280' }}>
        <p>THANK YOU FOR YOUR PURCHASE!</p>
        {invoice.notes && <p style={{ marginTop: '4px' }}>{invoice.notes}</p>}
      </div>
    </div>
  );
};
