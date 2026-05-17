import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { XpLevelBar } from "@/components/xp-level-bar";
import {
  APP_SHELL_MAIN_TEXT_COLOR,
  APP_SHELL_PRIMARY_BACKGROUND,
} from "@/constants/app-colors";
import {
  getXpBarFillPercent,
  getXpProgressInCurrentLevelPercent,
} from "@/lib/xp-progress";

export function ActionsHeader() {
  const fillPercent = getXpBarFillPercent();
  const progressPercent = getXpProgressInCurrentLevelPercent();

  return (
    <View style={styles.headerRow}>
      <View style={styles.contentBlock}>
        <ThemedText
          lightColor={APP_SHELL_MAIN_TEXT_COLOR}
          darkColor={APP_SHELL_MAIN_TEXT_COLOR}
          type="title"
          style={styles.title}
          accessibilityRole="header"
        >
          Today&apos;s progress
        </ThemedText>
        <XpLevelBar
          fillPercent={fillPercent}
          progressPercent={progressPercent}
          style={styles.bar}
        />
      </View>
    </View>
  );
}

/** Matches `settings-header` beast image height so both blue bands align. */
const HEADER_CONTENT_HEIGHT = 80;

const styles = StyleSheet.create({
  headerRow: {
    minHeight: 96,
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 14,
    backgroundColor: APP_SHELL_PRIMARY_BACKGROUND,
  },
  contentBlock: {
    height: HEADER_CONTENT_HEIGHT,
    justifyContent: "flex-end",
    gap: 4,
  },
  title: {
    fontSize: 22,
    lineHeight: 28,
  },
  bar: {
    alignSelf: "stretch",
  },
});
