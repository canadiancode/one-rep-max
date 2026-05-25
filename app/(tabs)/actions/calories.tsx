import { StyleSheet, View } from "react-native";

import { ActionsSubScreenLayout } from "@/features/actions/components/actions-sub-screen-layout";
import { CaloriesManualConnectedSection } from "@/features/actions/components/action-manual-connected-section";
import { CaloriesAddCard } from "@/features/actions/components/calories-add-card";
import { CaloriesDailyTargetSection } from "@/features/actions/components/calories-daily-target-section";
import { CaloriesSummaryCard } from "@/features/actions/components/calories-summary-card";
import { CaloriesWeeklyHistorySection } from "@/features/actions/components/calories-weekly-history-section";

export default function CaloriesActionScreen() {
  return (
    <ActionsSubScreenLayout>
      <View style={styles.cards}>
        <CaloriesSummaryCard />
        <CaloriesManualConnectedSection />
        <CaloriesAddCard />
        <CaloriesWeeklyHistorySection />
        <CaloriesDailyTargetSection />
      </View>
    </ActionsSubScreenLayout>
  );
}

const styles = StyleSheet.create({
  cards: {
    gap: 12,
  },
});
