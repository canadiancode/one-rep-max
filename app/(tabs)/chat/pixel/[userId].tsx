import { useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import {
  APP_SHELL_LABEL_COLOR,
  APP_SHELL_MAIN_TEXT_COLOR,
} from "@/constants/app-colors";
import { ChatSubScreenLayout } from "@/features/chat/components/chat-sub-screen-layout";

export default function PixelProfileScreen() {
  const { userId } = useLocalSearchParams<{ userId: string }>();

  return (
    <ChatSubScreenLayout>
      <ThemedText
        type="title"
        lightColor={APP_SHELL_MAIN_TEXT_COLOR}
        darkColor={APP_SHELL_MAIN_TEXT_COLOR}
      >
        Pixel profile
      </ThemedText>
      <ThemedText
        style={styles.body}
        lightColor={APP_SHELL_LABEL_COLOR}
        darkColor={APP_SHELL_LABEL_COLOR}
      >
        Profile for Pixel {userId ?? "—"}. Accessories, friend, DM, and report
        actions coming soon.
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
