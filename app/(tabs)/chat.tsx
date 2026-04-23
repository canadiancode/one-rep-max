import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function ChatScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Chat</ThemedText>
      <ThemedText style={styles.body}>
        This is the community chat and announcements.
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
  },
  body: {
    textAlign: "center",
  },
});
