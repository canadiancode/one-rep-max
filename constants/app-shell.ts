import type { ViewStyle } from "react-native";

export const APP_SHELL_PADDING = 4;

/** Tab screen root (`ThemedView` above the bottom tab bar): matches web margin + bottom radii. */
export const TAB_SCREEN_ROOT_ABOVE_TAB_BAR: ViewStyle = {
  borderBottomLeftRadius: 15,
  borderBottomRightRadius: 15,
  marginBottom: 8,
  overflow: "hidden",
};

/** Rounded top edge on the inner stack below the primary header band (Actions, Settings, Map, Chat). */
export const TAB_SCREEN_STACK_CHROME_BORDER_RADIUS = 15;

/** Shared primary header band (Actions, Settings, Map, Chat) — pair with `APP_SHELL_PRIMARY_BACKGROUND`. */
export const TAB_HEADER_MIN_HEIGHT = 96;
export const TAB_HEADER_PADDING_TOP = 50;
export const TAB_HEADER_PADDING_BOTTOM = 14;
export const TAB_HEADER_PADDING_HORIZONTAL = 16;
/** Content slot height inside the header band (title/bar, avatar row, map search). */
export const TAB_HEADER_CONTENT_HEIGHT = 80;

export const TAB_HEADER_ROW_LAYOUT: ViewStyle = {
  minHeight: TAB_HEADER_MIN_HEIGHT,
  paddingHorizontal: TAB_HEADER_PADDING_HORIZONTAL,
  paddingTop: TAB_HEADER_PADDING_TOP,
  paddingBottom: TAB_HEADER_PADDING_BOTTOM,
};

export const TAB_SCREEN_STACK_CHROME_LAYOUT: ViewStyle = {
  flex: 1,
  borderTopLeftRadius: TAB_SCREEN_STACK_CHROME_BORDER_RADIUS,
  borderTopRightRadius: TAB_SCREEN_STACK_CHROME_BORDER_RADIUS,
  overflow: "hidden",
};
