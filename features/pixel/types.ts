import type { ImageSource } from "expo-image";

/** Draw order for pixel character layers (higher = in front). */
export const PIXEL_LAYER_Z_INDEX = {
  background: 1,
  skin: 2,
  eyes: 3,
  mouth: 4,
  top: 5,
  bottom: 6,
  shoes: 7,
  hair: 8,
  item_left: 9,
  item_right: 10,
} as const;

export type PixelLayerId = keyof typeof PIXEL_LAYER_Z_INDEX;

/** Which asset is equipped per layer. Omit a layer to hide it. */
export type PixelLoadout = Partial<Record<PixelLayerId, ImageSource>>;

export type PixelLayerSpec = {
  id: PixelLayerId;
  zIndex: (typeof PIXEL_LAYER_Z_INDEX)[PixelLayerId];
  source: ImageSource;
};
