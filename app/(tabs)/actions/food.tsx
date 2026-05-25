import { StyleSheet, View } from "react-native";

import { ActionsSubScreenLayout } from "@/features/actions/components/actions-sub-screen-layout";
import { FoodDailyHistorySection } from "@/features/actions/components/food-daily-history-section";
import { FoodDailyTargetSection } from "@/features/actions/components/food-daily-target-section";
import { FoodRecentMealsSection } from "@/features/actions/components/food-recent-meals-section";
import { FoodSavedMealsSection } from "@/features/actions/components/food-saved-meals-section";
import { FoodSummaryCard } from "@/features/actions/components/food-summary-card";

export default function FoodActionScreen() {
  return (
    <ActionsSubScreenLayout>
      <View style={styles.cards}>
        <FoodSummaryCard />
        <FoodRecentMealsSection />
        <FoodSavedMealsSection />
        <FoodDailyHistorySection />
        <FoodDailyTargetSection />
      </View>
    </ActionsSubScreenLayout>
  );
}

const styles = StyleSheet.create({
  cards: {
    gap: 12,
  },
});
