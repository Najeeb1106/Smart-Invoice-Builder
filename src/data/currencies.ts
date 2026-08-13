import { CurrencyCode } from '../types/invoice';

export interface CurrencyConfig {
  code: CurrencyCode;
  name: string;
  symbol: string;
  position: 'prefix' | 'suffix';
  decimals: number;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: { code: 'USD', name: 'US Dollar', symbol: '$', position: 'prefix', decimals: 2 },
  PKR: { code: 'PKR', name: 'Pakistani Rupee', symbol: '₨', position: 'prefix', decimals: 2 },
  EUR: { code: 'EUR', name: 'Euro', symbol: '€', position: 'prefix', decimals: 2 },
  GBP: { code: 'GBP', name: 'British Pound', symbol: '£', position: 'prefix', decimals: 2 },
  AED: { code: 'AED', name: 'UAE Dirham', symbol: 'AED ', position: 'prefix', decimals: 2 },
  SAR: { code: 'SAR', name: 'Saudi Riyal', symbol: 'SAR ', position: 'prefix', decimals: 2 },
};
