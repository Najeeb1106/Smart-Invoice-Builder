import React from 'react';
import { Textarea } from '../common/Textarea';
import { useInvoice } from '../../state/InvoiceContext';

export const SectionNotesTerms: React.FC = () => {
  const { invoice, updateNotesTerms } = useInvoice();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div>
        <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '2px' }}>Notes & Payment Terms</h3>
        <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
          Add custom notes, bank payment details, or legal terms for your recipient.
        </p>
      </div>

      <Textarea
        label="Notes to Client"
        rows={2}
        placeholder="Thank you for your business! Please remit payment within 30 days."
        value={invoice.notes}
        onChange={(e) => updateNotesTerms(e.target.value, invoice.terms)}
      />

      <Textarea
        label="Terms & Conditions / Payment Instructions"
        rows={2}
        placeholder="Bank details: AC #12345678, Routing #987654321, IBAN PK00ABCD1234..."
        value={invoice.terms}
        onChange={(e) => updateNotesTerms(invoice.notes, e.target.value)}
      />
    </div>
  );
};
