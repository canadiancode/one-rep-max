import { HealthWearablesSettings } from "@/features/settings/components/health-wearables-settings";
import { SettingsSubScreenLayout } from "@/features/settings/components/settings-sub-screen-layout";

export default function HealthSettingsScreen() {
  return (
    <SettingsSubScreenLayout>
      <HealthWearablesSettings />
    </SettingsSubScreenLayout>
  );
}
