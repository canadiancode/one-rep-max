import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import {
  APP_SHELL_MAIN_TEXT_COLOR,
  APP_SHELL_PRIMARY_BACKGROUND,
} from "@/constants/app-colors";

import { BEAST_IMAGE, DISPLAY_NAME } from "../constants";

export function SettingsHeader() {
  return (
    <View style={styles.headerRow}>
      <ThemedText
        lightColor={APP_SHELL_MAIN_TEXT_COLOR}
        darkColor={APP_SHELL_MAIN_TEXT_COLOR}
        type="title"
        style={styles.displayName}
        accessibilityRole="header"
      >
        {DISPLAY_NAME}
      </ThemedText>
      <Image
        accessibilityLabel="Beast avatar"
        accessibilityIgnoresInvertColors
        source={BEAST_IMAGE}
        style={styles.beastImage}
        contentFit="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    minHeight: 96,
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 14,
    backgroundColor: APP_SHELL_PRIMARY_BACKGROUND,
  },
  displayName: {
    flex: 1,
    flexShrink: 1,
    fontSize: 22,
    lineHeight: 28,
  },
  beastImage: {
    width: 80,
    height: 80,
  },
});
