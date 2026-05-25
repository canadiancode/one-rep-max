import { Image } from "expo-image";
import { useCallback, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { APP_SHELL_MAIN_TEXT_COLOR } from "@/constants/app-colors";
import { FONT_FAMILY } from "@/constants/fonts";

import {
  WATER_ADD_ICON,
  WATER_SUBTRACT_ICON,
  WEIGHT_ACTION_CARD_BACKGROUND,
} from "../constants";
import { getActionRowProgressDisplay } from "../data";

const SECTION_TITLE = "Target";
const TARGET_STEP_LBS = 1;
const TARGET_MIN_LBS = 100;
const TARGET_MAX_LBS = 400;

export function WeightTargetSection() {
  const { accentColor } = getActionRowProgressDisplay("weight");
  const [targetLbs, setTargetLbs] = useState(123);

  const decrease = useCallback(() => {
    setTargetLbs((lbs) => Math.max(TARGET_MIN_LBS, lbs - TARGET_STEP_LBS));
  }, []);

  const increase = useCallback(() => {
    setTargetLbs((lbs) => Math.min(TARGET_MAX_LBS, lbs + TARGET_STEP_LBS));
  }, []);

  const valueA11y = `${targetLbs} pounds`;

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
          source={WEIGHT_ACTION_CARD_BACKGROUND}
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
              accessibilityLabel="Decrease goal weight"
              accessibilityState={{ disabled: targetLbs <= TARGET_MIN_LBS }}
              hitSlop={8}
              disabled={targetLbs <= TARGET_MIN_LBS}
              onPress={decrease}
              style={({ pressed }) => [
                styles.stepperColumn,
                pressed && styles.stepperPressed,
                targetLbs <= TARGET_MIN_LBS && styles.stepperDisabled,
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
                  {targetLbs}
                </Text>
                <Text style={styles.valueSuffix}>LBS</Text>
              </Text>
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Increase goal weight"
              accessibilityState={{ disabled: targetLbs >= TARGET_MAX_LBS }}
              hitSlop={8}
              disabled={targetLbs >= TARGET_MAX_LBS}
              onPress={increase}
              style={({ pressed }) => [
                styles.stepperColumn,
                pressed && styles.stepperPressed,
                targetLbs >= TARGET_MAX_LBS && styles.stepperDisabled,
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
