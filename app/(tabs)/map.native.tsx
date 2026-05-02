import { Image } from "expo-image";
import * as Location from "expo-location";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ImageSourcePropType } from "react-native";
import {
  Platform,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import {
  APP_SHELL_PRIMARY_BACKGROUND,
  APP_SHELL_SECONDARY_BACKGROUND,
  TAB_SCREEN_ROOT_ABOVE_TAB_BAR,
} from "@/constants/app-shell";
import { ONE_REP_MAX_GOOGLE_MAP_STYLE } from "@/constants/google-map-style";

/** Static gym pins; replace with API/DB later. */
type HardcodedGym = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  /** Optional hero image for the map bottom card; falls back to default asset. */
  background_img?: ImageSourcePropType;
};

const HARDCODED_GYMS: readonly HardcodedGym[] = [
  {
    id: "gym-1",
    name: "Fitness World (Howe St, Vancouver)",
    latitude: 49.2775605,
    longitude: -123.12733209999998,
  },
  {
    id: "gym-2",
    name: "Fitness World (W Georgia St, Vancouver)",
    latitude: 49.2872573,
    longitude: -123.1247192,
  },
  {
    id: "gym-3",
    name: "Evolve Strength Post (Vancouver)",
    latitude: 49.280815399999994,
    longitude: -123.11450789999999,
  },
  {
    id: "gym-4",
    name: "Equinox West Georgia Street",
    latitude: 49.286273099999995,
    longitude: -123.1235959,
  },
  {
    id: "gym-5",
    name: "Kommunity Fitness",
    latitude: 49.2742341,
    longitude: -123.1245598,
  },
  {
    id: "gym-6",
    name: "YWCA Health + Fitness Centre",
    latitude: 49.2855157,
    longitude: -123.11780759999999,
  },
  {
    id: "gym-7",
    name: "Creekside Community Recreation Centre",
    latitude: 49.2717357,
    longitude: -123.10538419999999,
  },
  {
    id: "gym-8",
    name: "Olympus Fitness Centre",
    latitude: 49.2699098,
    longitude: -123.07123209999999,
  },
  {
    id: "gym-9",
    name: "Hillcrest Community Centre",
    latitude: 49.2437477,
    longitude: -123.1078644,
  },
  {
    id: "gym-10",
    name: "Fitness World (Cambie/Broadway, Vancouver)",
    latitude: 49.260723399999996,
    longitude: -123.117342,
  },
  {
    id: "gym-11",
    name: "24 HR Flex Fitness Club + Personal Training (Surrey/Delta)",
    latitude: 49.1326433,
    longitude: -122.88921979999999,
  },
  {
    id: "gym-12",
    name: "Fitness World (South Surrey)",
    latitude: 49.048427100000005,
    longitude: -122.78251979999999,
  },
  {
    id: "gym-13",
    name: "Level Up Fitness Club (Surrey)",
    latitude: 49.154289899999995,
    longitude: -122.863237,
  },
  {
    id: "gym-14",
    name: "Fitness World (Central Ave, Surrey)",
    latitude: 49.190436,
    longitude: -122.8395627,
  },
  {
    id: "gym-15",
    name: "24HR Sandcastle Fitness Club + Personal Training",
    latitude: 49.03729070000001,
    longitude: -122.8004378,
  },
  {
    id: "gym-16",
    name: "Platinum Athletic Club (Surrey)",
    latitude: 49.1416259,
    longitude: -122.84783099999999,
  },
  {
    id: "gym-17",
    name: "Guildford Recreation Centre",
    latitude: 49.193605899999994,
    longitude: -122.802882,
  },
  {
    id: "gym-18",
    name: "Fitness World (152 St, Surrey)",
    latitude: 49.0333136,
    longitude: -122.80379239999999,
  },
  {
    id: "gym-19",
    name: "Planet Fitness (King George Blvd, Surrey)",
    latitude: 49.13071,
    longitude: -122.84623999999998,
  },
  {
    id: "gym-20",
    name: "Planet Fitness (10642 King George Blvd, Surrey)",
    latitude: 49.19591,
    longitude: -122.84376999999999,
  },
  {
    id: "gym-21",
    name: "Vitality Fitness (Burnaby)",
    latitude: 49.219223899999996,
    longitude: -122.94980590000002,
  },
  {
    id: "gym-22",
    name: "Fitness World (Lougheed, Burnaby)",
    latitude: 49.2514295,
    longitude: -122.89649790000001,
  },
  {
    id: "gym-23",
    name: "Fitness 2000 Athletic Club (Burnaby)",
    latitude: 49.251753199999996,
    longitude: -122.9015933,
  },
  {
    id: "gym-24",
    name: "SFU Fitness Centre",
    latitude: 49.279284499999996,
    longitude: -122.92273060000001,
  },
  {
    id: "gym-25",
    name: "Fitness World (Kingsway, Burnaby)",
    latitude: 49.223107899999995,
    longitude: -122.9851946,
  },
  {
    id: "gym-26",
    name: "Evolve Strength Brentwood (Burnaby)",
    latitude: 49.267862699999995,
    longitude: -123.00281899999999,
  },
  {
    id: "gym-27",
    name: "Anytime Fitness (Hastings St, Burnaby)",
    latitude: 49.2813814,
    longitude: -123.02168340000001,
  },
  {
    id: "gym-28",
    name: "Anytime Fitness (Royal Oak Ave, Burnaby)",
    latitude: 49.214317799999996,
    longitude: -122.98914990000002,
  },
  {
    id: "gym-29",
    name: "Foundation Fitness Studio (Burnaby)",
    latitude: 49.280841099999996,
    longitude: -123.0179141,
  },
  {
    id: "gym-30",
    name: "GoodLife Fitness Burnaby Metrotown",
    latitude: 49.230216999999996,
    longitude: -123.004014,
  },
  {
    id: "gym-31",
    name: "Richmond Sports and Fitness",
    latitude: 49.1955604,
    longitude: -123.09218589999999,
  },
  {
    id: "gym-32",
    name: "Fittopia Fitness Center (Richmond)",
    latitude: 49.1784581,
    longitude: -123.13826939999998,
  },
  {
    id: "gym-33",
    name: "Minoru Centre for Active Living (Richmond)",
    latitude: 49.1635397,
    longitude: -123.1458103,
  },
  {
    id: "gym-34",
    name: "Fitness World (Lansdowne, Richmond)",
    latitude: 49.1736192,
    longitude: -123.14631489999998,
  },
  {
    id: "gym-35",
    name: "Anytime Fitness (No 3 Rd, Richmond)",
    latitude: 49.139649299999995,
    longitude: -123.13790009999998,
  },
  {
    id: "gym-36",
    name: "South Arm Community Fitness Centre (Richmond)",
    latitude: 49.1400797,
    longitude: -123.1275965,
  },
  {
    id: "gym-37",
    name: "Anytime Fitness (No 5 Rd, Richmond)",
    latitude: 49.1337091,
    longitude: -123.0915977,
  },
  {
    id: "gym-38",
    name: "Sunset HQ (Richmond)",
    latitude: 49.1282959,
    longitude: -123.09736509999999,
  },
  {
    id: "gym-39",
    name: "Club16 Trevor Linden Fitness (Richmond)",
    latitude: 49.1873027,
    longitude: -123.110077,
  },
  {
    id: "gym-40",
    name: "Fit4Less (Richmond)",
    latitude: 49.154593000000006,
    longitude: -123.12392399999999,
  },
  {
    id: "gym-41",
    name: "Fitness Unlimited Athletic Club (Langley)",
    latitude: 49.1065873,
    longitude: -122.6538671,
  },
  {
    id: "gym-42",
    name: "Fitness World (Willowbrook, Langley)",
    latitude: 49.1173286,
    longitude: -122.67031089999999,
  },
  {
    id: "gym-43",
    name: "24HR Lionheart Fitness Langley",
    latitude: 49.1776979,
    longitude: -122.67107730000001,
  },
  {
    id: "gym-44",
    name: "Planet Fitness (Langley)",
    latitude: 49.10219,
    longitude: -122.65786999999997,
  },
  {
    id: "gym-45",
    name: "Total Fitness (Langley)",
    latitude: 49.169822599999996,
    longitude: -122.664215,
  },
  {
    id: "gym-46",
    name: "Gold's Gym Langley",
    latitude: 49.151384099999994,
    longitude: -122.668916,
    background_img: require("@/assets/backgrounds/gyms/golds-gym-langley-23467832765234785.jpg"),
  },
  {
    id: "gym-47",
    name: "Club16 Trevor Linden Fitness (Langley)",
    latitude: 49.1146817,
    longitude: -122.66383479999998,
  },
  {
    id: "gym-48",
    name: "Anytime Fitness (Fraser Hwy, Langley)",
    latitude: 49.088681799999996,
    longitude: -122.5980881,
  },
  {
    id: "gym-49",
    name: "Fit4Less (Langley)",
    latitude: 49.116808999999996,
    longitude: -122.66869399999997,
  },
  {
    id: "gym-50",
    name: "Timms Community Centre (Langley)",
    latitude: 49.1039993,
    longitude: -122.65743180000001,
  },
  {
    id: "gym-51",
    name: "Anytime Fitness Burquitlam (Coquitlam)",
    latitude: 49.259095099999996,
    longitude: -122.8925089,
  },
  {
    id: "gym-52",
    name: "Poirier Sport & Leisure Complex (Coquitlam)",
    latitude: 49.2549668,
    longitude: -122.84549489999999,
  },
  {
    id: "gym-53",
    name: "Planet Fitness (Lougheed Hwy, Coquitlam)",
    latitude: 49.27319,
    longitude: -122.79309,
  },
  {
    id: "gym-54",
    name: "Anytime Fitness (Austin Ave, Coquitlam)",
    latitude: 49.248816299999994,
    longitude: -122.8170954,
  },
  {
    id: "gym-55",
    name: "Gold's Gym Port Coquitlam",
    latitude: 49.2638858,
    longitude: -122.769435,
  },
  {
    id: "gym-56",
    name: "Game Ready Fitness (Coquitlam)",
    latitude: 49.2771925,
    longitude: -122.8123136,
  },
  {
    id: "gym-57",
    name: "Rocky Point Fitness And Health Club (Coquitlam)",
    latitude: 49.2389546,
    longitude: -122.85078899999998,
  },
  {
    id: "gym-58",
    name: "Club16 Trevor Linden Fitness (Coquitlam)",
    latitude: 49.2783606,
    longitude: -122.8131893,
  },
  {
    id: "gym-59",
    name: "Pinetree Community Centre (Coquitlam)",
    latitude: 49.289399599999996,
    longitude: -122.79152,
  },
  {
    id: "gym-60",
    name: "Lagree West — Coquitlam",
    latitude: 49.2839543,
    longitude: -122.8098779,
  },
  {
    id: "gym-61",
    name: "GoodLife Fitness Abbotsford South Fraser",
    latitude: 49.050534999999996,
    longitude: -122.32468899999999,
  },
  {
    id: "gym-62",
    name: "Anytime Fitness High Street (Abbotsford)",
    latitude: 49.058817999999995,
    longitude: -122.3782026,
  },
  {
    id: "gym-63",
    name: "Bolt Fitness (Abbotsford)",
    latitude: 49.0683947,
    longitude: -122.3586203,
  },
  {
    id: "gym-64",
    name: "Art of Fitness (Abbotsford)",
    latitude: 49.0461242,
    longitude: -122.29201710000001,
  },
  {
    id: "gym-65",
    name: "Club16 Trevor Linden Fitness (Abbotsford)",
    latitude: 49.053146299999995,
    longitude: -122.32188660000001,
  },
  {
    id: "gym-66",
    name: "Great West Fitness & Tennis (Abbotsford)",
    latitude: 49.047073399999995,
    longitude: -122.2691892,
  },
  {
    id: "gym-67",
    name: "Anytime Fitness (N Parallel Rd, Abbotsford)",
    latitude: 49.0370371,
    longitude: -122.23077039999998,
  },
  {
    id: "gym-68",
    name: "The Fitness Lab (Abbotsford)",
    latitude: 49.044522699999995,
    longitude: -122.2812596,
  },
  {
    id: "gym-69",
    name: "Abbotsford Recreation Centre",
    latitude: 49.047961199999996,
    longitude: -122.26236949999999,
  },
  {
    id: "gym-70",
    name: "Planet Fitness (Abbotsford)",
    latitude: 49.044399999999996,
    longitude: -122.29478999999999,
  },
  {
    id: "gym-71",
    name: "təməsew̓txʷ Aquatic and Community Centre (New Westminster)",
    latitude: 49.221286299999996,
    longitude: -122.90812129999998,
  },
  {
    id: "gym-72",
    name: "Planet Fitness (New Westminster)",
    latitude: 49.21257,
    longitude: -122.91918999999999,
  },
  {
    id: "gym-73",
    name: "Dynamic Health and Fitness (New Westminster)",
    latitude: 49.200939,
    longitude: -122.91301929999999,
  },
  {
    id: "gym-74",
    name: "Anytime Fitness (6th St, New Westminster)",
    latitude: 49.2115831,
    longitude: -122.9239127,
  },
  {
    id: "gym-75",
    name: "Snap Fitness New Westminster",
    latitude: 49.224990399999996,
    longitude: -122.89123979999998,
  },
  {
    id: "gym-76",
    name: "EZ Fit (New Westminster)",
    latitude: 49.204263700000006,
    longitude: -122.9094798,
  },
  {
    id: "gym-77",
    name: "Steel House Fitness (New Westminster)",
    latitude: 49.193518700000006,
    longitude: -122.94945440000001,
  },
  {
    id: "gym-78",
    name: "Queen's Park Sportsplex (New Westminster)",
    latitude: 49.213536100000006,
    longitude: -122.90377689999998,
  },
  {
    id: "gym-79",
    name: "Queensborough Community Centre (New Westminster)",
    latitude: 49.1859007,
    longitude: -122.9435704,
  },
  {
    id: "gym-80",
    name: "Anytime Fitness (Ewen Ave, New Westminster)",
    latitude: 49.1845451,
    longitude: -122.9495103,
  },
];

/** Default camera (Vancouver, BC) until user location drives the region. */
const INITIAL_REGION = {
  latitude: 49.2827,
  longitude: -123.1207,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const GYM_MARKER_IMAGE = require("@/assets/icons/marker.png");
const DEFAULT_GYM_CARD_IMAGE = require("@/assets/backgrounds/map-gym-default-background.png");
const USER_ICON_MAP_CARD = require("@/assets/icons/user.png");
const USER_CAR_ICON = require("@/assets/icons/car.png");
const LOCATE_ME_ICON = require("@/assets/icons/locate-me.png");

const LOCATE_FAB_SIZE = 48;
const LOCATE_ICON_SIZE = 24;
/** Extra space below the status bar / notch; increase to move the locate FAB down. */
const LOCATE_FAB_TOP_OFFSET = 45;
/** Inset from the trailing screen edge (right in LTR); increase to move the locate FAB inward. */
const LOCATE_FAB_RIGHT_OFFSET = 25;
/** Zoom span when centering on the user from the locate FAB. */
const USER_REGION_LATITUDE_DELTA = 0.02;
const USER_REGION_LONGITUDE_DELTA = 0.02;

type LatLng = { latitude: number; longitude: number };

function gymCardHeroSource(gym: HardcodedGym): ImageSourcePropType {
  return gym.background_img ?? DEFAULT_GYM_CARD_IMAGE;
}

/** Great-circle distance in kilometres. */
function haversineKm(from: LatLng, to: LatLng): number {
  const R = 6371;
  const dLat = ((to.latitude - from.latitude) * Math.PI) / 180;
  const dLon = ((to.longitude - from.longitude) * Math.PI) / 180;
  const lat1 = (from.latitude * Math.PI) / 180;
  const lat2 = (to.latitude * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(a)));
}

/**
 * Rough driving minutes from straight-line km (no routing API).
 * Replace with Google Directions / Distance Matrix when available.
 */
function estimateDriveMinutes(straightLineKm: number): number {
  const effectiveUrbanKmh = 30;
  const detourFactor = 1.4;
  const roadKm = straightLineKm * detourFactor;
  return Math.max(1, Math.round((roadKm / effectiveUrbanKmh) * 60));
}

/** Hair space between hours and minutes (narrower than a normal space). */
const DRIVE_DURATION_HM_GAP = "\u200A";

/** Display drive time: `45m` under an hour, otherwise `1h 8m` or `2h` when minutes are zero. */
function formatDriveDurationMinutes(totalMinutes: number): string {
  if (totalMinutes < 60) {
    return `${totalMinutes}m`;
  }
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (minutes === 0) {
    return `${hours}h`;
  }
  return `${hours}h${DRIVE_DURATION_HM_GAP}${minutes}m`;
}

/** Street-level zoom when focusing a gym (portrait map ~ 9:16 span). */
const FOCUSED_LATITUDE_DELTA = 0.004;
const FOCUSED_LONGITUDE_DELTA = 0.006;
const FOCUS_ANIMATION_MS = 650;

export default function MapScreen() {
  const mapRef = useRef<InstanceType<typeof MapView>>(null);
  const [selectedGym, setSelectedGym] = useState<HardcodedGym | null>(null);
  const [userLocationVisible, setUserLocationVisible] = useState(false);
  const [userCoords, setUserCoords] = useState<LatLng | null>(null);
  /** Map `onPress` often fires after a marker tap (esp. Android); skip one clear. */
  const skipNextMapDismiss = useRef(false);
  const { height: windowHeight } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const sheetHeight = Math.max(260, Math.round(windowHeight * 0.3));

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (cancelled) return;
      if (status !== Location.PermissionStatus.GRANTED) {
        return;
      }
      setUserLocationVisible(true);
      try {
        const pos = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        if (!cancelled) {
          setUserCoords({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
        }
      } catch {
        /* location unavailable */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!userLocationVisible || !selectedGym) return;
    let cancelled = false;
    (async () => {
      try {
        const pos = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        if (!cancelled) {
          setUserCoords({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
        }
      } catch {
        /* keep previous coords */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [selectedGym, userLocationVisible]);

  const driveEta = useMemo(() => {
    if (!selectedGym || !userCoords) return null;
    const km = haversineKm(userCoords, selectedGym);
    const minutes = estimateDriveMinutes(km);
    return { minutes, km };
  }, [selectedGym, userCoords]);

  const focusGym = useCallback((gym: HardcodedGym) => {
    mapRef.current?.animateToRegion(
      {
        latitude: gym.latitude,
        longitude: gym.longitude,
        latitudeDelta: FOCUSED_LATITUDE_DELTA,
        longitudeDelta: FOCUSED_LONGITUDE_DELTA,
      },
      FOCUS_ANIMATION_MS,
    );
  }, []);

  const handleSelectGym = useCallback(
    (gym: HardcodedGym) => {
      skipNextMapDismiss.current = true;
      setSelectedGym(gym);
      focusGym(gym);
      setTimeout(() => {
        skipNextMapDismiss.current = false;
      }, 400);
    },
    [focusGym],
  );

  const handleMapPress = useCallback(() => {
    if (skipNextMapDismiss.current) {
      skipNextMapDismiss.current = false;
      return;
    }
    setSelectedGym(null);
  }, []);

  const handleLocateMePress = useCallback(async () => {
    const { status } = await Location.getForegroundPermissionsAsync();
    if (status !== Location.PermissionStatus.GRANTED) {
      const req = await Location.requestForegroundPermissionsAsync();
      if (req.status !== Location.PermissionStatus.GRANTED) {
        return;
      }
    }
    setUserLocationVisible(true);
    try {
      const pos = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      const coords = {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      };
      setUserCoords(coords);
      mapRef.current?.animateToRegion(
        {
          ...coords,
          latitudeDelta: USER_REGION_LATITUDE_DELTA,
          longitudeDelta: USER_REGION_LONGITUDE_DELTA,
        },
        FOCUS_ANIMATION_MS,
      );
    } catch {
      /* location unavailable */
    }
  }, []);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.mapStack}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          customMapStyle={[...ONE_REP_MAX_GOOGLE_MAP_STYLE]}
          style={styles.map}
          initialRegion={INITIAL_REGION}
          showsUserLocation={userLocationVisible}
          showsMyLocationButton={false}
          onPress={handleMapPress}
        >
          {HARDCODED_GYMS.map((gym) => (
            <Marker
              key={gym.id}
              coordinate={{ latitude: gym.latitude, longitude: gym.longitude }}
              image={GYM_MARKER_IMAGE}
              anchor={{ x: 0.5, y: 1 }}
              tracksViewChanges={false}
              accessibilityLabel={gym.name}
              onPress={() => handleSelectGym(gym)}
            />
          ))}
        </MapView>

        <View
          collapsable={false}
          style={[
            styles.locateFabOverlay,
            {
              paddingTop: insets.top + LOCATE_FAB_TOP_OFFSET,
              paddingEnd: LOCATE_FAB_RIGHT_OFFSET,
            },
          ]}
          pointerEvents="box-none"
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Center map on my location"
            onPress={handleLocateMePress}
            style={({ pressed }) =>
              pressed ? styles.locateFabPressed : undefined
            }
          >
            <View style={styles.locateFabDisk} collapsable={false}>
              <Image
                source={LOCATE_ME_ICON}
                style={styles.locateFabIcon}
                contentFit="contain"
                accessibilityIgnoresInvertColors
              />
            </View>
          </Pressable>
        </View>

        {selectedGym ? (
          <View style={styles.sheetOverlay} pointerEvents="box-none">
            <View
              accessibilityLabel={`${selectedGym.name} details`}
              style={[styles.sheetCard, { height: sheetHeight }]}
            >
              <View style={styles.sheetInner}>
                <Image
                  source={gymCardHeroSource(selectedGym)}
                  style={styles.sheetHeroImage}
                  contentFit="cover"
                  accessibilityIgnoresInvertColors
                />
                <View style={styles.sheetBottomBlock}>
                  <ThemedText
                    type="title"
                    lightColor="#f0f7ff"
                    darkColor="#f0f7ff"
                    style={styles.sheetGymName}
                    numberOfLines={2}
                  >
                    {selectedGym.name}
                  </ThemedText>
                  <View style={styles.sheetFooterMeta}>
                    <View style={styles.sheetFooterLeft}>
                      <Image
                        source={USER_ICON_MAP_CARD}
                        style={styles.sheetUserIcon}
                        contentFit="contain"
                      />
                      <ThemedText
                        lightColor="#f0f7ff"
                        darkColor="#f0f7ff"
                        style={styles.sheetChatterCount}
                      >
                        8
                      </ThemedText>
                    </View>
                    {userLocationVisible && driveEta ? (
                      <View style={styles.sheetDriveRow}>
                        <Image
                          source={USER_CAR_ICON}
                          style={styles.sheetCarIcon}
                          contentFit="contain"
                        />
                        <View style={styles.sheetDriveMetrics}>
                          <ThemedText
                            lightColor="#f0f7ff"
                            darkColor="#f0f7ff"
                            style={styles.sheetDriveText}
                            numberOfLines={1}
                          >
                            {driveEta.km.toFixed(1)}km
                          </ThemedText>
                          <ThemedText
                            lightColor="#f0f7ff"
                            darkColor="#f0f7ff"
                            style={styles.sheetDriveSep}
                            accessibilityElementsHidden
                            importantForAccessibility="no"
                          >
                            ·
                          </ThemedText>
                          <ThemedText
                            lightColor="#f0f7ff"
                            darkColor="#f0f7ff"
                            style={styles.sheetDriveText}
                            numberOfLines={1}
                          >
                            {formatDriveDurationMinutes(driveEta.minutes)}
                          </ThemedText>
                        </View>
                      </View>
                    ) : null}
                  </View>
                </View>
              </View>
            </View>
          </View>
        ) : null}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...TAB_SCREEN_ROOT_ABOVE_TAB_BAR,
  },
  mapStack: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  locateFabOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "flex-end",
    zIndex: 20,
    elevation: 20,
  },
  /**
   * Opaque disk on a plain `View` (not `Pressable` bg): Google / Apple map
   * surfaces often composite above sibling `Pressable` fills while leaving
   * nested `Image` visible — this structure keeps the button plate on top.
   */
  locateFabDisk: {
    width: LOCATE_FAB_SIZE,
    height: LOCATE_FAB_SIZE,
    borderRadius: LOCATE_FAB_SIZE / 2,
    backgroundColor: APP_SHELL_SECONDARY_BACKGROUND,
    borderWidth: 3,
    borderColor: APP_SHELL_PRIMARY_BACKGROUND,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 21,
    ...Platform.select({
      android: {
        elevation: 24,
      },
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.35,
        shadowRadius: 4,
      },
      default: {},
    }),
  },
  locateFabPressed: {
    opacity: 0.85,
  },
  locateFabIcon: {
    width: LOCATE_ICON_SIZE,
    height: LOCATE_ICON_SIZE,
  },
  sheetOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    paddingHorizontal: 12,
    paddingBottom: 10,
  },
  sheetCard: {
    flexDirection: "column",
    backgroundColor: APP_SHELL_SECONDARY_BACKGROUND,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "rgba(240, 247, 255, 0.35)",
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  sheetInner: {
    flex: 1,
    flexDirection: "column",
    minHeight: 0,
  },
  /** ~2/3 of card inner height (flex 2 vs bottom block flex 1), minus card padding. */
  sheetHeroImage: {
    flex: 2,
    minHeight: 0,
    width: "100%",
    alignSelf: "stretch",
    borderRadius: 10,
  },
  /** ~1/3 for title + actions; content pinned toward bottom of this band. */
  sheetBottomBlock: {
    flex: 1,
    minHeight: 0,
    justifyContent: "flex-end",
    gap: 8,
    paddingTop: 4,
  },
  sheetGymName: {
    textAlign: "left",
    fontSize: 14,
    lineHeight: 20,
  },
  sheetFooterMeta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    minWidth: 0,
  },
  sheetFooterLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  sheetDriveRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    flexShrink: 0,
  },
  sheetDriveMetrics: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  sheetDriveSep: {
    fontSize: 12,
    lineHeight: 16,
    includeFontPadding: false,
  },
  sheetUserIcon: {
    width: 22,
    height: 22,
  },
  sheetCarIcon: {
    width: 24,
    height: 24,
  },
  sheetChatterCount: {
    fontSize: 14,
    lineHeight: 20,
  },
  sheetDriveText: {
    fontSize: 12,
    lineHeight: 16,
    flexShrink: 1,
  },
});
