import React from 'react';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { useInvoice } from '../../state/InvoiceContext';
import { CURRENCIES } from '../../data/currencies';
import { CurrencyCode } from '../../types/invoice';

export const SectionInvoiceDetails: React.FC = () => {
  const { invoice, updateDetails } = useInvoice();

  const currencyOptions = Object.values(CURRENCIES).map((c) => ({
    value: c.code,
    label: `${c.name} (${c.symbol})`,
  }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div>
        <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '2px' }}>Invoice Details</h3>
        <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
          Set invoice metadata, dates, payment terms, and currency formatting.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <Input
          label="Invoice Number *"
          placeholder="INV-2026-001"
          value={invoice.details.invoiceNumber}
          onChange={(e) => updateDetails({ invoiceNumber: e.target.value })}
          required
        />
        <Select
          label="Currency"
          options={currencyOptions}
          value={invoice.details.currency}
          onChange={(e) => updateDetails({ currency: e.target.value as CurrencyCode })}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <Input
          label="Invoice Date"
          type="date"
          value={invoice.details.invoiceDate}
          onChange={(e) => updateDetails({ invoiceDate: e.target.value })}
        />
        <Input
          label="Due Date"
          type="date"
          value={invoice.details.dueDate}
          onChange={(e) => updateDetails({ dueDate: e.target.value })}
        />
      </div>

      <Input
        label="Payment Terms"
        placeholder="e.g. Net 30, Due on Receipt, Bank Transfer"
        value={invoice.details.paymentTerms}
        onChange={(e) => updateDetails({ paymentTerms: e.target.value })}
      />
    </div>
  );
};
