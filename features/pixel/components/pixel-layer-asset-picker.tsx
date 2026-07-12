import { Image } from "expo-image";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import {
  APP_SHELL_INPUT_BOARDER_COLOR,
  APP_SHELL_MAIN_TEXT_COLOR,
} from "@/constants/app-colors";
import { FONT_FAMILY } from "@/constants/fonts";

import { getOwnedItemsForLayer } from "../layer-assets";
import type { PixelItemId, PixelLayerId } from "../types";

const THUMB_SIZE = 72;
const LABEL_FONT_SIZE = 12;

type Props = {
  layerId: PixelLayerId;
  /** Owned item ids — picker only lists inventory for this layer. */
  inventory: readonly PixelItemId[];
  selectedItemId: PixelItemId | undefined;
  onSelectItem: (itemId: PixelItemId) => void;
};

/**
 * Layer asset list styled like gym chats (`GymChatListRow`):
 * thumb + wrapping label on one row, hairline bottom dividers.
 */
export function PixelLayerAssetPicker({
  layerId,
  inventory,
  selectedItemId,
  onSelectItem,
}: Props) {
  const options = getOwnedItemsForLayer(layerId, inventory);

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.list} accessibilityRole="list">
        {options.map((option, index) => {
          const isSelected = option.id === selectedItemId;
          const showBottomBorder = index < options.length - 1;

          return (
            <View
              key={option.id}
              style={[styles.cell, showBottomBorder && styles.cellBorderBottom]}
            >
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`${option.label}${isSelected ? ", selected" : ""}`}
                accessibilityState={{ selected: isSelected }}
                onPress={() => onSelectItem(option.id)}
                style={({ pressed }) => [
                  styles.hit,
                  pressed && styles.hitPressed,
                ]}
              >
                <View style={styles.row}>
                  <View
                    style={[
                      styles.thumbShell,
                      isSelected && styles.thumbSelected,
                    ]}
                  >
                    <Image
                      accessibilityIgnoresInvertColors
                      source={option.source}
                      style={[
                        styles.thumbImage,
                        layerId === "skin" && styles.thumbImageSkinZoom,
                        layerId === "eyes" && styles.thumbImageEyesZoom,
                        layerId === "mouth" && styles.thumbImageMouthZoom,
                        layerId === "top" && styles.thumbImageTopZoom,
                        layerId === "bottom" && styles.thumbImageBottomZoom,
                        layerId === "shoes" && styles.thumbImageShoesZoom,
                        layerId === "hair" && styles.thumbImageHairZoom,
                        layerId === "item_left" &&
                          styles.thumbImageItemLeftZoom,
                        layerId === "item_right" &&
                          styles.thumbImageItemRightZoom,
                      ]}
                      contentFit="cover"
                    />
                  </View>
                  <View style={styles.textColumn}>
                    <ThemedText
                      lightColor={APP_SHELL_MAIN_TEXT_COLOR}
                      darkColor={APP_SHELL_MAIN_TEXT_COLOR}
                      style={styles.label}
                    >
                      {option.label}
                    </ThemedText>
                  </View>
                </View>
              </Pressable>
            </View>
          );
        })}
      </View>
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
    paddingTop: 18,
  },
  list: {
    alignSelf: "stretch",
    borderRadius: 12,
    overflow: "hidden",
  },
  cell: {
    alignSelf: "stretch",
    paddingVertical: 10,
  },
  cellBorderBottom: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: APP_SHELL_INPUT_BOARDER_COLOR,
  },
  hit: {
    alignSelf: "stretch",
  },
  hitPressed: {
    opacity: 0.85,
  },
  row: {
    flexDirection: "row",
    alignItems: "stretch",
    gap: 12,
    alignSelf: "stretch",
  },
  thumbShell: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: 10,
    flexShrink: 0,
    alignSelf: "center",
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "transparent",
  },
  thumbSelected: {
    borderColor: APP_SHELL_MAIN_TEXT_COLOR,
  },
  thumbImage: {
    width: "100%",
    height: "100%",
  },
  /** Skin only: zoom and nudge for framing inside the clipped shell. */
  thumbImageSkinZoom: {
    transform: [{ translateX: 0 }, { translateY: -8 }, { scale: 1.5 }],
  },
  /** Eyes only: zoom and nudge for framing inside the clipped shell. */
  thumbImageEyesZoom: {
    transform: [{ translateX: -7 }, { translateY: 35 }, { scale: 6 }],
  },
  /** Mouth only: zoom and nudge for framing inside the clipped shell. */
  thumbImageMouthZoom: {
    transform: [{ translateX: -12 }, { translateY: 38 }, { scale: 12 }],
  },
  /** Top only: zoom and nudge for framing inside the clipped shell. */
  thumbImageTopZoom: {
    transform: [{ translateX: 0 }, { translateY: -10 }, { scale: 3 }],
  },
  /** Bottom only: zoom and nudge for framing inside the clipped shell. */
  thumbImageBottomZoom: {
    transform: [{ translateX: 0 }, { translateY: -38 }, { scale: 2.6 }],
  },
  /** Shoes only: zoom and nudge for framing inside the clipped shell. */
  thumbImageShoesZoom: {
    transform: [{ translateX: 0 }, { translateY: -60 }, { scale: 3 }],
  },
  /** Hair only: zoom and nudge for framing inside the clipped shell. */
  thumbImageHairZoom: {
    transform: [{ translateX: 4 }, { translateY: 20 }, { scale: 2.3 }],
  },
  /** Left item only: zoom and nudge for framing inside the clipped shell. */
  thumbImageItemLeftZoom: {
    transform: [{ translateX: 55 }, { translateY: -55 }, { scale: 3 }],
  },
  /** Right item only: zoom and nudge for framing inside the clipped shell. */
  thumbImageItemRightZoom: {
    transform: [{ translateX: -46 }, { translateY: -40 }, { scale: 2.2 }],
  },
  textColumn: {
    flex: 1,
    minWidth: 0,
    justifyContent: "center",
  },
  label: {
    fontFamily: FONT_FAMILY,
    fontSize: LABEL_FONT_SIZE,
    lineHeight: 18,
    fontWeight: "600",
  },
});
