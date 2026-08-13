import { CurrencyCode } from '../types/invoice';
import { CURRENCIES } from '../data/currencies';

/**
 * Centralized Currency Formatter according to Master Prompt §16.
 * Formatting MUST NOT convert or mutate numeric values.
 */
export const formatCurrency = (amount: number, currencyCode: CurrencyCode = 'USD'): string => {
  const config = CURRENCIES[currencyCode] || CURRENCIES.USD;
  const num = typeof amount === 'number' && !isNaN(amount) ? amount : 0;
  
  const formattedNumber = num.toLocaleString('en-US', {
    minimumFractionDigits: config.decimals,
    maximumFractionDigits: config.decimals,
  });

  if (config.position === 'prefix') {
    return `${config.symbol}${formattedNumber}`;
  } else {
    return `${formattedNumber} ${config.symbol}`;
  }
};

export const formatDate = (dateString?: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
