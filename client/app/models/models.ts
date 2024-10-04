export interface Message {
  type: 'user' | 'bot';
  text: string;
}

export interface Recipe {
  name: string;
  img: string;
  description: string;
  ingredients: string[];
  steps: string[];
  tools: string[];
  prepTime?: string;
  cookTime?: string;
}

export interface InventoryItem {
  name: string;
  emoji: string;
  expiry: string;
  tags: string[];
  count: string;
}

export const categories = [
  'Fruit',
  'Vegetable',
  'Meat',
  'Dairy',
  'Grains',
  'Seafood',
  'Nuts/Seeds',
  'Legumes',
  'Beverages',
  'Sweets',
  'Spices/Herbs',
  'Oils/Fats',
  'Baked Goods',
];
