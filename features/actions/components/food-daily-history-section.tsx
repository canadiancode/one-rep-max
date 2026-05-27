import { Image } from "expo-image";
import { router } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

import { BarChart } from "@/components/charts/bar-chart";
import { ThemedText } from "@/components/themed-text";
import {
  APP_SHELL_LABEL_COLOR,
  APP_SHELL_MAIN_TEXT_COLOR,
} from "@/constants/app-colors";
import { FONT_FAMILY } from "@/constants/fonts";

import { WATER_RIGHT_ARROW_ICON } from "../constants";
import { FOOD_ACTION_HREFS } from "../food-routes";

const SECTION_TITLE = "History";
const VIEW_HISTORY_LABEL = "View history";
/** Y-axis tick step for the last-seven-days food chart (kcal per day). */
export const FOOD_DAILY_CHART_INCREMENT = 500;

export const FOOD_DAILY_CHART_Y_DOMAIN_FROM_ZERO = true;

/** Placeholder daily series (kcal per day, Mon–Sun); replace with DB/API fetch. */
export const FAKE_FOOD_DAILY_CHART_INPUTS = {
  userData: {
    y: [2_350, 2_420, 2_280, 2_500, 2_460, 2_380, 2_450],
    x: ["Mon", "Tues", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  targetVal: 2_500,
  theme: "blue" as const,
};

/** Last seven days of food energy (daily kcal), same shell as calories weekly history. */
export function FoodDailyHistorySection() {
  return (
    <View accessible accessibilityLabel={SECTION_TITLE} style={styles.section}>
      <View style={styles.headerRow}>
        <ThemedText
          lightColor={APP_SHELL_MAIN_TEXT_COLOR}
          darkColor={APP_SHELL_MAIN_TEXT_COLOR}
          style={styles.title}
          accessibilityRole="header"
        >
          {SECTION_TITLE}
        </ThemedText>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={VIEW_HISTORY_LABEL}
          hitSlop={8}
          onPress={() => router.push(FOOD_ACTION_HREFS.caloricIntakeHistory)}
          style={({ pressed }) => [
            styles.viewHistoryControl,
            pressed && styles.viewHistoryPressed,
          ]}
        >
          <View style={styles.viewHistoryRow}>
            <ThemedText
              lightColor={APP_SHELL_LABEL_COLOR}
              darkColor={APP_SHELL_LABEL_COLOR}
              numberOfLines={1}
              style={styles.viewHistoryLabel}
            >
              {VIEW_HISTORY_LABEL}
            </ThemedText>
            <Image
              accessibilityIgnoresInvertColors
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
              source={WATER_RIGHT_ARROW_ICON}
              style={styles.viewHistoryArrow}
              contentFit="contain"
            />
          </View>
        </Pressable>
      </View>
      <BarChart
        increment={FOOD_DAILY_CHART_INCREMENT}
        targetLabel={`${FAKE_FOOD_DAILY_CHART_INPUTS.targetVal.toLocaleString("en-US")} KCAL`}
        targetVal={FAKE_FOOD_DAILY_CHART_INPUTS.targetVal}
        theme={FAKE_FOOD_DAILY_CHART_INPUTS.theme}
        userData={FAKE_FOOD_DAILY_CHART_INPUTS.userData}
        yDomainFromZero={FOOD_DAILY_CHART_Y_DOMAIN_FROM_ZERO}
        accessibilityLabel="Food energy, last seven days"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    alignSelf: "stretch",
    paddingVertical: 8,
    gap: 14,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "stretch",
    gap: 12,
  },
  title: {
    flex: 1,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "600",
  },
  viewHistoryControl: {
    flex: 1,
    minWidth: 0,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  viewHistoryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    flexWrap: "nowrap",
    gap: 6,
    flexShrink: 0,
  },
  viewHistoryPressed: {
    opacity: 0.85,
  },
  viewHistoryLabel: {
    fontFamily: FONT_FAMILY,
    fontSize: 10,
    lineHeight: 14,
    flexShrink: 0,
  },
  viewHistoryArrow: {
    width: 32,
    height: 32,
    flexShrink: 0,
  },
});
