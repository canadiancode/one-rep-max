import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { PlatformPressable } from "@react-navigation/elements";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { useCallback, useState } from "react";
import type { ImageStyle } from "react-native";
import { LayoutChangeEvent, Platform, StyleSheet, View } from "react-native";

/** Pixel tab tile (fills each tab cell; `contentFit="fill"` avoids RN `capInsets` left-bias on web). */
const TAB_TILE_BG = require("@/assets/backgrounds/blue-square.png");

export function HapticTab(props: BottomTabBarButtonProps) {
  const { style, children, ...rest } = props;

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
    <PlatformPressable
      {...rest}
      style={[style, styles.pressable]}
      onPressIn={(ev) => {
        if (process.env.EXPO_OS === "ios") {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        props.onPressIn?.(ev);
      }}
    >
      {/*
        BottomTabItem merges `styles.tab` → `alignItems: 'center'`, which shrinks a single
        inner wrapper to content width. Override with `alignItems: 'stretch'` on the pressable.
        Web: `<a>` needs an explicit width in the flex row so the tile matches the tab slice.
      */}
      <View
        style={styles.tabShell}
        pointerEvents="box-none"
        onLayout={onTileLayout}
      >
        <Image
          accessibilityElementsHidden
          accessible={false}
          source={TAB_TILE_BG}
          style={tileImageStyle}
          contentFit="fill"
        />
        {children}
      </View>
    </PlatformPressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    flex: 1,
    flexBasis: 0,
    alignSelf: "stretch",
    minWidth: 0,
    /** Overrides `styles.tab` from BottomTabItem. */
    alignItems: "stretch",
    /** Overrides `tabVerticalUiKit` / `tabHorizontalUiKit` `padding: 5` (web `<a role="tab">`). */
    padding: 1,
    overflow: "hidden",
    borderRadius: 0,
    backgroundColor: "transparent",
    elevation: 0,
    shadowOpacity: 0,
    position: "relative",
    ...(Platform.OS === "web"
      ? ({
          width: "100%",
          maxWidth: "100%",
          boxShadow: "none",
        } as const)
      : {}),
  },
  tabShell: {
    flex: 1,
    width: "100%",
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  tileImageBase: {
    position: "absolute",
    left: 0,
    top: 0,
  },
});
