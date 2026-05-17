import { Image } from "expo-image";
import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { APP_SHELL_MAIN_TEXT_COLOR } from "@/constants/app-colors";

const PERCENT_LABEL_FONT_FAMILY = "PixeloidSans";

/** Visual width of the rounded right-cap (px). Picked to match bar height. */
const XP_BAR_RIGHT_END_WIDTH = 14;
/**
 * How far LEFT the cap is shifted from the cut position. Lets the cap straddle
 * the hard right edge of the clipped fill so the seam reads as a rounded end.
 */
const XP_BAR_RIGHT_END_OFFSET = 8;

type Props = {
  fillPercent: number;
  /** Actual progress (0–100) shown as a label inside the bar. Omit to hide the label. */
  progressPercent?: number;
  style?: StyleProp<ViewStyle>;
  /** Bar track height in px. Matches My Beast tile default. */
  height?: number;
};

export function XpLevelBar({
  fillPercent,
  progressPercent,
  style,
  height = 28,
}: Props) {
  const percentLabel =
    progressPercent != null
      ? `${Math.round(progressPercent)}%`
      : null;

  return (
    <View
      style={[styles.barRow, { height }, style]}
      accessibilityLabel={
        percentLabel != null
          ? `Progress ${percentLabel}`
          : undefined
      }
    >
      <View
        style={[styles.fillClip, { width: `${fillPercent}%` }]}
      >
        <Image
          accessibilityIgnoresInvertColors
          source={require("@/assets/bars/xp-level-large.png")}
          style={[
            styles.fillImage,
            fillPercent > 0
              ? { width: `${10000 / fillPercent}%` }
              : { width: "100%" },
          ]}
          contentFit="fill"
        />
      </View>
      <View
        style={[
          styles.fillRightEndWrap,
          { left: `${fillPercent}%` },
        ]}
      >
        <Image
          accessibilityIgnoresInvertColors
          source={require("@/assets/bars/xp-level-right-end.png")}
          style={styles.fillRightEndImage}
          contentFit="fill"
        />
      </View>
      <Image
        accessibilityIgnoresInvertColors
        source={require("@/assets/bars/xp-level-container-large.png")}
        style={styles.containerImage}
        contentFit="fill"
      />
      {percentLabel != null ? (
        <View
          pointerEvents="none"
          style={styles.percentOverlay}
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
        >
          <ThemedText
            lightColor={APP_SHELL_MAIN_TEXT_COLOR}
            darkColor={APP_SHELL_MAIN_TEXT_COLOR}
            style={styles.percentText}
          >
            {percentLabel}
          </ThemedText>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  barRow: {
    alignItems: "stretch",
    justifyContent: "center",
    position: "relative",
    width: "100%",
  },
  fillClip: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    overflow: "hidden",
    zIndex: 1,
  },
  fillImage: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
  },
  fillRightEndWrap: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: XP_BAR_RIGHT_END_WIDTH,
    marginLeft: -XP_BAR_RIGHT_END_OFFSET,
    zIndex: 1,
  },
  fillRightEndImage: {
    width: "100%",
    height: "100%",
  },
  containerImage: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 2,
  },
  percentOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: 10,
  },
  percentText: {
    fontFamily: PERCENT_LABEL_FONT_FAMILY,
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "600",
  },
});
