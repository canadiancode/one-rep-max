import { clampActionBarPercent } from "@/lib/action-bar-progress";

import { ACTION_BAR_CONTAINER } from "./constants";

export const ACTION_ROWS = [
  {
    id: "food",
    label: "Food",
    icon: require("@/assets/icons/apple.png"),
    barFill: require("@/assets/bars/action-bar-red.png"),
    barEnd: require("@/assets/bars/action-bar-red-end.png"),
  },
  {
    id: "water",
    label: "Water",
    icon: require("@/assets/icons/water-drop.png"),
    barFill: require("@/assets/bars/action-bar-blue.png"),
    barEnd: require("@/assets/bars/action-bar-blue-end.png"),
  },
  {
    id: "train",
    label: "Train",
    icon: require("@/assets/icons/dumbbell.png"),
    barFill: require("@/assets/bars/action-bar-grey.png"),
    barEnd: require("@/assets/bars/action-bar-grey-end.png"),
  },
  {
    id: "sleep",
    label: "Sleep",
    icon: require("@/assets/icons/moon.png"),
    barFill: require("@/assets/bars/action-bar-purple.png"),
    barEnd: require("@/assets/bars/action-bar-purple-end.png"),
  },
  {
    id: "steps",
    label: "Steps",
    icon: require("@/assets/icons/lightning.png"),
    barFill: require("@/assets/bars/action-bar-yellow.png"),
    barEnd: require("@/assets/bars/action-bar-yellow-end.png"),
  },
  {
    id: "calories",
    label: "Calories",
    icon: require("@/assets/icons/fire.png"),
    barFill: require("@/assets/bars/action-bar-orange.png"),
    barEnd: require("@/assets/bars/action-bar-orange-end.png"),
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
