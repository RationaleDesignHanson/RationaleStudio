/**
 * Sample Recipe Metadata for Heirloom Demo
 *
 * Provides pre-loaded recipe images so visitors can try the demo
 * without uploading their own photos
 */

export interface SampleRecipe {
  id: string;
  name: string;
  category: 'card' | 'cookbook';
  imagePath: string;
  thumbnailPath: string;
  description: string;
}

export const SAMPLE_RECIPE_CARDS: SampleRecipe[] = [
  {
    id: 'card-01',
    name: "Grandma's Chocolate Chip Cookies",
    category: 'card',
    imagePath: '/images/heirloom/demo/cards/RecipeCard_01.jpg',
    thumbnailPath: '/images/heirloom/demo/cards/RecipeCard_01.jpg',
    description: 'Classic handwritten recipe card',
  },
  {
    id: 'card-02',
    name: 'Banana Bread Recipe',
    category: 'card',
    imagePath: '/images/heirloom/demo/cards/RecipeCard_02.jpeg',
    thumbnailPath: '/images/heirloom/demo/cards/RecipeCard_02.jpeg',
    description: 'Vintage recipe card with notes',
  },
  {
    id: 'card-03',
    name: 'Apple Pie',
    category: 'card',
    imagePath: '/images/heirloom/demo/cards/RecipeCard_03.jpeg',
    thumbnailPath: '/images/heirloom/demo/cards/RecipeCard_03.jpeg',
    description: 'Family favorite from 1987',
  },
  {
    id: 'card-04',
    name: 'Chicken Casserole',
    category: 'card',
    imagePath: '/images/heirloom/demo/cards/RecipeCard_04.jpeg',
    thumbnailPath: '/images/heirloom/demo/cards/RecipeCard_04.jpeg',
    description: 'Comfort food classic',
  },
  {
    id: 'card-05',
    name: 'Lemon Bars',
    category: 'card',
    imagePath: '/images/heirloom/demo/cards/RecipeCard_05.jpeg',
    thumbnailPath: '/images/heirloom/demo/cards/RecipeCard_05.jpeg',
    description: 'Tangy and sweet dessert',
  },
  {
    id: 'card-06',
    name: 'Pot Roast',
    category: 'card',
    imagePath: '/images/heirloom/demo/cards/RecipeCard_06.jpeg',
    thumbnailPath: '/images/heirloom/demo/cards/RecipeCard_06.jpeg',
    description: 'Sunday dinner tradition',
  },
];

export const SAMPLE_COOKBOOK_PAGES: SampleRecipe[] = [
  {
    id: 'cookbook-01',
    name: 'Vintage Cookbook - Roast Turkey',
    category: 'cookbook',
    imagePath: '/images/heirloom/demo/cookbooks/Cookbook_01.jpeg',
    thumbnailPath: '/images/heirloom/demo/cookbooks/Cookbook_01.jpeg',
    description: 'Holiday cookbook page',
  },
  {
    id: 'cookbook-02',
    name: 'French Toast Recipe',
    category: 'cookbook',
    imagePath: '/images/heirloom/demo/cookbooks/Cookbook_02.jpeg',
    thumbnailPath: '/images/heirloom/demo/cookbooks/Cookbook_02.jpeg',
    description: 'Breakfast favorite',
  },
  {
    id: 'cookbook-03',
    name: 'Beef Stew',
    category: 'cookbook',
    imagePath: '/images/heirloom/demo/cookbooks/Cookbook_03.jpeg',
    thumbnailPath: '/images/heirloom/demo/cookbooks/Cookbook_03.jpeg',
    description: 'Hearty winter meal',
  },
  {
    id: 'cookbook-04',
    name: 'Chocolate Cake',
    category: 'cookbook',
    imagePath: '/images/heirloom/demo/cookbooks/Cookbook_04.jpeg',
    thumbnailPath: '/images/heirloom/demo/cookbooks/Cookbook_04.jpeg',
    description: 'Decadent dessert',
  },
];

export const ALL_SAMPLE_RECIPES = [...SAMPLE_RECIPE_CARDS, ...SAMPLE_COOKBOOK_PAGES];
