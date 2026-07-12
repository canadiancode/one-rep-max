import type { ImageSource } from "expo-image";

import type { PixelLayerId, PixelLoadout } from "./types";

export type PixelLayerOption = {
  label: string;
  source: ImageSource;
};

/**
 * Full asset catalog per layer. Metro requires static `require()` paths.
 * Add new files here when you drop them into `assets/pixel/<layer>/`.
 */
export const PIXEL_LAYER_ASSETS: Record<PixelLayerId, PixelLayerOption[]> = {
  background: [
    {
      label: "Basic Gym",
      source: require("@/assets/pixel/background/background-basic-gym.png"),
    },
    {
      label: "Blue Basic Gym",
      source: require("@/assets/pixel/background/background-blue-basic-gym.png"),
    },
    {
      label: "Gold Gym",
      source: require("@/assets/pixel/background/background-gold-gym.png"),
    },
    {
      label: "Italy Semi-Outdoor Gym",
      source: require("@/assets/pixel/background/background-italy-semioutdoor-gym.png"),
    },
    {
      label: "Moderate Gym",
      source: require("@/assets/pixel/background/background-moderate-gym.png"),
    },
    {
      label: "Purple Gym",
      source: require("@/assets/pixel/background/background-purple-gym.png"),
    },
    {
      label: "Red Basic Gym",
      source: require("@/assets/pixel/background/background-red-basic-gym.png"),
    },
    {
      label: "Walk",
      source: require("@/assets/pixel/background/background-walk.png"),
    },
  ],
  skin: [
    {
      label: "Black",
      source: require("@/assets/pixel/skin/skin-black.png"),
    },
    {
      label: "Dark",
      source: require("@/assets/pixel/skin/skin-dark.png"),
    },
    {
      label: "Light",
      source: require("@/assets/pixel/skin/skin-light.png"),
    },
    {
      label: "Medium",
      source: require("@/assets/pixel/skin/skin-med.png"),
    },
  ],
  eyes: [
    {
      label: "Complex Neutral",
      source: require("@/assets/pixel/eyes/eyes-complex-neutral.png"),
    },
    {
      label: "Complex Wink",
      source: require("@/assets/pixel/eyes/eyes-complex-wink.png"),
    },
    {
      label: "Simple Angry",
      source: require("@/assets/pixel/eyes/eyes-simple-angry.png"),
    },
    {
      label: "Simple Neutral",
      source: require("@/assets/pixel/eyes/eyes-simple-neutral.png"),
    },
  ],
  mouth: [
    {
      label: "Angry All Teeth",
      source: require("@/assets/pixel/mouth/mouth-angrey-all-teeth.png"),
    },
    {
      label: "Simple Neutral",
      source: require("@/assets/pixel/mouth/mouth-simple-neutral.png"),
    },
    {
      label: "Simple Smile",
      source: require("@/assets/pixel/mouth/mouth-simple-smile.png"),
    },
    {
      label: "Smile All Teeth",
      source: require("@/assets/pixel/mouth/mouth-smile-all-teeth.png"),
    },
    {
      label: "Smile Open Mouth",
      source: require("@/assets/pixel/mouth/mouth-smile-open-mouth.png"),
    },
  ],
  top: [
    {
      label: "Men Black Cutoff",
      source: require("@/assets/pixel/top/top-m-black-cutoff.png"),
    },
    {
      label: "Men Green Cutoff",
      source: require("@/assets/pixel/top/top-m-green-cutoff.png"),
    },
    {
      label: "Men Orange Cutoff",
      source: require("@/assets/pixel/top/top-m-orange-cutoff.png"),
    },
    {
      label: "Men Purple Cutoff",
      source: require("@/assets/pixel/top/top-m-purple-cutoff.png"),
    },
    {
      label: "Men Red Cutoff",
      source: require("@/assets/pixel/top/top-m-red-cutoff.png"),
    },
    {
      label: "Women Black Cutoff",
      source: require("@/assets/pixel/top/top-w-black-cutoff.png"),
    },
    {
      label: "Women Green Cutoff",
      source: require("@/assets/pixel/top/top-w-green-cutoff.png"),
    },
    {
      label: "Women Orange Cutoff",
      source: require("@/assets/pixel/top/top-w-orange-cutoff.png"),
    },
    {
      label: "Women Purple Cutoff",
      source: require("@/assets/pixel/top/top-w-purple-cutoff.png"),
    },
    {
      label: "Women Red Cutoff",
      source: require("@/assets/pixel/top/top-w-red-cutoff.png"),
    },
  ],
  bottom: [
    {
      label: "Short Black",
      source: require("@/assets/pixel/bottom/shorts-short-black.png"),
    },
    {
      label: "Short Green",
      source: require("@/assets/pixel/bottom/shorts-short-green.png"),
    },
    {
      label: "Short Orange",
      source: require("@/assets/pixel/bottom/shorts-short-orange.png"),
    },
    {
      label: "Short Purple",
      source: require("@/assets/pixel/bottom/shorts-short-purple.png"),
    },
    {
      label: "Short Red",
      source: require("@/assets/pixel/bottom/shorts-short-red.png"),
    },
    {
      label: "Short White",
      source: require("@/assets/pixel/bottom/shorts-short-white.png"),
    },
  ],
  shoes: [
    {
      label: "Casual Black White",
      source: require("@/assets/pixel/shoes/shoe-casual-black-white.png"),
    },
    {
      label: "Casual Brown",
      source: require("@/assets/pixel/shoes/shoe-casual-brown.png"),
    },
    {
      label: "Casual Checkered White Black",
      source: require("@/assets/pixel/shoes/shoe-casual-checkered-white-black.png"),
    },
    {
      label: "Casual Green White",
      source: require("@/assets/pixel/shoes/shoe-casual-green-white.png"),
    },
    {
      label: "Casual Grey White",
      source: require("@/assets/pixel/shoes/shoe-casual-grey-white.png"),
    },
    {
      label: "Casual Long White",
      source: require("@/assets/pixel/shoes/shoe-casual-long-white.png"),
    },
    {
      label: "Casual Orange White",
      source: require("@/assets/pixel/shoes/shoe-casual-orange-white.png"),
    },
    {
      label: "Casual Purple White",
      source: require("@/assets/pixel/shoes/shoe-casual-purple-white.png"),
    },
    {
      label: "Casual Red White",
      source: require("@/assets/pixel/shoes/shoe-casual-red-white.png"),
    },
    {
      label: "Casual Yellow White",
      source: require("@/assets/pixel/shoes/shoe-casual-yellow-white.png"),
    },
  ],
  hair: [
    {
      label: "Bun Black",
      source: require("@/assets/pixel/hair/hair-bun-black.png"),
    },
    {
      label: "Long Black",
      source: require("@/assets/pixel/hair/hair-long-black.png"),
    },
    {
      label: "Long Blonde Flowy",
      source: require("@/assets/pixel/hair/hair-long-blonde-flowy.png"),
    },
    {
      label: "Long Brown Flowy",
      source: require("@/assets/pixel/hair/hair-long-brown-flowy.png"),
    },
    {
      label: "Long Bun Blonde",
      source: require("@/assets/pixel/hair/hair-long-bun-blonde.png"),
    },
    {
      label: "Long Bun Brown",
      source: require("@/assets/pixel/hair/hair-long-bun-brown.png"),
    },
    {
      label: "Long Dreads Black",
      source: require("@/assets/pixel/hair/hair-long-dreads-black.png"),
    },
    {
      label: "Long Pink",
      source: require("@/assets/pixel/hair/hair-long-pink.png"),
    },
    {
      label: "Long Red Straight",
      source: require("@/assets/pixel/hair/hair-long-red-straight.png"),
    },
    {
      label: "Mid Blonde Spikey Alt",
      source: require("@/assets/pixel/hair/hair-mid-blonde-spikey.png"),
    },
    {
      label: "Mid Blonde",
      source: require("@/assets/pixel/hair/hair-mid-blonde.png"),
    },
    {
      label: "Mid Brown Shaggy",
      source: require("@/assets/pixel/hair/hair-mid-brown-shaggy.png"),
    },
    {
      label: "Short Black Buzz Side",
      source: require("@/assets/pixel/hair/hair-short-black-buzz-side.png"),
    },
    {
      label: "Short Black Shaggy",
      source: require("@/assets/pixel/hair/hair-short-black-shaggy.png"),
    },
    {
      label: "Short Shaggy Brown",
      source: require("@/assets/pixel/hair/hair-short-shaggy-brown.png"),
    },
  ],
  item_left: [
    {
      label: "Blue Potion",
      source: require("@/assets/pixel/item_left/item-left-blue-potion.png"),
    },
    {
      label: "Blue Straw Bottle",
      source: require("@/assets/pixel/item_left/item-left-blue-w-straw-bottle.png"),
    },
    {
      label: "Green Potion",
      source: require("@/assets/pixel/item_left/item-left-green-potion.png"),
    },
    {
      label: "Green Thin Bottle",
      source: require("@/assets/pixel/item_left/item-left-green-thin-bottle.png"),
    },
    {
      label: "Red Straw Bottle",
      source: require("@/assets/pixel/item_left/item-left-red-w-straw-bottle.png"),
    },
    {
      label: "Purple Bottle",
      source: require("@/assets/pixel/item_left/item-left-think-purple-bottle.png"),
    },
    {
      label: "Water Bottle",
      source: require("@/assets/pixel/item_left/item-left-water-bottle.png"),
    },
    {
      label: "Wide Orange Bottle",
      source: require("@/assets/pixel/item_left/item-left-wide-orange-bottle.png"),
    },
  ],
  item_right: [
    {
      label: "Black Bag",
      source: require("@/assets/pixel/item_right/item-right-black-bag.png"),
    },
    {
      label: "Blue Bag",
      source: require("@/assets/pixel/item_right/item-right-blue-bag.png"),
    },
    {
      label: "Blue White Bag",
      source: require("@/assets/pixel/item_right/item-right-blue-w-white-bag.png"),
    },
    {
      label: "Gold Black King Bag",
      source: require("@/assets/pixel/item_right/item-right-gold-black-king-bag.png"),
    },
    {
      label: "Green Bag Alt",
      source: require("@/assets/pixel/item_right/item-right-green-militay-bag.png"),
    },
    {
      label: "Green Bag",
      source: require("@/assets/pixel/item_right/item-right-green-bag.png"),
    },
    {
      label: "Pink Bag",
      source: require("@/assets/pixel/item_right/item-right-pink-bag.png"),
    },
  ],
};

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)]!;
}

/** Random asset from every layer (for visual testing). */
export function createRandomPixelLoadout(): PixelLoadout {
  const loadout: PixelLoadout = {};
  for (const layerId of Object.keys(PIXEL_LAYER_ASSETS) as PixelLayerId[]) {
    loadout[layerId] = pickRandom(PIXEL_LAYER_ASSETS[layerId]).source;
  }
  return loadout;
}
