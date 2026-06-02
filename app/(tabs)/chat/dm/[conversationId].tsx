import { useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import {
  APP_SHELL_LABEL_COLOR,
  APP_SHELL_MAIN_TEXT_COLOR,
} from "@/constants/app-colors";
import { ChatSubScreenLayout } from "@/features/chat/components/chat-sub-screen-layout";

export default function DmScreen() {
  const { conversationId } = useLocalSearchParams<{ conversationId: string }>();

  return (
    <ChatSubScreenLayout>
      <ThemedText
        type="title"
        lightColor={APP_SHELL_MAIN_TEXT_COLOR}
        darkColor={APP_SHELL_MAIN_TEXT_COLOR}
      >
        Direct message
      </ThemedText>
      <ThemedText
        style={styles.body}
        lightColor={APP_SHELL_LABEL_COLOR}
        darkColor={APP_SHELL_LABEL_COLOR}
      >
        Conversation {conversationId ?? "—"}. DM template coming soon.
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
