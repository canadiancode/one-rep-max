import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

import { FloatingShellSurface } from "@/components/floating-shell-surface";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { XpLevelBar } from "@/components/xp-level-bar";
import {
  APP_SHELL_MAIN_TEXT_COLOR,
  APP_SHELL_SECONDARY_BACKGROUND,
} from "@/constants/app-colors";
import { TAB_SCREEN_ROOT_ABOVE_TAB_BAR } from "@/constants/app-shell";
import { useDashboardHealthMetrics } from "@/hooks/use-dashboard-health-metrics";
import {
  CURRENT_XP,
  getBeastLevel,
  getNextBeastLevel,
  getXpBarFillPercent,
  getXpRemainingToNextLevel,
} from "@/lib/xp-progress";

const CELL_HEADING_FONT_FAMILY = "PixeloidSans";

/** Inset from tile edge; includes shell gutter + padding inside the rect card. */
const METRIC_ICON_CORNER_INSET = 20;
const METRIC_ICON_CORNER_SIZE = 25;

const XP_BAR_FILL_PERCENT = getXpBarFillPercent();
const BEAST_LEVEL = getBeastLevel();
const NEXT_BEAST_LEVEL = getNextBeastLevel();
const XP_REMAINING_TO_NEXT_LEVEL = getXpRemainingToNextLevel();

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
                  Level {BEAST_LEVEL}
                </ThemedText>
              </View>
              <ThemedText
                lightColor={APP_SHELL_MAIN_TEXT_COLOR}
                darkColor={APP_SHELL_MAIN_TEXT_COLOR}
                style={styles.xpHeaderText}
              >
                {CURRENT_XP.toLocaleString("en-US")}XP
              </ThemedText>
            </View>
            <XpLevelBar fillPercent={XP_BAR_FILL_PERCENT} style={styles.xpBarRow} />
            <View style={styles.xpFooterRow}>
              <ThemedText
                lightColor={APP_SHELL_MAIN_TEXT_COLOR}
                darkColor={APP_SHELL_MAIN_TEXT_COLOR}
                style={styles.xpFooterText}
              >
                {XP_REMAINING_TO_NEXT_LEVEL}XP to level {NEXT_BEAST_LEVEL}
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
    height: 28,
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
