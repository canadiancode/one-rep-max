import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { PlatformPressable } from "@react-navigation/elements";
import * as Haptics from "expo-haptics";
import { ImageBackground, Platform, StyleSheet } from "react-native";

/** Pixel tab tile; 9-slice via `capInsets` (image coords) so corners stay crisp when tabs flex. */
const TAB_TILE_BG = require("@/assets/backgrounds/blue-square.png");

/**
 * Non-stretching bezel in the PNG (see `assets/backgrounds/blue-square.png`).
 * Increase if corners stretch; decrease if the flat center looks pinched.
 */
const TAB_TILE_CAP = 10;

export function HapticTab(props: BottomTabBarButtonProps) {
  const { style, children, ...rest } = props;

  const capInsets = {
    top: TAB_TILE_CAP,
    left: TAB_TILE_CAP,
    bottom: TAB_TILE_CAP,
    right: TAB_TILE_CAP,
  };

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
      <ImageBackground
        accessible={false}
        source={TAB_TILE_BG}
        // RN copies flattened width/height onto the inner Image; `absoluteFill` alone
        // leaves them undefined so the bitmap keeps its intrinsic size (top-left only).
        style={[StyleSheet.absoluteFillObject, styles.tileShell]}
        imageStyle={styles.tileImage}
        resizeMode="stretch"
        capInsets={capInsets}
      />
      {children}
    </PlatformPressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    overflow: "hidden",
    borderRadius: 0,
    backgroundColor: "transparent",
    elevation: 0,
    shadowOpacity: 0,
    position: "relative",
    ...(Platform.OS === "web"
      ? { boxShadow: "none" as const }
      : ({} as Record<string, never>)),
  },
  tileShell: {
    width: "100%",
    height: "100%",
  },
  tileImage: {
    width: "100%",
    height: "100%",
  },
});
