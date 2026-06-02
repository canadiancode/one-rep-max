import { FAKE_SAVED_GYM_CHATS } from "./gym-chats-fake-data";

/** Default gym thumbnail when a chat has no custom hero image (map sheet parity). */
export const DEFAULT_GYM_CHAT_IMAGE = require("@/assets/backgrounds/map-gym-default-background.png");

/** Member count icon (map gym popup). */
export const GYM_CHAT_USER_ICON = require("@/assets/icons/user.png");

/** Shown on the chat index “View gym chats” row until live counts load. */
export const GYM_CHATS_COUNT_PLACEHOLDER = FAKE_SAVED_GYM_CHATS.length;
