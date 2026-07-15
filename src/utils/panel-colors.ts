import { PANEL_COLORS, type PanelColor } from '@/catalog'

/**
 * Panel finish colors for the interactive viewer.
 *
 * `src/catalog.ts` is the single source of truth for finish data — this module
 * is a thin, non-client re-export so the interactive client `ColorSwatches` and
 * the server-rendered `ColorChart` can share one import without the catalog
 * becoming a client-reference proxy.
 *
 * Hex values are display approximations. Confirm exact matches against physical
 * samples — see `COLOR_DISCLAIMER` in the catalog.
 */
export type { PanelColor }

export const panelColors: PanelColor[] = PANEL_COLORS

/**
 * Finish selected when the viewer first mounts. Must be a hex drawn from
 * `PANEL_COLORS`, since `ColorSwatches` marks the active swatch by comparing
 * `state.panelColor` against each color's `hex`.
 */
export const DEFAULT_PANEL_COLOR: string =
  PANEL_COLORS.find((color) => color.name === 'Barn Red')?.hex ??
  (PANEL_COLORS[0]?.hex as string)
