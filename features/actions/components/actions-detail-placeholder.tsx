import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { APP_SHELL_MAIN_TEXT_COLOR } from "@/constants/app-colors";

import { getActionRow, type ActionRouteId } from "../data";

import { ActionsSubScreenLayout } from "./actions-sub-screen-layout";

type Props = {
  routeId: ActionRouteId;
};

export function ActionsDetailPlaceholder({ routeId }: Props) {
  const row = getActionRow(routeId);

  return (
    <ActionsSubScreenLayout>
      <View style={styles.block}>
        <ThemedText
          lightColor={APP_SHELL_MAIN_TEXT_COLOR}
          darkColor={APP_SHELL_MAIN_TEXT_COLOR}
          style={styles.title}
        >
          {row.label}
        </ThemedText>
        <ThemedText
          lightColor={APP_SHELL_MAIN_TEXT_COLOR}
          darkColor={APP_SHELL_MAIN_TEXT_COLOR}
          style={styles.body}
        >
          Log {row.label.toLowerCase()} here to earn XP and help your beast
          grow. This flow is not wired up yet — use the back control to return
          to the actions list.
        </ThemedText>
      </View>
    </ActionsSubScreenLayout>
  );
}

const styles = StyleSheet.create({
  block: {
    gap: 12,
  },
  title: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "600",
  },
  body: {
    fontSize: 14,
    lineHeight: 20,
  },
});
