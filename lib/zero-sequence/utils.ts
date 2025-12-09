/**
 * Zero Sequence Utility Functions
 * Extracted from zero-sequence-live.html
 */

import type { EmailData } from './types';

/**
 * Pick random element from array
 * Line 2144 in original HTML
 */
export function pickRandom<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Generate random integer in range [min, max]
 * Line 2148 in original HTML
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate date string X days in future
 * Line 2152 in original HTML
 */
export function generateFutureDate(minDays: number = 1, maxDays: number = 30): string {
  const days = randomInt(minDays, maxDays);
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

/**
 * Generate fake order number
 * Line 2159 in original HTML
 */
export function generateOrderNumber(): string {
  const part1 = randomInt(100, 999);
  const part2 = randomInt(1000000, 9999999);
  const part3 = randomInt(1000000, 9999999);
  return `${part1}-${part2}-${part3}`;
}

/**
 * Generate fake confirmation code
 * Line 2163 in original HTML
 */
export function generateConfirmationCode(): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const code =
    letters[randomInt(0, 25)] +
    letters[randomInt(0, 25)] +
    letters[randomInt(0, 25)] +
    randomInt(100, 999);
  return code;
}

/**
 * Normalize intent ID to match taxonomy keys
 * Line 1477 in original HTML
 */
export function normalizeIntentId(intentId: string): string {
  return intentId.replace(/_form$/, '').toLowerCase();
}

/**
 * Format currency amount
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

/**
 * Generate random email based on templates
 * Line 2080 in original HTML
 */
export function generateRandomEmail(): EmailData {
  const emailTemplates = [
    {
      type: 'package',
      subjects: ['Your {retailer} order has shipped'],
      retailers: ['Amazon', 'Target', 'Best Buy'],
      carriers: ['UPS', 'FedEx', 'USPS'],
      items: ['electronics', 'home goods', 'books'],
      bodies: [
        'Good news! Your {retailer} order has shipped.\n\nOrder #{orderNum}\nTracking: {trackingNum}\nCarrier: {carrier}\nExpected delivery: {date}'
      ]
    },
    {
      type: 'invoice',
      subjects: ['Invoice #{invoiceNum} Due - {company}'],
      companies: ['Acme Corp', 'TechServe Inc'],
      services: ['consulting services', 'software license'],
      amounts: ['$499.00', '$599.00', '$799.00'],
      bodies: [
        'Dear Customer,\n\nYour invoice for {services} is now due.\n\nInvoice: {invoiceNum}\nAmount: {amount}\nDue Date: {date}\n\n{company} Billing'
      ]
    },
    {
      type: 'appointment',
      subjects: ['Appointment Reminder - {provider}'],
      providers: ['Dr. Smith', 'Valley Medical', 'City Dental'],
      bodies: [
        'Dear Patient,\n\nThis is a reminder of your upcoming appointment with {provider}.\n\nDate: {date}\nTime: {time}\n\nPlease call (555) 123-4567 if you need to reschedule.'
      ]
    },
    {
      type: 'flight',
      subjects: ['Check in now for flight {flightNum}'],
      airlines: ['United', 'Delta', 'Southwest'],
      routes: ['SFO → LAX', 'JFK → ORD', 'LAX → SEA'],
      bodies: [
        'Your flight {flightNum} departs tomorrow.\n\nRoute: {route}\nConfirmation: {confirmationCode}\n\nCheck in now: https://airline.com/checkin'
      ]
    }
  ];

  const template = pickRandom(emailTemplates);
  let subject = pickRandom(template.subjects);
  let body = pickRandom(template.bodies);

  // Replace placeholders
  const replacements: Record<string, string> = {
    orderNum: generateOrderNumber(),
    trackingNum: '1Z999AA10123456784',
    date: generateFutureDate(),
    confirmationCode: generateConfirmationCode(),
    invoiceNum: `INV-2025-${randomInt(1000, 9999)}`,
    time: `${randomInt(9, 17)}:${pickRandom(['00', '15', '30', '45'])} ${pickRandom(['AM', 'PM'])}`,
    flightNum: `${pickRandom(['UA', 'DL', 'SW'])} ${randomInt(100, 9999)}`,
  };

  if (template.type === 'package') {
    replacements.retailer = pickRandom(template.retailers!);
    replacements.carrier = pickRandom(template.carriers!);
    replacements.item = pickRandom(template.items!);
  } else if (template.type === 'invoice') {
    replacements.company = pickRandom(template.companies!);
    replacements.services = pickRandom(template.services!);
    replacements.amount = pickRandom(template.amounts!);
  } else if (template.type === 'appointment') {
    replacements.provider = pickRandom(template.providers!);
  } else if (template.type === 'flight') {
    replacements.route = pickRandom(template.routes!);
  }

  // Apply replacements
  Object.entries(replacements).forEach(([key, value]) => {
    const regex = new RegExp(`\\{${key}\\}`, 'g');
    subject = subject.replace(regex, value);
    body = body.replace(regex, value);
  });

  return {
    subject,
    from: generateFromAddress(template.type),
    body,
  };
}

/**
 * Generate appropriate From address for email type
 */
function generateFromAddress(type: string): string {
  const addresses: Record<string, string[]> = {
    package: [
      'Amazon <shipment-tracking@amazon.com>',
      'Target <orders@target.com>',
      'Best Buy <shipping@bestbuy.com>'
    ],
    invoice: [
      'Acme Corp <billing@acmecorp.com>',
      'TechServe <invoices@techserve.com>'
    ],
    appointment: [
      'Dr. Smith <appointments@smithclinic.com>',
      'Valley Medical <scheduling@valleymedical.com>'
    ],
    flight: [
      'United Airlines <noreply@united.com>',
      'Delta <flightinfo@delta.com>',
      'Southwest <checkin@southwest.com>'
    ]
  };

  return pickRandom(addresses[type] || addresses.package);
}

/**
 * Truncate string to max length with ellipsis
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + '...';
}

/**
 * Debounce function calls
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function relativeTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return 'just now';
}
