import { StyleSheet } from "react-native";
import MapView from "react-native-maps";

import { ThemedView } from "@/components/themed-view";

/** Default camera (Vancouver, BC) until user location drives the region. */
const INITIAL_REGION = {
  latitude: 49.2827,
  longitude: -123.1207,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export default function MapScreen() {
  return (
    <ThemedView style={styles.container}>
      <MapView style={styles.map} initialRegion={INITIAL_REGION} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
