import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { APP_SHELL_SECONDARY_BACKGROUND } from "@/constants/app-shell";

type Props = {
  children: React.ReactNode;
};

export function SettingsSubScreenLayout({ children }: Props) {
  const router = useRouter();

  return (
    <View style={styles.root}>
      <View style={styles.toolbar}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Back to settings"
          hitSlop={12}
          onPress={() => router.back()}
          style={({ pressed }) => [styles.backHit, pressed && styles.backPressed]}
        >
          <ThemedText
            lightColor="#FFFFFF"
            darkColor="#FFFFFF"
            style={styles.backLabel}
          >
            ‹ Back
          </ThemedText>
        </Pressable>
      </View>
      <ScrollView
        style={styles.bodyScroll}
        contentContainerStyle={styles.bodyContent}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: APP_SHELL_SECONDARY_BACKGROUND,
  },
  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingTop: 14,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(255,255,255,0.12)",
  },
  backHit: {
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  backPressed: {
    opacity: 0.85,
  },
  backLabel: {
    fontSize: 16,
    lineHeight: 22,
  },
  bodyScroll: {
    flex: 1,
  },
  bodyContent: {
    padding: 16,
    paddingTop: 18,
  },
});
