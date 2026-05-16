import {
  AuthorizationRequestStatus,
  CategoryValueSleepAnalysis,
  isHealthDataAvailableAsync,
  queryCategorySamples,
  queryQuantitySamples,
  queryStatisticsForQuantity,
  useHealthkitAuthorization,
  type Device,
  type ObjectTypeIdentifier,
} from "@kingstinct/react-native-healthkit";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Platform } from "react-native";

/** Plausible stand-ins when HealthKit is unavailable, permission is denied, or queries fail. */
export const DASHBOARD_HEALTH_FALLBACKS = {
  restingHeartRateBpm: 12,
  weightLbs: 123,
  steps: 1_234,
  activeEnergyKcal: 1_023,
  sleepHours: 3,
  sleepMinutes: 45,
  waterOz: 67,
} as const;

export type DashboardHealthMetrics = {
  restingHeartRateBpm: number;
  weightLbs: number;
  steps: number;
  activeEnergyKcal: number;
  sleepHours: number;
  sleepMinutes: number;
  waterOz: number;
};

/** True when the metric was sourced from HealthKit; false when it's a fallback. */
export type DashboardHealthConnectivity = {
  restingHeartRateBpm: boolean;
  weightLbs: boolean;
  steps: boolean;
  activeEnergyKcal: boolean;
  sleep: boolean;
  waterOz: boolean;
};

const NO_CONNECTIVITY: DashboardHealthConnectivity = {
  restingHeartRateBpm: false,
  weightLbs: false,
  steps: false,
  activeEnergyKcal: false,
  sleep: false,
  waterOz: false,
};

/** Read identifiers shared by the dashboard and Health settings. */
export const DASHBOARD_READ_TYPES = [
  "HKQuantityTypeIdentifierRestingHeartRate",
  "HKQuantityTypeIdentifierBodyMass",
  "HKQuantityTypeIdentifierStepCount",
  "HKQuantityTypeIdentifierActiveEnergyBurned",
  "HKQuantityTypeIdentifierDietaryWater",
  "HKCategoryTypeIdentifierSleepAnalysis",
] as const satisfies readonly ObjectTypeIdentifier[];

/** Apps/devices inferred from recent samples (not a system pairing list). */
export type HealthKitDataContributor = {
  readonly id: string;
  /** Human-friendly device or app name for the card title. */
  readonly displayTitle: string;
  /** Optional second line (e.g. watchOS / iOS version, or app name for third-party). */
  readonly subtitle?: string;
  readonly lastSeenAt: Date;
};

const CONTRIBUTOR_SAMPLE_LIMIT = 28;
const CONTRIBUTOR_WINDOW_MS = 14 * 24 * 60 * 60 * 1000;
const MAX_CONTRIBUTORS_SHOWN = 20;

type ContributorAgg = {
  readonly id: string;
  sourceName: string;
  bundleIdentifier: string;
  device?: Device;
  lastSeenAtMs: number;
};

function isAppleHealthFamilyBundle(bundleId: string): boolean {
  return (
    bundleId === "com.apple.health" ||
    bundleId.startsWith("com.apple.health.")
  );
}

function deviceInfoScore(d: Device): number {
  return (
    (d.name ? 4 : 0) +
    (d.model ? 2 : 0) +
    (d.softwareVersion ? 2 : 0) +
    (d.hardwareVersion ? 1 : 0)
  );
}

function mergeRicherDevice(a?: Device, b?: Device): Device | undefined {
  if (!a) return b;
  if (!b) return a;
  return deviceInfoScore(b) > deviceInfoScore(a) ? b : a;
}

/** Card title: prefer device name (Apple Watch, …), else sensible fallbacks. */
function contributorCardTitle(
  device: Device | undefined,
  sourceName: string,
  bundleId: string,
): string {
  const name = device?.name?.trim();
  if (name) return name;

  const model = device?.model?.trim();
  if (model) {
    if (/watch/i.test(model)) return "Apple Watch";
    if (/iphone/i.test(model)) return "iPhone";
    return model;
  }

  const hw = device?.hardwareVersion?.trim();
  if (hw) {
    if (/^Watch/i.test(hw)) return "Apple Watch";
    if (/^iPhone/i.test(hw)) return "iPhone";
  }

  if (isAppleHealthFamilyBundle(bundleId)) return "iPhone";

  const sn = sourceName.trim();
  return sn.length > 0 ? sn : "Unknown";
}

/** Optional subtitle: OS line for Apple devices, or app name for third-party. */
function contributorCardSubtitle(
  device: Device | undefined,
  sourceName: string,
  bundleId: string,
  title: string,
): string | undefined {
  const sw = device?.softwareVersion?.trim();
  const tl = title.toLowerCase();
  if (sw) {
    if (tl.includes("watch")) {
      const parts = sw.split(".");
      const majorMinor =
        parts.length >= 2 ? `${parts[0]}.${parts[1]}` : sw;
      return `watchOS ${majorMinor}`;
    }
    if (tl.includes("iphone") || tl === "iphone") {
      const parts = sw.split(".");
      const majorMinor =
        parts.length >= 2 ? `${parts[0]}.${parts[1]}` : sw;
      return `iOS ${majorMinor}`;
    }
  }

  if (!isAppleHealthFamilyBundle(bundleId)) {
    const sn = sourceName.trim();
    if (sn && sn !== title) return sn;
  }

  return undefined;
}

function contributorDedupeKey(bundleIdentifier: string, device?: Device): string {
  return [
    bundleIdentifier,
    device?.hardwareVersion ?? "",
    device?.name ?? "",
  ].join("\u001f");
}

function mergeContributor(
  map: Map<string, ContributorAgg>,
  input: {
    bundleIdentifier: string;
    sourceName: string;
    device?: Device;
    startDate: Date;
  },
): void {
  const id = contributorDedupeKey(input.bundleIdentifier, input.device);
  const lastSeenAtMs = input.startDate.getTime();
  if (!Number.isFinite(lastSeenAtMs)) return;

  const prev = map.get(id);
  if (!prev) {
    map.set(id, {
      id,
      sourceName: input.sourceName,
      bundleIdentifier: input.bundleIdentifier,
      device: input.device,
      lastSeenAtMs,
    });
    return;
  }

  map.set(id, {
    id,
    sourceName: prev.sourceName,
    bundleIdentifier: prev.bundleIdentifier,
    device: mergeRicherDevice(prev.device, input.device),
    lastSeenAtMs: Math.max(prev.lastSeenAtMs, lastSeenAtMs),
  });
}

async function loadHealthKitContributors(): Promise<HealthKitDataContributor[]> {
  const windowEnd = new Date();
  const windowStart = new Date(windowEnd.getTime() - CONTRIBUTOR_WINDOW_MS);
  const dateFilter = {
    date: { startDate: windowStart, endDate: windowEnd },
  } as const;

  const [steps, resting, weight, sleep] = await Promise.all([
    queryQuantitySamples("HKQuantityTypeIdentifierStepCount", {
      limit: CONTRIBUTOR_SAMPLE_LIMIT,
      ascending: false,
      filter: dateFilter,
    }).catch(() => []),
    queryQuantitySamples("HKQuantityTypeIdentifierRestingHeartRate", {
      limit: CONTRIBUTOR_SAMPLE_LIMIT,
      ascending: false,
      filter: dateFilter,
    }).catch(() => []),
    queryQuantitySamples("HKQuantityTypeIdentifierBodyMass", {
      limit: CONTRIBUTOR_SAMPLE_LIMIT,
      ascending: false,
      filter: dateFilter,
    }).catch(() => []),
    queryCategorySamples("HKCategoryTypeIdentifierSleepAnalysis", {
      limit: CONTRIBUTOR_SAMPLE_LIMIT,
      ascending: false,
      filter: dateFilter,
    }).catch(() => []),
  ]);

  const map = new Map<string, ContributorAgg>();

  for (const s of steps) {
    mergeContributor(map, {
      bundleIdentifier: s.sourceRevision.source.bundleIdentifier,
      sourceName: s.sourceRevision.source.name,
      device: s.device,
      startDate: s.startDate,
    });
  }
  for (const s of resting) {
    mergeContributor(map, {
      bundleIdentifier: s.sourceRevision.source.bundleIdentifier,
      sourceName: s.sourceRevision.source.name,
      device: s.device,
      startDate: s.startDate,
    });
  }
  for (const s of weight) {
    mergeContributor(map, {
      bundleIdentifier: s.sourceRevision.source.bundleIdentifier,
      sourceName: s.sourceRevision.source.name,
      device: s.device,
      startDate: s.startDate,
    });
  }
  for (const s of sleep) {
    mergeContributor(map, {
      bundleIdentifier: s.sourceRevision.source.bundleIdentifier,
      sourceName: s.sourceRevision.source.name,
      device: s.device,
      startDate: s.startDate,
    });
  }

  return [...map.values()]
    .sort((a, b) => b.lastSeenAtMs - a.lastSeenAtMs)
    .slice(0, MAX_CONTRIBUTORS_SHOWN)
    .map((row) => {
      const displayTitle = contributorCardTitle(
        row.device,
        row.sourceName,
        row.bundleIdentifier,
      );
      return {
        id: row.id,
        displayTitle,
        subtitle: contributorCardSubtitle(
          row.device,
          row.sourceName,
          row.bundleIdentifier,
          displayTitle,
        ),
        lastSeenAt: new Date(row.lastSeenAtMs),
      };
    });
}

function startOfLocalDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function isAsleepStage(value: number): boolean {
  return (
    value === CategoryValueSleepAnalysis.asleep ||
    value === CategoryValueSleepAnalysis.asleepUnspecified ||
    value === CategoryValueSleepAnalysis.asleepCore ||
    value === CategoryValueSleepAnalysis.asleepDeep ||
    value === CategoryValueSleepAnalysis.asleepREM
  );
}

async function fetchRestingHeartRateBpm(): Promise<number | null> {
  const samples = await queryQuantitySamples(
    "HKQuantityTypeIdentifierRestingHeartRate",
    { limit: 1, ascending: false },
  );
  const q = samples[0]?.quantity;
  if (q == null || !Number.isFinite(q)) return null;
  return Math.round(q);
}

async function fetchWeightLbs(): Promise<number | null> {
  const samples = await queryQuantitySamples(
    "HKQuantityTypeIdentifierBodyMass",
    { limit: 1, ascending: false, unit: "lb" },
  );
  const q = samples[0]?.quantity;
  if (q == null || !Number.isFinite(q)) return null;
  return Math.round(q);
}

async function fetchStepsToday(): Promise<number | null> {
  const now = new Date();
  const from = startOfLocalDay(now);
  const res = await queryStatisticsForQuantity(
    "HKQuantityTypeIdentifierStepCount",
    ["cumulativeSum"],
    { filter: { date: { startDate: from, endDate: now } } },
  );
  const sum = res.sumQuantity?.quantity;
  if (sum == null || !Number.isFinite(sum)) return null;
  return Math.round(sum);
}

async function fetchActiveEnergyToday(): Promise<number | null> {
  const now = new Date();
  const from = startOfLocalDay(now);
  const res = await queryStatisticsForQuantity(
    "HKQuantityTypeIdentifierActiveEnergyBurned",
    ["cumulativeSum"],
    { filter: { date: { startDate: from, endDate: now } } },
  );
  const sum = res.sumQuantity?.quantity;
  if (sum == null || !Number.isFinite(sum)) return null;
  return Math.round(sum);
}

async function fetchWaterOzToday(): Promise<number | null> {
  const now = new Date();
  const from = startOfLocalDay(now);
  const res = await queryStatisticsForQuantity(
    "HKQuantityTypeIdentifierDietaryWater",
    ["cumulativeSum"],
    {
      filter: { date: { startDate: from, endDate: now } },
      unit: "fl_oz_us",
    },
  );
  const sum = res.sumQuantity?.quantity;
  if (sum == null || !Number.isFinite(sum)) return null;
  return Math.round(sum);
}

/** Sum asleep stages over a recent window (Watch / phone sleep analysis). */
async function fetchSleepHoursMinutes(): Promise<{
  hours: number;
  minutes: number;
} | null> {
  const windowEnd = new Date();
  const windowStart = new Date(windowEnd.getTime() - 36 * 60 * 60 * 1000);
  const samples = await queryCategorySamples(
    "HKCategoryTypeIdentifierSleepAnalysis",
    {
      limit: 0,
      ascending: false,
      filter: {
        date: { startDate: windowStart, endDate: windowEnd },
      },
    },
  );

  let asleepMs = 0;
  for (const s of samples) {
    if (!isAsleepStage(s.value as number)) continue;
    const start = s.startDate.getTime();
    const end = s.endDate.getTime();
    if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) {
      continue;
    }
    asleepMs += end - start;
  }

  if (asleepMs <= 0) return null;

  const totalMinutes = Math.round(asleepMs / 60_000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return { hours, minutes };
}

async function loadDashboardMetrics(): Promise<{
  metrics: DashboardHealthMetrics;
  connectivity: DashboardHealthConnectivity;
}> {
  const [
    restingHeartRateBpm,
    weightLbs,
    steps,
    activeEnergyKcal,
    waterOz,
    sleep,
  ] = await Promise.all([
    fetchRestingHeartRateBpm().catch(() => null),
    fetchWeightLbs().catch(() => null),
    fetchStepsToday().catch(() => null),
    fetchActiveEnergyToday().catch(() => null),
    fetchWaterOzToday().catch(() => null),
    fetchSleepHoursMinutes().catch(() => null),
  ]);

  return {
    metrics: {
      restingHeartRateBpm:
        restingHeartRateBpm ?? DASHBOARD_HEALTH_FALLBACKS.restingHeartRateBpm,
      weightLbs: weightLbs ?? DASHBOARD_HEALTH_FALLBACKS.weightLbs,
      steps: steps ?? DASHBOARD_HEALTH_FALLBACKS.steps,
      activeEnergyKcal:
        activeEnergyKcal ?? DASHBOARD_HEALTH_FALLBACKS.activeEnergyKcal,
      sleepHours: sleep?.hours ?? DASHBOARD_HEALTH_FALLBACKS.sleepHours,
      sleepMinutes: sleep?.minutes ?? DASHBOARD_HEALTH_FALLBACKS.sleepMinutes,
      waterOz: waterOz ?? DASHBOARD_HEALTH_FALLBACKS.waterOz,
    },
    connectivity: {
      restingHeartRateBpm: restingHeartRateBpm != null,
      weightLbs: weightLbs != null,
      steps: steps != null,
      activeEnergyKcal: activeEnergyKcal != null,
      sleep: sleep != null,
      waterOz: waterOz != null,
    },
  };
}

export function useDashboardHealthMetrics(): {
  metrics: DashboardHealthMetrics;
  connectivity: DashboardHealthConnectivity;
  isLoading: boolean;
  healthDataAvailable: boolean | null;
  authorizationRequestStatus: AuthorizationRequestStatus | null;
  healthContributors: readonly HealthKitDataContributor[];
} {
  const [metrics, setMetrics] = useState<DashboardHealthMetrics>(
    DASHBOARD_HEALTH_FALLBACKS,
  );
  const [connectivity, setConnectivity] =
    useState<DashboardHealthConnectivity>(NO_CONNECTIVITY);
  const [isLoading, setIsLoading] = useState(Platform.OS === "ios");
  const [healthDataAvailable, setHealthDataAvailable] = useState<
    boolean | null
  >(Platform.OS === "ios" ? null : false);
  const [healthContributors, setHealthContributors] = useState<
    readonly HealthKitDataContributor[]
  >([]);

  const [authStatus, requestAuthorization] = useHealthkitAuthorization({
    toRead: DASHBOARD_READ_TYPES,
  });

  const hasPromptedAuthRef = useRef(false);

  useEffect(() => {
    if (Platform.OS !== "ios") {
      setIsLoading(false);
      return;
    }
    if (authStatus !== AuthorizationRequestStatus.shouldRequest) return;
    if (hasPromptedAuthRef.current) return;
    hasPromptedAuthRef.current = true;
    void requestAuthorization();
  }, [authStatus, requestAuthorization]);

  const refresh = useCallback(async () => {
    if (Platform.OS !== "ios") {
      setMetrics(DASHBOARD_HEALTH_FALLBACKS);
      setConnectivity(NO_CONNECTIVITY);
      setHealthDataAvailable(false);
      setHealthContributors([]);
      setIsLoading(false);
      return;
    }

    const available = await isHealthDataAvailableAsync().catch(() => false);
    setHealthDataAvailable(available);
    if (!available) {
      setMetrics(DASHBOARD_HEALTH_FALLBACKS);
      setConnectivity(NO_CONNECTIVITY);
      setHealthContributors([]);
      setIsLoading(false);
      return;
    }

    if (
      authStatus === null ||
      authStatus === AuthorizationRequestStatus.shouldRequest
    ) {
      setHealthContributors([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const next = await loadDashboardMetrics();
      setMetrics(next.metrics);
      setConnectivity(next.connectivity);
      const contributorsNext = await loadHealthKitContributors().catch(
        () => [],
      );
      setHealthContributors(contributorsNext);
    } catch {
      setMetrics(DASHBOARD_HEALTH_FALLBACKS);
      setConnectivity(NO_CONNECTIVITY);
      setHealthContributors([]);
    } finally {
      setIsLoading(false);
    }
  }, [authStatus]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useFocusEffect(
    useCallback(() => {
      void refresh();
    }, [refresh]),
  );

  return {
    metrics,
    connectivity,
    isLoading,
    healthDataAvailable,
    authorizationRequestStatus: authStatus,
    healthContributors,
  };
}
