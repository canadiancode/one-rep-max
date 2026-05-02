import {
  APP_SHELL_PRIMARY_BACKGROUND,
  APP_SHELL_SECONDARY_BACKGROUND,
} from "./app-shell";

/** Deep navy so water reads against land (#02284f). */
const MAP_WATER = "#011428";

/** Major roads — lifted from primary blue. */
const MAP_ROAD_HIGHWAY = "#0d5aa8";

/** Local / minor roads. */
const MAP_ROAD_LOCAL = "#063d72";

/** Subtle park / land-use tint (still in the blue family). */
const MAP_GREENSPACE = "#023a5c";

const MAP_LABEL = "#dce9f7";

const MAP_LABEL_STROKE = "#021428";

/**
 * Google Maps JSON style (used with `PROVIDER_GOOGLE` + `customMapStyle`).
 * Tuned to {@link APP_SHELL_SECONDARY_BACKGROUND} land and {@link APP_SHELL_PRIMARY_BACKGROUND} accents.
 */
export const ONE_REP_MAX_GOOGLE_MAP_STYLE = [
  { elementType: "geometry", stylers: [{ color: APP_SHELL_SECONDARY_BACKGROUND }] },
  { elementType: "labels.text.stroke", stylers: [{ color: MAP_LABEL_STROKE }] },
  { elementType: "labels.text.fill", stylers: [{ color: MAP_LABEL }] },
  { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: APP_SHELL_PRIMARY_BACKGROUND }, { weight: 0.6 }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "poi.park", stylers: [{ visibility: "on" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: MAP_GREENSPACE }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: MAP_WATER }] },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [{ color: MAP_ROAD_HIGHWAY }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: APP_SHELL_SECONDARY_BACKGROUND }, { weight: 0.5 }],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [{ color: MAP_ROAD_LOCAL }],
  },
  {
    featureType: "road.local",
    elementType: "geometry",
    stylers: [{ color: MAP_ROAD_LOCAL }, { lightness: -5 }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: MAP_LABEL }],
  },
  {
    featureType: "road",
    elementType: "labels.text.stroke",
    stylers: [{ color: MAP_LABEL_STROKE }],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: MAP_LABEL }],
  },
  {
    featureType: "administrative.neighborhood",
    elementType: "labels.text.fill",
    stylers: [{ color: MAP_LABEL }, { lightness: -10 }],
  },
];
