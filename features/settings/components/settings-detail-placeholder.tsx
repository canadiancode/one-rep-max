import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";

import type { SettingsRouteId } from "../data";
import { getSettingsRow } from "../data";

import { SettingsSubScreenLayout } from "./settings-sub-screen-layout";

type Props = {
  routeId: SettingsRouteId;
};

export function SettingsDetailPlaceholder({ routeId }: Props) {
  const row = getSettingsRow(routeId);

  return (
    <SettingsSubScreenLayout>
      <View style={styles.block}>
        <ThemedText
          lightColor="#FFFFFF"
          darkColor="#FFFFFF"
          type="subtitle"
          style={styles.title}
        >
          {row.label}
        </ThemedText>
        <ThemedText
          lightColor="rgba(255,255,255,0.72)"
          darkColor="rgba(255,255,255,0.72)"
          style={styles.caption}
        >
          {row.caption}
        </ThemedText>
        <ThemedText
          lightColor="rgba(255,255,255,0.85)"
          darkColor="rgba(255,255,255,0.85)"
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
  title: {
    fontSize: 18,
    lineHeight: 24,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
  },
  body: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
  },
});
