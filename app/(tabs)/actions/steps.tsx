import { StyleSheet, View } from "react-native";

import { ActionsSubScreenLayout } from "@/features/actions/components/actions-sub-screen-layout";
import { StepsAddCard } from "@/features/actions/components/steps-add-card";
import { StepsDailyTargetSection } from "@/features/actions/components/steps-daily-target-section";
import { StepsManualConnectedSection } from "@/features/actions/components/steps-manual-connected-section";
import { StepsSummaryCard } from "@/features/actions/components/steps-summary-card";
import { StepsWeeklyHistorySection } from "@/features/actions/components/steps-weekly-history-section";

export default function StepsActionScreen() {
  return (
    <ActionsSubScreenLayout>
      <View style={styles.cards}>
        <StepsSummaryCard />
        <StepsManualConnectedSection />
        <StepsAddCard />
        <StepsWeeklyHistorySection />
        <StepsDailyTargetSection />
      </View>
    </ActionsSubScreenLayout>
  );
}

const styles = StyleSheet.create({
  cards: {
    gap: 12,
  },
});
