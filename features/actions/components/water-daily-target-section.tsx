import { Image } from "expo-image";
import { useCallback, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { APP_SHELL_MAIN_TEXT_COLOR } from "@/constants/app-colors";
import { FONT_FAMILY } from "@/constants/fonts";

import {
  WATER_ACTION_CARD_BACKGROUND,
  WATER_ADD_ICON,
  WATER_SUBTRACT_ICON,
} from "../constants";
import { getActionRowProgressDisplay } from "../data";

const SECTION_TITLE = "Daily target";
const TARGET_STEP_OZ = 8;
const TARGET_MIN_OZ = 8;
const TARGET_MAX_OZ = 256;

export function WaterDailyTargetSection() {
  const { accentColor } = getActionRowProgressDisplay("water");
  const [targetOz, setTargetOz] = useState(80);

  const decrease = useCallback(() => {
    setTargetOz((oz) => Math.max(TARGET_MIN_OZ, oz - TARGET_STEP_OZ));
  }, []);

  const increase = useCallback(() => {
    setTargetOz((oz) => Math.min(TARGET_MAX_OZ, oz + TARGET_STEP_OZ));
  }, []);

  const valueA11y = `${targetOz} ounces`;

  return (
    <View
      accessible
      accessibilityLabel={`${SECTION_TITLE}. ${valueA11y}`}
      style={styles.card}
    >
      <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={styles.cardImageShell}
      >
        <Image
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          source={WATER_ACTION_CARD_BACKGROUND}
          style={StyleSheet.absoluteFillObject}
          contentFit="fill"
        />
        <View style={styles.cardInner}>
          <ThemedText
            lightColor={APP_SHELL_MAIN_TEXT_COLOR}
            darkColor={APP_SHELL_MAIN_TEXT_COLOR}
            style={styles.title}
            accessibilityRole="header"
          >
            {SECTION_TITLE}
          </ThemedText>
          <View style={styles.stepperRow}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Decrease daily water target"
              accessibilityState={{ disabled: targetOz <= TARGET_MIN_OZ }}
              hitSlop={8}
              disabled={targetOz <= TARGET_MIN_OZ}
              onPress={decrease}
              style={({ pressed }) => [
                styles.stepperColumn,
                pressed && styles.stepperPressed,
                targetOz <= TARGET_MIN_OZ && styles.stepperDisabled,
              ]}
            >
              <Image
                accessibilityIgnoresInvertColors
                source={WATER_SUBTRACT_ICON}
                style={styles.stepperIcon}
                contentFit="contain"
              />
            </Pressable>
            <View
              style={styles.stepperColumn}
              accessible
              accessibilityLabel={valueA11y}
            >
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.75}
                style={styles.valueText}
              >
                <Text style={[styles.valueNumber, { color: accentColor }]}>
                  {targetOz}
                </Text>
                <Text style={styles.valueSuffix}>oz</Text>
              </Text>
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Increase daily water target"
              accessibilityState={{ disabled: targetOz >= TARGET_MAX_OZ }}
              hitSlop={8}
              disabled={targetOz >= TARGET_MAX_OZ}
              onPress={increase}
              style={({ pressed }) => [
                styles.stepperColumn,
                pressed && styles.stepperPressed,
                targetOz >= TARGET_MAX_OZ && styles.stepperDisabled,
              ]}
            >
              <Image
                accessibilityIgnoresInvertColors
                source={WATER_ADD_ICON}
                style={styles.stepperIcon}
                contentFit="contain"
              />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignSelf: "stretch",
    borderRadius: 12,
    overflow: "hidden",
  },
  cardImageShell: {
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
  },
  cardInner: {
    paddingVertical: 28,
    paddingHorizontal: 32,
    gap: 16,
  },
  title: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "600",
    alignSelf: "stretch",
    textAlign: "center",
  },
  stepperRow: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
  },
  stepperColumn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
  },
  stepperIcon: {
    width: 40,
    height: 40,
  },
  stepperPressed: {
    opacity: 0.85,
  },
  stepperDisabled: {
    opacity: 0.35,
  },
  valueText: {
    fontFamily: FONT_FAMILY,
    textAlign: "center",
  },
  valueNumber: {
    fontFamily: FONT_FAMILY,
    fontSize: 27.5,
    lineHeight: 35,
  },
  valueSuffix: {
    fontFamily: FONT_FAMILY,
    fontSize: 20,
    lineHeight: 25,
    marginLeft: 6,
    color: APP_SHELL_MAIN_TEXT_COLOR,
  },
});
