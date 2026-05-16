import type { ViewStyle } from "react-native";

export const APP_SHELL_PADDING = 4;

/** Tab screen root (`ThemedView` above the bottom tab bar): matches web margin + bottom radii. */
export const TAB_SCREEN_ROOT_ABOVE_TAB_BAR: ViewStyle = {
  borderBottomLeftRadius: 15,
  borderBottomRightRadius: 15,
  marginBottom: 8,
  overflow: "hidden",
};
