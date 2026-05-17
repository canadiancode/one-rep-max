export const XP_BAR_DISPLAY_MIN = 5;
export const XP_BAR_DISPLAY_MAX = 98;

/** XP required to advance one level. Each level is a 100-point band. */
export const XP_PER_LEVEL = 100;

/** Total lifetime XP. Replace with real source later. */
export const CURRENT_XP = 1850;

export function clampXpBarPercent(raw: number): number {
  if (raw >= XP_BAR_DISPLAY_MAX) return XP_BAR_DISPLAY_MAX - 1;
  return Math.max(XP_BAR_DISPLAY_MIN, raw);
}

/** Progress within the current level (0–100). e.g. 1850 → 50% of the way to next level. */
export function getXpProgressInCurrentLevelPercent(
  currentXp: number = CURRENT_XP,
): number {
  return ((currentXp % XP_PER_LEVEL) / XP_PER_LEVEL) * 100;
}

/** Clamped fill percent for the XP bar artwork. */
export function getXpBarFillPercent(currentXp: number = CURRENT_XP): number {
  return clampXpBarPercent(getXpProgressInCurrentLevelPercent(currentXp));
}

export function getBeastLevel(currentXp: number = CURRENT_XP): number {
  return Math.floor(currentXp / XP_PER_LEVEL);
}

export function getNextBeastLevel(currentXp: number = CURRENT_XP): number {
  return getBeastLevel(currentXp) + 1;
}

export function getXpRemainingToNextLevel(currentXp: number = CURRENT_XP): number {
  const remainder = currentXp % XP_PER_LEVEL;
  return remainder === 0 ? XP_PER_LEVEL : XP_PER_LEVEL - remainder;
}
