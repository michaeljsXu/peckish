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
  prepTime: string;
  cookTime: string;
}
