import Constants from "expo-constants";

/**
 * FatSecret OAuth client ID from `app.config.js` `extra` (sourced from `FATSECRET_CLIENT_ID` in `.env`).
 *
 * Do not add `FATSECRET_CLIENT_SECRET` to `extra` or any `EXPO_PUBLIC_*` variable — it would be
 * embedded in the client bundle. For server-style OAuth, use a backend or EAS Server Functions
 * and store the secret only in server-side env / EAS Secrets.
 */
export function getFatSecretClientId(): string {
  const raw = Constants.expoConfig?.extra?.fatSecretClientId;
  return typeof raw === "string" ? raw : "";
}
