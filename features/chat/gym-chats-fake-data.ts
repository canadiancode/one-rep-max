import type { ImageSourcePropType } from "react-native";

/** Placeholder gym chat rows; replace with API / local DB later. */
export type GymChatFakeItem = {
  id: string;
  name: string;
  /** Active members shown beside the user icon (map popup parity). */
  memberCount: number;
  /** Optional hero image; falls back to `DEFAULT_GYM_CHAT_IMAGE`. */
  background_img?: ImageSourcePropType;
};

export const FAKE_SAVED_GYM_CHATS: readonly GymChatFakeItem[] = [
  {
    id: "gym-1",
    name: "Fitness World (Howe St, Vancouver)",
    memberCount: 8,
  },
  {
    id: "gym-3",
    name: "Evolve Strength Post",
    memberCount: 8,
  },
  {
    id: "gym-4",
    name: "Equinox West Georgia Street",
    memberCount: 12,
  },
  {
    id: "gym-5",
    name: "Kommunity Fitness",
    memberCount: 5,
  },
  {
    id: "gym-6",
    name: "YWCA Health + Fitness Centre",
    memberCount: 8,
  },
  {
    id: "gym-10",
    name: "Fitness World (Cambie/Broadway, Vancouver)",
    memberCount: 3,
  },
] as const;
