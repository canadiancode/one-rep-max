import { ProfileSettingsForm } from "@/features/settings/components/profile-settings-form";
import { SettingsSubScreenLayout } from "@/features/settings/components/settings-sub-screen-layout";

export default function ProfileSettingsScreen() {
  return (
    <SettingsSubScreenLayout>
      <ProfileSettingsForm />
    </SettingsSubScreenLayout>
  );
}
