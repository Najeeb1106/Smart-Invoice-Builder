import { InvoiceItem, InvoiceTotals } from '../types/invoice';

/**
 * Round number to 2 decimal places to prevent floating point inaccuracies.
 */
const round2 = (num: number): number => {
  return Math.round((num + Number.EPSILON) * 100) / 100;
};

/**
 * Calculates item subtotal: quantity * price
 */
export const calculateItemTotal = (quantity: number, price: number): number => {
  const q = Math.max(0, isNaN(quantity) ? 0 : quantity);
  const p = Math.max(0, isNaN(price) ? 0 : price);
  return round2(q * p);
};

/**
 * Calculates full invoice totals hierarchy based on pure math.
 */
export const calculateInvoiceTotals = (
  items: InvoiceItem[] = [],
  discountPercent: number = 0,
  taxPercent: number = 0
): InvoiceTotals => {
  // 1. Subtotal: SUM(quantity * price)
  const rawSubtotal = items.reduce((acc, item) => {
    return acc + calculateItemTotal(item.quantity, item.price);
  }, 0);
  const subtotal = round2(rawSubtotal);

  // Clamp percentages between 0 and 100
  const validDiscountPercent = Math.min(100, Math.max(0, isNaN(discountPercent) ? 0 : discountPercent));
  const validTaxPercent = Math.min(100, Math.max(0, isNaN(taxPercent) ? 0 : taxPercent));

  // 2. Discount amount: Subtotal * discountPercent / 100
  const discountAmount = round2((subtotal * validDiscountPercent) / 100);

  // 3. Taxable amount: Subtotal - Discount
  const taxableAmount = round2(subtotal - discountAmount);

  // 4. Tax amount: Taxable Amount * taxPercent / 100
  const taxAmount = round2((taxableAmount * validTaxPercent) / 100);

  // 5. Grand Total: Taxable Amount + Tax
  const grandTotal = round2(taxableAmount + taxAmount);

  return {
    subtotal,
    discountAmount,
    taxableAmount,
    taxAmount,
    grandTotal,
  };
};
