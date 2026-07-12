import type { ImageSource } from "expo-image";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import {
  APP_SHELL_INPUT_BOARDER_COLOR,
  APP_SHELL_MAIN_TEXT_COLOR,
  APP_SHELL_SECONDARY_BACKGROUND,
} from "@/constants/app-colors";

import type { PixelLayerCategory } from "../data";
import type { PixelLayerId, PixelLoadout } from "../types";
import { PixelLayerAssetPicker } from "./pixel-layer-asset-picker";
import { PixelLayerCategoryGrid } from "./pixel-layer-category-grid";

type Props = {
  loadout: PixelLoadout;
  onSelectAsset: (layerId: PixelLayerId, source: ImageSource) => void;
  onBack: () => void;
};

/**
 * Nested pixel customize flow: category grid → layer asset picker.
 * Back control matches settings / actions sub-screen toolbar styling.
 */
export function PixelDetailPanel({ loadout, onSelectAsset, onBack }: Props) {
  const [activeCategory, setActiveCategory] =
    useState<PixelLayerCategory | null>(null);

  const handleBack = () => {
    if (activeCategory != null) {
      setActiveCategory(null);
      return;
    }
    onBack();
  };

  return (
    <View style={styles.root}>
      <View style={styles.toolbar}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={
            activeCategory != null
              ? "Back to layer categories"
              : "Back to dashboard"
          }
          hitSlop={12}
          onPress={handleBack}
          style={({ pressed }) => [styles.backHit, pressed && styles.backPressed]}
        >
          <ThemedText
            lightColor={APP_SHELL_MAIN_TEXT_COLOR}
            darkColor={APP_SHELL_MAIN_TEXT_COLOR}
            style={styles.backLabel}
          >
            ‹ Back
          </ThemedText>
        </Pressable>
      </View>
      <View style={styles.body}>
        {activeCategory != null ? (
          <PixelLayerAssetPicker
            layerId={activeCategory.id}
            selectedSource={loadout[activeCategory.id]}
            onSelectAsset={(source) => onSelectAsset(activeCategory.id, source)}
          />
        ) : (
          <PixelLayerCategoryGrid onSelectCategory={setActiveCategory} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    minHeight: 0,
    backgroundColor: APP_SHELL_SECONDARY_BACKGROUND,
  },
  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingTop: 14,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: APP_SHELL_INPUT_BOARDER_COLOR,
  },
  backHit: {
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  backPressed: {
    opacity: 0.85,
  },
  backLabel: {
    fontSize: 16,
    lineHeight: 22,
  },
  body: {
    flex: 1,
    minHeight: 0,
  },
});
