import { Image } from "expo-image";
import { Tabs } from "expo-router";
import React from "react";

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

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarLabelStyle: { fontSize: 7 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "My Beast",
          tabBarIcon: ({ focused }) =>
            tabBarImageIcon(require("@/assets/icons/character.png"), focused),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          tabBarIcon: ({ focused }) =>
            tabBarImageIcon(require("@/assets/icons/map.png"), focused),
        }}
      />
      <Tabs.Screen
        name="actions"
        options={{
          title: "Actions",
          tabBarIcon: ({ focused }) =>
            tabBarImageIcon(require("@/assets/icons/plus.png"), focused),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: ({ focused }) =>
            tabBarImageIcon(require("@/assets/icons/world.png"), focused),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ focused }) =>
            tabBarImageIcon(require("@/assets/icons/gear.png"), focused),
        }}
      />
    </Tabs>
  );
}
