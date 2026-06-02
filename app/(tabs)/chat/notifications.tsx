import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { APP_SHELL_LABEL_COLOR } from "@/constants/app-colors";
import { ChatSubScreenLayout } from "@/features/chat/components/chat-sub-screen-layout";

export default function ChatNotificationsScreen() {
  return (
    <ChatSubScreenLayout>
      <ThemedText
        style={styles.body}
        lightColor={APP_SHELL_LABEL_COLOR}
        darkColor={APP_SHELL_LABEL_COLOR}
      >
        Your activity and chat notifications will appear here.
      </ThemedText>
    </ChatSubScreenLayout>
  );
}

const styles = StyleSheet.create({
  body: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 22,
  },
});
