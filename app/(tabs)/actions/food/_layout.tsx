import { Stack } from "expo-router";

import { APP_SHELL_SECONDARY_BACKGROUND } from "@/constants/app-colors";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function FoodStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        contentStyle: {
          flex: 1,
          backgroundColor: APP_SHELL_SECONDARY_BACKGROUND,
        },
      }}
    />
  );
}
