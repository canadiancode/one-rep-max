import { NotificationsSettingsForm } from "@/features/settings/components/notifications-settings-form";
import { SettingsSubScreenLayout } from "@/features/settings/components/settings-sub-screen-layout";

export default function NotificationsSettingsScreen() {
  return (
    <SettingsSubScreenLayout>
      <NotificationsSettingsForm />
    </SettingsSubScreenLayout>
  );
}
