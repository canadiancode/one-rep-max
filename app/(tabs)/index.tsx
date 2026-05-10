import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

import { FloatingShellSurface } from "@/components/floating-shell-surface";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import {
  APP_SHELL_SECONDARY_BACKGROUND,
  TAB_SCREEN_ROOT_ABOVE_TAB_BAR,
} from "@/constants/app-shell";
import { useDashboardHealthMetrics } from "@/hooks/use-dashboard-health-metrics";

const CELL_HEADING_FONT_FAMILY = "PixeloidSans";

const METRIC_ICON_CORNER_INSET = 14;
const METRIC_ICON_CORNER_SIZE = 32;

export default function MyBeastScreen() {
  const { metrics } = useDashboardHealthMetrics();

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
            tileSource={require("@/assets/backgrounds/red-square.png")}
          />
          <View style={styles.metricTileOverlay} pointerEvents="none">
            <View style={styles.metricTileBody}>
              <ThemedText
                lightColor="#FFFFFF"
                darkColor="#FFFFFF"
                style={styles.metricTileTitle}
                numberOfLines={1}
              >
                Resting HR
              </ThemedText>
              <View style={styles.metricValueRow}>
                <ThemedText
                  lightColor="#FFFFFF"
                  darkColor="#FFFFFF"
                  style={styles.metricTileValue}
                >
                  {metrics.restingHeartRateBpm}
                </ThemedText>
                <ThemedText
                  lightColor="#FFFFFF"
                  darkColor="#FFFFFF"
                  style={styles.metricTileUnit}
                >
                  BPM
                </ThemedText>
              </View>
            </View>
            <Image
              source={require("@/assets/icons/heart.png")}
              style={styles.metricIconCorner}
              contentFit="contain"
            />
          </View>
        </View>
        <View style={styles.metricTileWrapper}>
          <FloatingShellSurface
            gutterColor={APP_SHELL_SECONDARY_BACKGROUND}
            tileSource={require("@/assets/backgrounds/grey-square.png")}
          />
          <View style={styles.metricTileOverlay} pointerEvents="none">
            <View style={styles.metricTileBody}>
              <ThemedText
                lightColor="#FFFFFF"
                darkColor="#FFFFFF"
                style={styles.metricTileTitle}
                numberOfLines={1}
              >
                Weight
              </ThemedText>
              <View style={styles.metricValueRow}>
                <ThemedText
                  lightColor="#FFFFFF"
                  darkColor="#FFFFFF"
                  style={styles.metricTileValue}
                >
                  {metrics.weightLbs}
                </ThemedText>
                <ThemedText
                  lightColor="#FFFFFF"
                  darkColor="#FFFFFF"
                  style={styles.metricTileUnit}
                >
                  LBS
                </ThemedText>
              </View>
            </View>
            <Image
              source={require("@/assets/icons/scale.png")}
              style={styles.metricIconCorner}
              contentFit="contain"
            />
          </View>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.metricTileWrapper}>
          <FloatingShellSurface
            gutterColor={APP_SHELL_SECONDARY_BACKGROUND}
            tileSource={require("@/assets/backgrounds/green-square.png")}
          />
          <View style={styles.metricTileOverlay} pointerEvents="none">
            <View style={styles.metricTileBody}>
              <ThemedText
                lightColor="#FFFFFF"
                darkColor="#FFFFFF"
                style={styles.metricTileTitle}
                numberOfLines={1}
              >
                Steps
              </ThemedText>
              <View style={styles.metricValueRow}>
                <ThemedText
                  lightColor="#FFFFFF"
                  darkColor="#FFFFFF"
                  style={styles.metricTileValue}
                >
                  {metrics.steps.toLocaleString("en-US")}
                </ThemedText>
                <ThemedText
                  lightColor="#FFFFFF"
                  darkColor="#FFFFFF"
                  style={styles.metricTileUnit}
                >
                  STEPS
                </ThemedText>
              </View>
            </View>
            <Image
              source={require("@/assets/icons/lightning.png")}
              style={styles.metricIconCorner}
              contentFit="contain"
            />
          </View>
        </View>
        <View style={styles.metricTileWrapper}>
          <FloatingShellSurface
            gutterColor={APP_SHELL_SECONDARY_BACKGROUND}
            tileSource={require("@/assets/backgrounds/yellow-square.png")}
          />
          <View style={styles.metricTileOverlay} pointerEvents="none">
            <View style={styles.metricTileBody}>
              <ThemedText
                lightColor="#FFFFFF"
                darkColor="#FFFFFF"
                style={styles.metricTileTitle}
                numberOfLines={1}
              >
                Calories
              </ThemedText>
              <View style={styles.metricValueRow}>
                <ThemedText
                  lightColor="#FFFFFF"
                  darkColor="#FFFFFF"
                  style={styles.metricTileValue}
                >
                  {metrics.activeEnergyKcal.toLocaleString("en-US")}
                </ThemedText>
                <ThemedText
                  lightColor="#FFFFFF"
                  darkColor="#FFFFFF"
                  style={styles.metricTileUnit}
                >
                  KCAL
                </ThemedText>
              </View>
            </View>
            <Image
              source={require("@/assets/icons/fire.png")}
              style={styles.metricIconCorner}
              contentFit="contain"
            />
          </View>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.metricTileWrapper}>
          <FloatingShellSurface
            gutterColor={APP_SHELL_SECONDARY_BACKGROUND}
            tileSource={require("@/assets/backgrounds/purple-square.png")}
          />
          <View style={styles.metricTileOverlay} pointerEvents="none">
            <View style={styles.metricTileBody}>
              <ThemedText
                lightColor="#FFFFFF"
                darkColor="#FFFFFF"
                style={styles.metricTileTitle}
                numberOfLines={1}
              >
                Sleep
              </ThemedText>
              <View style={styles.metricValueRow}>
                <ThemedText
                  lightColor="#FFFFFF"
                  darkColor="#FFFFFF"
                  style={styles.metricTileValue}
                >
                  {metrics.sleepHours}
                </ThemedText>
                <ThemedText
                  lightColor="#FFFFFF"
                  darkColor="#FFFFFF"
                  style={styles.metricTileUnit}
                >
                  H
                </ThemedText>
                <ThemedText
                  lightColor="#FFFFFF"
                  darkColor="#FFFFFF"
                  style={styles.metricTileValue}
                >
                  {metrics.sleepMinutes}
                </ThemedText>
                <ThemedText
                  lightColor="#FFFFFF"
                  darkColor="#FFFFFF"
                  style={styles.metricTileUnit}
                >
                  M
                </ThemedText>
              </View>
            </View>
            <Image
              source={require("@/assets/icons/moon.png")}
              style={styles.metricIconCorner}
              contentFit="contain"
            />
          </View>
        </View>
        <View style={styles.metricTileWrapper}>
          <FloatingShellSurface
            gutterColor={APP_SHELL_SECONDARY_BACKGROUND}
            tileSource={require("@/assets/backgrounds/light-blue-square.png")}
          />
          <View style={styles.metricTileOverlay} pointerEvents="none">
            <View style={styles.metricTileBody}>
              <ThemedText
                lightColor="#FFFFFF"
                darkColor="#FFFFFF"
                style={styles.metricTileTitle}
                numberOfLines={1}
              >
                Water
              </ThemedText>
              <View style={styles.metricValueRow}>
                <ThemedText
                  lightColor="#FFFFFF"
                  darkColor="#FFFFFF"
                  style={styles.metricTileValue}
                >
                  {metrics.waterOz}
                </ThemedText>
                <ThemedText
                  lightColor="#FFFFFF"
                  darkColor="#FFFFFF"
                  style={styles.metricTileUnit}
                >
                  OZ
                </ThemedText>
              </View>
            </View>
            <Image
              source={require("@/assets/icons/water-drop.png")}
              style={styles.metricIconCorner}
              contentFit="contain"
            />
          </View>
        </View>
      </View>
      <View style={[styles.row, styles.rowFull]}>
        <View style={styles.xpTileWrapper}>
          <FloatingShellSurface gutterColor={APP_SHELL_SECONDARY_BACKGROUND} />
          <View style={styles.xpTileOverlay} pointerEvents="none">
            <View style={styles.xpHeaderRow}>
              <ThemedText
                lightColor="#FFFFFF"
                darkColor="#FFFFFF"
                style={styles.xpHeaderText}
              >
                Level 12
              </ThemedText>
              <ThemedText
                lightColor="#FFFFFF"
                darkColor="#FFFFFF"
                style={styles.xpHeaderText}
              >
                1,850XP
              </ThemedText>
            </View>
            <View style={styles.xpBarRow}>
              <Image
                accessibilityIgnoresInvertColors
                source={require("@/assets/bars/xp-level-large.png")}
                style={styles.xpBarFillImage}
                contentFit="contain"
              />
              <Image
                accessibilityIgnoresInvertColors
                source={require("@/assets/bars/xp-level-container-large.png")}
                style={styles.xpBarContainerImage}
                contentFit="contain"
              />
            </View>
            <View style={styles.xpFooterRow}>
              <ThemedText
                lightColor="#FFFFFF"
                darkColor="#FFFFFF"
                style={styles.xpFooterText}
              >
                650XP to level 13
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
    paddingTop: 12,
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
    paddingTop: 8,
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
  xpBarFillImage: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
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
