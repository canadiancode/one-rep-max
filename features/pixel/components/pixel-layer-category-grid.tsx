import { Image } from "expo-image";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { APP_SHELL_MAIN_TEXT_COLOR } from "@/constants/app-colors";
import {
  SETTINGS_ROW_BACKGROUND,
  SETTINGS_ROW_BG_ASPECT_RATIO,
} from "@/features/settings/constants";

import { PIXEL_LAYER_CATEGORIES, type PixelLayerCategory } from "../data";

type Props = {
  onSelectCategory: (category: PixelLayerCategory) => void;
};

/** Single-column layer list using the same row background as Settings. */
export function PixelLayerCategoryGrid({ onSelectCategory }: Props) {
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {PIXEL_LAYER_CATEGORIES.map((category) => (
        <Pressable
          key={category.id}
          accessibilityRole="button"
          accessibilityLabel={category.label}
          android_ripple={{ color: "rgba(255,255,255,0.12)" }}
          style={({ pressed }) => [
            styles.card,
            pressed && styles.cardPressed,
          ]}
          onPress={() => onSelectCategory(category)}
        >
          <View
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            style={[
              styles.cardShell,
              { aspectRatio: SETTINGS_ROW_BG_ASPECT_RATIO },
            ]}
          >
            <Image
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
              source={SETTINGS_ROW_BACKGROUND}
              style={StyleSheet.absoluteFillObject}
              contentFit="fill"
            />
            <View style={styles.cardInner}>
              <ThemedText
                lightColor={APP_SHELL_MAIN_TEXT_COLOR}
                darkColor={APP_SHELL_MAIN_TEXT_COLOR}
                style={styles.cardLabel}
                numberOfLines={1}
              >
                {category.label}
              </ThemedText>
            </View>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    padding: 16,
    paddingTop: 22,
    gap: 12,
  },
  card: {
    alignSelf: "stretch",
    borderRadius: 12,
    overflow: "hidden",
  },
  cardShell: {
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
  },
  cardPressed: {
    opacity: 0.85,
  },
  /** Matches Settings `listRowImageInner` label placement. */
  cardInner: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    paddingVertical: 10,
    paddingLeft: 20,
    paddingRight: 44,
  },
  cardLabel: {
    fontSize: 15,
    lineHeight: 22,
  },
});
