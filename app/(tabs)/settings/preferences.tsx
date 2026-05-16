import { PreferencesSettingsForm } from "@/features/settings/components/preferences-settings-form";
import { SettingsSubScreenLayout } from "@/features/settings/components/settings-sub-screen-layout";

export default function PreferencesSettingsScreen() {
  return (
    <SettingsSubScreenLayout>
      <PreferencesSettingsForm />
    </SettingsSubScreenLayout>
  );
}
