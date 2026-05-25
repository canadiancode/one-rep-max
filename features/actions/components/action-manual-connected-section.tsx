import { StyleSheet, Text, View } from "react-native";

import {
  APP_SHELL_INPUT_BOARDER_COLOR,
  APP_SHELL_LABEL_COLOR,
  APP_SHELL_MAIN_TEXT_COLOR,
} from "@/constants/app-colors";
import { FONT_FAMILY } from "@/constants/fonts";

type ActionManualConnectedSectionProps = {
  /** Shown under “Manual input”. */
  manualValueLabel: string;
  /** Shown under “Connected data”; defaults to `manualValueLabel`. */
  connectedValueLabel?: string;
};

export function ActionManualConnectedSection({
  manualValueLabel,
  connectedValueLabel = manualValueLabel,
}: ActionManualConnectedSectionProps) {
  const a11y = `Manual input, ${manualValueLabel}. Connected data, ${connectedValueLabel}.`;

  return (
    <View
      accessible
      accessibilityRole="summary"
      accessibilityLabel={a11y}
      style={styles.row}
    >
      <View style={styles.cell}>
        <Text style={styles.cellTitle}>Manual input</Text>
        <Text style={styles.cellValue}>{manualValueLabel}</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.cell}>
        <Text style={styles.cellTitle}>Connected data</Text>
        <Text style={styles.cellValue}>{connectedValueLabel}</Text>
      </View>
    </View>
  );
}

const PLACEHOLDER_N = 5000;
const n = PLACEHOLDER_N.toLocaleString("en-US");

/** Placeholder until manual vs HealthKit (or similar) totals are wired. */
export function StepsManualConnectedSection() {
  return <ActionManualConnectedSection manualValueLabel={`${n} steps`} />;
}

/** Placeholder until manual vs HealthKit (or similar) totals are wired. */
export function CaloriesManualConnectedSection() {
  return (
    <ActionManualConnectedSection
      manualValueLabel="0 KCAL"
      connectedValueLabel="800 KCAL"
    />
  );
}

/** Placeholder until manual vs HealthKit (or similar) totals are wired. */
export function WeightManualConnectedSection() {
  return <ActionManualConnectedSection manualValueLabel="123 LBS" />;
}

/** Placeholder until manual vs HealthKit (or similar) totals are wired. */
export function SleepManualConnectedSection() {
  return (
    <ActionManualConnectedSection
      manualValueLabel="8H"
      connectedValueLabel="0M"
    />
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "stretch",
    alignSelf: "stretch",
    paddingVertical: 4,
    gap: 0,
  },
  cell: {
    flex: 1,
    minWidth: 0,
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 8,
  },
  cellTitle: {
    fontFamily: FONT_FAMILY,
    fontSize: 11,
    lineHeight: 15,
    fontWeight: "600",
    color: APP_SHELL_LABEL_COLOR,
    textAlign: "center",
  },
  cellValue: {
    fontFamily: FONT_FAMILY,
    fontSize: 13,
    lineHeight: 17,
    fontWeight: "500",
    color: APP_SHELL_MAIN_TEXT_COLOR,
    textAlign: "center",
  },
  divider: {
    width: StyleSheet.hairlineWidth,
    alignSelf: "stretch",
    backgroundColor: APP_SHELL_INPUT_BOARDER_COLOR,
  },
});
