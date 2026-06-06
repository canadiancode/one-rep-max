import { useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { APP_SHELL_LABEL_COLOR } from "@/constants/app-colors";
import { ChatSubScreenLayout } from "@/features/chat/components/chat-sub-screen-layout";
import { GymChatHeaderCard } from "@/features/chat/components/gym-chat-header-card";
import { getFakeGymChatById } from "@/features/chat/gym-chats-fake-data";

export default function GymChatScreen() {
  const { gymId: gymIdParam } = useLocalSearchParams<{ gymId: string }>();
  const id = (Array.isArray(gymIdParam) ? gymIdParam[0] : gymIdParam) ?? "";
  const [threadHeroCollapsed, setThreadHeroCollapsed] = useState(false);

  const gym = useMemo(() => (id ? getFakeGymChatById(id) : undefined), [id]);

  const name = gym?.name ?? "Gym chat";
  const memberCount = gym?.memberCount ?? 0;
  const liveViewerCount = gym?.liveViewerCount ?? 0;
  const background_img = gym?.background_img;

  return (
    <ChatSubScreenLayout
      showGymToolbarChevron
      gymThreadHeroCollapsed={threadHeroCollapsed}
      onGymThreadHeroCollapseToggle={() =>
        setThreadHeroCollapsed((prev) => !prev)
      }
      stackLeader={
        <GymChatHeaderCard
          collapsed={threadHeroCollapsed}
          name={name}
          memberCount={memberCount}
          liveViewerCount={liveViewerCount}
          background_img={background_img}
        />
      }
    >
      {!gym && id ? (
        <ThemedText
          style={styles.hint}
          lightColor={APP_SHELL_LABEL_COLOR}
          darkColor={APP_SHELL_LABEL_COLOR}
        >
          No saved details for this gym yet ({id}). Using defaults until the
          feed is wired up.
        </ThemedText>
      ) : null}
      <ThemedText
        style={styles.body}
        lightColor={APP_SHELL_LABEL_COLOR}
        darkColor={APP_SHELL_LABEL_COLOR}
      >
        Messages and members coming soon.
      </ThemedText>
    </ChatSubScreenLayout>
  );
}

const styles = StyleSheet.create({
  body: {
    fontSize: 14,
    lineHeight: 22,
  },
  hint: {
    fontSize: 13,
    lineHeight: 20,
  },
});
