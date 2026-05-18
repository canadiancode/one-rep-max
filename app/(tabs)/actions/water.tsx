import { StyleSheet, View } from "react-native";

import { ActionsSubScreenLayout } from "@/features/actions/components/actions-sub-screen-layout";
import { WaterAddCard } from "@/features/actions/components/water-add-card";
import { WaterSummaryCard } from "@/features/actions/components/water-summary-card";

export default function WaterActionScreen() {
  return (
    <ActionsSubScreenLayout>
      <View style={styles.cards}>
        <WaterSummaryCard />
        <WaterAddCard />
      </View>
    </ActionsSubScreenLayout>
  );
}

const styles = StyleSheet.create({
  cards: {
    gap: 12,
  },
});
