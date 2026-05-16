import { useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import {
  APP_SHELL_INPUT_BOARDER_COLOR,
  APP_SHELL_INPUT_PLACEHOLDER_COLOR,
  APP_SHELL_LABEL_COLOR,
  APP_SHELL_MAIN_TEXT_COLOR,
} from "@/constants/app-colors";
import { FONT_FAMILY } from "@/constants/fonts";

export function AccountSettingsForm() {
  const [email, setEmail] = useState("");

  return (
    <View style={styles.root}>
      <View style={styles.field}>
        <ThemedText
          lightColor={APP_SHELL_LABEL_COLOR}
          darkColor={APP_SHELL_LABEL_COLOR}
          style={styles.fieldLabel}
        >
          Email
        </ThemedText>
        <TextInput
          accessibilityLabel="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="example@example.com"
          placeholderTextColor={APP_SHELL_INPUT_PLACEHOLDER_COLOR}
          style={styles.singleLineInput}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
          keyboardType="email-address"
          textContentType="emailAddress"
          maxLength={254}
        />
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Reset password"
        accessibilityHint="Starts password recovery when account sign-in is connected"
        onPress={() => {
          /* password reset — wire when auth backend exists */
        }}
        style={({ pressed }) => [
          styles.resetButton,
          pressed && styles.resetButtonPressed,
        ]}
      >
        <ThemedText
          lightColor={APP_SHELL_MAIN_TEXT_COLOR}
          darkColor={APP_SHELL_MAIN_TEXT_COLOR}
          style={styles.resetButtonLabel}
        >
          Reset password
        </ThemedText>
      </Pressable>
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
  resetButton: {
    marginTop: 4,
    alignSelf: "stretch",
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(120,200,255,0.55)",
    backgroundColor: "rgba(120,200,255,0.12)",
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  resetButtonPressed: {
    opacity: 0.88,
  },
  resetButtonLabel: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
  },
});
