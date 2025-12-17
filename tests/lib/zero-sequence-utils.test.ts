/**
 * Zero Sequence Utility Tests
 *
 * Comprehensive tests for zero-sequence utility functions
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  pickRandom,
  randomInt,
  generateFutureDate,
  generateOrderNumber,
  generateConfirmationCode,
  normalizeIntentId,
  formatCurrency,
  generateRandomEmail,
  truncate,
  debounce,
  relativeTime,
} from '@/lib/zero-sequence/utils';

describe('pickRandom', () => {
  beforeEach(() => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return an element from the array', () => {
    const array = ['a', 'b', 'c'];
    const result = pickRandom(array);
    expect(array).toContain(result);
  });

  it('should return middle element with Math.random = 0.5', () => {
    const array = ['a', 'b', 'c', 'd', 'e'];
    const result = pickRandom(array);
    expect(result).toBe('c'); // 0.5 * 5 = 2.5 → floor = 2 → 'c'
  });

  it('should handle single-element arrays', () => {
    const array = ['only'];
    expect(pickRandom(array)).toBe('only');
  });

  it('should work with different types', () => {
    const numbers = [1, 2, 3];
    const result = pickRandom(numbers);
    expect(typeof result).toBe('number');
    expect(numbers).toContain(result);
  });
});

describe('randomInt', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return integer within range [min, max]', () => {
    for (let i = 0; i < 100; i++) {
      const result = randomInt(1, 10);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(10);
      expect(Number.isInteger(result)).toBe(true);
    }
  });

  it('should return min when Math.random = 0', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    expect(randomInt(5, 10)).toBe(5);
  });

  it('should return max when Math.random ≈ 1', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.9999);
    expect(randomInt(5, 10)).toBe(10);
  });

  it('should return same value when min === max', () => {
    expect(randomInt(7, 7)).toBe(7);
  });

  it('should work with negative numbers', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
    const result = randomInt(-10, -5);
    expect(result).toBeGreaterThanOrEqual(-10);
    expect(result).toBeLessThanOrEqual(-5);
  });
});

describe('generateFutureDate', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-01-15T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('should generate a date in the future', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
    const result = generateFutureDate();
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('should format date as locale string', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    const result = generateFutureDate(1, 1); // Exactly 1 day in future
    expect(result).toMatch(/\w+ \d+, \d{4}/); // "January 16, 2025"
  });

  it('should respect custom min/max days', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    const result = generateFutureDate(7, 7); // Exactly 7 days
    expect(result).toContain('January 22, 2025');
  });

  it('should use default range if no args provided', () => {
    const result = generateFutureDate();
    expect(typeof result).toBe('string');
  });
});

describe('generateOrderNumber', () => {
  beforeEach(() => {
    let callCount = 0;
    vi.spyOn(Math, 'random').mockImplementation(() => {
      callCount++;
      return callCount === 1 ? 0 : 0.5; // First call: 0, rest: 0.5
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return string in format XXX-XXXXXXX-XXXXXXX', () => {
    const result = generateOrderNumber();
    expect(result).toMatch(/^\d{3}-\d{7}-\d{7}$/);
  });

  it('should generate different numbers on multiple calls', () => {
    vi.restoreAllMocks(); // Use real random
    const results = new Set();
    for (let i = 0; i < 10; i++) {
      results.add(generateOrderNumber());
    }
    expect(results.size).toBeGreaterThan(1); // Should be unique
  });

  it('should have valid ranges for each part', () => {
    vi.restoreAllMocks();
    for (let i = 0; i < 50; i++) {
      const result = generateOrderNumber();
      const [part1, part2, part3] = result.split('-').map(Number);
      expect(part1).toBeGreaterThanOrEqual(100);
      expect(part1).toBeLessThanOrEqual(999);
      expect(part2).toBeGreaterThanOrEqual(1000000);
      expect(part2).toBeLessThanOrEqual(9999999);
      expect(part3).toBeGreaterThanOrEqual(1000000);
      expect(part3).toBeLessThanOrEqual(9999999);
    }
  });
});

describe('generateConfirmationCode', () => {
  beforeEach(() => {
    let callCount = 0;
    vi.spyOn(Math, 'random').mockImplementation(() => {
      callCount++;
      return callCount <= 3 ? 0 : 0.5; // First 3 calls: 0 (letter A), then 0.5
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return string in format LLL###', () => {
    const result = generateConfirmationCode();
    expect(result).toMatch(/^[A-Z]{3}\d{3}$/);
  });

  it('should generate 3 uppercase letters + 3 digits', () => {
    const result = generateConfirmationCode();
    expect(result.length).toBe(6);
    expect(result.slice(0, 3)).toMatch(/^[A-Z]{3}$/);
    expect(result.slice(3)).toMatch(/^\d{3}$/);
  });

  it('should generate different codes on multiple calls', () => {
    vi.restoreAllMocks();
    const results = new Set();
    for (let i = 0; i < 20; i++) {
      results.add(generateConfirmationCode());
    }
    expect(results.size).toBeGreaterThan(1);
  });
});

describe('normalizeIntentId', () => {
  it('should remove _form suffix', () => {
    expect(normalizeIntentId('package_form')).toBe('package');
    expect(normalizeIntentId('invoice_form')).toBe('invoice');
  });

  it('should convert to lowercase', () => {
    expect(normalizeIntentId('PACKAGE')).toBe('package');
    expect(normalizeIntentId('INVOICE')).toBe('invoice');
  });

  it('should handle already normalized IDs', () => {
    expect(normalizeIntentId('package')).toBe('package');
    expect(normalizeIntentId('invoice')).toBe('invoice');
  });

  it('should handle IDs without _form suffix', () => {
    expect(normalizeIntentId('appointment')).toBe('appointment');
  });

  it('should only remove trailing _form', () => {
    expect(normalizeIntentId('form_data_form')).toBe('form_data');
  });
});

describe('formatCurrency', () => {
  it('should format positive amounts', () => {
    expect(formatCurrency(100)).toBe('$100.00');
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
  });

  it('should format zero', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  });

  it('should format negative amounts', () => {
    expect(formatCurrency(-50)).toBe('-$50.00');
  });

  it('should round to 2 decimal places', () => {
    expect(formatCurrency(99.999)).toBe('$100.00');
    expect(formatCurrency(10.005)).toBe('$10.01');
  });

  it('should add thousands separator', () => {
    expect(formatCurrency(1000000)).toBe('$1,000,000.00');
  });

  it('should handle decimal amounts', () => {
    expect(formatCurrency(9.99)).toBe('$9.99');
    expect(formatCurrency(0.5)).toBe('$0.50');
  });
});

describe('generateRandomEmail', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-01-15T12:00:00Z'));
    vi.spyOn(Math, 'random').mockReturnValue(0);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('should return EmailData with subject, from, body', () => {
    const email = generateRandomEmail();
    expect(email).toHaveProperty('subject');
    expect(email).toHaveProperty('from');
    expect(email).toHaveProperty('body');
    expect(typeof email.subject).toBe('string');
    expect(typeof email.from).toBe('string');
    expect(typeof email.body).toBe('string');
  });

  it('should replace placeholders in subject and body', () => {
    const email = generateRandomEmail();
    // Should not contain unreplaced placeholders
    expect(email.subject).not.toMatch(/\{[^}]+\}/);
    expect(email.body).not.toMatch(/\{[^}]+\}/);
  });

  it('should include valid email address in from field', () => {
    const email = generateRandomEmail();
    expect(email.from).toMatch(/<[^>]+@[^>]+>/);
  });

  it('should generate varied email types', () => {
    vi.restoreAllMocks();
    const types = new Set();
    for (let i = 0; i < 20; i++) {
      const email = generateRandomEmail();
      // Detect type by subject content
      if (email.subject.includes('shipped') || email.subject.includes('order')) {
        types.add('package');
      } else if (email.subject.includes('Invoice')) {
        types.add('invoice');
      } else if (email.subject.includes('Appointment')) {
        types.add('appointment');
      } else if (email.subject.includes('flight')) {
        types.add('flight');
      }
    }
    expect(types.size).toBeGreaterThan(1);
  });
});

describe('truncate', () => {
  it('should return original string if shorter than maxLength', () => {
    expect(truncate('hello', 10)).toBe('hello');
    expect(truncate('test', 4)).toBe('test');
  });

  it('should truncate and add ellipsis if longer than maxLength', () => {
    expect(truncate('hello world', 8)).toBe('hello...');
    expect(truncate('this is a long string', 10)).toBe('this is...');
  });

  it('should handle maxLength equal to string length', () => {
    expect(truncate('hello', 5)).toBe('hello');
  });

  it('should handle edge case of maxLength = 3', () => {
    expect(truncate('hello', 3)).toBe('...');
  });

  it('should preserve exact maxLength characters', () => {
    const result = truncate('hello world', 8);
    expect(result.length).toBe(8); // 5 chars + '...'
  });

  it('should handle empty string', () => {
    expect(truncate('', 10)).toBe('');
  });

  it('should handle very long strings', () => {
    const longString = 'a'.repeat(1000);
    const result = truncate(longString, 50);
    expect(result.length).toBe(50);
    expect(result.endsWith('...')).toBe(true);
  });
});

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should delay function execution', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced();
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should cancel previous calls', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced();
    vi.advanceTimersByTime(50);
    debounced(); // This should reset the timer
    vi.advanceTimersByTime(50);
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(50);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should pass arguments to the function', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced('hello', 123);
    vi.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledWith('hello', 123);
  });

  it('should use latest arguments if called multiple times', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced('first');
    debounced('second');
    debounced('third');

    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('third');
  });

  it('should allow multiple executions after wait time', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced();
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);

    debounced();
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(2);
  });
});

describe('relativeTime', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-01-15T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return "just now" for very recent times', () => {
    const now = new Date();
    expect(relativeTime(now)).toBe('just now');
    
    const seconds30Ago = new Date(now.getTime() - 30 * 1000);
    expect(relativeTime(seconds30Ago)).toBe('just now');
  });

  it('should return minutes for times within the last hour', () => {
    const now = new Date();
    const minutes5Ago = new Date(now.getTime() - 5 * 60 * 1000);
    expect(relativeTime(minutes5Ago)).toBe('5 minutes ago');

    const minutes1Ago = new Date(now.getTime() - 1 * 60 * 1000);
    expect(relativeTime(minutes1Ago)).toBe('1 minute ago');
  });

  it('should return hours for times within the last day', () => {
    const now = new Date();
    const hours2Ago = new Date(now.getTime() - 2 * 60 * 60 * 1000);
    expect(relativeTime(hours2Ago)).toBe('2 hours ago');

    const hours1Ago = new Date(now.getTime() - 1 * 60 * 60 * 1000);
    expect(relativeTime(hours1Ago)).toBe('1 hour ago');
  });

  it('should return days for times more than 24 hours ago', () => {
    const now = new Date();
    const days2Ago = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
    expect(relativeTime(days2Ago)).toBe('2 days ago');

    const days1Ago = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000);
    expect(relativeTime(days1Ago)).toBe('1 day ago');
  });

  it('should use singular form for 1 unit', () => {
    const now = new Date();
    expect(relativeTime(new Date(now.getTime() - 1 * 60 * 1000))).toBe('1 minute ago');
    expect(relativeTime(new Date(now.getTime() - 1 * 60 * 60 * 1000))).toBe('1 hour ago');
    expect(relativeTime(new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000))).toBe('1 day ago');
  });

  it('should use plural form for multiple units', () => {
    const now = new Date();
    expect(relativeTime(new Date(now.getTime() - 5 * 60 * 1000))).toBe('5 minutes ago');
    expect(relativeTime(new Date(now.getTime() - 3 * 60 * 60 * 1000))).toBe('3 hours ago');
    expect(relativeTime(new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000))).toBe('7 days ago');
  });
});
