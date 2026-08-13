import { InvoiceData } from '../types/invoice';

const today = new Date().toISOString().split('T')[0];

export const DEFAULT_INVOICE: InvoiceData = {
  business: {
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    website: '',
    taxNumber: '',
    logo: undefined,
  },
  customer: {
    name: '',
    email: '',
    phone: '',
    address: '',
  },
  details: {
    invoiceNumber: 'INV-20260813-001',
    currency: 'USD',
    invoiceDate: today,
    dueDate: '',
    paymentTerms: '',
  },
  items: [
    {
      id: 'item-1',
      description: '',
      quantity: 1,
      price: 0,
    },
  ],
  discountPercent: 0,
  taxPercent: 0,
  notes: '',
  terms: '',
  template: 'modern',
};
