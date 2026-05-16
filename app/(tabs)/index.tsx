import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

import { FloatingShellSurface } from "@/components/floating-shell-surface";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import {
  APP_SHELL_MAIN_TEXT_COLOR,
  APP_SHELL_SECONDARY_BACKGROUND,
} from "@/constants/app-colors";
import { TAB_SCREEN_ROOT_ABOVE_TAB_BAR } from "@/constants/app-shell";
import { useDashboardHealthMetrics } from "@/hooks/use-dashboard-health-metrics";

const CELL_HEADING_FONT_FAMILY = "PixeloidSans";

/** Inset from tile edge; includes ~8px shell gutter + padding inside the rect card. */
const METRIC_ICON_CORNER_INSET = 20;
const METRIC_ICON_CORNER_SIZE = 25;

const XP_BAR_DISPLAY_MIN = 5;
const XP_BAR_DISPLAY_MAX = 98;

function clampXpBarPercent(raw: number): number {
  if (raw >= XP_BAR_DISPLAY_MAX) return XP_BAR_DISPLAY_MAX - 1;
  return Math.max(XP_BAR_DISPLAY_MIN, raw);
}

/** XP required to advance one level. Each level is a 100-point band. */
const XP_PER_LEVEL = 100;

/** Total lifetime XP. Replace with real source later. */
const CURRENT_XP = 1850;

/** Progress within the current level (0–100). e.g. 1850 → 50% of the way to next level. */
const XP_BAR_FILL_PERCENT_RAW =
  ((CURRENT_XP % XP_PER_LEVEL) / XP_PER_LEVEL) * 100;

const XP_BAR_FILL_PERCENT = clampXpBarPercent(XP_BAR_FILL_PERCENT_RAW);
/** Visual width of the rounded right-cap (px). Picked to match bar height. */
const XP_BAR_RIGHT_END_WIDTH = 14;
/**
 * How far LEFT the cap is shifted from the cut position. Lets the cap straddle
 * the hard right edge of the clipped fill so the seam reads as a rounded end.
 */
const XP_BAR_RIGHT_END_OFFSET = 8;

const EM_DASH = "\u2014";

function formatIntMetric(value: number, connected: boolean): string {
  return connected ? String(value) : EM_DASH;
}

function formatGroupedInt(value: number, connected: boolean): string {
  return connected ? value.toLocaleString("en-US") : EM_DASH;
}

export default function MyBeastScreen() {
  const { metrics, connectivity } = useDashboardHealthMetrics();

  return (
    <ThemedView
      lightColor={APP_SHELL_SECONDARY_BACKGROUND}
      darkColor={APP_SHELL_SECONDARY_BACKGROUND}
      style={styles.container}
    >
      <View style={[styles.row, styles.rowFull, styles.rowDouble]}>
        <View style={styles.heroShell}>
          <Image
            accessibilityIgnoresInvertColors
            source={require("@/assets/backgrounds/beast-hero.png")}
            style={styles.heroImage}
            contentFit="cover"
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.metricTileWrapper}>
          <FloatingShellSurface
            gutterColor={APP_SHELL_SECONDARY_BACKGROUND}
            tileSource={require("@/assets/backgrounds/red-rect-card.png")}
          />
          <View style={styles.metricTileOverlay} pointerEvents="none">
            <View style={styles.metricTileBody}>
              <ThemedText
                lightColor={APP_SHELL_MAIN_TEXT_COLOR}
                darkColor={APP_SHELL_MAIN_TEXT_COLOR}
                style={styles.metricTileTitle}
                numberOfLines={1}
              >
                Resting HR
              </ThemedText>
              <View style={styles.metricValueRow}>
                <ThemedText
                  lightColor={APP_SHELL_MAIN_TEXT_COLOR}
                  darkColor={APP_SHELL_MAIN_TEXT_COLOR}
                  style={styles.metricTileValue}
                >
                  {formatIntMetric(
                    metrics.restingHeartRateBpm,
                    connectivity.restingHeartRateBpm,
                  )}
                </ThemedText>
                {connectivity.restingHeartRateBpm ? (
                  <ThemedText
                    lightColor={APP_SHELL_MAIN_TEXT_COLOR}
                    darkColor={APP_SHELL_MAIN_TEXT_COLOR}
                    style={styles.metricTileUnit}
                  >
                    BPM
                  </ThemedText>
                ) : null}
              </View>
            </View>
            <Image
              source={require("@/assets/icons/heart.png")}
              style={[
                styles.metricIconCorner,
                !connectivity.restingHeartRateBpm &&
                  styles.metricIconCornerInactive,
              ]}
              contentFit="contain"
            />
          </View>
        </View>
        <View style={styles.metricTileWrapper}>
          <FloatingShellSurface
            gutterColor={APP_SHELL_SECONDARY_BACKGROUND}
            tileSource={require("@/assets/backgrounds/grey-rect-card.png")}
          />
          <View style={styles.metricTileOverlay} pointerEvents="none">
            <View style={styles.metricTileBody}>
              <ThemedText
                lightColor={APP_SHELL_MAIN_TEXT_COLOR}
                darkColor={APP_SHELL_MAIN_TEXT_COLOR}
                style={styles.metricTileTitle}
                numberOfLines={1}
              >
                Weight
              </ThemedText>
              <View style={styles.metricValueRow}>
                <ThemedText
                  lightColor={APP_SHELL_MAIN_TEXT_COLOR}
                  darkColor={APP_SHELL_MAIN_TEXT_COLOR}
                  style={styles.metricTileValue}
                >
                  {formatIntMetric(metrics.weightLbs, connectivity.weightLbs)}
                </ThemedText>
                {connectivity.weightLbs ? (
                  <ThemedText
                    lightColor={APP_SHELL_MAIN_TEXT_COLOR}
                    darkColor={APP_SHELL_MAIN_TEXT_COLOR}
                    style={styles.metricTileUnit}
                  >
                    LBS
                  </ThemedText>
                ) : null}
              </View>
            </View>
            <Image
              source={require("@/assets/icons/scale.png")}
              style={[
                styles.metricIconCorner,
                !connectivity.weightLbs && styles.metricIconCornerInactive,
              ]}
              contentFit="contain"
            />
          </View>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.metricTileWrapper}>
          <FloatingShellSurface
            gutterColor={APP_SHELL_SECONDARY_BACKGROUND}
            tileSource={require("@/assets/backgrounds/yellow-rect-card.png")}
          />
          <View style={styles.metricTileOverlay} pointerEvents="none">
            <View style={styles.metricTileBody}>
              <ThemedText
                lightColor={APP_SHELL_MAIN_TEXT_COLOR}
                darkColor={APP_SHELL_MAIN_TEXT_COLOR}
                style={styles.metricTileTitle}
                numberOfLines={1}
              >
                Steps
              </ThemedText>
              <View style={styles.metricValueRow}>
                <ThemedText
                  lightColor={APP_SHELL_MAIN_TEXT_COLOR}
                  darkColor={APP_SHELL_MAIN_TEXT_COLOR}
                  style={styles.metricTileValue}
                >
                  {formatGroupedInt(metrics.steps, connectivity.steps)}
                </ThemedText>
                {connectivity.steps ? (
                  <ThemedText
                    lightColor={APP_SHELL_MAIN_TEXT_COLOR}
                    darkColor={APP_SHELL_MAIN_TEXT_COLOR}
                    style={styles.metricTileUnit}
                  >
                    STEPS
                  </ThemedText>
                ) : null}
              </View>
            </View>
            <Image
              source={require("@/assets/icons/lightning.png")}
              style={[
                styles.metricIconCorner,
                !connectivity.steps && styles.metricIconCornerInactive,
              ]}
              contentFit="contain"
            />
          </View>
        </View>
        <View style={styles.metricTileWrapper}>
          <FloatingShellSurface
            gutterColor={APP_SHELL_SECONDARY_BACKGROUND}
            tileSource={require("@/assets/backgrounds/orange-rect-card.png")}
          />
          <View style={styles.metricTileOverlay} pointerEvents="none">
            <View style={styles.metricTileBody}>
              <ThemedText
                lightColor={APP_SHELL_MAIN_TEXT_COLOR}
                darkColor={APP_SHELL_MAIN_TEXT_COLOR}
                style={styles.metricTileTitle}
                numberOfLines={1}
              >
                Calories
              </ThemedText>
              <View style={styles.metricValueRow}>
                <ThemedText
                  lightColor={APP_SHELL_MAIN_TEXT_COLOR}
                  darkColor={APP_SHELL_MAIN_TEXT_COLOR}
                  style={styles.metricTileValue}
                >
                  {formatGroupedInt(
                    metrics.activeEnergyKcal,
                    connectivity.activeEnergyKcal,
                  )}
                </ThemedText>
                {connectivity.activeEnergyKcal ? (
                  <ThemedText
                    lightColor={APP_SHELL_MAIN_TEXT_COLOR}
                    darkColor={APP_SHELL_MAIN_TEXT_COLOR}
                    style={styles.metricTileUnit}
                  >
                    KCAL
                  </ThemedText>
                ) : null}
              </View>
            </View>
            <Image
              source={require("@/assets/icons/fire.png")}
              style={[
                styles.metricIconCorner,
                !connectivity.activeEnergyKcal &&
                  styles.metricIconCornerInactive,
              ]}
              contentFit="contain"
            />
          </View>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.metricTileWrapper}>
          <FloatingShellSurface
            gutterColor={APP_SHELL_SECONDARY_BACKGROUND}
            tileSource={require("@/assets/backgrounds/purple-rect-card.png")}
          />
          <View style={styles.metricTileOverlay} pointerEvents="none">
            <View style={styles.metricTileBody}>
              <ThemedText
                lightColor={APP_SHELL_MAIN_TEXT_COLOR}
                darkColor={APP_SHELL_MAIN_TEXT_COLOR}
                style={styles.metricTileTitle}
                numberOfLines={1}
              >
                Sleep
              </ThemedText>
              <View style={styles.metricValueRow}>
                {connectivity.sleep ? (
                  <>
                    <ThemedText
                      lightColor={APP_SHELL_MAIN_TEXT_COLOR}
                      darkColor={APP_SHELL_MAIN_TEXT_COLOR}
                      style={styles.metricTileValue}
                    >
                      {metrics.sleepHours}
                    </ThemedText>
                    <ThemedText
                      lightColor={APP_SHELL_MAIN_TEXT_COLOR}
                      darkColor={APP_SHELL_MAIN_TEXT_COLOR}
                      style={styles.metricTileUnit}
                    >
                      H
                    </ThemedText>
                    <ThemedText
                      lightColor={APP_SHELL_MAIN_TEXT_COLOR}
                      darkColor={APP_SHELL_MAIN_TEXT_COLOR}
                      style={styles.metricTileValue}
                    >
                      {metrics.sleepMinutes}
                    </ThemedText>
                    <ThemedText
                      lightColor={APP_SHELL_MAIN_TEXT_COLOR}
                      darkColor={APP_SHELL_MAIN_TEXT_COLOR}
                      style={styles.metricTileUnit}
                    >
                      M
                    </ThemedText>
                  </>
                ) : (
                  <ThemedText
                    lightColor={APP_SHELL_MAIN_TEXT_COLOR}
                    darkColor={APP_SHELL_MAIN_TEXT_COLOR}
                    style={styles.metricTileValue}
                  >
                    {EM_DASH}
                  </ThemedText>
                )}
              </View>
            </View>
            <Image
              source={require("@/assets/icons/moon.png")}
              style={[
                styles.metricIconCorner,
                !connectivity.sleep && styles.metricIconCornerInactive,
              ]}
              contentFit="contain"
            />
          </View>
        </View>
        <View style={styles.metricTileWrapper}>
          <FloatingShellSurface
            gutterColor={APP_SHELL_SECONDARY_BACKGROUND}
            tileSource={require("@/assets/backgrounds/light-blue-rect-card.png")}
          />
          <View style={styles.metricTileOverlay} pointerEvents="none">
            <View style={styles.metricTileBody}>
              <ThemedText
                lightColor={APP_SHELL_MAIN_TEXT_COLOR}
                darkColor={APP_SHELL_MAIN_TEXT_COLOR}
                style={styles.metricTileTitle}
                numberOfLines={1}
              >
                Water
              </ThemedText>
              <View style={styles.metricValueRow}>
                <ThemedText
                  lightColor={APP_SHELL_MAIN_TEXT_COLOR}
                  darkColor={APP_SHELL_MAIN_TEXT_COLOR}
                  style={styles.metricTileValue}
                >
                  {formatIntMetric(metrics.waterOz, connectivity.waterOz)}
                </ThemedText>
                {connectivity.waterOz ? (
                  <ThemedText
                    lightColor={APP_SHELL_MAIN_TEXT_COLOR}
                    darkColor={APP_SHELL_MAIN_TEXT_COLOR}
                    style={styles.metricTileUnit}
                  >
                    OZ
                  </ThemedText>
                ) : null}
              </View>
            </View>
            <Image
              source={require("@/assets/icons/water-drop.png")}
              style={[
                styles.metricIconCorner,
                !connectivity.waterOz && styles.metricIconCornerInactive,
              ]}
              contentFit="contain"
            />
          </View>
        </View>
      </View>
      <View style={[styles.row, styles.rowFull]}>
        <View style={styles.xpTileWrapper}>
          <FloatingShellSurface
            gutterColor={APP_SHELL_SECONDARY_BACKGROUND}
            tileSource={require("@/assets/backgrounds/blue-rect-card.png")}
          />
          <View style={styles.xpTileOverlay} pointerEvents="none">
            <View style={styles.xpHeaderRow}>
              <View style={styles.xpHeaderLeft}>
                <Image
                  accessibilityIgnoresInvertColors
                  source={require("@/assets/icons/star.png")}
                  style={styles.xpHeaderStar}
                  contentFit="contain"
                />
                <ThemedText
                  lightColor={APP_SHELL_MAIN_TEXT_COLOR}
                  darkColor={APP_SHELL_MAIN_TEXT_COLOR}
                  style={styles.xpHeaderText}
                >
                  Level 18
                </ThemedText>
              </View>
              <ThemedText
                lightColor={APP_SHELL_MAIN_TEXT_COLOR}
                darkColor={APP_SHELL_MAIN_TEXT_COLOR}
                style={styles.xpHeaderText}
              >
                1,850XP
              </ThemedText>
            </View>
            <View style={styles.xpBarRow}>
              <View
                style={[
                  styles.xpBarFillClip,
                  { width: `${XP_BAR_FILL_PERCENT}%` },
                ]}
              >
                <Image
                  accessibilityIgnoresInvertColors
                  source={require("@/assets/bars/xp-level-large.png")}
                  style={[
                    styles.xpBarFillImage,
                    XP_BAR_FILL_PERCENT > 0
                      ? { width: `${10000 / XP_BAR_FILL_PERCENT}%` }
                      : { width: "100%" },
                  ]}
                  contentFit="fill"
                />
              </View>
              <View
                style={[
                  styles.xpBarFillRightEndWrap,
                  { left: `${XP_BAR_FILL_PERCENT}%` },
                ]}
              >
                <Image
                  accessibilityIgnoresInvertColors
                  source={require("@/assets/bars/xp-level-right-end.png")}
                  style={styles.xpBarFillRightEndImage}
                  contentFit="fill"
                />
              </View>
              <Image
                accessibilityIgnoresInvertColors
                source={require("@/assets/bars/xp-level-container-large.png")}
                style={styles.xpBarContainerImage}
                contentFit="fill"
              />
            </View>
            <View style={styles.xpFooterRow}>
              <ThemedText
                lightColor={APP_SHELL_MAIN_TEXT_COLOR}
                darkColor={APP_SHELL_MAIN_TEXT_COLOR}
                style={styles.xpFooterText}
              >
                50XP to level 19
              </ThemedText>
            </View>
          </View>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...TAB_SCREEN_ROOT_ABOVE_TAB_BAR,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    minHeight: 0,
  },
  rowFull: {
    alignSelf: "stretch",
  },
  /** Same vertical weight as two former `flex: 1` rows. */
  rowDouble: {
    flex: 2,
  },
  cellFull: {
    flex: 1,
    minWidth: 0,
  },
  heroShell: {
    flex: 1,
    minHeight: 0,
    minWidth: 0,
    marginHorizontal: 0,
    paddingHorizontal: 0,
    backgroundColor: APP_SHELL_SECONDARY_BACKGROUND,
  },
  heroImage: {
    flex: 1,
    width: "100%",
    minHeight: 0,
  },
  metricTileWrapper: {
    flex: 1,
    minWidth: 0,
    minHeight: 0,
    position: "relative",
  },
  metricTileOverlay: {
    ...StyleSheet.absoluteFillObject,
    paddingTop: 16,
    paddingHorizontal: 8,
  },
  /** Title + value row; inset so text does not sit under the corner icon. */
  metricTileBody: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    position: "relative",
    zIndex: 3,
  },
  metricTileTitle: {
    fontFamily: CELL_HEADING_FONT_FAMILY,
    fontSize: 16,
    lineHeight: 16,
    fontWeight: "600",
    paddingTop: 14,
    textAlign: "center",
  },
  metricTileValue: {
    fontFamily: CELL_HEADING_FONT_FAMILY,
    marginTop: 12,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "700",
    textAlign: "center",
  },
  metricTileUnit: {
    fontFamily: CELL_HEADING_FONT_FAMILY,
    marginLeft: 0,
    marginTop: 12,
    fontSize: 16,
    lineHeight: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  metricValueRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  metricIconCorner: {
    position: "absolute",
    left: METRIC_ICON_CORNER_INSET,
    top: METRIC_ICON_CORNER_INSET,
    width: METRIC_ICON_CORNER_SIZE,
    height: METRIC_ICON_CORNER_SIZE,
    zIndex: 2,
  },
  /**
   * "Inactive" treatment when the corresponding HealthKit metric hasn't connected.
   * Reads as low-contrast / desaturated, equivalent intent to `filter: contrast(0.5)`,
   * but uses opacity for portable behavior across RN versions and platforms.
   */
  metricIconCornerInactive: {
    opacity: 0.4,
  },
  xpTileWrapper: {
    flex: 1,
    minWidth: 0,
    minHeight: 0,
    position: "relative",
  },
  xpTileOverlay: {
    ...StyleSheet.absoluteFillObject,
    paddingHorizontal: 30,
    paddingVertical: 24,
    justifyContent: "space-between",
  },
  xpHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  xpHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  xpHeaderStar: {
    width: 25,
    height: 25,
    marginRight: 8,
  },
  xpHeaderText: {
    fontFamily: CELL_HEADING_FONT_FAMILY,
    fontSize: 18,
    lineHeight: 18,
    fontWeight: "600",
  },
  xpBarRow: {
    alignItems: "stretch",
    justifyContent: "center",
    height: 28,
    position: "relative",
  },
  xpBarFillClip: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    overflow: "hidden",
    zIndex: 1,
  },
  xpBarFillImage: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
  },
  xpBarFillRightEndWrap: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: XP_BAR_RIGHT_END_WIDTH,
    marginLeft: -XP_BAR_RIGHT_END_OFFSET,
    zIndex: 1,
  },
  xpBarFillRightEndImage: {
    width: "100%",
    height: "100%",
  },
  xpBarContainerImage: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 2,
  },
  xpFooterRow: {
    alignItems: "flex-end",
  },
  xpFooterText: {
    fontFamily: CELL_HEADING_FONT_FAMILY,
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "600",
  },
});
