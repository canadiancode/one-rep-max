import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import {
  APP_SHELL_INPUT_BOARDER_COLOR,
  APP_SHELL_LABEL_COLOR,
  APP_SHELL_MAIN_TEXT_COLOR,
  APP_SHELL_PRIMARY_BACKGROUND,
} from "@/constants/app-colors";

type UnitSystem = "metric" | "imperial";

type ThemeOption = {
  readonly id: string;
  readonly name: string;
  readonly swatch: string;
  readonly available: boolean;
};

const THEME_OPTIONS: readonly ThemeOption[] = [
  {
    id: "blue",
    name: "Ocean blue",
    swatch: APP_SHELL_PRIMARY_BACKGROUND,
    available: true,
  },
  { id: "coral", name: "Coral", swatch: "#c4584e", available: false },
  { id: "emerald", name: "Emerald", swatch: "#1f8f5b", available: false },
  { id: "violet", name: "Violet", swatch: "#6b4fb8", available: false },
];

export function PreferencesSettingsForm() {
  const [units, setUnits] = useState<UnitSystem>("metric");

  return (
    <View style={styles.root}>
      <View style={styles.leadSection}>
        <ThemedText
          lightColor={APP_SHELL_MAIN_TEXT_COLOR}
          darkColor={APP_SHELL_MAIN_TEXT_COLOR}
          style={styles.sectionTitle}
          accessibilityRole="header"
        >
          Theme
        </ThemedText>
        <ThemedText
          lightColor={APP_SHELL_LABEL_COLOR}
          darkColor={APP_SHELL_LABEL_COLOR}
          style={styles.sectionHint}
        >
          The app is on the blue look you see today. Other color themes unlock
          as you earn XP and level your beast.
        </ThemedText>
        <View style={styles.themeList}>
          {THEME_OPTIONS.map((theme) => {
            const selected = theme.available && theme.id === "blue";
            if (theme.available) {
              return (
                <View
                  key={theme.id}
                  style={[styles.themeRow, selected && styles.themeRowSelected]}
                  accessibilityRole="text"
                  accessibilityLabel={`${theme.name}, current theme`}
                >
                  <View style={styles.themeRowLeft}>
                    <View
                      style={[styles.swatch, { backgroundColor: theme.swatch }]}
                      accessibilityElementsHidden
                    />
                    <View style={styles.themeTextBlock}>
                      <ThemedText
                        lightColor={APP_SHELL_MAIN_TEXT_COLOR}
                        darkColor={APP_SHELL_MAIN_TEXT_COLOR}
                        style={styles.themeName}
                      >
                        {theme.name}
                      </ThemedText>
                      <ThemedText
                        lightColor={APP_SHELL_LABEL_COLOR}
                        darkColor={APP_SHELL_LABEL_COLOR}
                        style={styles.themeMeta}
                      >
                        Current
                      </ThemedText>
                    </View>
                  </View>
                </View>
              );
            }

            return (
              <View
                key={theme.id}
                style={[styles.themeRow, styles.themeRowLocked]}
                accessibilityRole="text"
                accessibilityLabel={`${theme.name}, locked. Unlock with XP.`}
              >
                <View style={styles.themeRowLeft}>
                  <View
                    style={[
                      styles.swatch,
                      styles.swatchLocked,
                      { backgroundColor: theme.swatch },
                    ]}
                    accessibilityElementsHidden
                  />
                  <View style={styles.themeTextBlock}>
                    <ThemedText
                      lightColor={APP_SHELL_LABEL_COLOR}
                      darkColor={APP_SHELL_LABEL_COLOR}
                      style={styles.themeName}
                    >
                      {theme.name}
                    </ThemedText>
                    <ThemedText
                      lightColor={APP_SHELL_LABEL_COLOR}
                      darkColor={APP_SHELL_LABEL_COLOR}
                      style={styles.themeMeta}
                    >
                      Locked — earn XP to unlock
                    </ThemedText>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </View>

      <View style={styles.section}>
        <ThemedText
          lightColor={APP_SHELL_MAIN_TEXT_COLOR}
          darkColor={APP_SHELL_MAIN_TEXT_COLOR}
          style={styles.sectionTitle}
          accessibilityRole="header"
        >
          Units of measure
        </ThemedText>
        <ThemedText
          lightColor={APP_SHELL_LABEL_COLOR}
          darkColor={APP_SHELL_LABEL_COLOR}
          style={styles.sectionHint}
        >
          Choose how weights, distances, and similar values are shown in the
          app.
        </ThemedText>
        <View style={styles.unitChips}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Metric units"
            accessibilityState={{ selected: units === "metric" }}
            onPress={() => setUnits("metric")}
            style={({ pressed }) => [
              styles.unitChip,
              units === "metric" && styles.unitChipSelected,
              pressed && styles.unitChipPressed,
            ]}
          >
            <ThemedText
              lightColor={
                units === "metric"
                  ? APP_SHELL_MAIN_TEXT_COLOR
                  : APP_SHELL_LABEL_COLOR
              }
              darkColor={
                units === "metric"
                  ? APP_SHELL_MAIN_TEXT_COLOR
                  : APP_SHELL_LABEL_COLOR
              }
              style={styles.unitChipLabel}
            >
              Metric
            </ThemedText>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Imperial units"
            accessibilityState={{ selected: units === "imperial" }}
            onPress={() => setUnits("imperial")}
            style={({ pressed }) => [
              styles.unitChip,
              units === "imperial" && styles.unitChipSelected,
              pressed && styles.unitChipPressed,
            ]}
          >
            <ThemedText
              lightColor={
                units === "imperial"
                  ? APP_SHELL_MAIN_TEXT_COLOR
                  : APP_SHELL_LABEL_COLOR
              }
              darkColor={
                units === "imperial"
                  ? APP_SHELL_MAIN_TEXT_COLOR
                  : APP_SHELL_LABEL_COLOR
              }
              style={styles.unitChipLabel}
            >
              Imperial
            </ThemedText>
          </Pressable>
        </View>
        <ThemedText
          lightColor={APP_SHELL_LABEL_COLOR}
          darkColor={APP_SHELL_LABEL_COLOR}
          style={styles.unitFootnote}
        >
          {units === "metric"
            ? "Examples: kilograms, kilometers, milliliters."
            : "Examples: pounds, miles, fluid ounces."}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    gap: 0,
    paddingBottom: 28,
  },
  leadSection: {
    gap: 10,
    paddingBottom: 6,
  },
  section: {
    marginTop: 8,
    paddingTop: 14,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: APP_SHELL_INPUT_BOARDER_COLOR,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "600",
  },
  sectionHint: {
    fontSize: 13,
    lineHeight: 19,
  },
  themeList: {
    gap: 8,
    marginTop: 4,
  },
  themeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: APP_SHELL_INPUT_BOARDER_COLOR,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  themeRowSelected: {
    borderColor: "rgba(120,200,255,0.65)",
    backgroundColor: "rgba(120,200,255,0.12)",
  },
  themeRowLocked: {
    opacity: 0.72,
  },
  themeRowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  swatch: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.35)",
  },
  swatchLocked: {
    opacity: 0.55,
  },
  themeTextBlock: {
    flex: 1,
    gap: 2,
  },
  themeName: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
  },
  themeMeta: {
    fontSize: 12,
    lineHeight: 17,
  },
  unitChips: {
    flexDirection: "row",
    gap: 10,
    marginTop: 4,
  },
  unitChip: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: APP_SHELL_INPUT_BOARDER_COLOR,
    alignItems: "center",
  },
  unitChipSelected: {
    borderColor: "rgba(120,200,255,0.65)",
    backgroundColor: "rgba(120,200,255,0.12)",
  },
  unitChipPressed: {
    opacity: 0.9,
  },
  unitChipLabel: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
  },
  unitFootnote: {
    fontSize: 12,
    lineHeight: 17,
    marginTop: 2,
  },
});
