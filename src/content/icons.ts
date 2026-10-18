import type { ServiceId } from './types';

export const serviceIcon: Record<ServiceId, string> = {
  encoding: 'ledger',
  bank: 'bank',
  vat: 'percent',
  closing: 'calendar',
  peppol: 'bolt',
  credit: 'coins',
  payroll: 'users',
  'data-entry': 'scan',
  migration: 'database',
  customer: 'headset',
  ecommerce: 'cart',
  rescue: 'lifebuoy',
  dedicated: 'user',
};
