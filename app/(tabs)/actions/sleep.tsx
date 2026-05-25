import { StyleSheet, View } from "react-native";

import { ActionsSubScreenLayout } from "@/features/actions/components/actions-sub-screen-layout";
import { SleepManualConnectedSection } from "@/features/actions/components/action-manual-connected-section";
import { SleepAddCard } from "@/features/actions/components/sleep-add-card";
import { SleepDailyTargetSection } from "@/features/actions/components/sleep-daily-target-section";
import { SleepSummaryCard } from "@/features/actions/components/sleep-summary-card";
import { SleepWeeklyHistorySection } from "@/features/actions/components/sleep-weekly-history-section";

export default function SleepActionScreen() {
  return (
    <ActionsSubScreenLayout>
      <View style={styles.cards}>
        <SleepSummaryCard />
        <SleepManualConnectedSection />
        <SleepAddCard />
        <SleepWeeklyHistorySection />
        <SleepDailyTargetSection />
      </View>
    </ActionsSubScreenLayout>
  );
}

const styles = StyleSheet.create({
  cards: {
    gap: 12,
  },
});
