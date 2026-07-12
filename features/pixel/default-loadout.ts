import type { PixelLoadout } from "./types";

/**
 * Default equipped item ids (one per layer).
 * Swap any entry to try a different combination — all canvases share the same size.
 */
export const DEFAULT_PIXEL_LOADOUT: PixelLoadout = {
  background: "def-background-basic-gym",
  skin: "def-skin-black",
  eyes: "def-eyes-complex-neutral",
  mouth: "def-mouth-angrey-all-teeth",
  top: "def-top-m-black-cutoff",
  bottom: "def-shorts-short-black",
  shoes: "def-shoe-casual-black-white",
  hair: "def-hair-bun-black",
  item_left: "def-item-left-blue-potion",
  item_right: "def-item-right-black-bag",
};
