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
  {
    id: 'card-07',
    name: 'Homemade Bread',
    category: 'card',
    imagePath: '/images/heirloom/demo/cards/RecipeCard_07.jpg',
    thumbnailPath: '/images/heirloom/demo/cards/RecipeCard_07.jpg',
    description: 'Fresh baked bread recipe',
  },
  {
    id: 'card-08',
    name: 'Vegetable Soup',
    category: 'card',
    imagePath: '/images/heirloom/demo/cards/RecipeCard_08.jpg',
    thumbnailPath: '/images/heirloom/demo/cards/RecipeCard_08.jpg',
    description: 'Hearty vegetable soup',
  },
  {
    id: 'card-09',
    name: 'Blueberry Muffins',
    category: 'card',
    imagePath: '/images/heirloom/demo/cards/RecipeCard_09.jpg',
    thumbnailPath: '/images/heirloom/demo/cards/RecipeCard_09.jpg',
    description: 'Fresh blueberry breakfast',
  },
  {
    id: 'card-10',
    name: 'Beef Stew',
    category: 'card',
    imagePath: '/images/heirloom/demo/cards/RecipeCard_10.jpg',
    thumbnailPath: '/images/heirloom/demo/cards/RecipeCard_10.jpg',
    description: 'Classic comfort stew',
  },
  {
    id: 'card-11',
    name: 'Brownies',
    category: 'card',
    imagePath: '/images/heirloom/demo/cards/RecipeCard_11.jpg',
    thumbnailPath: '/images/heirloom/demo/cards/RecipeCard_11.jpg',
    description: 'Fudgy chocolate brownies',
  },
  {
    id: 'card-12',
    name: 'Chicken Noodle Soup',
    category: 'card',
    imagePath: '/images/heirloom/demo/cards/RecipeCard_12.jpg',
    thumbnailPath: '/images/heirloom/demo/cards/RecipeCard_12.jpg',
    description: 'Comforting chicken soup',
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
  {
    id: 'cookbook-05',
    name: 'Pasta Carbonara',
    category: 'cookbook',
    imagePath: '/images/heirloom/demo/cookbooks/Cookbook_05.jpeg',
    thumbnailPath: '/images/heirloom/demo/cookbooks/Cookbook_05.jpeg',
    description: 'Italian classic',
  },
  {
    id: 'cookbook-06',
    name: 'Roasted Chicken',
    category: 'cookbook',
    imagePath: '/images/heirloom/demo/cookbooks/Cookbook_06.jpeg',
    thumbnailPath: '/images/heirloom/demo/cookbooks/Cookbook_06.jpeg',
    description: 'Perfect roast chicken',
  },
  {
    id: 'cookbook-07',
    name: 'Apple Crisp',
    category: 'cookbook',
    imagePath: '/images/heirloom/demo/cookbooks/Cookbook_07.jpg',
    thumbnailPath: '/images/heirloom/demo/cookbooks/Cookbook_07.jpg',
    description: 'Warm autumn dessert',
  },
  {
    id: 'cookbook-08',
    name: 'Lasagna',
    category: 'cookbook',
    imagePath: '/images/heirloom/demo/cookbooks/Cookbook_08.jpg',
    thumbnailPath: '/images/heirloom/demo/cookbooks/Cookbook_08.jpg',
    description: 'Layered Italian favorite',
  },
  {
    id: 'cookbook-09',
    name: 'Salmon Fillet',
    category: 'cookbook',
    imagePath: '/images/heirloom/demo/cookbooks/Cookbook_09.jpg',
    thumbnailPath: '/images/heirloom/demo/cookbooks/Cookbook_09.jpg',
    description: 'Pan-seared salmon',
  },
  {
    id: 'cookbook-10',
    name: 'Pumpkin Pie',
    category: 'cookbook',
    imagePath: '/images/heirloom/demo/cookbooks/Cookbook_10.jpeg',
    thumbnailPath: '/images/heirloom/demo/cookbooks/Cookbook_10.jpeg',
    description: 'Holiday dessert',
  },
  {
    id: 'cookbook-11',
    name: 'Grilled Vegetables',
    category: 'cookbook',
    imagePath: '/images/heirloom/demo/cookbooks/Cookbook_11.jpg',
    thumbnailPath: '/images/heirloom/demo/cookbooks/Cookbook_11.jpg',
    description: 'Summer side dish',
  },
];

export const ALL_SAMPLE_RECIPES = [...SAMPLE_RECIPE_CARDS, ...SAMPLE_COOKBOOK_PAGES];
