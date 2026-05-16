import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import {
  APP_SHELL_INPUT_BOARDER_COLOR,
  APP_SHELL_INPUT_PLACEHOLDER_COLOR,
  APP_SHELL_LABEL_COLOR,
  APP_SHELL_MAIN_TEXT_COLOR,
} from "@/constants/app-colors";
import { FONT_FAMILY } from "@/constants/fonts";

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
        <TextInput
          accessibilityLabel="Instagram profile or link"
          value={instagram}
          onChangeText={setInstagram}
          placeholder="@yourhandle or profile link"
          placeholderTextColor={APP_SHELL_INPUT_PLACEHOLDER_COLOR}
          style={styles.singleLineInput}
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
        <TextInput
          accessibilityLabel="TikTok profile or link"
          value={tiktok}
          onChangeText={setTiktok}
          placeholder="@yourhandle or profile link"
          placeholderTextColor={APP_SHELL_INPUT_PLACEHOLDER_COLOR}
          style={styles.singleLineInput}
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
        <TextInput
          accessibilityLabel="YouTube channel or link"
          value={youtube}
          onChangeText={setYoutube}
          placeholder="@yourhandle or channel link"
          placeholderTextColor={APP_SHELL_INPUT_PLACEHOLDER_COLOR}
          style={styles.singleLineInput}
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
  singleLineInput: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: APP_SHELL_INPUT_BOARDER_COLOR,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 11,
    color: APP_SHELL_MAIN_TEXT_COLOR,
    fontFamily: FONT_FAMILY,
    fontSize: 14,
    lineHeight: 18,
  },
});
