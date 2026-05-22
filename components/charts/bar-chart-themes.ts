import {
  BAR_CHART_BLUE_AXIS_TEXT,
  BAR_CHART_BLUE_BAR_BORDER,
  BAR_CHART_BLUE_BAR_FILL,
  BAR_CHART_BLUE_GRID_LINE,
  BAR_CHART_BLUE_TARGET_LINE,
} from "@/constants/app-colors";

import type { BarChartThemeId } from "./bar-chart-types";

export type BarChartThemeTokens = {
  barFill: string;
  barBorder: string;
  gridLine: string;
  targetLine: string;
  axisText: string;
};

const BLUE_THEME: BarChartThemeTokens = {
  barFill: BAR_CHART_BLUE_BAR_FILL,
  barBorder: BAR_CHART_BLUE_BAR_BORDER,
  gridLine: BAR_CHART_BLUE_GRID_LINE,
  targetLine: BAR_CHART_BLUE_TARGET_LINE,
  axisText: BAR_CHART_BLUE_AXIS_TEXT,
};

const THEMES: Record<BarChartThemeId, BarChartThemeTokens> = {
  blue: BLUE_THEME,
};

export function getBarChartTheme(theme: BarChartThemeId): BarChartThemeTokens {
  return THEMES[theme];
}
