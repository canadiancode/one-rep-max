import { Image } from "expo-image";
import { useCallback, useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import {
  APP_SHELL_PRIMARY_BACKGROUND,
  APP_SHELL_SECONDARY_BACKGROUND,
  TAB_SCREEN_ROOT_ABOVE_TAB_BAR,
} from "@/constants/app-shell";

const DISPLAY_NAME = "Fit_Pixel";

const BEAST_IMAGE = require("@/assets/beast/beast-no-bg.png");

const SETTINGS_ROW_BACKGROUND = require("@/assets/backgrounds/settings-more-selections-button.png");
const SETTINGS_SIGN_OUT_BACKGROUND = require("@/assets/backgrounds/settings-sign-out-button.png");

/** Native asset sizes — row height follows width at each PNG’s aspect ratio (web + native). */
const SETTINGS_ROW_BG_PIXEL_WIDTH = 1039;
const SETTINGS_ROW_BG_PIXEL_HEIGHT = 190;
const SETTINGS_ROW_BG_ASPECT_RATIO =
  SETTINGS_ROW_BG_PIXEL_WIDTH / SETTINGS_ROW_BG_PIXEL_HEIGHT;

const SETTINGS_SIGN_OUT_BG_PIXEL_WIDTH = 1036;
const SETTINGS_SIGN_OUT_BG_PIXEL_HEIGHT = 166;
const SETTINGS_SIGN_OUT_BG_ASPECT_RATIO =
  SETTINGS_SIGN_OUT_BG_PIXEL_WIDTH / SETTINGS_SIGN_OUT_BG_PIXEL_HEIGHT;

const SETTINGS_ROWS = [
  {
    id: "profile",
    label: "Profile",
    caption: "Display name, bio, home gym, visibility",
  },
  {
    id: "health",
    label: "Health & wearables",
    caption: "Connected items, connections, syncing, etc",
  },
  {
    id: "notifications",
    label: "Notifications",
    caption: "Accountability reminders, news & updates, etc",
  },
  {
    id: "social",
    label: "Social medias",
    caption: "Instagram, TikTok, YouTube links",
  },
  {
    id: "preferences",
    label: "Preferences",
    caption: "Unit, theme, etc",
  },
  {
    id: "account",
    label: "Account info",
    caption: "Email, password, etc",
  },
  {
    id: "sign-out",
    label: "Sign out",
    caption: "End session on device",
  },
] as const;

type SettingId = (typeof SETTINGS_ROWS)[number]["id"];

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const [activeSetting, setActiveSetting] = useState<SettingId | null>(null);

  const closeModal = useCallback(() => {
    setActiveSetting(null);
  }, []);

  const activeRow = SETTINGS_ROWS.find((r) => r.id === activeSetting);
  const activeLabel = activeRow?.label ?? "";
  const activeCaption = activeRow?.caption ?? "";

  return (
    <ThemedView
      lightColor={APP_SHELL_PRIMARY_BACKGROUND}
      darkColor={APP_SHELL_PRIMARY_BACKGROUND}
      style={styles.screenRoot}
    >
      <View style={styles.headerRow}>
        <ThemedText
          lightColor="#FFFFFF"
          darkColor="#FFFFFF"
          type="title"
          style={styles.displayName}
          accessibilityRole="header"
        >
          {DISPLAY_NAME}
        </ThemedText>
        <Image
          accessibilityLabel="Beast avatar"
          accessibilityIgnoresInvertColors
          source={BEAST_IMAGE}
          style={styles.beastImage}
          contentFit="contain"
        />
      </View>

      <ScrollView
        style={styles.listScroll}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {SETTINGS_ROWS.map((row) => {
          const isSignOut = row.id === "sign-out";
          const rowAspectRatio = isSignOut
            ? SETTINGS_SIGN_OUT_BG_ASPECT_RATIO
            : SETTINGS_ROW_BG_ASPECT_RATIO;
          const rowBgSource = isSignOut
            ? SETTINGS_SIGN_OUT_BACKGROUND
            : SETTINGS_ROW_BACKGROUND;

          const rowContent = (
            <View style={styles.listRowTextBlock}>
              <ThemedText
                lightColor="#FFFFFF"
                darkColor="#FFFFFF"
                style={[
                  styles.listRowLabel,
                  isSignOut && styles.listRowLabelSignOut,
                ]}
              >
                {row.label}
              </ThemedText>
              <ThemedText
                lightColor="rgba(255,255,255,0.68)"
                darkColor="rgba(255,255,255,0.68)"
                style={[
                  styles.listRowCaption,
                  isSignOut && styles.listRowCaptionSignOut,
                ]}
              >
                {row.caption}
              </ThemedText>
            </View>
          );

          return (
            <Pressable
              key={row.id}
              accessibilityRole="button"
              accessibilityLabel={`${row.label}. ${row.caption}`}
              android_ripple={{ color: "rgba(255,255,255,0.12)" }}
              style={({ pressed }) => [
                styles.listRow,
                styles.listRowWithImageBg,
                pressed && styles.listRowPressed,
              ]}
              onPress={() => setActiveSetting(row.id)}
            >
              <View
                accessibilityElementsHidden
                importantForAccessibility="no-hide-descendants"
                style={[
                  styles.listRowImageShell,
                  { aspectRatio: rowAspectRatio },
                ]}
              >
                <Image
                  accessibilityElementsHidden
                  importantForAccessibility="no-hide-descendants"
                  source={rowBgSource}
                  style={StyleSheet.absoluteFillObject}
                  contentFit="fill"
                />
                <View
                  style={
                    isSignOut
                      ? styles.listRowSignOutImageInner
                      : styles.listRowImageInner
                  }
                >
                  {rowContent}
                </View>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>

      <Modal
        visible={activeSetting !== null}
        animationType="fade"
        transparent
        onRequestClose={closeModal}
      >
        <View style={styles.modalRoot}>
          <Pressable
            style={styles.modalBackdrop}
            onPress={closeModal}
            accessibilityRole="button"
            accessibilityLabel="Dismiss"
          />
          <View
            style={[
              styles.modalCard,
              { marginBottom: Math.max(insets.bottom, 16) },
            ]}
          >
            <ThemedText
              lightColor="#02284f"
              darkColor="#02284f"
              type="subtitle"
              style={styles.modalTitle}
            >
              {activeLabel}
            </ThemedText>
            {activeCaption ? (
              <ThemedText
                lightColor="#333333"
                darkColor="#333333"
                style={styles.modalCaption}
              >
                {activeCaption}
              </ThemedText>
            ) : null}
            <ThemedText
              lightColor="#333333"
              darkColor="#333333"
              style={styles.modalBody}
            >
              This section is not wired up yet. Close and pick another option,
              or go back when you are done.
            </ThemedText>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Close"
              style={styles.modalCloseButton}
              onPress={closeModal}
            >
              <ThemedText
                lightColor="#FFFFFF"
                darkColor="#FFFFFF"
                style={styles.modalCloseLabel}
              >
                Close
              </ThemedText>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screenRoot: {
    flex: 1,
    ...TAB_SCREEN_ROOT_ABOVE_TAB_BAR,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    minHeight: 96,
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 14,
    backgroundColor: APP_SHELL_PRIMARY_BACKGROUND,
  },
  displayName: {
    flex: 1,
    flexShrink: 1,
    fontSize: 22,
    lineHeight: 28,
  },
  beastImage: {
    width: 80,
    height: 80,
  },
  listScroll: {
    flex: 1,
    backgroundColor: APP_SHELL_SECONDARY_BACKGROUND,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: "hidden",
  },
  listContent: {
    flexGrow: 1,
    padding: 16,
    paddingTop: 22,
    gap: 12,
  },
  listRowTextBlock: {
    gap: 6,
  },
  listRow: {
    justifyContent: "center",
    borderRadius: 12,
    overflow: "hidden",
    alignSelf: "stretch",
  },
  listRowWithImageBg: {
    padding: 0,
  },
  /** Height follows width at the row PNG’s aspect ratio (set per row in JSX). */
  listRowImageShell: {
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
  },
  listRowImageInner: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    paddingVertical: 10,
    paddingLeft: 20,
    paddingRight: 44,
  },
  /** Asset has exit icon on the left — inset copy so it does not overlap. */
  listRowSignOutImageInner: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    paddingVertical: 12,
    paddingLeft: 72,
    paddingRight: 20,
  },
  listRowPressed: {
    opacity: 0.85,
  },
  listRowLabel: {
    fontSize: 15,
    lineHeight: 22,
  },
  listRowLabelSignOut: {
    color: "#ff8a8a",
  },
  listRowCaption: {
    fontSize: 10,
    lineHeight: 14,
  },
  listRowCaptionSignOut: {
    color: "rgba(255,138,138,0.85)",
  },
  modalCaption: {
    marginBottom: 10,
    fontSize: 11,
    lineHeight: 15,
  },
  modalRoot: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  modalCard: {
    width: "100%",
    maxWidth: 400,
    borderRadius: 12,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  modalTitle: {
    marginBottom: 12,
  },
  modalBody: {
    marginBottom: 20,
    fontSize: 14,
    lineHeight: 20,
  },
  modalCloseButton: {
    alignSelf: "flex-start",
    backgroundColor: APP_SHELL_PRIMARY_BACKGROUND,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  modalCloseLabel: {
    fontSize: 14,
  },
});
