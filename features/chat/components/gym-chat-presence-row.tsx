import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { APP_SHELL_LABEL_COLOR } from "@/constants/app-colors";
import { FONT_FAMILY } from "@/constants/fonts";
import { GYM_CHAT_LIVE_ICON, GYM_CHAT_USER_ICON } from "@/features/chat/constants";

const USER_ICON_SIZE = 22;
const LIVE_ICON_SIZE = 15;
const MEMBER_COUNT_FONT_SIZE = 11;

const USER_ICON_DENSE = 18;
const LIVE_ICON_DENSE = 12;
const MEMBER_COUNT_FONT_DENSE = 10;

type Props = {
  memberCount: number;
  liveViewerCount: number;
  /** Tighter row for toolbar / tucked gym header (single line with title). */
  dense?: boolean;
};

/** Users + live stats row (gym chat list rows and thread header card). */
export function GymChatPresenceRow({
  memberCount,
  liveViewerCount,
  dense = false,
}: Props) {
  const memberLabel = String(memberCount);
  const liveLabel = String(liveViewerCount);

  return (
    <View style={[styles.memberRow, dense && styles.memberRowDense]}>
      <View style={[styles.statCluster, dense && styles.statClusterDense]}>
        <Image
          source={GYM_CHAT_USER_ICON}
          style={[styles.userIcon, dense && styles.userIconDense]}
          contentFit="contain"
          accessibilityIgnoresInvertColors
        />
        <ThemedText
          lightColor={APP_SHELL_LABEL_COLOR}
          darkColor={APP_SHELL_LABEL_COLOR}
          style={[styles.memberCount, dense && styles.memberCountDense]}
          numberOfLines={1}
        >
          {memberLabel}
        </ThemedText>
      </View>
      <View style={[styles.statCluster, dense && styles.statClusterDense]}>
        <Image
          source={GYM_CHAT_LIVE_ICON}
          style={[styles.liveIcon, dense && styles.liveIconDense]}
          contentFit="contain"
          accessibilityIgnoresInvertColors
        />
        <ThemedText
          lightColor={APP_SHELL_LABEL_COLOR}
          darkColor={APP_SHELL_LABEL_COLOR}
          style={[styles.memberCount, dense && styles.memberCountDense]}
          numberOfLines={1}
        >
          {liveLabel}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  memberRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
  },
  memberRowDense: {
    flexWrap: "nowrap",
    gap: 6,
    flexShrink: 0,
  },
  statCluster: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statClusterDense: {
    gap: 5,
  },
  userIcon: {
    width: USER_ICON_SIZE,
    height: USER_ICON_SIZE,
  },
  userIconDense: {
    width: USER_ICON_DENSE,
    height: USER_ICON_DENSE,
  },
  liveIcon: {
    width: LIVE_ICON_SIZE,
    height: LIVE_ICON_SIZE,
  },
  liveIconDense: {
    width: LIVE_ICON_DENSE,
    height: LIVE_ICON_DENSE,
  },
  memberCount: {
    fontFamily: FONT_FAMILY,
    fontSize: MEMBER_COUNT_FONT_SIZE,
    lineHeight: 16,
    fontWeight: "500",
  },
  memberCountDense: {
    fontSize: MEMBER_COUNT_FONT_DENSE,
    lineHeight: 14,
  },
});
