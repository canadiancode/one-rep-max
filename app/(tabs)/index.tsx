import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function MyBeastScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">My Beast</ThemedText>
      <ThemedText style={styles.body}>
        This is the homepage. This will display quick status about a users
        beast.
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
    borderBottomColor: "#04418c",
  },
  body: {
    textAlign: "center",
  },
});
