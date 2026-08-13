import { describe, it, expect } from 'vitest';
import { calculateInvoiceTotals, calculateItemTotal } from '../utils/invoiceCalculations';
import { formatCurrency } from '../utils/formatters';

describe('Invoice Calculation Engine (§31 & §32 Mandatory Specification)', () => {
  it('calculates individual item totals correctly', () => {
    expect(calculateItemTotal(2, 500)).toBe(1000);
    expect(calculateItemTotal(3, 20)).toBe(60);
    expect(calculateItemTotal(1.5, 10)).toBe(15);
    expect(calculateItemTotal(0, 500)).toBe(0);
    expect(calculateItemTotal(-2, 100)).toBe(0);
  });

  it('passes the mandatory spec calculation test (§31)', () => {
    const items = [
      { id: '1', description: 'Laptop', quantity: 2, price: 500 },
      { id: '2', description: 'Mouse', quantity: 3, price: 20 },
    ];
    const discountPercent = 10;
    const taxPercent = 5;

    const totals = calculateInvoiceTotals(items, discountPercent, taxPercent);

    expect(totals.subtotal).toBe(1060);
    expect(totals.discountAmount).toBe(106);
    expect(totals.taxableAmount).toBe(954);
    expect(totals.taxAmount).toBe(47.7);
    expect(totals.grandTotal).toBe(1001.7);

    // Formatted currency checks
    expect(formatCurrency(totals.subtotal, 'USD')).toBe('$1,060.00');
    expect(formatCurrency(totals.discountAmount, 'USD')).toBe('$106.00');
    expect(formatCurrency(totals.taxAmount, 'USD')).toBe('$47.70');
    expect(formatCurrency(totals.grandTotal, 'USD')).toBe('$1,001.70');
    expect(formatCurrency(totals.grandTotal, 'PKR')).toBe('₨1,001.70');
  });

  it('handles zero discount and zero tax', () => {
    const items = [{ id: '1', description: 'Consulting', quantity: 5, price: 100 }];
    const totals = calculateInvoiceTotals(items, 0, 0);

    expect(totals.subtotal).toBe(500);
    expect(totals.discountAmount).toBe(0);
    expect(totals.taxableAmount).toBe(500);
    expect(totals.taxAmount).toBe(0);
    expect(totals.grandTotal).toBe(500);
  });

  it('handles 100% discount', () => {
    const items = [{ id: '1', description: 'Gift', quantity: 1, price: 200 }];
    const totals = calculateInvoiceTotals(items, 100, 10);

    expect(totals.subtotal).toBe(200);
    expect(totals.discountAmount).toBe(200);
    expect(totals.taxableAmount).toBe(0);
    expect(totals.taxAmount).toBe(0);
    expect(totals.grandTotal).toBe(0);
  });

  it('handles 100% tax', () => {
    const items = [{ id: '1', description: 'Service', quantity: 1, price: 100 }];
    const totals = calculateInvoiceTotals(items, 0, 100);

    expect(totals.subtotal).toBe(100);
    expect(totals.taxableAmount).toBe(100);
    expect(totals.taxAmount).toBe(100);
    expect(totals.grandTotal).toBe(200);
  });

  it('handles empty items array', () => {
    const totals = calculateInvoiceTotals([], 10, 5);
    expect(totals.subtotal).toBe(0);
    expect(totals.discountAmount).toBe(0);
    expect(totals.taxableAmount).toBe(0);
    expect(totals.taxAmount).toBe(0);
    expect(totals.grandTotal).toBe(0);
  });

  it('handles decimal quantities and prices gracefully', () => {
    const items = [{ id: '1', description: 'Hourly Work', quantity: 2.5, price: 45.50 }];
    const totals = calculateInvoiceTotals(items, 5, 8.25);

    expect(totals.subtotal).toBe(113.75); // 2.5 * 45.50 = 113.75
    expect(totals.discountAmount).toBe(5.69); // 113.75 * 0.05 = 5.6875 -> 5.69
    expect(totals.taxableAmount).toBe(108.06); // 113.75 - 5.69 = 108.06
    expect(totals.taxAmount).toBe(8.91); // 108.06 * 0.0825 = 8.91495 -> 8.91
    expect(totals.grandTotal).toBe(116.97); // 108.06 + 8.91 = 116.97
  });
});
