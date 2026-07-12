import { Redirect } from "expo-router";

/** App root `/` used to be this tab; send users to the My Pixel stack. */
export default function TabsIndexRedirect() {
  return <Redirect href="/(tabs)/pixel" />;
}
