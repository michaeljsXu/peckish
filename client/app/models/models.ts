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
  'fruit',
  'vegetable',
  'meat',
  'dairy',
  'grains',
  'seafood',
  'nuts-and-seeds',
  'legumes',
  'beverages',
  'sweets',
  'spices-and-herbs',
  'oils-and-fats',
  'baked-goods',
];
