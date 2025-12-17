import { describe, it, expect } from 'vitest';
import { RandomRecipeGenerator } from './RandomRecipeGenerator';

describe('RandomRecipeGenerator', () => {
  // Note: These tests require the ingredient database to be loaded
  // They may fail in isolated test environments

  it('should instantiate without errors', () => {
    expect(() => {
      new RandomRecipeGenerator();
    }).not.toThrow();
  });

  it('should have basic structure and methods', () => {
    const generator = new RandomRecipeGenerator();

    expect(generator).toBeDefined();
    expect(typeof generator.generateRecipe).toBe('function');
    expect(typeof generator.generateMultipleRecipes).toBe('function');
  });
});
