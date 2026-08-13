import { InvoiceData } from '../types/invoice';

const INVOICE_STORAGE_KEY = 'smart_invoice_builder_current_data';

export const saveInvoiceToStorage = (invoice: InvoiceData): { success: boolean; error?: string } => {
  try {
    const serialized = JSON.stringify(invoice);
    localStorage.setItem(INVOICE_STORAGE_KEY, serialized);
    return { success: true };
  } catch (err: unknown) {
    console.error('LocalStorage save failure:', err);
    return {
      success: false,
      error: 'Your invoice could not be saved locally. Try removing the uploaded logo or reducing its size.',
    };
  }
};

export const loadInvoiceFromStorage = (): InvoiceData | null => {
  try {
    const saved = localStorage.getItem(INVOICE_STORAGE_KEY);
    if (!saved) return null;
    return JSON.parse(saved) as InvoiceData;
  } catch (err) {
    console.error('LocalStorage load failure:', err);
    return null;
  }
};

export const clearInvoiceStorage = (): void => {
  try {
    localStorage.removeItem(INVOICE_STORAGE_KEY);
  } catch (err) {
    console.error('LocalStorage clear failure:', err);
  }
};
