// Load `.env` when this file is evaluated (Expo CLI also injects env; dotenv covers other tools).
require("dotenv").config();

/**
 * Merges onto `app.json`.
 *
 * - Set `EXPO_PUBLIC_GOOGLE_MAPS_API_KEY` for Google Maps (required for `PROVIDER_GOOGLE` in
 *   release builds; use one key with iOS + Android APIs enabled).
 * - Set `FATSECRET_CLIENT_ID` / `FATSECRET_CLIENT_SECRET` in `.env` (see `.env.example`). Only the
 *   client ID is passed into `extra` for runtime reads; never put the client secret in `extra`
 *   or `EXPO_PUBLIC_*` — it would ship inside the app binary.
 *
 * @param {{ config: import('expo/config').ExpoConfig }} ctx
 */
module.exports = ({ config }) => {
  const googleMapsApiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
  const fatSecretClientId = process.env.FATSECRET_CLIENT_ID ?? "";

  return {
    ...config,
    extra: {
      ...config.extra,
      fatSecretClientId,
    },
    ios: {
      ...config.ios,
      config: {
        ...config.ios?.config,
        ...(googleMapsApiKey ? { googleMapsApiKey } : {}),
      },
    },
    android: {
      ...config.android,
      config: {
        ...config.android?.config,
        ...(googleMapsApiKey
          ? {
              googleMaps: {
                ...config.android?.config?.googleMaps,
                apiKey: googleMapsApiKey,
              },
            }
          : {}),
      },
    },
  };
};
