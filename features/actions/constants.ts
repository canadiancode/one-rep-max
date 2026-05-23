export const ACTION_ROW_BACKGROUND = require("@/assets/backgrounds/blue-rect-card.png");

/** Water detail summary card (same tile as action list rows). */
export const WATER_ACTION_CARD_BACKGROUND = require("@/assets/backgrounds/blue-rect-card.png");

/** Shell behind the Add Water stepper, bulk adds, and confirm button. */
export const WATER_ADD_CARD_BACKGROUND = require("@/assets/backgrounds/blue-square-card.png");
export const WATER_ACTION_CARD_ICON = require("@/assets/icons/water-drop.png");
export const WATER_RIGHT_ARROW_ICON = require("@/assets/icons/right-arrow.png");
export const WATER_SUBTRACT_ICON = require("@/assets/icons/subtract.png");
export const WATER_ADD_ICON = require("@/assets/icons/add.png");

/** Default serving size when logging water on the detail screen. */
export const WATER_SERVING_OZ = 12;

export const WATER_BULK_ADD_BACKGROUND = require("@/assets/backgrounds/bulk-add-blue.png");

/** Full-width confirm control on the water detail screen. */
export const WATER_ADD_WATER_BUTTON_BACKGROUND = require("@/assets/backgrounds/add-action.png");

/** Quick-add serving sizes (oz) on the water detail screen. */
export const WATER_BULK_SERVING_OPTIONS_OZ = [8, 12, 16, 24] as const;

/** Train detail shells: same background assets as the parallel water screens. */
export const TRAIN_ACTION_CARD_BACKGROUND = WATER_ACTION_CARD_BACKGROUND;
export const TRAIN_ADD_CARD_BACKGROUND = WATER_ADD_CARD_BACKGROUND;
export const TRAIN_ACTION_CARD_ICON = require("@/assets/icons/dumbbell.png");
export const TRAIN_ADD_TIME_BUTTON_BACKGROUND = WATER_ADD_WATER_BUTTON_BACKGROUND;
export const TRAIN_BULK_ADD_BACKGROUND = WATER_BULK_ADD_BACKGROUND;

/** Default increment when logging training time on the detail screen (minutes). */
export const TRAIN_SERVING_MINUTES = 15;

/** Quick-add durations on the train detail screen: label + minutes. */
export const TRAIN_BULK_DURATION_OPTIONS = [
  { label: "+15M", minutes: 15 },
  { label: "+30M", minutes: 30 },
  { label: "+1H", minutes: 60 },
  { label: "+2H", minutes: 120 },
] as const;

/** Decorative controls on the right of each action row (whole card is tappable). */
export const ACTION_CARD_GEAR_ICON = require("@/assets/icons/alt-gear.png");
export const ACTION_CARD_PLUS_ICON = require("@/assets/icons/plus-alt.png");

export const ACTION_BAR_CONTAINER = require("@/assets/bars/action-bar-container.png");

/** Placeholder for Today's progress bar until summed from action rows. */
export const ACTIONS_DAILY_PROGRESS_FILL_PERCENT = 45;
export const ACTIONS_DAILY_PROGRESS_LABEL_PERCENT = 45;

/** Current-value accent on each action row progress label (matches bar colors). */
export const ACTION_ROW_ACCENT_COLORS = {
  food: "#FF5C5C",
  water: "#4DA3FF",
  train: "#A8B2BD",
  sleep: "#B57CFF",
  steps: "#FFD93D",
  calories: "#FF9F43",
  weight: "#A8B2BD",
} as const;

export {
  ACTION_BAR_DISPLAY_MAX,
  ACTION_BAR_DISPLAY_MIN,
  clampActionBarPercent,
} from "@/lib/action-bar-progress";
