/**
 * Quantity Parser
 *
 * Parses quantity values from ingredient strings, handling:
 * - Fractions (1/2, ½, 1 1/2)
 * - Ranges (2-3, 1 to 2)
 * - Decimals (1.5, 0.25)
 * - Spelled numbers ("one", "two", "dozen")
 * - Approximate quantities ("about 2", "~3")
 * - "Or more" quantities ("1+", "2+") - indicates subjective amounts
 */

import { QuantityValue } from '../types';

// Unicode fractions mapping
const UNICODE_FRACTIONS: Record<string, number> = {
  '½': 0.5,
  '⅓': 1/3,
  '⅔': 2/3,
  '¼': 0.25,
  '¾': 0.75,
  '⅛': 0.125,
  '⅜': 0.375,
  '⅝': 0.625,
  '⅞': 0.875,
  '⅕': 0.2,
  '⅖': 0.4,
  '⅗': 0.6,
  '⅘': 0.8,
  '⅙': 1/6,
  '⅚': 5/6,
};

// Spelled number mapping
const SPELLED_NUMBERS: Record<string, number> = {
  'a': 1,
  'an': 1,
  'one': 1,
  'two': 2,
  'three': 3,
  'four': 4,
  'five': 5,
  'six': 6,
  'seven': 7,
  'eight': 8,
  'nine': 9,
  'ten': 10,
  'eleven': 11,
  'twelve': 12,
  'dozen': 12,
  'couple': 2,
  'few': 3,  // approximate
  'several': 5,  // approximate
  'half': 0.5,
  'quarter': 0.25,
};

// Approximate keywords
const APPROXIMATE_KEYWORDS = [
  'about',
  'approximately',
  'roughly',
  'around',
  '~',
  'approx',
  'circa',
];

export interface ParsedQuantityResult {
  quantity: QuantityValue | null;
  remainder: string;  // The rest of the string after quantity
}

export class QuantityParser {
  /**
   * Parse quantity from the beginning of a string
   * Returns both the parsed quantity and the remainder of the string
   */
  parse(input: string): ParsedQuantityResult {
    if (!input || input.trim() === '') {
      return { quantity: null, remainder: input };
    }

    const trimmed = input.trim();

    // Try different parsing strategies in order
    let result = this.tryApproximateQuantity(trimmed);
    if (result.quantity) return result;

    result = this.tryPlusQuantity(trimmed);
    if (result.quantity) return result;

    result = this.tryRangeQuantity(trimmed);
    if (result.quantity) return result;

    result = this.tryMixedFraction(trimmed);
    if (result.quantity) return result;

    result = this.tryUnicodeFraction(trimmed);
    if (result.quantity) return result;

    result = this.tryTextFraction(trimmed);
    if (result.quantity) return result;

    result = this.tryDecimal(trimmed);
    if (result.quantity) return result;

    result = this.trySpelledNumber(trimmed);
    if (result.quantity) return result;

    // No quantity found
    return { quantity: null, remainder: trimmed };
  }

  /**
   * Try to parse "plus" quantity ("1+", "2+")
   * Indicates "or more" - commonly from "to taste" conversions
   */
  private tryPlusQuantity(input: string): ParsedQuantityResult {
    // Match: number followed by +
    const pattern = /^(\d+(?:\.\d+)?)\+\s*(.*)$/;

    const match = input.match(pattern);
    if (!match) {
      return { quantity: null, remainder: input };
    }

    const [, numberStr, remainder] = match;
    const value = parseFloat(numberStr);

    if (isNaN(value)) {
      return { quantity: null, remainder: input };
    }

    return {
      quantity: {
        type: 'approximate',
        value,
        display: `${this.formatNumber(value)}+`,
      },
      remainder: remainder.trim(),
    };
  }

  /**
   * Try to parse approximate quantity ("about 2", "~3")
   */
  private tryApproximateQuantity(input: string): ParsedQuantityResult {
    // Match: (about|approximately|~) followed by a number
    const pattern = new RegExp(
      `^(${APPROXIMATE_KEYWORDS.join('|')})\\s*([\\d.]+(?:[/\\d]+)?|${Object.keys(UNICODE_FRACTIONS).join('|')})\\s*(.*)$`,
      'i'
    );

    const match = input.match(pattern);
    if (!match) {
      return { quantity: null, remainder: input };
    }

    const [, , quantityStr, remainder] = match;

    // Parse the actual quantity
    const { quantity } = this.parse(quantityStr);
    if (!quantity) {
      return { quantity: null, remainder: input };
    }

    return {
      quantity: {
        type: 'approximate',
        value: quantity.value,
        display: `about ${quantity.display}`,
      },
      remainder: remainder.trim(),
    };
  }

  /**
   * Try to parse range quantity ("2-3", "1 to 2", "2 or 3")
   */
  private tryRangeQuantity(input: string): ParsedQuantityResult {
    // Match: number - number, number to number, number or number
    const patterns = [
      /^(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)\s*(.*)$/,  // 2-3
      /^(\d+(?:\.\d+)?)\s+to\s+(\d+(?:\.\d+)?)\s*(.*)$/i,  // 2 to 3
      /^(\d+(?:\.\d+)?)\s+or\s+(\d+(?:\.\d+)?)\s*(.*)$/i,  // 2 or 3
    ];

    for (const pattern of patterns) {
      const match = input.match(pattern);
      if (match) {
        const [, lowStr, highStr, remainder] = match;
        const low = parseFloat(lowStr);
        const high = parseFloat(highStr);
        const mid = (low + high) / 2;

        return {
          quantity: {
            type: 'range',
            value: mid,
            valueLow: low,
            valueHigh: high,
            display: `${this.formatNumber(low)}-${this.formatNumber(high)}`,
          },
          remainder: remainder.trim(),
        };
      }
    }

    return { quantity: null, remainder: input };
  }

  /**
   * Try to parse mixed fraction ("1 1/2", "2 1/4")
   */
  private tryMixedFraction(input: string): ParsedQuantityResult {
    // Match: whole number, optional space, fraction
    // Examples: "1 1/2", "1½", "2 3/4"
    const pattern = /^(\d+)\s*([½⅓⅔¼¾⅛⅜⅝⅞⅕⅖⅗⅘⅙⅚]|\d+\/\d+)\s*(.*)$/;

    const match = input.match(pattern);
    if (!match) {
      return { quantity: null, remainder: input };
    }

    const [, wholeStr, fractionStr, remainder] = match;
    const whole = parseInt(wholeStr, 10);

    let fraction = 0;
    if (UNICODE_FRACTIONS[fractionStr]) {
      fraction = UNICODE_FRACTIONS[fractionStr];
    } else if (fractionStr.includes('/')) {
      fraction = this.parseFraction(fractionStr);
    }

    const value = whole + fraction;
    const display = this.formatNumber(value);

    return {
      quantity: {
        type: 'exact',
        value,
        display,
      },
      remainder: remainder.trim(),
    };
  }

  /**
   * Try to parse unicode fraction ("½", "¾")
   */
  private tryUnicodeFraction(input: string): ParsedQuantityResult {
    const unicodeChars = Object.keys(UNICODE_FRACTIONS).join('');
    const pattern = new RegExp(`^([${unicodeChars}])\\s*(.*)$`);

    const match = input.match(pattern);
    if (!match) {
      return { quantity: null, remainder: input };
    }

    const [, fractionChar, remainder] = match;
    const value = UNICODE_FRACTIONS[fractionChar];

    return {
      quantity: {
        type: 'exact',
        value,
        display: fractionChar,
      },
      remainder: remainder.trim(),
    };
  }

  /**
   * Try to parse text fraction ("1/2", "3/4")
   */
  private tryTextFraction(input: string): ParsedQuantityResult {
    const pattern = /^(\d+)\/(\d+)\s*(.*)$/;

    const match = input.match(pattern);
    if (!match) {
      return { quantity: null, remainder: input };
    }

    const [, numeratorStr, denominatorStr, remainder] = match;
    const value = this.parseFraction(`${numeratorStr}/${denominatorStr}`);

    return {
      quantity: {
        type: 'exact',
        value,
        display: this.formatNumber(value),
      },
      remainder: remainder.trim(),
    };
  }

  /**
   * Try to parse decimal ("1.5", "0.25", ".5")
   */
  private tryDecimal(input: string): ParsedQuantityResult {
    const pattern = /^(\d*\.\d+|\d+)\s*(.*)$/;

    const match = input.match(pattern);
    if (!match) {
      return { quantity: null, remainder: input };
    }

    const [, numberStr, remainder] = match;
    const value = parseFloat(numberStr);

    if (isNaN(value)) {
      return { quantity: null, remainder: input };
    }

    return {
      quantity: {
        type: 'exact',
        value,
        display: this.formatNumber(value),
      },
      remainder: remainder.trim(),
    };
  }

  /**
   * Try to parse spelled number ("one", "two", "dozen", "a couple")
   */
  private trySpelledNumber(input: string): ParsedQuantityResult {
    const words = input.split(/\s+/);
    if (words.length === 0) {
      return { quantity: null, remainder: input };
    }

    const firstWord = words[0].toLowerCase();

    // Check for "a couple" or "a few"
    if (firstWord === 'a' && words.length > 1) {
      const secondWord = words[1].toLowerCase();
      if (SPELLED_NUMBERS[secondWord]) {
        const value = SPELLED_NUMBERS[secondWord];
        const isApproximate = ['few', 'several'].includes(secondWord);
        const remainder = words.slice(2).join(' ');

        return {
          quantity: {
            type: isApproximate ? 'approximate' : 'exact',
            value,
            display: isApproximate ? `about ${value}` : `${value}`,
          },
          remainder,
        };
      }
    }

    // Check for spelled number at start
    if (SPELLED_NUMBERS[firstWord]) {
      const value = SPELLED_NUMBERS[firstWord];
      const isApproximate = ['few', 'several'].includes(firstWord);
      const remainder = words.slice(1).join(' ');

      // Check for compound like "one and a half"
      if (firstWord === 'one' && words.length >= 4) {
        const phrase = words.slice(0, 4).join(' ').toLowerCase();
        if (phrase === 'one and a half' || phrase === 'one and half') {
          return {
            quantity: {
              type: 'exact',
              value: 1.5,
              display: '1½',
            },
            remainder: words.slice(4).join(' '),
          };
        }
      }

      return {
        quantity: {
          type: isApproximate ? 'approximate' : 'exact',
          value,
          display: isApproximate ? `about ${value}` : `${value}`,
        },
        remainder,
      };
    }

    return { quantity: null, remainder: input };
  }

  /**
   * Parse a fraction string to decimal
   */
  private parseFraction(fraction: string): number {
    const parts = fraction.split('/');
    if (parts.length !== 2) return 0;

    const numerator = parseInt(parts[0], 10);
    const denominator = parseInt(parts[1], 10);

    if (isNaN(numerator) || isNaN(denominator) || denominator === 0) {
      return 0;
    }

    return numerator / denominator;
  }

  /**
   * Format a number for display, preferring unicode fractions
   */
  private formatNumber(value: number): string {
    // Check for unicode fraction equivalents
    for (const [unicode, decimal] of Object.entries(UNICODE_FRACTIONS)) {
      if (Math.abs(value - decimal) < 0.001) {
        return unicode;
      }
    }

    // Check for mixed numbers with unicode fractions
    const whole = Math.floor(value);
    const fraction = value - whole;

    if (whole > 0 && fraction > 0) {
      for (const [unicode, decimal] of Object.entries(UNICODE_FRACTIONS)) {
        if (Math.abs(fraction - decimal) < 0.001) {
          return `${whole}${unicode}`;
        }
      }
    }

    // Check for common text fractions (tighter tolerance for text fractions)
    const commonFractions: [number, string][] = [
      [0.125, '1/8'],
      [0.25, '1/4'],
      [0.333, '1/3'],
      [0.375, '3/8'],
      [0.5, '1/2'],
      [0.625, '5/8'],
      [0.667, '2/3'],
      [0.75, '3/4'],
      [0.875, '7/8'],
    ];

    const fractionTolerance = 0.003; // Tighter tolerance to avoid false matches

    for (const [decimal, text] of commonFractions) {
      if (Math.abs(value - decimal) < fractionTolerance) {
        return text;
      }
    }

    // Mixed numbers with common fractions
    if (whole > 0 && fraction > 0) {
      for (const [decimal, text] of commonFractions) {
        if (Math.abs(fraction - decimal) < fractionTolerance) {
          return `${whole} ${text}`;
        }
      }
    }

    // Default to decimal with reasonable precision
    if (value % 1 === 0) {
      return value.toString();
    }

    // Round to 2 decimal places
    return value.toFixed(2).replace(/\.?0+$/, '');
  }

  /**
   * Convert decimal to display string with unicode fractions
   */
  toDisplayString(value: number, preferFraction = true): string {
    if (!preferFraction) {
      return value.toString();
    }

    return this.formatNumber(value);
  }
}

// Export singleton instance
export const quantityParser = new QuantityParser();
