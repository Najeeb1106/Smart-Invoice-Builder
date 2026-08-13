import React from 'react';
import { InvoiceData } from '../../../types/invoice';
import { calculateInvoiceTotals } from '../../../utils/invoiceCalculations';
import { formatCurrency, formatDate } from '../../../utils/formatters';

export const DeveloperInvoiceTemplate: React.FC<{ invoice: InvoiceData }> = ({ invoice }) => {
  const totals = calculateInvoiceTotals(invoice.items, invoice.discountPercent, invoice.taxPercent);
  const currency = invoice.details.currency;

  return (
    <div className="invoice-a4-page developer-template" style={{ padding: '24mm 20mm', fontFamily: 'var(--font-family-mono)', color: '#0F172A' }}>
      {/* Code Header Bar */}
      <div style={{ backgroundColor: '#022C22', color: '#34D399', padding: '16px 20px', borderRadius: '8px', marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          {invoice.business.logo && <img src={invoice.business.logo} alt="" style={{ maxHeight: '40px', marginBottom: '6px' }} />}
          <h1 style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'monospace', color: '#10B981' }}>{`// ${invoice.business.name}`}</h1>
          <p style={{ fontSize: '11px', color: '#A7F3D0' }}>{invoice.business.email}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '14px', fontWeight: 700, color: '#34D399' }}>{`[INVOICE: ${invoice.details.invoiceNumber}]`}</span>
          <p style={{ fontSize: '11px', color: '#A7F3D0', marginTop: '4px' }}>Date: {formatDate(invoice.details.invoiceDate)}</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '28px', fontSize: '12px' }}>
        <div style={{ border: '1px solid #A7F3D0', padding: '12px', borderRadius: '6px', backgroundColor: '#ECFDF5' }}>
          <p style={{ color: '#047857', fontWeight: 700 }}>CLIENT_TARGET = &#123;</p>
          <p style={{ paddingLeft: '12px' }}>name: &quot;{invoice.customer.name}&quot;,</p>
          <p style={{ paddingLeft: '12px' }}>address: &quot;{invoice.customer.address}&quot;,</p>
          <p style={{ paddingLeft: '12px' }}>email: &quot;{invoice.customer.email}&quot;</p>
          <p style={{ color: '#047857', fontWeight: 700 }}>&#125;;</p>
        </div>

        <div style={{ border: '1px solid #CBD5E1', padding: '12px', borderRadius: '6px', backgroundColor: '#F8FAFC' }}>
          <p style={{ color: '#0F172A', fontWeight: 700 }}>CONFIG = &#123;</p>
          <p style={{ paddingLeft: '12px' }}>currency: &quot;{currency}&quot;,</p>
          {invoice.details.dueDate && <p style={{ paddingLeft: '12px' }}>dueDate: &quot;{formatDate(invoice.details.dueDate)}&quot;,</p>}
          {invoice.details.paymentTerms && <p style={{ paddingLeft: '12px' }}>terms: &quot;{invoice.details.paymentTerms}&quot;</p>}
          <p style={{ color: '#0F172A', fontWeight: 700 }}>&#125;;</p>
        </div>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '28px', fontSize: '12px' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #059669', textAlign: 'left', color: '#047857' }}>
            <th style={{ padding: '8px' }}># SPEC / TASK</th>
            <th style={{ padding: '8px', textAlign: 'right', width: '60px' }}>QTY</th>
            <th style={{ padding: '8px', textAlign: 'right', width: '90px' }}>RATE</th>
            <th style={{ padding: '8px', textAlign: 'right', width: '100px' }}>TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, idx) => (
            <tr key={item.id || idx} style={{ borderBottom: '1px solid #E2E8F0' }}>
              <td style={{ padding: '10px 8px', color: '#0F172A' }}>{item.description}</td>
              <td style={{ padding: '10px 8px', textAlign: 'right', color: '#475569' }}>{item.quantity}</td>
              <td style={{ padding: '10px 8px', textAlign: 'right', color: '#475569' }}>{formatCurrency(item.price, currency)}</td>
              <td style={{ padding: '10px 8px', textAlign: 'right', fontWeight: 700, color: '#059669' }}>{formatCurrency(item.quantity * item.price, currency)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '28px' }}>
        <div style={{ width: '260px', backgroundColor: '#ECFDF5', padding: '14px', borderRadius: '6px', border: '1px solid #059669', fontSize: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#047857', marginBottom: '4px' }}>
            <span>subtotal:</span>
            <span>{formatCurrency(totals.subtotal, currency)}</span>
          </div>
          {totals.discountAmount > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16A34A', marginBottom: '4px' }}>
              <span>discount:</span>
              <span>-{formatCurrency(totals.discountAmount, currency)}</span>
            </div>
          )}
          {totals.taxAmount > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#047857', marginBottom: '4px' }}>
              <span>tax:</span>
              <span>{formatCurrency(totals.taxAmount, currency)}</span>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: 800, color: '#065F46', borderTop: '2px solid #059669', paddingTop: '8px', marginTop: '4px' }}>
            <span>RETURN_TOTAL =</span>
            <span>{formatCurrency(totals.grandTotal, currency)}</span>
          </div>
        </div>
      </div>

      {(invoice.notes || invoice.terms) && (
        <div style={{ fontSize: '11px', color: '#64748B', borderTop: '1px dashed #A7F3D0', paddingTop: '14px' }}>
          {invoice.notes && <p>// NOTE: {invoice.notes}</p>}
          {invoice.terms && <p>// TERMS: {invoice.terms}</p>}
        </div>
      )}
    </div>
  );
};
