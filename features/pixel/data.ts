import type { PixelLayerId } from "./types";

export type PixelLayerCategory = {
  id: PixelLayerId;
  label: string;
};

/** Layer categories shown in the pixel detail grid (order = display order). */
export const PIXEL_LAYER_CATEGORIES: readonly PixelLayerCategory[] = [
  { id: "background", label: "Backgrounds" },
  { id: "skin", label: "Skin" },
  { id: "eyes", label: "Eyes" },
  { id: "mouth", label: "Mouth" },
  { id: "top", label: "Top" },
  { id: "bottom", label: "Bottom" },
  { id: "shoes", label: "Shoes" },
  { id: "hair", label: "Hair" },
  { id: "item_left", label: "Left Item" },
  { id: "item_right", label: "Right Item" },
] as const;

export function getPixelLayerCategoryLabel(layerId: PixelLayerId): string {
  return (
    PIXEL_LAYER_CATEGORIES.find((category) => category.id === layerId)?.label ??
    layerId
  );
}
