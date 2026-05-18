import { Image } from "expo-image";
import { Pressable, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { APP_SHELL_MAIN_TEXT_COLOR } from "@/constants/app-colors";
import { FONT_FAMILY } from "@/constants/fonts";

import {
  WATER_ACTION_CARD_BACKGROUND,
  WATER_ADD_ICON,
  WATER_BULK_ADD_BACKGROUND,
  WATER_BULK_SERVING_OPTIONS_OZ,
  WATER_SERVING_OZ,
  WATER_SUBTRACT_ICON,
} from "../constants";
import { getActionRowProgressDisplay } from "../data";

const WATER_ADD_CARD_TITLE = "Add Water";

export function WaterAddCard() {
  const { accentColor } = getActionRowProgressDisplay("water");
  const servingLabel = `${WATER_SERVING_OZ} oz`;

  return (
    <View
      accessible
      accessibilityLabel={`${WATER_ADD_CARD_TITLE}. ${servingLabel}`}
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
            lightColor={accentColor}
            darkColor={accentColor}
            style={styles.title}
          >
            {WATER_ADD_CARD_TITLE}
          </ThemedText>
          <View style={styles.stepperRow}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Decrease water amount"
              hitSlop={8}
              style={({ pressed }) => [
                styles.stepperColumn,
                pressed && styles.stepperPressed,
              ]}
            >
              <Image
                accessibilityIgnoresInvertColors
                source={WATER_SUBTRACT_ICON}
                style={styles.stepperIcon}
                contentFit="contain"
              />
            </Pressable>
            <View style={styles.stepperColumn}>
              <ThemedText
                lightColor={APP_SHELL_MAIN_TEXT_COLOR}
                darkColor={APP_SHELL_MAIN_TEXT_COLOR}
                style={styles.servingLabel}
              >
                {servingLabel}
              </ThemedText>
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Increase water amount"
              hitSlop={8}
              style={({ pressed }) => [
                styles.stepperColumn,
                pressed && styles.stepperPressed,
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
          <View style={styles.bulkRowWrap}>
            <View style={styles.bulkRow}>
              {WATER_BULK_SERVING_OPTIONS_OZ.map((oz) => (
                <Pressable
                  key={oz}
                  accessibilityRole="button"
                  accessibilityLabel={`Add ${oz} ounces of water`}
                  style={({ pressed }) => [
                    styles.bulkColumn,
                    pressed && styles.stepperPressed,
                  ]}
                >
                  <View style={styles.bulkCellShell}>
                    <Image
                      accessibilityElementsHidden
                      importantForAccessibility="no-hide-descendants"
                      source={WATER_BULK_ADD_BACKGROUND}
                      style={StyleSheet.absoluteFillObject}
                      contentFit="fill"
                    />
                    <ThemedText
                      lightColor={APP_SHELL_MAIN_TEXT_COLOR}
                      darkColor={APP_SHELL_MAIN_TEXT_COLOR}
                      style={styles.bulkLabel}
                    >
                      + {oz}oz
                    </ThemedText>
                  </View>
                </Pressable>
              ))}
            </View>
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
    alignSelf: "flex-start",
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
  servingLabel: {
    fontFamily: FONT_FAMILY,
    fontSize: 18,
    lineHeight: 22,
    textAlign: "center",
  },
  bulkRowWrap: {
    width: "100%",
    alignItems: "center",
  },
  bulkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  bulkColumn: {
    width: 76,
  },
  bulkCellShell: {
    width: "100%",
    minHeight: 52,
    borderRadius: 8,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
    paddingVertical: 12,
  },
  bulkLabel: {
    fontFamily: FONT_FAMILY,
    fontSize: 11,
    lineHeight: 14,
    textAlign: "center",
  },
});
