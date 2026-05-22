/**
 * Persistent chrome palette for this app (shell backgrounds, typography, inputs, charts).
 * Layout-only tokens live in `constants/app-shell.ts`.
 */

/** Root shell: outer frame (gutters) vs inner content stack. */
export const APP_SHELL_PRIMARY_BACKGROUND = "#03418c"; // border lighter blue color
export const APP_SHELL_SECONDARY_BACKGROUND = "#02284f"; // background darker blue color

export const APP_SHELL_LABEL_COLOR = "#ffffffb8"; // muted label text
export const APP_SHELL_MAIN_TEXT_COLOR = "#FFFFFF"; // primary body / input text
export const APP_SHELL_INPUT_PLACEHOLDER_COLOR = "rgba(255, 255, 255, 0.45)";
export const APP_SHELL_INPUT_BOARDER_COLOR = "rgba(255,255,255,0.2)"; // input borders

// --- Bar chart (blue theme; `bar-chart.html` parity — adjust here for in-game / global theming) ---

/** Column fill (`chart-data-bar` background). */
export const BAR_CHART_BLUE_BAR_FILL = "rgba(0, 0, 255, 0.5)";
/** Column outline (`chart-data-bar` border). */
export const BAR_CHART_BLUE_BAR_BORDER = "#0000ff";
/** Faint horizontal grid rules (`.chart-marker-bar`). */
export const BAR_CHART_BLUE_GRID_LINE = "rgba(255, 255, 255, 0.05)";
/** Goal line across the plot (`.chart-target-bar`). */
export const BAR_CHART_BLUE_TARGET_LINE = "#ffffff";
/** Y-axis tick labels and X-axis day labels. */
export const BAR_CHART_BLUE_AXIS_TEXT = "#ffffff";
