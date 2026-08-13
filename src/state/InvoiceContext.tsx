import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { InvoiceData, TemplateId, InvoiceItem } from '../types/invoice';
import { DEFAULT_INVOICE } from '../data/defaultInvoice';
import { saveInvoiceToStorage, loadInvoiceFromStorage, clearInvoiceStorage } from '../services/storageService';
import { generateInvoiceNumber, incrementSequenceNumber } from '../utils/invoiceSequence';

export type BuilderSection = 'business' | 'customer' | 'details' | 'items' | 'discount-tax' | 'notes-terms';

export interface SectionCompletion {
  business: boolean;
  customer: boolean;
  details: boolean;
  items: boolean;
  discountTax: boolean;
  notesTerms: boolean;
}

export interface InvoiceContextType {
  invoice: InvoiceData;
  setInvoice: React.Dispatch<React.SetStateAction<InvoiceData>>;
  activeSection: BuilderSection;
  setActiveSection: (section: BuilderSection) => void;
  updateBusiness: (fields: Partial<InvoiceData['business']>) => void;
  updateCustomer: (fields: Partial<InvoiceData['customer']>) => void;
  updateDetails: (fields: Partial<InvoiceData['details']>) => void;
  addItem: () => void;
  updateItem: (id: string, fields: Partial<InvoiceItem>) => void;
  removeItem: (id: string) => void;
  updateDiscountTax: (discountPercent: number, taxPercent: number) => void;
  updateNotesTerms: (notes: string, terms: string) => void;
  changeTemplate: (templateId: TemplateId) => void;
  saveInvoice: () => { success: boolean; error?: string };
  startNewInvoice: () => void;
  completion: SectionCompletion;
  isSectionUnlocked: (section: BuilderSection) => boolean;
  toastMessage: { type: 'success' | 'warning' | 'danger' | 'info'; text: string } | null;
  setToastMessage: (msg: { type: 'success' | 'warning' | 'danger' | 'info'; text: string } | null) => void;
}

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

export const InvoiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [invoice, setInvoice] = useState<InvoiceData>(() => {
    const saved = loadInvoiceFromStorage();
    return saved || DEFAULT_INVOICE;
  });

  const [activeSection, setActiveSection] = useState<BuilderSection>('business');
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'warning' | 'danger' | 'info'; text: string } | null>(null);

  // Debounced Autosave
  useEffect(() => {
    const timer = setTimeout(() => {
      saveInvoiceToStorage(invoice);
    }, 600);
    return () => clearTimeout(timer);
  }, [invoice]);

  // Section completion indicators
  const completion: SectionCompletion = {
    business: Boolean(invoice.business.name && invoice.business.name.trim().length > 0),
    customer: Boolean(invoice.customer.name && invoice.customer.name.trim().length > 0),
    details: Boolean(invoice.details.invoiceNumber && invoice.details.currency && invoice.details.invoiceDate),
    items: invoice.items.length > 0 && invoice.items.some((i) => i.description.trim().length > 0),
    discountTax: !isNaN(invoice.discountPercent) && !isNaN(invoice.taxPercent),
    notesTerms: true,
  };

  // Sequential Section Unlocking logic (§ Sequential Flow)
  const isSectionUnlocked = useCallback(
    (sectionId: BuilderSection): boolean => {
      switch (sectionId) {
        case 'business':
          return true;
        case 'customer':
          return completion.business;
        case 'details':
          return completion.business && completion.customer;
        case 'items':
          return completion.business && completion.customer && completion.details;
        case 'discount-tax':
          return completion.business && completion.customer && completion.details && completion.items;
        case 'notes-terms':
          return completion.business && completion.customer && completion.details && completion.items && completion.discountTax;
        default:
          return true;
      }
    },
    [completion]
  );

  const updateBusiness = useCallback((fields: Partial<InvoiceData['business']>) => {
    setInvoice((prev) => ({
      ...prev,
      business: { ...prev.business, ...fields },
    }));
  }, []);

  const updateCustomer = useCallback((fields: Partial<InvoiceData['customer']>) => {
    setInvoice((prev) => ({
      ...prev,
      customer: { ...prev.customer, ...fields },
    }));
  }, []);

  const updateDetails = useCallback((fields: Partial<InvoiceData['details']>) => {
    setInvoice((prev) => ({
      ...prev,
      details: { ...prev.details, ...fields },
    }));
  }, []);

  const addItem = useCallback(() => {
    setInvoice((prev) => {
      const newItem: InvoiceItem = {
        id: `item-${Date.now()}`,
        description: '',
        quantity: 1,
        price: 0,
      };
      return { ...prev, items: [...prev.items, newItem] };
    });
  }, []);

  const updateItem = useCallback((id: string, fields: Partial<InvoiceItem>) => {
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.map((item) => (item.id === id ? { ...item, ...fields } : item)),
    }));
  }, []);

  const removeItem = useCallback((id: string) => {
    setInvoice((prev) => {
      if (prev.items.length <= 1) return prev;
      return {
        ...prev,
        items: prev.items.filter((item) => item.id !== id),
      };
    });
  }, []);

  const updateDiscountTax = useCallback((discountPercent: number, taxPercent: number) => {
    setInvoice((prev) => ({
      ...prev,
      discountPercent: Math.min(100, Math.max(0, discountPercent)),
      taxPercent: Math.min(100, Math.max(0, taxPercent)),
    }));
  }, []);

  const updateNotesTerms = useCallback((notes: string, terms: string) => {
    setInvoice((prev) => ({
      ...prev,
      notes,
      terms,
    }));
  }, []);

  const changeTemplate = useCallback((templateId: TemplateId) => {
    setInvoice((prev) => ({
      ...prev,
      template: templateId,
    }));
    setToastMessage({ type: 'info', text: `Template updated to ${templateId}` });
  }, []);

  const saveInvoice = useCallback(() => {
    const res = saveInvoiceToStorage(invoice);
    if (res.success) {
      setToastMessage({ type: 'success', text: 'Invoice saved' });
    } else {
      setToastMessage({ type: 'danger', text: res.error || 'Failed to save invoice.' });
    }
    return res;
  }, [invoice]);

  const startNewInvoice = useCallback(() => {
    clearInvoiceStorage();
    const nextSeq = incrementSequenceNumber();
    const newInvoiceNumber = generateInvoiceNumber(nextSeq);
    const today = new Date().toISOString().split('T')[0];

    setInvoice((prev) => ({
      business: { name: '', email: '', phone: '', address: '', taxNumber: '', logo: undefined },
      customer: { name: '', email: '', phone: '', address: '' },
      details: {
        invoiceNumber: newInvoiceNumber,
        currency: 'USD',
        invoiceDate: today,
        dueDate: '',
        paymentTerms: '',
      },
      items: [{ id: `item-${Date.now()}`, description: '', quantity: 1, price: 0 }],
      discountPercent: 0,
      taxPercent: 0,
      notes: '',
      terms: '',
      template: prev.template,
    }));

    setToastMessage({ type: 'info', text: 'Started a new invoice.' });
  }, []);

  return (
    <InvoiceContext.Provider
      value={{
        invoice,
        setInvoice,
        activeSection,
        setActiveSection,
        updateBusiness,
        updateCustomer,
        updateDetails,
        addItem,
        updateItem,
        removeItem,
        updateDiscountTax,
        updateNotesTerms,
        changeTemplate,
        saveInvoice,
        startNewInvoice,
        completion,
        isSectionUnlocked,
        toastMessage,
        setToastMessage,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoice = (): InvoiceContextType => {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error('useInvoice must be used within an InvoiceProvider');
  }
  return context;
};
