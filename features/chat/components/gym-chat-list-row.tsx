import { Image } from "expo-image";
import { router } from "expo-router";
import type { ImageSourcePropType } from "react-native";
import { Pressable, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import {
  APP_SHELL_INPUT_BOARDER_COLOR,
  APP_SHELL_LABEL_COLOR,
  APP_SHELL_MAIN_TEXT_COLOR,
} from "@/constants/app-colors";
import { FONT_FAMILY } from "@/constants/fonts";
import {
  DEFAULT_GYM_CHAT_IMAGE,
  GYM_CHAT_USER_ICON,
} from "@/features/chat/constants";

const GYM_THUMB_SIZE = 72;
const USER_ICON_SIZE = 22;

const GYM_NAME_FONT_SIZE = 12;
const MEMBER_COUNT_FONT_SIZE = GYM_NAME_FONT_SIZE - 1;

type Props = {
  gymId: string;
  name: string;
  memberCount: number;
  background_img?: ImageSourcePropType;
  /** When false, omit bottom border (e.g. last row in a list). */
  showBottomBorder: boolean;
};

function gymThumbSource(background_img?: ImageSourcePropType): ImageSourcePropType {
  return background_img ?? DEFAULT_GYM_CHAT_IMAGE;
}

/** Gym chat row; spacing and dividers match `FoodMealListRow`. */
export function GymChatListRow({
  gymId,
  name,
  memberCount,
  background_img,
  showBottomBorder,
}: Props) {
  const memberLabel = String(memberCount);

  return (
    <View style={[styles.cell, showBottomBorder && styles.cellBorderBottom]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${name}. ${memberCount} members chatting`}
        onPress={() =>
          router.push({
            pathname: "/(tabs)/chat/gym-chat/[gymId]",
            params: { gymId },
          })
        }
        style={({ pressed }) => [styles.hit, pressed && styles.hitPressed]}
      >
        <View style={styles.row}>
          <Image
            source={gymThumbSource(background_img)}
            style={styles.thumb}
            contentFit="cover"
            accessibilityIgnoresInvertColors
          />
          <View style={styles.textColumn}>
            <ThemedText
              lightColor={APP_SHELL_MAIN_TEXT_COLOR}
              darkColor={APP_SHELL_MAIN_TEXT_COLOR}
              style={styles.name}
              numberOfLines={2}
            >
              {name}
            </ThemedText>
            <View style={styles.memberRow}>
              <Image
                source={GYM_CHAT_USER_ICON}
                style={styles.userIcon}
                contentFit="contain"
                accessibilityIgnoresInvertColors
              />
              <ThemedText
                lightColor={APP_SHELL_LABEL_COLOR}
                darkColor={APP_SHELL_LABEL_COLOR}
                style={styles.memberCount}
                numberOfLines={1}
              >
                {memberLabel}
              </ThemedText>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  cell: {
    alignSelf: "stretch",
    paddingVertical: 10,
  },
  cellBorderBottom: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: APP_SHELL_INPUT_BOARDER_COLOR,
  },
  hit: {
    alignSelf: "stretch",
  },
  hitPressed: {
    opacity: 0.85,
  },
  row: {
    flexDirection: "row",
    alignItems: "stretch",
    gap: 12,
    alignSelf: "stretch",
  },
  thumb: {
    width: GYM_THUMB_SIZE,
    height: GYM_THUMB_SIZE,
    borderRadius: 10,
    flexShrink: 0,
    alignSelf: "center",
    overflow: "hidden",
  },
  textColumn: {
    flex: 1,
    minWidth: 0,
    gap: 4,
    justifyContent: "center",
  },
  name: {
    fontFamily: FONT_FAMILY,
    fontSize: GYM_NAME_FONT_SIZE,
    lineHeight: 18,
    fontWeight: "600",
  },
  memberRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  userIcon: {
    width: USER_ICON_SIZE,
    height: USER_ICON_SIZE,
  },
  memberCount: {
    fontFamily: FONT_FAMILY,
    fontSize: MEMBER_COUNT_FONT_SIZE,
    lineHeight: 16,
    fontWeight: "500",
  },
});
