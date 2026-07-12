import { useEffect, useState } from "react";

import { DEFAULT_PIXEL_LOADOUT } from "../default-loadout";
import { createRandomPixelLoadout } from "../layer-assets";
import type { PixelLoadout } from "../types";

const DEFAULT_INTERVAL_MS = 3000;

/**
 * Cycles to a fully random loadout on an interval (visual / asset test helper).
 */
export function useRandomPixelLoadout(
  intervalMs: number = DEFAULT_INTERVAL_MS,
): PixelLoadout {
  const [loadout, setLoadout] = useState<PixelLoadout>(DEFAULT_PIXEL_LOADOUT);

  useEffect(() => {
    const id = setInterval(() => {
      setLoadout(createRandomPixelLoadout());
    }, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return loadout;
}
