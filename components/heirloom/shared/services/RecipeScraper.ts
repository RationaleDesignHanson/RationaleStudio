/**
 * Recipe URL Scraper
 *
 * Fetches and parses recipe data from URLs
 * Tracks failures for analysis in Firestore
 */

import { db } from '@/lib/firebase-tracker';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export interface ScrapedRecipe {
  name: string;
  servings: number;
  ingredientLines: string[];
  url: string;
}

export interface ScrapeError {
  url: string;
  domain: string;
  error: string;
  errorType: 'cors' | 'parse' | 'network' | 'unknown';
  timestamp: number;
  userAgent: string;
}

export class RecipeScraper {
  private failedScrapes: ScrapeError[] = [];

  /**
   * Scrape a recipe from a URL
   */
  async scrapeRecipe(url: string): Promise<ScrapedRecipe> {
    try {
      // Validate URL
      const urlObj = new URL(url);

      // For now, use a simple CORS proxy (allorigins.win)
      // In production, this should be a Netlify function
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;

      console.log('Fetching recipe from:', url);
      const response = await fetch(proxyUrl);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const html = await response.text();

      // Parse the HTML
      const recipe = this.parseRecipeHtml(html, url);

      console.log('Successfully scraped recipe:', recipe);
      return recipe;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error('Failed to scrape recipe:', errorMessage);

      // Log failure to Firestore
      await this.logFailedScrape(url, errorMessage);

      throw new Error(`Failed to scrape recipe: ${errorMessage}`);
    }
  }

  /**
   * Log a failed scrape to Firestore for triage
   */
  private async logFailedScrape(url: string, errorMessage: string): Promise<void> {
    try {
      const urlObj = new URL(url);
      const domain = urlObj.hostname;

      // Determine error type
      let errorType: ScrapeError['errorType'] = 'unknown';
      if (errorMessage.includes('CORS') || errorMessage.includes('cross-origin')) {
        errorType = 'cors';
      } else if (errorMessage.includes('Could not find recipe')) {
        errorType = 'parse';
      } else if (errorMessage.includes('HTTP') || errorMessage.includes('fetch')) {
        errorType = 'network';
      }

      const errorData: Omit<ScrapeError, 'timestamp'> = {
        url,
        domain,
        error: errorMessage,
        errorType,
        userAgent: navigator.userAgent,
      };

      // Save to Firestore
      await addDoc(collection(db, 'failed_recipe_scrapes'), {
        ...errorData,
        timestamp: serverTimestamp(),
      });

      // Also keep in memory
      this.failedScrapes.push({
        ...errorData,
        timestamp: Date.now(),
      });

      console.log('Failed scrape logged to Firestore:', domain);
    } catch (firestoreError) {
      console.error('Failed to log scrape error to Firestore:', firestoreError);
      // Don't throw - we still want the original error to propagate
    }
  }

  /**
   * Parse recipe data from HTML
   */
  private parseRecipeHtml(html: string, url: string): ScrapedRecipe {
    // Create a DOM parser
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Try to find recipe data using common selectors and schema.org
    const recipe = this.extractRecipeData(doc, url);

    if (!recipe.name || recipe.ingredientLines.length === 0) {
      throw new Error('Could not find recipe data on page');
    }

    return recipe;
  }

  /**
   * Extract recipe data from parsed HTML
   */
  private extractRecipeData(doc: Document, url: string): ScrapedRecipe {
    let name = '';
    let servings = 4;
    let ingredientLines: string[] = [];

    // Try schema.org JSON-LD first (most reliable)
    const scripts = doc.querySelectorAll('script[type="application/ld+json"]');
    for (const script of Array.from(scripts)) {
      try {
        const data = JSON.parse(script.textContent || '');
        const recipeData = Array.isArray(data)
          ? data.find(item => item['@type'] === 'Recipe')
          : data['@type'] === 'Recipe' ? data : null;

        if (recipeData) {
          name = recipeData.name || '';
          servings = parseInt(recipeData.recipeYield) || 4;

          // Handle different ingredient formats
          const ingredients = recipeData.recipeIngredient || [];
          ingredientLines = Array.isArray(ingredients)
            ? ingredients
            : typeof ingredients === 'string'
            ? [ingredients]
            : [];

          if (name && ingredientLines.length > 0) {
            return { name, servings, ingredientLines, url };
          }
        }
      } catch (e) {
        // Continue to next script
      }
    }

    // Try microdata
    const recipeElement = doc.querySelector('[itemtype*="schema.org/Recipe"]');
    if (recipeElement) {
      name = recipeElement.querySelector('[itemprop="name"]')?.textContent?.trim() || '';
      const yieldText = recipeElement.querySelector('[itemprop="recipeYield"]')?.textContent?.trim();
      servings = parseInt(yieldText || '4') || 4;

      const ingredientElements = recipeElement.querySelectorAll('[itemprop="recipeIngredient"]');
      ingredientLines = Array.from(ingredientElements).map(el => el.textContent?.trim() || '').filter(Boolean);

      if (name && ingredientLines.length > 0) {
        return { name, servings, ingredientLines, url };
      }
    }

    // Fallback: Try common selectors
    if (!name) {
      name = doc.querySelector('h1')?.textContent?.trim() ||
             doc.querySelector('.recipe-title')?.textContent?.trim() ||
             doc.querySelector('[class*="recipe"][class*="title"]')?.textContent?.trim() ||
             'Untitled Recipe';
    }

    if (ingredientLines.length === 0) {
      // Try to find ingredient list
      const listSelectors = [
        '.recipe-ingredients li',
        '[class*="ingredient"] li',
        '.ingredients li',
        'ul[class*="ingredient"] li',
      ];

      for (const selector of listSelectors) {
        const elements = doc.querySelectorAll(selector);
        if (elements.length > 0) {
          ingredientLines = Array.from(elements)
            .map(el => el.textContent?.trim() || '')
            .filter(Boolean);
          break;
        }
      }
    }

    return { name, servings, ingredientLines, url };
  }

  /**
   * Get failed scrapes for analysis
   */
  getFailedScrapes(): ScrapeError[] {
    return [...this.failedScrapes];
  }

  /**
   * Clear failed scrapes
   */
  clearFailedScrapes(): void {
    this.failedScrapes = [];
  }
}
