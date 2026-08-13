import React from 'react';
import { Input } from '../common/Input';
import { Textarea } from '../common/Textarea';
import { useInvoice } from '../../state/InvoiceContext';

export const SectionCustomer: React.FC = () => {
  const { invoice, updateCustomer } = useInvoice();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div>
        <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '2px' }}>Customer Information</h3>
        <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
          Enter the client or company details receiving this invoice.
        </p>
      </div>

      <Input
        label="Client / Company Name *"
        placeholder="e.g. Najeeb Tahir"
        value={invoice.customer.name}
        onChange={(e) => updateCustomer({ name: e.target.value })}
        required
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <Input
          label="Client Email"
          type="email"
          placeholder="client@example.com"
          value={invoice.customer.email}
          onChange={(e) => updateCustomer({ email: e.target.value })}
        />
        <Input
          label="Client Phone"
          placeholder="+1 (555) 000-0000"
          value={invoice.customer.phone}
          onChange={(e) => updateCustomer({ phone: e.target.value })}
        />
      </div>

      <Textarea
        label="Billing Address"
        rows={2}
        placeholder="Client address details"
        value={invoice.customer.address}
        onChange={(e) => updateCustomer({ address: e.target.value })}
      />
    </div>
  );
};
