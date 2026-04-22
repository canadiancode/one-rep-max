import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function ActionsScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">actions</ThemedText>
      <ThemedText style={styles.body}>This is the actions page.</ThemedText>
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
  },
  body: {
    textAlign: "center",
  },
});
