import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { DEFAULT_PIXEL_LOADOUT } from "./default-loadout";
import {
  DEFAULT_PIXEL_INVENTORY,
  getPixelItem,
} from "./layer-assets";
import type { PixelItemId, PixelLayerId, PixelLoadout } from "./types";

type PixelLoadoutContextValue = {
  /** Equipped item id per layer. */
  loadout: PixelLoadout;
  /** Item ids the user owns (starter set = all bundled assets). */
  inventory: readonly PixelItemId[];
  ownsItem: (itemId: PixelItemId) => boolean;
  /** Equip an owned catalog item on its layer. */
  selectItem: (layerId: PixelLayerId, itemId: PixelItemId) => void;
};

const PixelLoadoutContext = createContext<PixelLoadoutContextValue | null>(
  null,
);

export function PixelLoadoutProvider({ children }: { children: ReactNode }) {
  const [loadout, setLoadout] = useState<PixelLoadout>(DEFAULT_PIXEL_LOADOUT);
  const [inventory] = useState<readonly PixelItemId[]>(DEFAULT_PIXEL_INVENTORY);

  const ownsItem = useCallback(
    (itemId: PixelItemId) => inventory.includes(itemId),
    [inventory],
  );

  const selectItem = useCallback(
    (layerId: PixelLayerId, itemId: PixelItemId) => {
      const item = getPixelItem(itemId);
      if (item == null || item.layer !== layerId) return;
      if (!inventory.includes(itemId)) return;
      setLoadout((current) => ({ ...current, [layerId]: itemId }));
    },
    [inventory],
  );

  const value = useMemo(
    () => ({ loadout, inventory, ownsItem, selectItem }),
    [loadout, inventory, ownsItem, selectItem],
  );

  return (
    <PixelLoadoutContext.Provider value={value}>
      {children}
    </PixelLoadoutContext.Provider>
  );
}

export function usePixelLoadout(): PixelLoadoutContextValue {
  const value = useContext(PixelLoadoutContext);
  if (value == null) {
    throw new Error("usePixelLoadout must be used within PixelLoadoutProvider");
  }
  return value;
}
