import { Image } from "expo-image";
import { router } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import {
  APP_SHELL_LABEL_COLOR,
  APP_SHELL_MAIN_TEXT_COLOR,
} from "@/constants/app-colors";
import { GYM_CHATS_COUNT_PLACEHOLDER } from "@/features/chat/constants";
import {
  SETTINGS_ROW_BACKGROUND,
  SETTINGS_ROW_BG_ASPECT_RATIO,
} from "@/features/settings/constants";

export function ViewGymChatsCard() {
  const caption = `# of chats: ${GYM_CHATS_COUNT_PLACEHOLDER}`;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`View gym chats. ${caption}`}
      android_ripple={{ color: "rgba(255,255,255,0.12)" }}
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
      onPress={() => router.push("/(tabs)/chat/gym-chats")}
    >
      <View
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={[
          styles.rowImageShell,
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
        <View style={styles.rowImageInner}>
          <View style={styles.rowTextBlock}>
            <ThemedText
              lightColor={APP_SHELL_MAIN_TEXT_COLOR}
              darkColor={APP_SHELL_MAIN_TEXT_COLOR}
              style={styles.rowLabel}
            >
              View gym chats
            </ThemedText>
            <ThemedText
              lightColor={APP_SHELL_LABEL_COLOR}
              darkColor={APP_SHELL_LABEL_COLOR}
              style={styles.rowCaption}
            >
              {caption}
            </ThemedText>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    alignSelf: "stretch",
    borderRadius: 12,
    overflow: "hidden",
  },
  rowPressed: {
    opacity: 0.85,
  },
  rowImageShell: {
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
  },
  rowImageInner: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    paddingVertical: 10,
    paddingLeft: 20,
    paddingRight: 44,
  },
  rowTextBlock: {
    gap: 6,
  },
  rowLabel: {
    fontSize: 15,
    lineHeight: 22,
  },
  rowCaption: {
    fontSize: 10,
    lineHeight: 14,
  },
});
