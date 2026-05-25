import { StyleSheet, View } from "react-native";

import { WeightManualConnectedSection } from "@/features/actions/components/action-manual-connected-section";
import { ActionsSubScreenLayout } from "@/features/actions/components/actions-sub-screen-layout";
import { WeightAddCard } from "@/features/actions/components/weight-add-card";
import { WeightMonthlyHistorySection } from "@/features/actions/components/weight-monthly-history-section";
import { WeightSummaryCard } from "@/features/actions/components/weight-summary-card";
import { WeightTargetSection } from "@/features/actions/components/weight-target-section";

export default function WeightActionScreen() {
  return (
    <ActionsSubScreenLayout>
      <View style={styles.cards}>
        <WeightSummaryCard />
        <WeightManualConnectedSection />
        <WeightAddCard />
        <WeightMonthlyHistorySection />
        <WeightTargetSection />
      </View>
    </ActionsSubScreenLayout>
  );
}

const styles = StyleSheet.create({
  cards: {
    gap: 12,
  },
});
