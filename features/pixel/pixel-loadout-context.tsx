import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import {
  DEFAULT_PIXEL_INVENTORY,
  getPixelItem,
} from "./layer-assets";
import { DEFAULT_PIXEL_LOADOUT } from "./default-loadout";
import {
  loadPixelPersistedState,
  savePixelPersistedState,
} from "./pixel-persistence";
import type { PixelItemId, PixelLayerId, PixelLoadout } from "./types";

type PixelLoadoutContextValue = {
  /** Equipped item id per layer. */
  loadout: PixelLoadout;
  /** Item ids the user owns (starter set = all bundled assets). */
  inventory: readonly PixelItemId[];
  /** False until device storage has been read once. */
  isHydrated: boolean;
  ownsItem: (itemId: PixelItemId) => boolean;
  /** Equip an owned catalog item on its layer. */
  selectItem: (layerId: PixelLayerId, itemId: PixelItemId) => void;
};

const PixelLoadoutContext = createContext<PixelLoadoutContextValue | null>(
  null,
);

export function PixelLoadoutProvider({ children }: { children: ReactNode }) {
  const [loadout, setLoadout] = useState<PixelLoadout>(DEFAULT_PIXEL_LOADOUT);
  const [inventory, setInventory] = useState<readonly PixelItemId[]>(
    DEFAULT_PIXEL_INVENTORY,
  );
  const [isHydrated, setIsHydrated] = useState(false);
  const hasHydratedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      const saved = await loadPixelPersistedState();
      if (cancelled) return;
      setLoadout(saved.loadout);
      setInventory(saved.inventory);
      hasHydratedRef.current = true;
      setIsHydrated(true);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!hasHydratedRef.current) return;
    void savePixelPersistedState({ loadout, inventory });
  }, [loadout, inventory]);

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
    () => ({ loadout, inventory, isHydrated, ownsItem, selectItem }),
    [loadout, inventory, isHydrated, ownsItem, selectItem],
  );

  if (!isHydrated) {
    return null;
  }

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
