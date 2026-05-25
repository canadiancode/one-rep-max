import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import {
  APP_SHELL_LABEL_COLOR,
  APP_SHELL_MAIN_TEXT_COLOR,
} from "@/constants/app-colors";
import { FONT_FAMILY } from "@/constants/fonts";

import {
  FOOD_MEALS_LIST_AREA_MIN_HEIGHT,
  FOOD_SAVED_RECENT_MEALS_CARD_BACKGROUND,
} from "../constants";

const SECTION_TITLE = "Recent meals";
const EMPTY_LIST_MESSAGE = "no recent meals";

/** Recent meals list shell; wire to meal log / API when available. */
export function FoodRecentMealsSection() {
  return (
    <View
      accessible
      accessibilityLabel={`${SECTION_TITLE}. ${EMPTY_LIST_MESSAGE}`}
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
          source={FOOD_SAVED_RECENT_MEALS_CARD_BACKGROUND}
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
          <View style={styles.listArea}>
            <ThemedText
              lightColor={APP_SHELL_LABEL_COLOR}
              darkColor={APP_SHELL_LABEL_COLOR}
              style={styles.emptyListText}
            >
              {EMPTY_LIST_MESSAGE}
            </ThemedText>
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
    paddingVertical: 20,
    paddingHorizontal: 32,
    gap: 12,
  },
  listArea: {
    alignSelf: "stretch",
    justifyContent: "flex-start",
    minHeight: FOOD_MEALS_LIST_AREA_MIN_HEIGHT,
  },
  title: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "600",
    alignSelf: "stretch",
    textAlign: "left",
  },
  emptyListText: {
    fontFamily: FONT_FAMILY,
    fontSize: 12,
    lineHeight: 16,
    alignSelf: "stretch",
    textAlign: "left",
  },
});
