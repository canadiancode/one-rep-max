import type { ViewStyle } from "react-native";

/** Root shell: outer frame (gutters) vs inner content stack. */
export const APP_SHELL_PRIMARY_BACKGROUND = "#03418c";
export const APP_SHELL_SECONDARY_BACKGROUND = "#02284f";

export const APP_SHELL_PADDING = 4;

/** Tab screen root (`ThemedView` above the bottom tab bar): matches web margin + bottom radii. */
export const TAB_SCREEN_ROOT_ABOVE_TAB_BAR: ViewStyle = {
  borderBottomLeftRadius: 15,
  borderBottomRightRadius: 15,
  marginBottom: 8,
  overflow: "hidden",
};
