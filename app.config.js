/**
 * Merges onto `app.json`. Set `EXPO_PUBLIC_GOOGLE_MAPS_API_KEY` for Google Maps
 * (required for `PROVIDER_GOOGLE` in release builds; use one key with iOS + Android APIs enabled).
 *
 * @param {{ config: import('expo/config').ExpoConfig }} ctx
 */
module.exports = ({ config }) => {
  const googleMapsApiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";

  return {
    ...config,
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
