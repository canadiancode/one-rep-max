import { Image } from "expo-image";
import { Tabs } from "expo-router";
import React from "react";
import type { ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HapticTab } from "@/components/haptic-tab";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

const TAB_ICON_SIZE = 28;

function tabBarImageIcon(source: number, focused: boolean) {
  return (
    <Image
      source={source}
      style={{
        width: TAB_ICON_SIZE,
        height: TAB_ICON_SIZE,
        opacity: focused ? 1 : 0.55,
      }}
      contentFit="contain"
    />
  );
}

// will add more options for backgrounds later
const TAB_BAR_SURFACE = "#02284f";

const TAB_BAR_EDGE_PADDING = 1;
/** Default tab row body height from UIKit tab bar (~49pt); we grow beyond this. */
const UIKIT_TAB_BAR_BODY = 49;
const TAB_BAR_EXTRA_HEIGHT = 18;
/** Space between the icon stack and the label (icon wrapper gets bottom margin). */
const TAB_BAR_ICON_LABEL_GAP = 6;

/**
 * The real `role="tablist"` row is an internal View with no public style hook.
 * These item margins reproduce `padding: 0 3px` + `gap: 3px` on that row.
 */
const TAB_LIST_HORIZONTAL_PAD = 3;
const TAB_LIST_GAP = 3;
const TAB_ITEM_PAD_Y = 4;
const TAB_LIST_HALF_GAP = TAB_LIST_GAP / 2;

const tabItemBase: ViewStyle = { paddingVertical: TAB_ITEM_PAD_Y };
const tabItemFirst: ViewStyle = {
  ...tabItemBase,
  marginStart: TAB_LIST_HORIZONTAL_PAD,
  marginEnd: TAB_LIST_HALF_GAP,
};
const tabItemMiddle: ViewStyle = {
  ...tabItemBase,
  marginHorizontal: TAB_LIST_HALF_GAP,
};
const tabItemLast: ViewStyle = {
  ...tabItemBase,
  marginStart: TAB_LIST_HALF_GAP,
  marginEnd: TAB_LIST_HORIZONTAL_PAD,
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const horizontalInset = Math.max(insets.left, insets.right);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarLabelStyle: { fontSize: 6 },
        tabBarIconStyle: { marginBottom: TAB_BAR_ICON_LABEL_GAP },
        // Styles the wrapper that parents the `role="tablist"` row in BottomTabBar.
        // Explicit `height` is required for a taller bar; `getTabBarHeight` reads it from here.
        tabBarStyle: {
          backgroundColor: TAB_BAR_SURFACE,
          height:
            UIKIT_TAB_BAR_BODY +
            TAB_BAR_EXTRA_HEIGHT +
            TAB_BAR_EDGE_PADDING * 2 +
            insets.bottom,
          paddingTop: TAB_BAR_EDGE_PADDING,
          paddingHorizontal: TAB_BAR_EDGE_PADDING + horizontalInset,
          paddingBottom: TAB_BAR_EDGE_PADDING + insets.bottom,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "My Beast",
          tabBarItemStyle: tabItemFirst,
          tabBarIcon: ({ focused }) =>
            tabBarImageIcon(require("@/assets/icons/character.png"), focused),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          tabBarItemStyle: tabItemMiddle,
          tabBarIcon: ({ focused }) =>
            tabBarImageIcon(require("@/assets/icons/map.png"), focused),
        }}
      />
      <Tabs.Screen
        name="actions"
        options={{
          title: "Actions",
          tabBarItemStyle: tabItemMiddle,
          tabBarIcon: ({ focused }) =>
            tabBarImageIcon(require("@/assets/icons/plus.png"), focused),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarItemStyle: tabItemMiddle,
          tabBarIcon: ({ focused }) =>
            tabBarImageIcon(require("@/assets/icons/world.png"), focused),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarItemStyle: tabItemLast,
          tabBarIcon: ({ focused }) =>
            tabBarImageIcon(require("@/assets/icons/gear.png"), focused),
        }}
      />
    </Tabs>
  );
}
