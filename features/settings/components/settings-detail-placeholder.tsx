import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { APP_SHELL_MAIN_TEXT_COLOR } from "@/constants/app-colors";

import type { SettingsRouteId } from "../data";

import { SettingsSubScreenLayout } from "./settings-sub-screen-layout";

type Props = {
  routeId: SettingsRouteId;
};

export function SettingsDetailPlaceholder({ routeId }: Props) {
  void routeId;

  return (
    <SettingsSubScreenLayout>
      <View style={styles.block}>
        <ThemedText
          lightColor={APP_SHELL_MAIN_TEXT_COLOR}
          darkColor={APP_SHELL_MAIN_TEXT_COLOR}
          style={styles.body}
        >
          This section is not wired up yet. Use the back control to return to
          the main settings list.
        </ThemedText>
      </View>
    </SettingsSubScreenLayout>
  );
}

const styles = StyleSheet.create({
  block: {
    gap: 12,
  },
  body: {
    fontSize: 14,
    lineHeight: 20,
  },
});
