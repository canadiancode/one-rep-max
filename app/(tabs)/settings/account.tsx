import { AccountSettingsForm } from "@/features/settings/components/account-settings-form";
import { SettingsSubScreenLayout } from "@/features/settings/components/settings-sub-screen-layout";

export default function AccountSettingsScreen() {
  return (
    <SettingsSubScreenLayout>
      <AccountSettingsForm />
    </SettingsSubScreenLayout>
  );
}
