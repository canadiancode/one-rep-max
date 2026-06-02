import { ScrollView, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import {
  APP_SHELL_LABEL_COLOR,
  APP_SHELL_MAIN_TEXT_COLOR,
  APP_SHELL_SECONDARY_BACKGROUND,
} from "@/constants/app-colors";

import { ViewGymChatsCard } from "./view-gym-chats-card";

/** Room for the absolutely positioned gym-chats card above the tab bar. */
const FOOTER_CARD_ESTIMATED_HEIGHT = 100;

export function ChatIndexBody() {
  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <ThemedText
          lightColor={APP_SHELL_MAIN_TEXT_COLOR}
          darkColor={APP_SHELL_MAIN_TEXT_COLOR}
          style={styles.heading}
        >
          Make friends!
        </ThemedText>
        <ThemedText
          lightColor={APP_SHELL_LABEL_COLOR}
          darkColor={APP_SHELL_LABEL_COLOR}
          style={styles.body}
        >
          Search for Pixels by name
        </ThemedText>
      </ScrollView>
      <View style={styles.footer} pointerEvents="box-none">
        <ViewGymChatsCard />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: APP_SHELL_SECONDARY_BACKGROUND,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 22,
    paddingBottom: FOOTER_CARD_ESTIMATED_HEIGHT + 24,
  },
  heading: {
    fontSize: 18,
    lineHeight: 26,
    marginBottom: 10,
  },
  body: {
    fontSize: 14,
    lineHeight: 22,
  },
  footer: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 16,
  },
});
