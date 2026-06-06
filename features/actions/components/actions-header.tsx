import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { XpLevelBar } from "@/components/xp-level-bar";
import {
  APP_SHELL_MAIN_TEXT_COLOR,
  APP_SHELL_PRIMARY_BACKGROUND,
} from "@/constants/app-colors";

import {
  TAB_HEADER_CONTENT_HEIGHT,
  TAB_HEADER_ROW_LAYOUT,
} from "@/constants/app-shell";
import {
  ACTIONS_DAILY_PROGRESS_FILL_PERCENT,
  ACTIONS_DAILY_PROGRESS_LABEL_PERCENT,
} from "@/features/actions/constants";

export function ActionsHeader() {
  const fillPercent = ACTIONS_DAILY_PROGRESS_FILL_PERCENT;
  const progressPercent = ACTIONS_DAILY_PROGRESS_LABEL_PERCENT;

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

const styles = StyleSheet.create({
  headerRow: {
    ...TAB_HEADER_ROW_LAYOUT,
    backgroundColor: APP_SHELL_PRIMARY_BACKGROUND,
  },
  contentBlock: {
    height: TAB_HEADER_CONTENT_HEIGHT,
    justifyContent: "flex-end",
    gap: 4,
  },
  title: {
    fontSize: 20,
    lineHeight: 28,
  },
  bar: {
    alignSelf: "stretch",
  },
});
