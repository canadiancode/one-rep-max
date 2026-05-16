import { useState } from "react";
import { Pressable, StyleSheet, Switch, TextInput, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import {
  APP_SHELL_INPUT_BOARDER_COLOR,
  APP_SHELL_INPUT_PLACEHOLDER_COLOR,
  APP_SHELL_LABEL_COLOR,
  APP_SHELL_MAIN_TEXT_COLOR,
} from "@/constants/app-colors";
import { FONT_FAMILY } from "@/constants/fonts";

export function ProfileSettingsForm() {
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [profileVisible, setProfileVisible] = useState(true);

  return (
    <View style={styles.root}>
      <View style={styles.field}>
        <ThemedText
          lightColor={APP_SHELL_LABEL_COLOR}
          darkColor={APP_SHELL_LABEL_COLOR}
          style={styles.fieldLabel}
        >
          Display name
        </ThemedText>
        <TextInput
          accessibilityLabel="Display name"
          value={displayName}
          onChangeText={setDisplayName}
          placeholder="Fit_Pixel"
          placeholderTextColor={APP_SHELL_INPUT_PLACEHOLDER_COLOR}
          style={styles.singleLineInput}
          autoCapitalize="words"
          autoCorrect
          maxLength={80}
        />
      </View>

      <View style={styles.field}>
        <ThemedText
          lightColor={APP_SHELL_LABEL_COLOR}
          darkColor={APP_SHELL_LABEL_COLOR}
          style={styles.fieldLabel}
        >
          Bio
        </ThemedText>
        <TextInput
          accessibilityLabel="Bio"
          value={bio}
          onChangeText={setBio}
          placeholder="Just a pixel getting fit"
          placeholderTextColor={APP_SHELL_INPUT_PLACEHOLDER_COLOR}
          style={styles.multilineInput}
          multiline
          textAlignVertical="top"
          maxLength={500}
        />
      </View>

      <View style={styles.field}>
        <ThemedText
          lightColor={APP_SHELL_LABEL_COLOR}
          darkColor={APP_SHELL_LABEL_COLOR}
          style={styles.fieldLabel}
        >
          Home gym
        </ThemedText>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Home gym. No gym selected"
          accessibilityHint="Opens gym selection"
          style={({ pressed }) => [
            styles.selectorButton,
            pressed && styles.selectorButtonPressed,
          ]}
          onPress={() => {
            /* gym picker — wire when data layer exists */
          }}
        >
          <ThemedText
            lightColor={APP_SHELL_INPUT_PLACEHOLDER_COLOR}
            darkColor={APP_SHELL_INPUT_PLACEHOLDER_COLOR}
            style={styles.selectorButtonText}
          >
            No gym selected
          </ThemedText>
        </Pressable>
      </View>

      <View style={[styles.field, styles.visibilityRow]}>
        <ThemedText
          lightColor={APP_SHELL_LABEL_COLOR}
          darkColor={APP_SHELL_LABEL_COLOR}
          style={styles.fieldLabel}
        >
          Profile visibility
        </ThemedText>
        <Switch
          accessibilityLabel="Profile visibility"
          value={profileVisible}
          onValueChange={setProfileVisible}
          ios_backgroundColor={APP_SHELL_INPUT_BOARDER_COLOR}
          trackColor={{
            false: APP_SHELL_INPUT_BOARDER_COLOR,
            true: "rgba(120,200,255,0.55)",
          }}
          thumbColor={APP_SHELL_MAIN_TEXT_COLOR}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    gap: 22,
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
  multilineInput: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: APP_SHELL_INPUT_BOARDER_COLOR,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 11,
    color: APP_SHELL_MAIN_TEXT_COLOR,
    fontFamily: FONT_FAMILY,
    fontSize: 14,
    lineHeight: 20,
    minHeight: 120,
  },
  selectorButton: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: APP_SHELL_INPUT_BOARDER_COLOR,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 13,
  },
  selectorButtonPressed: {
    opacity: 0.88,
  },
  selectorButtonText: {
    fontSize: 14,
    lineHeight: 18,
  },
  visibilityRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
});
