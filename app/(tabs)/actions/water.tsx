import { StyleSheet, View } from "react-native";

import { ActionsSubScreenLayout } from "@/features/actions/components/actions-sub-screen-layout";
import { WaterAddCard } from "@/features/actions/components/water-add-card";
import { WaterSummaryCard } from "@/features/actions/components/water-summary-card";
import { WaterWeeklyHistorySection } from "@/features/actions/components/water-weekly-history-section";

export default function WaterActionScreen() {
  return (
    <ActionsSubScreenLayout>
      <View style={styles.cards}>
        <WaterSummaryCard />
        <WaterAddCard />
        <WaterWeeklyHistorySection />
      </View>
    </ActionsSubScreenLayout>
  );
}

const styles = StyleSheet.create({
  cards: {
    gap: 12,
  },
});
