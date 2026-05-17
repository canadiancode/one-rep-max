/** Visual fill bounds for action row progress bars (distinct from Today's progress XP bar). */
export const ACTION_BAR_DISPLAY_MIN = 9;
export const ACTION_BAR_DISPLAY_MAX = 95;

export function clampActionBarPercent(raw: number): number {
  if (raw >= ACTION_BAR_DISPLAY_MAX) return ACTION_BAR_DISPLAY_MAX;
  return Math.max(ACTION_BAR_DISPLAY_MIN, raw);
}
