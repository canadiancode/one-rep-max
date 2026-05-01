import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { APP_SHELL_PRIMARY_BACKGROUND } from "@/constants/app-shell";

/**
 * Web bundle cannot load `react-native-maps` (native-only). This route file is
 * picked instead of `map.tsx` when the platform is web.
 */
export default function MapScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Map</ThemedText>
      <ThemedText style={styles.body}>
        The gym map runs in the iOS and Android app. Open this project in Expo Go
        on your phone to use the map tab.
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
