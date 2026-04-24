import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { APP_SHELL_PRIMARY_BACKGROUND } from "@/constants/app-shell";

export default function SettingsScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Settings</ThemedText>
      <ThemedText style={styles.body}>
        This is the settings. Users will be able to customize their profile
        here.
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
    borderBottomWidth: 5,
    borderBottomColor: APP_SHELL_PRIMARY_BACKGROUND,
  },
  body: {
    textAlign: "center",
  },
});
