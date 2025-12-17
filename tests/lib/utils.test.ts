/**
 * Utility Function Tests
 *
 * Comprehensive tests for cn (className) and logger utilities
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { cn } from '@/lib/utils/cn';
import { logger } from '@/lib/utils/logger';

describe('cn (className utility)', () => {
  it('should merge single className', () => {
    expect(cn('text-red-500')).toBe('text-red-500');
  });

  it('should merge multiple classNames', () => {
    expect(cn('text-red-500', 'bg-blue-500')).toBe('text-red-500 bg-blue-500');
  });

  it('should handle conditional classNames', () => {
    expect(cn('base', true && 'active', false && 'inactive')).toBe('base active');
  });

  it('should handle objects with boolean values', () => {
    expect(cn({
      'text-red-500': true,
      'bg-blue-500': false,
      'p-4': true,
    })).toBe('text-red-500 p-4');
  });

  it('should handle arrays of classNames', () => {
    expect(cn(['text-red-500', 'bg-blue-500'])).toBe('text-red-500 bg-blue-500');
  });

  it('should merge conflicting Tailwind classes (last wins)', () => {
    expect(cn('p-4', 'p-8')).toBe('p-8');
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });

  it('should handle undefined and null values', () => {
    expect(cn('text-red-500', undefined, null, 'bg-blue-500')).toBe('text-red-500 bg-blue-500');
  });

  it('should handle empty strings', () => {
    expect(cn('', 'text-red-500', '')).toBe('text-red-500');
  });

  it('should handle mixed input types', () => {
    expect(cn(
      'base',
      ['array-class'],
      { 'object-class': true, 'false-class': false },
      undefined,
      'final'
    )).toBe('base array-class object-class final');
  });

  it('should handle no arguments', () => {
    expect(cn()).toBe('');
  });

  it('should properly merge responsive variants', () => {
    expect(cn('text-sm', 'md:text-base', 'lg:text-lg')).toBe('text-sm md:text-base lg:text-lg');
  });

  it('should handle hover and focus states', () => {
    expect(cn('hover:bg-red-500', 'focus:bg-blue-500')).toBe('hover:bg-red-500 focus:bg-blue-500');
  });
});

describe('logger utility', () => {
  let consoleLogSpy: ReturnType<typeof vi.spyOn>;
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;
  let consoleWarnSpy: ReturnType<typeof vi.spyOn>;
  let consoleInfoSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // Spy on console methods
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    consoleInfoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore console methods
    vi.restoreAllMocks();
  });

  describe('interface and structure', () => {
    it('should expose log, error, warn, and info methods', () => {
      expect(logger).toHaveProperty('log');
      expect(logger).toHaveProperty('error');
      expect(logger).toHaveProperty('warn');
      expect(logger).toHaveProperty('info');
      expect(typeof logger.log).toBe('function');
      expect(typeof logger.error).toBe('function');
      expect(typeof logger.warn).toBe('function');
      expect(typeof logger.info).toBe('function');
    });

    it('should accept variable arguments', () => {
      // These should not throw errors
      expect(() => logger.log()).not.toThrow();
      expect(() => logger.log('one')).not.toThrow();
      expect(() => logger.log('one', 'two', 'three')).not.toThrow();
      expect(() => logger.error('error', new Error('test'))).not.toThrow();
      expect(() => logger.warn('warn', { data: 'value' })).not.toThrow();
      expect(() => logger.info('info', [1, 2, 3])).not.toThrow();
    });

    it('should handle different argument types', () => {
      // Should not throw with various types
      expect(() => logger.log('string', 123, true, null, undefined)).not.toThrow();
      expect(() => logger.log({ nested: { object: 'value' } })).not.toThrow();
      expect(() => logger.log([1, 2, 3, [4, 5]])).not.toThrow();
      expect(() => logger.error(new Error('test error'))).not.toThrow();
    });
  });

  describe('non-development behavior (test/production)', () => {
    // In test/production mode, logger should NOT call console methods
    it('should NOT call console.log in non-dev environment', () => {
      logger.log('test message');
      expect(consoleLogSpy).not.toHaveBeenCalled();
    });

    it('should NOT call console.error in non-dev environment', () => {
      logger.error('error message');
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it('should NOT call console.warn in non-dev environment', () => {
      logger.warn('warning message');
      expect(consoleWarnSpy).not.toHaveBeenCalled();
    });

    it('should NOT call console.info in non-dev environment', () => {
      logger.info('info message');
      expect(consoleInfoSpy).not.toHaveBeenCalled();
    });

    it('should suppress all logging methods', () => {
      logger.log('log');
      logger.error('error');
      logger.warn('warn');
      logger.info('info');

      expect(consoleLogSpy).not.toHaveBeenCalled();
      expect(consoleErrorSpy).not.toHaveBeenCalled();
      expect(consoleWarnSpy).not.toHaveBeenCalled();
      expect(consoleInfoSpy).not.toHaveBeenCalled();
    });

    it('should handle multiple calls without logging', () => {
      for (let i = 0; i < 10; i++) {
        logger.log(`message ${i}`);
      }
      expect(consoleLogSpy).not.toHaveBeenCalled();
    });
  });

  describe('Lighthouse Best Practices compliance', () => {
    it('should not produce console output in production/test mode', () => {
      // This prevents Lighthouse "Issues were logged in the Issues panel" penalty
      logger.log('This should not appear in console');
      logger.error('This should not appear in console');
      logger.warn('This should not appear in console');
      logger.info('This should not appear in console');

      expect(consoleLogSpy).not.toHaveBeenCalled();
      expect(consoleErrorSpy).not.toHaveBeenCalled();
      expect(consoleWarnSpy).not.toHaveBeenCalled();
      expect(consoleInfoSpy).not.toHaveBeenCalled();
    });
  });
});
