import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import {
  APP_SHELL_LABEL_COLOR,
  APP_SHELL_MAIN_TEXT_COLOR,
} from "@/constants/app-colors";
import { FONT_FAMILY } from "@/constants/fonts";
import { GymChatListRow } from "@/features/chat/components/gym-chat-list-row";
import { ChatSubScreenLayout } from "@/features/chat/components/chat-sub-screen-layout";
import { FAKE_SAVED_GYM_CHATS } from "@/features/chat/gym-chats-fake-data";

export default function GymChatsScreen() {
  const chats = FAKE_SAVED_GYM_CHATS;

  return (
    <ChatSubScreenLayout>
      <View style={styles.block}>
        <ThemedText
          lightColor={APP_SHELL_MAIN_TEXT_COLOR}
          darkColor={APP_SHELL_MAIN_TEXT_COLOR}
          style={styles.title}
          accessibilityRole="header"
        >
          Gym chats
        </ThemedText>
        <ThemedText
          lightColor={APP_SHELL_LABEL_COLOR}
          darkColor={APP_SHELL_LABEL_COLOR}
          style={styles.body}
        >
          Gyms you&apos;ve joined for community chat.
        </ThemedText>
        <View style={styles.list} accessibilityRole="list">
          {chats.map((item, index) => (
            <GymChatListRow
              key={item.id}
              gymId={item.id}
              name={item.name}
              memberCount={item.memberCount}
              background_img={item.background_img}
              showBottomBorder={index < chats.length - 1}
            />
          ))}
        </View>
      </View>
    </ChatSubScreenLayout>
  );
}

const styles = StyleSheet.create({
  block: {
    gap: 12,
    alignSelf: "stretch",
  },
  title: {
    fontFamily: FONT_FAMILY,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "700",
  },
  body: {
    fontFamily: FONT_FAMILY,
    fontSize: 14,
    lineHeight: 20,
  },
  list: {
    alignSelf: "stretch",
    marginTop: 4,
    borderRadius: 12,
    overflow: "hidden",
  },
});
