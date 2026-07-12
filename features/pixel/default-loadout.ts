import type { PixelLoadout } from "./types";

/**
 * First asset from each `assets/pixel/<layer>/` folder.
 * Swap any entry to try a different combination — all canvases share the same size.
 */
export const DEFAULT_PIXEL_LOADOUT: PixelLoadout = {
  background: require("@/assets/pixel/background/background-basic-gym.png"),
  skin: require("@/assets/pixel/skin/skin-black.png"),
  eyes: require("@/assets/pixel/eyes/eyes-complex-neutral.png"),
  mouth: require("@/assets/pixel/mouth/mouth-angrey-all-teeth.png"),
  top: require("@/assets/pixel/top/top-m-black-cutoff.png"),
  bottom: require("@/assets/pixel/bottom/shorts-short-black.png"),
  shoes: require("@/assets/pixel/shoes/shoe-casual-black-white.png"),
  hair: require("@/assets/pixel/hair/hair-bun-black.png"),
  item_left: require("@/assets/pixel/item_left/item-left-blue-potion.png"),
  item_right: require("@/assets/pixel/item_right/item-right-black-bag.png"),
};
