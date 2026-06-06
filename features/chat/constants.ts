import { FAKE_SAVED_GYM_CHATS } from "./gym-chats-fake-data";

/** Default gym thumbnail when a chat has no custom hero image (map sheet parity). */
export const DEFAULT_GYM_CHAT_IMAGE = require("@/assets/backgrounds/map-gym-default-background.png");

/** Member count icon on gym chat list rows (multi-user glyph). */
export const GYM_CHAT_USER_ICON = require("@/assets/icons/users.png");

/** Live viewers indicator beside member count on gym chat rows. */
export const GYM_CHAT_LIVE_ICON = require("@/assets/icons/live.png");

/** Shown on the chat index “View gym chats” row until live counts load. */
export const GYM_CHATS_COUNT_PLACEHOLDER = FAKE_SAVED_GYM_CHATS.length;
