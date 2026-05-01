import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import {
  APP_SHELL_PRIMARY_BACKGROUND,
  TAB_SCREEN_ROOT_ABOVE_TAB_BAR,
} from "@/constants/app-shell";

/**
 * Default / web route. Native map UI is in `map.native.tsx`. On web, Metro aliases
 * `react-native-maps` to `shims/react-native-maps.web.tsx` so `require.context` can
 * include `.native` routes without bundling native codegen.
 */
export default function MapScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Map</ThemedText>
      <ThemedText style={styles.body}>
        The gym map runs in the iOS and Android app. Open this project in Expo
        Go on your phone to use the map tab.
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
