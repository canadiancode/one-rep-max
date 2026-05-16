import { Image, type ImageSource } from "expo-image";
import { useCallback, useState } from "react";
import type { ImageStyle, StyleProp, ViewStyle } from "react-native";
import { LayoutChangeEvent, StyleSheet, View } from "react-native";

import { APP_SHELL_SECONDARY_BACKGROUND } from "@/constants/app-colors";

/** Matches `tabBarStyle.borderRadius` in `app/(tabs)/_layout.tsx`. */
export const FLOATING_SURFACE_RADIUS = 15;

/** Space around the inner shell so the gutter (usually a vivid layout color) stays visible. */
export const FLOATING_SURFACE_GUTTER = 4;

/** Same asset as `HapticTab` for a consistent “tab tile” look. */
const TILE_BG = require("@/assets/backgrounds/blue-square.png");

type FloatingShellSurfaceProps = {
  /** Color visible in the margin around the rounded inner shell (e.g. grid debug hues). */
  gutterColor: string;
  style?: StyleProp<ViewStyle>;
  /** Tile image inside the inner shell; defaults to the blue tab tile asset. */
  tileSource?: ImageSource | number;
};

/**
 * Rounded inner stack with the same tiled background treatment as bottom tabs,
 * inset inside a gutter-colored frame.
 */
export function FloatingShellSurface({
  gutterColor,
  style,
  tileSource = TILE_BG,
}: FloatingShellSurfaceProps) {
  const [tilePx, setTilePx] = useState<{ w: number; h: number } | null>(null);

  const onTileLayout = useCallback((e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    if (width > 0 && height > 0) {
      setTilePx((prev) =>
        prev && prev.w === width && prev.h === height
          ? prev
          : { w: width, h: height },
      );
    }
  }, []);

  const tileImageStyle: ImageStyle[] = [
    styles.tileImageBase,
    tilePx != null
      ? { width: tilePx.w, height: tilePx.h }
      : StyleSheet.absoluteFillObject,
  ];

  return (
    <View
      style={[
        styles.outer,
        { backgroundColor: gutterColor, padding: FLOATING_SURFACE_GUTTER },
        style,
      ]}
    >
      <View
        style={styles.innerShell}
        onLayout={onTileLayout}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
      >
        <Image
          accessibilityElementsHidden
          accessible={false}
          source={tileSource}
          style={tileImageStyle}
          contentFit="fill"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    minWidth: 0,
    minHeight: 0,
  },
  innerShell: {
    flex: 1,
    borderRadius: FLOATING_SURFACE_RADIUS,
    overflow: "hidden",
    backgroundColor: APP_SHELL_SECONDARY_BACKGROUND,
    position: "relative",
  },
  tileImageBase: {
    position: "absolute",
    left: 0,
    top: 0,
  },
});
