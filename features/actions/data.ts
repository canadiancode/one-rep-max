import { clampActionBarPercent } from "@/lib/action-bar-progress";

import { ACTION_BAR_CONTAINER, ACTION_ROW_ACCENT_COLORS } from "./constants";

export const ACTION_ROWS_DAILY = [
  {
    id: "food",
    label: "Food",
    icon: require("@/assets/icons/apple.png"),
    barFill: require("@/assets/bars/action-bar-red.png"),
    barEnd: require("@/assets/bars/action-bar-red-end.png"),
    progressCurrent: "2,500",
    progressRest: " / 2,500 KCAL",
  },
  {
    id: "water",
    label: "Water",
    icon: require("@/assets/icons/water-drop.png"),
    barFill: require("@/assets/bars/action-bar-blue.png"),
    barEnd: require("@/assets/bars/action-bar-blue-end.png"),
    progressCurrent: "80",
    progressRest: " / 80 OZ",
  },
  {
    id: "train",
    label: "Train",
    icon: require("@/assets/icons/dumbbell.png"),
    barFill: require("@/assets/bars/action-bar-grey.png"),
    barEnd: require("@/assets/bars/action-bar-grey-end.png"),
    progressCurrent: "60",
    progressRest: " / 60M",
  },
  {
    id: "sleep",
    label: "Sleep",
    icon: require("@/assets/icons/purple-moon.png"),
    barFill: require("@/assets/bars/action-bar-purple.png"),
    barEnd: require("@/assets/bars/action-bar-purple-end.png"),
    progressCurrent: "8H",
    progressRest: " / 8H",
  },
  {
    id: "steps",
    label: "Steps",
    icon: require("@/assets/icons/lightning.png"),
    barFill: require("@/assets/bars/action-bar-yellow.png"),
    barEnd: require("@/assets/bars/action-bar-yellow-end.png"),
    progressCurrent: "10,000",
    progressRest: " / 10,000 STEPS",
  },
  {
    id: "calories",
    label: "Calories",
    icon: require("@/assets/icons/fire.png"),
    barFill: require("@/assets/bars/action-bar-orange.png"),
    barEnd: require("@/assets/bars/action-bar-orange-end.png"),
    progressCurrent: "800",
    progressRest: " / 800 KCAL",
  },
] as const;

export const ACTION_ROWS_LONG_TERM = [
  {
    id: "weight",
    label: "Weight",
    icon: require("@/assets/icons/scale.png"),
    barFill: require("@/assets/bars/action-bar-grey.png"),
    barEnd: require("@/assets/bars/action-bar-grey-end.png"),
    progressCurrent: "123",
    progressRest: " / 123 LBS",
  },
] as const;

export const ACTION_LIST_LONG_TERM_DIVIDER_LABEL = "long term progress";

export const ACTION_ROWS = [
  ...ACTION_ROWS_DAILY,
  ...ACTION_ROWS_LONG_TERM,
] as const;

export type ActionRouteId = (typeof ACTION_ROWS)[number]["id"];

export function getActionRow(id: ActionRouteId) {
  const row = ACTION_ROWS.find((r) => r.id === id);
  if (!row) {
    throw new Error(`Unknown action route: ${id}`);
  }
  return row;
}

/** Raw daily progress for an action row (0–100). Replace with real logged values later. */
export function getActionRowProgressPercent(_id: ActionRouteId): number {
  void _id;
  return 100;
}

export function getActionRowProgressDisplay(id: ActionRouteId) {
  const row = getActionRow(id);
  return {
    current: row.progressCurrent,
    rest: row.progressRest,
    accentColor: ACTION_ROW_ACCENT_COLORS[id],
  };
}

/** Full label for accessibility, e.g. `2,500/2,500 KCAL`. */
export function getActionRowProgressLabel(id: ActionRouteId): string {
  const { current, rest } = getActionRowProgressDisplay(id);
  return `${current}${rest}`;
}

/** Clamped fill percent for the action bar artwork (10–90% display range). */
export function getActionRowFillPercent(id: ActionRouteId): number {
  return clampActionBarPercent(getActionRowProgressPercent(id));
}

export function getActionRowBarSources(row: (typeof ACTION_ROWS)[number]) {
  return {
    fill: row.barFill,
    end: row.barEnd,
    container: ACTION_BAR_CONTAINER,
  };
}
