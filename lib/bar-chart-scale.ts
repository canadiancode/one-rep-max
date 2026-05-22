/**
 * Y-axis scaling for bar charts (mirrors `bar-chart.html` `generateMarkers` + height math).
 */

export type BarChartYScale = {
  markerValues: number[];
  lowestMarker: number;
  highestMarker: number;
  range: number;
};

/**
 * Snaps the Y domain to multiples of `increment`, matching the prototype HTML chart.
 *
 * @param yDomainFromZero When `true`, the domain floor is pinned to `0` so bar heights are
 *   proportional to absolute values. When `false`, the floor is the data minimum (snapped
 *   down to `increment`), matching the original `bar-chart.html` behavior.
 */
export function generateMarkers(
  yValues: readonly number[],
  increment: number,
  yDomainFromZero = false,
): BarChartYScale {
  if (increment <= 0) {
    throw new Error("Bar chart increment must be positive");
  }
  if (yValues.length === 0) {
    return {
      markerValues: [0],
      lowestMarker: 0,
      highestMarker: 0,
      range: 0,
    };
  }

  const lowestVal = Math.min(...yValues);
  const highestVal = Math.max(...yValues);
  const lowestMarker = yDomainFromZero
    ? 0
    : Math.floor(lowestVal / increment) * increment;
  const highestMarker = Math.ceil(highestVal / increment) * increment;
  const markers: number[] = [];
  for (let i = lowestMarker; i <= highestMarker; i += increment) {
    markers.push(i);
  }
  const range = highestMarker - lowestMarker;
  return {
    markerValues: markers,
    lowestMarker,
    highestMarker,
    range,
  };
}

/** Same formula as the HTML chart: percent distance from the bottom of the plot. */
export function percentHeightFromBottom(
  value: number,
  lowestMarker: number,
  highestMarker: number,
): number {
  const range = highestMarker - lowestMarker;
  if (range <= 0) {
    return 0;
  }
  return ((value - lowestMarker) / range) * 100;
}
