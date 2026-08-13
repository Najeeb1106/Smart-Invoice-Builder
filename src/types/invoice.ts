export type CurrencyCode = 'USD' | 'PKR' | 'EUR' | 'GBP' | 'AED' | 'SAR';

export type TemplateId =
  | 'modern'
  | 'classic'
  | 'minimal'
  | 'executive'
  | 'corporate-blue'
  | 'professional-gray'
  | 'freelancer-minimal'
  | 'creative-studio'
  | 'developer'
  | 'retail-classic'
  | 'service-pro'
  | 'consultant';

export interface BusinessDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  website?: string;
  taxNumber: string;
  logo?: string; // Data URL or Base64 string
}

export interface CustomerDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface InvoiceMetaDetails {
  invoiceNumber: string;
  currency: CurrencyCode;
  invoiceDate: string;
  dueDate: string;
  paymentTerms: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
}

export interface InvoiceData {
  business: BusinessDetails;
  customer: CustomerDetails;
  details: InvoiceMetaDetails;
  items: InvoiceItem[];
  discountPercent: number;
  taxPercent: number;
  notes: string;
  terms: string;
  template: TemplateId;
}

export interface InvoiceTotals {
  subtotal: number;
  discountAmount: number;
  taxableAmount: number;
  taxAmount: number;
  grandTotal: number;
}
