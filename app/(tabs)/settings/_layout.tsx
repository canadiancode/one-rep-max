import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

import { ThemedView } from "@/components/themed-view";
import {
  APP_SHELL_PRIMARY_BACKGROUND,
  APP_SHELL_SECONDARY_BACKGROUND,
  TAB_SCREEN_ROOT_ABOVE_TAB_BAR,
} from "@/constants/app-shell";
import { SettingsHeader } from "@/features/settings/components/settings-header";

/** Keeps stack base as `index` so pushes to child routes resolve (see Expo Router settings). */
export const unstable_settings = {
  initialRouteName: "index",
};

export default function SettingsLayout() {
  return (
    <ThemedView
      lightColor={APP_SHELL_PRIMARY_BACKGROUND}
      darkColor={APP_SHELL_PRIMARY_BACKGROUND}
      style={styles.screenRoot}
    >
      <SettingsHeader />
      <View style={styles.stackChrome}>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
            contentStyle: {
              flex: 1,
              backgroundColor: APP_SHELL_SECONDARY_BACKGROUND,
            },
          }}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screenRoot: {
    flex: 1,
    ...TAB_SCREEN_ROOT_ABOVE_TAB_BAR,
  },
  stackChrome: {
    flex: 1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: "hidden",
    backgroundColor: APP_SHELL_SECONDARY_BACKGROUND,
  },
});
