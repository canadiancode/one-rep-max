/**
 * Placeholder meal rows for saved / recent meal UIs. Replace with API or local DB later.
 * `fat`, `carbs`, and `protein` are grams per `portionSize`; `calories` is kcal.
 */
export type FoodMealFakeItem = {
  name: string;
  /** Brand or venue (omit for homemade / generic). */
  vendor?: string;
  portionSize: string;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
};

const FAKE_MEAL_ROWS: readonly FoodMealFakeItem[] = [
  {
    name: "Grilled Chicken Wrap",
    vendor: "Subway",
    portionSize: "1 serving",
    calories: 460,
    fat: 9,
    carbs: 53,
    protein: 42,
  },
  {
    name: "Chicken Tenders - 5 Pieces",
    vendor: "Smashburger",
    portionSize: "1 serving",
    calories: 960,
    fat: 53,
    carbs: 40,
    protein: 73,
  },
  {
    name: "McChicken",
    vendor: "McDonald's",
    portionSize: "1 serving",
    calories: 390,
    fat: 21,
    carbs: 38,
    protein: 14,
  },
] as const;

/** Saved-meals list seed data (same catalog as recent for now). */
export const FAKE_SAVED_MEALS: FoodMealFakeItem[] = [...FAKE_MEAL_ROWS];

/** Recent-meals list seed data (same catalog as saved for now). */
export const FAKE_RECENT_MEALS: FoodMealFakeItem[] = [...FAKE_MEAL_ROWS];
