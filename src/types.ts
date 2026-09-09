export type ScreenTab = 'pantry' | 'recipes' | 'cook' | 'shopping';

export interface PantryItem {
  id: string;
  name: string;
  category: 'produce' | 'protein' | 'dairy' | 'spices' | 'staples' | 'grains';
  location: string;
  description: string;
  quantity: number;
  unit: string;
  image: string;
  inBasket: boolean;
  expiringSoon?: boolean;
}

export interface ActiveChip {
  id: string;
  name: string;
  qty: string;
  colorType?: 'primary' | 'secondary' | 'container';
}

export interface Recipe {
  id: string;
  title: string;
  image: string;
  matchPercentage: number;
  matchBadgeText: string;
  timeMinutes: number;
  calories: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Pro Chef';
  dietaryTags: string[];
  servings: number;
  isPerfectMatch: boolean;
  missingItemsCount: number;
  missingItemsText?: string;
  hasInPantryText?: string;
  pantryItemsText: string;
  badgeOverlayRight?: string;
  isBookmarked: boolean;
}

export interface ShoppingItem {
  id: string;
  name: string;
  aisle: string;
  aisleName: string;
  aisleLocation: string;
  aisleEmoji: string;
  forRecipe: string;
  price: number;
  checked: boolean;
  checkedNote?: string;
  substituteHint?: string;
}

export interface CookingStep {
  stepNumber: number;
  stageTag: string;
  heatLevel?: string;
  title: string;
  instruction: string;
  timerDurationSeconds?: number;
  timerTitle?: string;
  proTip?: string;
}
