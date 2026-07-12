import { Image } from "expo-image";
import { useEffect, useMemo, useState } from "react";
import type { ImageSourcePropType } from "react-native";
import { Pressable, StyleSheet, useWindowDimensions, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import {
  APP_SHELL_INPUT_BOARDER_COLOR,
  APP_SHELL_MAIN_TEXT_COLOR,
} from "@/constants/app-colors";
import { FONT_FAMILY } from "@/constants/fonts";
import { DEFAULT_GYM_CHAT_IMAGE } from "@/features/chat/constants";

import { GymChatPresenceRow } from "./gym-chat-presence-row";

const EMPTY_FAVOURITE = require("@/assets/icons/empty-favourite.png");
const FILLED_FAVOURITE = require("@/assets/icons/favourite.png");

const TITLE_FONT_EXPANDED = 15;
const TITLE_FONT_COLLAPSED = 12;
const TITLE_LINE_EXPANDED = 20;
const TITLE_LINE_COLLAPSED = 16;
const ANIM_MS = 280;

type Props = {
  name: string;
  memberCount: number;
  liveViewerCount: number;
  background_img?: ImageSourcePropType;
  /** When true, hero height → 0 and title/presence shrink for more message space. */
  collapsed: boolean;
};

function heroSource(background_img?: ImageSourcePropType): ImageSourcePropType {
  return background_img ?? DEFAULT_GYM_CHAT_IMAGE;
}

/** Full-bleed gym thread header (compact hero + title + presence). */
export function GymChatHeaderCard({
  name,
  memberCount,
  liveViewerCount,
  background_img,
  collapsed,
}: Props) {
  const [favourited, setFavourited] = useState(false);
  const { height: winH } = useWindowDimensions();
  const imageStripHeight = useMemo(
    () => Math.round(Math.min(Math.max(winH * 0.14, 84), 140)),
    [winH],
  );

  const progress = useSharedValue(0);
  const imageHeightPx = useSharedValue(imageStripHeight);

  useEffect(() => {
    imageHeightPx.value = imageStripHeight;
  }, [imageStripHeight, imageHeightPx]);

  useEffect(() => {
    progress.value = withTiming(collapsed ? 1 : 0, { duration: ANIM_MS });
  }, [collapsed, progress]);

  const imageShellStyle = useAnimatedStyle(() => ({
    height: interpolate(
      progress.value,
      [0, 1],
      [imageHeightPx.value, 0],
      Extrapolation.CLAMP,
    ),
    opacity: interpolate(
      progress.value,
      [0, 0.35, 1],
      [1, 0.4, 0],
      Extrapolation.CLAMP,
    ),
  }));

  const nameStyle = useAnimatedStyle(() => ({
    fontSize: interpolate(
      progress.value,
      [0, 1],
      [TITLE_FONT_EXPANDED, TITLE_FONT_COLLAPSED],
      Extrapolation.CLAMP,
    ),
    lineHeight: interpolate(
      progress.value,
      [0, 1],
      [TITLE_LINE_EXPANDED, TITLE_LINE_COLLAPSED],
      Extrapolation.CLAMP,
    ),
  }));

  const metaPadStyle = useAnimatedStyle(() => ({
    paddingTop: interpolate(progress.value, [0, 1], [6, 4], Extrapolation.CLAMP),
    paddingBottom: interpolate(
      progress.value,
      [0, 1],
      [8, 6],
      Extrapolation.CLAMP,
    ),
  }));

  return (
    <View
      style={styles.panel}
      accessibilityRole="summary"
      accessibilityLabel={`${name}. ${memberCount} members chatting. ${liveViewerCount} live now`}
    >
      <Animated.View style={[styles.imageHalf, imageShellStyle]}>
        <Image
          source={heroSource(background_img)}
          style={StyleSheet.absoluteFillObject}
          contentFit="cover"
          accessibilityIgnoresInvertColors
        />
      </Animated.View>
      <Animated.View style={[styles.metaHalf, metaPadStyle]}>
        {collapsed ? (
          <View style={styles.metaCollapsedRow}>
            <Animated.Text
              style={[styles.nameBase, nameStyle, styles.titleCollapsedCell]}
              numberOfLines={1}
              ellipsizeMode="tail"
              allowFontScaling
            >
              {name}
            </Animated.Text>
            <View style={styles.presenceRightCluster}>
              <GymChatPresenceRow
                dense
                memberCount={memberCount}
                liveViewerCount={liveViewerCount}
              />
            </View>
          </View>
        ) : (
          <>
            <Animated.Text
              style={[styles.nameBase, nameStyle]}
              numberOfLines={2}
              allowFontScaling
            >
              {name}
            </Animated.Text>
            <View style={styles.presenceRowExpanded}>
              <GymChatPresenceRow
                memberCount={memberCount}
                liveViewerCount={liveViewerCount}
              />
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={
                  favourited ? "Remove from favourites" : "Add to favourites"
                }
                accessibilityState={{ selected: favourited }}
                hitSlop={8}
                onPress={() => setFavourited((v) => !v)}
                style={({ pressed }) => [
                  styles.favouriteHit,
                  pressed && styles.favouriteHitPressed,
                ]}
              >
                <Image
                  source={favourited ? FILLED_FAVOURITE : EMPTY_FAVOURITE}
                  style={styles.favouriteIcon}
                  contentFit="contain"
                  accessibilityIgnoresInvertColors
                />
              </Pressable>
            </View>
          </>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    alignSelf: "stretch",
    width: "100%",
    overflow: "hidden",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: APP_SHELL_INPUT_BOARDER_COLOR,
  },
  imageHalf: {
    width: "100%",
    overflow: "hidden",
    backgroundColor: APP_SHELL_INPUT_BOARDER_COLOR,
  },
  metaHalf: {
    flexGrow: 0,
    flexShrink: 0,
    justifyContent: "flex-start",
    gap: 4,
    paddingHorizontal: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: APP_SHELL_INPUT_BOARDER_COLOR,
  },
  nameBase: {
    fontFamily: FONT_FAMILY,
    fontWeight: "600",
    color: APP_SHELL_MAIN_TEXT_COLOR,
  },
  presenceRowExpanded: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    gap: 12,
    marginBottom: 8,
  },
  favouriteHit: {
    flexShrink: 0,
    padding: 2,
  },
  favouriteHitPressed: {
    opacity: 0.75,
  },
  favouriteIcon: {
    width: 26,
    height: 26,
    flexShrink: 0,
  },
  metaCollapsedRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: "100%",
  },
  titleCollapsedCell: {
    flex: 1,
    minWidth: 0,
  },
  presenceRightCluster: {
    flexShrink: 0,
  },
});
