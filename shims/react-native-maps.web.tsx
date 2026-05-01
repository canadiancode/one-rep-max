import type { ReactNode } from "react";
import { View, type ViewProps } from "react-native";

export type Region = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

export type MapViewProps = ViewProps & {
  initialRegion?: Region;
  region?: Region;
  children?: ReactNode;
};

/**
 * Web stub: the real `react-native-maps` uses native codegen. Metro resolves the
 * package to this file when `platform === 'web'` (see `metro.config.js`).
 */
function MapView(props: MapViewProps) {
  const { initialRegion: _ir, region: _r, ...rest } = props;
  return <View {...rest} />;
}

export default MapView;
