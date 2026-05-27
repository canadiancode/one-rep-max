import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { APP_SHELL_LABEL_COLOR } from "@/constants/app-colors";
import { SettingsSingleLineTextField } from "@/features/settings/components/settings-text-field";

export function SocialSettingsForm() {
  const [instagram, setInstagram] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [youtube, setYoutube] = useState("");

  return (
    <View style={styles.root}>
      <View style={styles.field}>
        <ThemedText
          lightColor={APP_SHELL_LABEL_COLOR}
          darkColor={APP_SHELL_LABEL_COLOR}
          style={styles.fieldLabel}
        >
          Instagram
        </ThemedText>
        <SettingsSingleLineTextField
          accessibilityLabel="Instagram profile or link"
          value={instagram}
          onChangeText={setInstagram}
          placeholder="@yourhandle or profile link"
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={200}
        />
      </View>

      <View style={styles.field}>
        <ThemedText
          lightColor={APP_SHELL_LABEL_COLOR}
          darkColor={APP_SHELL_LABEL_COLOR}
          style={styles.fieldLabel}
        >
          TikTok
        </ThemedText>
        <SettingsSingleLineTextField
          accessibilityLabel="TikTok profile or link"
          value={tiktok}
          onChangeText={setTiktok}
          placeholder="@yourhandle or profile link"
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={200}
        />
      </View>

      <View style={styles.field}>
        <ThemedText
          lightColor={APP_SHELL_LABEL_COLOR}
          darkColor={APP_SHELL_LABEL_COLOR}
          style={styles.fieldLabel}
        >
          YouTube
        </ThemedText>
        <SettingsSingleLineTextField
          accessibilityLabel="YouTube channel or link"
          value={youtube}
          onChangeText={setYoutube}
          placeholder="@yourhandle or channel link"
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={200}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    gap: 22,
    paddingBottom: 28,
  },
  field: {
    gap: 6,
  },
  fieldLabel: {
    fontSize: 12,
    lineHeight: 16,
  },
});
