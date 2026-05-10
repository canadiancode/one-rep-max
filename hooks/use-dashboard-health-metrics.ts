import {
  AuthorizationRequestStatus,
  CategoryValueSleepAnalysis,
  isHealthDataAvailableAsync,
  queryCategorySamples,
  queryQuantitySamples,
  queryStatisticsForQuantity,
  useHealthkitAuthorization,
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

const DASHBOARD_READ_TYPES = [
  "HKQuantityTypeIdentifierRestingHeartRate",
  "HKQuantityTypeIdentifierBodyMass",
  "HKQuantityTypeIdentifierStepCount",
  "HKQuantityTypeIdentifierActiveEnergyBurned",
  "HKQuantityTypeIdentifierDietaryWater",
  "HKCategoryTypeIdentifierSleepAnalysis",
] as const satisfies readonly ObjectTypeIdentifier[];

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
} {
  const [metrics, setMetrics] = useState<DashboardHealthMetrics>(
    DASHBOARD_HEALTH_FALLBACKS,
  );
  const [connectivity, setConnectivity] =
    useState<DashboardHealthConnectivity>(NO_CONNECTIVITY);
  const [isLoading, setIsLoading] = useState(Platform.OS === "ios");

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
      setIsLoading(false);
      return;
    }

    const available = await isHealthDataAvailableAsync().catch(() => false);
    if (!available) {
      setMetrics(DASHBOARD_HEALTH_FALLBACKS);
      setConnectivity(NO_CONNECTIVITY);
      setIsLoading(false);
      return;
    }

    if (
      authStatus === null ||
      authStatus === AuthorizationRequestStatus.shouldRequest
    ) {
      return;
    }

    setIsLoading(true);
    try {
      const next = await loadDashboardMetrics();
      setMetrics(next.metrics);
      setConnectivity(next.connectivity);
    } catch {
      setMetrics(DASHBOARD_HEALTH_FALLBACKS);
      setConnectivity(NO_CONNECTIVITY);
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

  return { metrics, connectivity, isLoading };
}
