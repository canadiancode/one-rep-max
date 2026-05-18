import { ScrollView, StyleSheet, View } from "react-native";

import { APP_SHELL_SECONDARY_BACKGROUND } from "@/constants/app-colors";

import {
  ACTION_LIST_LONG_TERM_DIVIDER_LABEL,
  ACTION_ROWS_DAILY,
  ACTION_ROWS_LONG_TERM,
} from "../data";
import { ActionListRow } from "./action-list-row";
import { ActionListSectionDivider } from "./action-list-section-divider";

export function ActionsList() {
  return (
    <View style={styles.panelPage}>
      <ScrollView
        style={styles.listScroll}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {ACTION_ROWS_DAILY.map((row) => (
          <ActionListRow key={row.id} row={row} />
        ))}
        <ActionListSectionDivider label={ACTION_LIST_LONG_TERM_DIVIDER_LABEL} />
        {ACTION_ROWS_LONG_TERM.map((row) => (
          <ActionListRow key={row.id} row={row} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  panelPage: {
    flex: 1,
    backgroundColor: APP_SHELL_SECONDARY_BACKGROUND,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: "hidden",
  },
  listScroll: {
    flex: 1,
    backgroundColor: APP_SHELL_SECONDARY_BACKGROUND,
  },
  listContent: {
    flexGrow: 1,
    padding: 16,
    paddingTop: 22,
    gap: 12,
  },
});
