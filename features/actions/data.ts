import { clampActionBarPercent } from "@/lib/action-bar-progress";

import { ACTION_BAR_CONTAINER } from "./constants";

export const ACTION_ROWS = [
  {
    id: "food",
    label: "Food",
    icon: require("@/assets/icons/apple.png"),
    barFill: require("@/assets/bars/action-bar-red.png"),
    barEnd: require("@/assets/bars/action-bar-red-end.png"),
    progressLabel: "2,500/2,500 KCAL",
  },
  {
    id: "water",
    label: "Water",
    icon: require("@/assets/icons/water-drop.png"),
    barFill: require("@/assets/bars/action-bar-blue.png"),
    barEnd: require("@/assets/bars/action-bar-blue-end.png"),
    progressLabel: "80 / 80 OZ",
  },
  {
    id: "train",
    label: "Train",
    icon: require("@/assets/icons/dumbbell.png"),
    barFill: require("@/assets/bars/action-bar-grey.png"),
    barEnd: require("@/assets/bars/action-bar-grey-end.png"),
    progressLabel: "60 / 60 MIN",
  },
  {
    id: "sleep",
    label: "Sleep",
    icon: require("@/assets/icons/moon.png"),
    barFill: require("@/assets/bars/action-bar-purple.png"),
    barEnd: require("@/assets/bars/action-bar-purple-end.png"),
    progressLabel: "8h / 8h",
  },
  {
    id: "steps",
    label: "Steps",
    icon: require("@/assets/icons/lightning.png"),
    barFill: require("@/assets/bars/action-bar-yellow.png"),
    barEnd: require("@/assets/bars/action-bar-yellow-end.png"),
    progressLabel: "10,000 / 10,000 STEPS",
  },
  {
    id: "calories",
    label: "Calories",
    icon: require("@/assets/icons/fire.png"),
    barFill: require("@/assets/bars/action-bar-orange.png"),
    barEnd: require("@/assets/bars/action-bar-orange-end.png"),
    progressLabel: "800 / 800 KCAL",
  },
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

/** e.g. `2,500/2,500 KCAL`. Replace the first value with live user data later. */
export function getActionRowProgressLabel(id: ActionRouteId): string {
  return getActionRow(id).progressLabel;
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
