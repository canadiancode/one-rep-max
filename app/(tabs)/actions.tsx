import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import {
  APP_SHELL_LABEL_COLOR,
  APP_SHELL_MAIN_TEXT_COLOR,
  APP_SHELL_PRIMARY_BACKGROUND,
  APP_SHELL_SECONDARY_BACKGROUND,
} from "@/constants/app-colors";
import { TAB_SCREEN_ROOT_ABOVE_TAB_BAR } from "@/constants/app-shell";

export default function ActionsScreen() {
  return (
    <ThemedView
      style={styles.container}
      lightColor={APP_SHELL_SECONDARY_BACKGROUND}
      darkColor={APP_SHELL_SECONDARY_BACKGROUND}
    >
      <ThemedText
        type="title"
        lightColor={APP_SHELL_MAIN_TEXT_COLOR}
        darkColor={APP_SHELL_MAIN_TEXT_COLOR}
      >
        Actions
      </ThemedText>
      <ThemedText
        style={styles.body}
        lightColor={APP_SHELL_LABEL_COLOR}
        darkColor={APP_SHELL_LABEL_COLOR}
      >
        This is the actions page. Users will be able to perform actions here.
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 12,
    borderBottomWidth: 0,
    borderBottomColor: APP_SHELL_PRIMARY_BACKGROUND,
    ...TAB_SCREEN_ROOT_ABOVE_TAB_BAR,
  },
  body: {
    textAlign: "center",
  },
});
