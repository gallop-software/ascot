import type { Point } from './geometry'
import type { DimLabel } from './dimension'

export type TrimCategory = 'commercial' | 'residential'

export interface CalloutSpec {
  start?: [number, number, number]
  end: [number, number, number]
  text: string
  space: number
}

export interface DimSpec {
  start: [number, number, number]
  end: [number, number, number]
  text: string
  direction?: 'horizontal' | 'vertical' | 'angled'
  textPosition?: 'in-line' | 'below'
  ticDirectionOpposite?: boolean
}

export interface TrimContent {
  id: string
  number: number
  name: string
  category: TrimCategory
  /** When false the 3D render is intentionally left blank (not yet modelled). */
  available: boolean
  /** Ribbon (default) or the special bent corrugated peak-sheet cap. */
  geometry?: 'ribbon' | 'peak-sheet'
  coords?: Point[]
  /** Per-segment dimension callouts, index-aligned to `coords`. */
  labels?: (DimLabel | null)[]
  translate?: { x: number; y: number; z: number }
  depth?: number
  smoothRadius?: number
  /** Per-trim zoom multiplier (>1 zooms out, <1 zooms in). Defaults to 1. */
  fit?: number
  /**
   * Put the painted (colored) finish on the BackSide instead of the FrontSide.
   * Set this for trims whose cross-section polyline is wound so the painted face
   * would otherwise render as the unpainted underside.
   */
  paintedBack?: boolean
  /**
   * Optional per-trim camera view direction (a vector pointing from the part
   * toward the camera; it's normalized, so only the angle matters). Omit to use
   * the default near-front framing. Examples: [0,0,1] straight-on front,
   * [0.7,0.4,1] angled from the right and above, [-0.7,0.4,1] from the left.
   */
  cameraDir?: [number, number, number]
  /** Free-text leader annotations (Painted Side, Specify Pitch, …). */
  annotations?: CalloutSpec[]
  /** Explicit dimension lines not derived from `labels`. */
  extraDimensions?: DimSpec[]
}

const Z = 10 // panelDepth / 2, front face where annotations sit

export const TRIM_CONTENT: TrimContent[] = [
  // ── Commercial ──────────────────────────────────────────────────────────
  // First four are not modelled yet, so rendered as blank placeholders.
  {
    id: 'rat-guard',
    number: 4,
    name: 'Rat Guard',
    category: 'commercial',
    available: true,
    paintedBack: true,
    // Geometry scaled ×3 from the true 2"/1¾"/2½"/½" so it sits in the same
    // size class as the other trims (the dimension offsets/labels are tuned for
    // that range); the callout text still shows the real measurements.
    coords: [
      { x: 0, y: 6 }, // top of the 2" vertical leg
      { x: 0, y: 0 }, // inside corner
      { x: 5.25, y: 0 }, // 1¾" horizontal
      { x: 0.45, y: -5.76 }, // 2½" diagonal kicking back down-left
      { x: 1.61, y: -6.72 }, // ½" hem turned down-right off the tip
      { x: 1.61, y: -6.9 }, // ½" hem turned down-right off the tip
      { x: 0.9, y: -6.4 }, // hook folds back up, a real hem like base trim
    ],
    labels: [
      { text: '2"', outside: true },
      { text: '1.75"', outside: true },
      { text: '2.5"', outside: false },
      { text: '0.5"', outside: true },
      null,
    ],
    translate: { x: -2.63, y: -0.12, z: 0 },
    annotations: [{ end: [7, 4, Z], text: 'Painted Side', space: 1 }],
  },
  {
    id: 'flat-ridge',
    number: 5,
    name: 'Flat Ridge',
    category: 'commercial',
    available: true,
    paintedBack: true,
    fit: 1.3,
    coords: [
      { x: -5.4, y: 0.9 }, // left drip hook (mirror of right)
      { x: -5.8, y: 0.8 },
      { x: -5.8, y: 0.95 }, // left eave
      { x: 0, y: 2.5 }, // peak (6" arms)
      { x: 5.8, y: 0.95 }, // right eave
      { x: 5.8, y: 0.8 }, // right drip hook (single straight hook, curls back in)
      { x: 5.4, y: 0.9 },
    ],
    labels: [
      null,
      null,
      { text: '6"', outside: false },
      { text: '6"', outside: false },
      null,
      null,
    ],
    translate: { x: 0, y: -1.65, z: 0 },
    annotations: [
      { end: [1.5, 3.6, Z], text: 'Painted Side', space: 1 },
      { end: [-1, -0.2, Z], text: 'Specify Pitch', space: 1 },
    ],
  },
  {
    id: 'wainscott-trim',
    number: 6,
    name: 'Wainscott Trim',
    category: 'commercial',
    available: true,
    paintedBack: true,
    coords: [
      { x: 0, y: 6.4 }, // top of the 1⅝" leg (slight lean)
      { x: 0, y: 0 }, // corner
      { x: 7, y: 0 }, // 1¾" horizontal
      { x: 7, y: -8 }, // 2" vertical drop
      { x: 6.8, y: -8 }, // hem hook
      { x: 6.8, y: -7.4 }, // hook curls back
    ],
    labels: [
      { text: '1⅝"', outside: true },
      { text: '1.75"', outside: true },
      { text: '2"', outside: false },
      null,
      null,
    ],
    translate: { x: -3.25, y: 1.05, z: 0 },
    annotations: [{ end: [3, 7, Z], text: 'Painted Side', space: 1 }],
  },
  {
    id: 'head-trim-7',
    number: 7,
    name: 'Head Trim',
    category: 'commercial',
    available: true,
    coords: [
      { x: 0, y: 12 }, // top of the 3" face leg
      { x: 0, y: 0 }, // bottom corner
      { x: 4, y: 0 }, // 1" horizontal
      { x: 5.14, y: -1.14 }, // 1¼" upturned return leg
      { x: 5.14, y: 4.14 }, // ½" hem hook
      { x: 4.95, y: 4.14 }, // ½" hem hook
      { x: 4.95, y: 3.7 }, // ½" hem hook
    ],
    labels: [
      { text: '3"', outside: true },
      { text: '1"', outside: false },
      { text: '0.5"', outside: true },
      { text: '1.25"', outside: true },
    ],
    translate: { x: -2, y: -6, z: 0 },
    annotations: [{ end: [-6, -5, Z], text: 'Painted Side', space: 1 }],
  },

  {
    id: 'peak-sheet',
    number: 8,
    name: 'Peak Sheet',
    category: 'commercial',
    available: true,
    geometry: 'peak-sheet',
    depth: 20,
    paintedBack: true,
    // Peak-sheet camera at [40, 5, 25] looking at the origin.
    cameraDir: [40, 5, 25],
    // Relative {dx, y} steps fed through connectPoints; built into a pitched cap.
    coords: [
      { x: 0, y: 0.075 },
      { x: 0.63, y: 0.75 },
      { x: 0.4, y: 0.75 },
      { x: 0.4, y: 0.75 },
      { x: 0.7, y: 0 },
      { x: 1.3, y: 0 },
      { x: 0.3, y: 0.25 },
      { x: 0.75, y: 0.25 },
      { x: 0.3, y: 0 },
      { x: 1.5, y: 0 },
      { x: 0.3, y: 0.25 },
      { x: 0.75, y: 0.25 },
      { x: 0.3, y: 0 },
      { x: 1.3, y: 0 },
      { x: 0.7, y: 0.75 },
      { x: 0.4, y: 0.75 },
      // middle repeats ×3 more
      { x: 0.4, y: 0.75 },
      { x: 0.7, y: 0 },
      { x: 1.3, y: 0 },
      { x: 0.3, y: 0.25 },
      { x: 0.75, y: 0.25 },
      { x: 0.3, y: 0 },
      { x: 1.5, y: 0 },
      { x: 0.3, y: 0.25 },
      { x: 0.75, y: 0.25 },
      { x: 0.3, y: 0 },
      { x: 1.3, y: 0 },
      { x: 0.7, y: 0.75 },
      { x: 0.4, y: 0.75 },
      { x: 0.4, y: 0.75 },
      { x: 0.7, y: 0 },
      { x: 1.3, y: 0 },
      { x: 0.3, y: 0.25 },
      { x: 0.75, y: 0.25 },
      { x: 0.3, y: 0 },
      { x: 1.5, y: 0 },
      { x: 0.3, y: 0.25 },
      { x: 0.75, y: 0.25 },
      { x: 0.3, y: 0 },
      { x: 1.3, y: 0 },
      { x: 0.7, y: 0.75 },
      { x: 0.4, y: 0.75 },
      { x: 0.4, y: 0.75 },
      { x: 0.7, y: 0 },
      { x: 1.3, y: 0 },
      { x: 0.3, y: 0.25 },
      { x: 0.75, y: 0.25 },
      { x: 0.3, y: 0 },
      { x: 1.5, y: 0 },
      { x: 0.3, y: 0.25 },
      { x: 0.75, y: 0.25 },
      { x: 0.3, y: 0 },
      { x: 1.3, y: 0 },
      { x: 0.7, y: 0.75 },
      { x: 0.4, y: 0.75 },
      // end
      { x: 0.4, y: 0.75 },
      { x: 0.7, y: 0 },
      { x: 0.63, y: 0 },
    ],
    translate: { x: -19.03, y: -1, z: 0 },
    extraDimensions: [
      {
        start: [20.7, -1, -Z],
        end: [20.7, 3.6, 0],
        text: '18"',
        direction: 'angled',
        ticDirectionOpposite: true,
      },
      {
        start: [20.7, -1, Z],
        end: [20.7, 3.6, 0],
        text: '18"',
        direction: 'angled',
        ticDirectionOpposite: true,
      },
      {
        start: [-18.9, -2, Z],
        end: [19.7, -2, Z],
        text: "3'",
        direction: 'horizontal',
        ticDirectionOpposite: true,
      },
    ],
  },
  {
    id: 'sculptured-post-hung-gutter',
    number: 9,
    name: 'Sculptured Post Hung Gutter',
    category: 'commercial',
    available: true,
    coords: [
      { x: 0.4, y: 12 },
      { x: 2, y: 12 },
      { x: 2, y: 12.5 },
      { x: 0, y: 12.5 },
      { x: -3.5, y: 6 },
      { x: 0, y: 0 },
      { x: 8, y: 0 },
      { x: 8, y: 10.5 },
      { x: 6, y: 10.5 },
    ],
    labels: [
      null,
      null,
      { text: '1"', outside: true },
      { text: '3.5"', outside: true },
      { text: '3.5"', outside: true },
      { text: '4"', outside: true },
      { text: '5.25"', outside: true },
      { text: '1"', outside: true },
    ],
    translate: { x: -4, y: -6.5, z: 0 },
    annotations: [
      { end: [-12, 0.5, Z], text: 'Specify Pitch', space: 1 },
      { end: [-10, -5, Z], text: 'Painted Side', space: 1 },
    ],
    extraDimensions: [
      {
        start: [-0.7, 5.7, Z],
        end: [-0.7, 4.0, Z],
        text: '1.25"',
        direction: 'vertical',
        textPosition: 'below',
      },
    ],
  },
  {
    id: 'sculptured-pre-hung-gutter',
    number: 10,
    name: 'Sculptured Pre Hung Gutter',
    category: 'commercial',
    available: true,
    coords: [
      { x: 0.4, y: 12 },
      { x: 2, y: 12 },
      { x: 2, y: 12.5 },
      { x: 0, y: 12.5 },
      { x: -3.5, y: 6 },
      { x: 0, y: 0 },
      { x: 8, y: 0 },
      { x: 8, y: 10.5 },
      { x: 13.66, y: 16.16 },
    ],
    labels: [
      null,
      null,
      { text: '1"', outside: true },
      { text: '3.5"', outside: true },
      { text: '3.5"', outside: true },
      { text: '4"', outside: true },
      { text: '5.25"', outside: true },
      { text: '4"', outside: false },
    ],
    translate: { x: -4.83, y: -8.08, z: 0 },
    annotations: [
      { end: [-12, -1, Z], text: 'Specify Pitch', space: 1 },
      { end: [-11, -6.5, Z], text: 'Painted Side', space: 1 },
    ],
    extraDimensions: [
      {
        start: [-0.7, 4.1, Z],
        end: [-0.7, 2.4, Z],
        text: '1.25"',
        direction: 'vertical',
        textPosition: 'below',
      },
    ],
  },
  {
    id: 'sculptured-rake',
    number: 11,
    name: 'Sculptured Rake',
    category: 'commercial',
    available: true,
    coords: [
      { x: 16, y: 8 },
      { x: 17.5, y: 8 },
      { x: 17.5, y: 8.5 },
      { x: 16, y: 8.5 },
      { x: 13.5, y: 12 },
      { x: 3.5, y: 12 },
      { x: 0, y: 6 },
      { x: 3.5, y: 0 },
      { x: 6.5, y: 0 },
      { x: 6.5, y: -3 },
      { x: 7, y: -3 },
      { x: 7, y: -1.5 },
    ],
    labels: [
      null,
      null,
      { text: '0.75"', outside: true },
      { text: '1.75"', outside: false },
      { text: '5"', outside: true },
      { text: '3.5"', outside: true },
      { text: '3.5"', outside: true },
      { text: '1.5"', outside: true },
      { text: '1.5"', outside: false },
      null,
      null,
    ],
    translate: { x: -8, y: -6.125, z: 0 },
    annotations: [{ end: [-12, -1, Z], text: 'Painted Side', space: 1 }],
  },
  {
    id: 'outside-corner',
    number: 12,
    name: 'Outside Corner',
    category: 'commercial',
    available: true,
    coords: [
      { x: 10.5, y: 5 },
      { x: 12, y: 5 },
      { x: 12, y: 5.5 },
      { x: 10.5, y: 5.5 },
      { x: 8, y: 8 },
      { x: 0, y: 8 },
      { x: 0, y: 0 },
      { x: 2.5, y: -2.5 },
      { x: 2.5, y: -4 },
      { x: 3, y: -4 },
      { x: 3, y: -2.5 },
    ],
    labels: [
      { text: '0.75"', outside: true },
      null,
      null,
      { text: '1.75"', outside: false },
      { text: '4"', outside: true },
      { text: '4"', outside: true },
      { text: '1.75"', outside: true },
      { text: '0.75"', outside: false },
      null,
      null,
    ],
    translate: { x: -3, y: -2, z: 0 },
    annotations: [{ end: [-10, 0, Z], text: 'Painted Side', space: 1 }],
  },
  {
    id: 'inside-corner',
    number: 13,
    name: 'Inside Corner',
    category: 'commercial',
    available: true,
    paintedBack: true,
    coords: [
      { x: 7.875, y: 8.25 },
      { x: 9, y: 8.25 },
      { x: 9, y: 7.875 },
      { x: 7.875, y: 7.875 },
      { x: 6, y: 6 },
      { x: 0, y: 6 },
      { x: 0, y: 0 },
      { x: -1.875, y: -1.875 },
      { x: -1.875, y: -3 },
      { x: -2.25, y: -3 },
      { x: -2.25, y: -1.875 },
    ],
    labels: [
      { text: '0.75"', outside: false },
      null,
      null,
      { text: '1.75"', outside: false },
      { text: '4"', outside: true },
      { text: '4"', outside: true },
      { text: '1.75"', outside: false },
      { text: '0.75"', outside: true },
      null,
      null,
    ],
    translate: { x: -5, y: -2.515, z: 0 },
    annotations: [{ end: [6.5, -1.25, Z], text: 'Painted Side', space: 1 }],
  },
  {
    id: 'high-side-eave',
    number: 14,
    name: 'Sculptured High Side Eave',
    category: 'commercial',
    available: true,
    coords: [
      { x: 9, y: 5.75 },
      { x: 9.75, y: 5.75 },
      { x: 9.75, y: 6 },
      { x: 1.75, y: 6 },
      { x: 0, y: 3 },
      { x: 1.75, y: 0 },
      { x: 3.25, y: 0 },
      { x: 3.25, y: -1.5 },
      { x: 3.5, y: -1.5 },
      { x: 3.5, y: -0.75 },
    ],
    labels: [
      null,
      null,
      { text: '8"', outside: true },
      { text: '3.5"', outside: true },
      { text: '3.5"', outside: true },
      { text: '1.5"', outside: true },
      { text: '1.5"', outside: false },
      null,
      null,
    ],
    translate: { x: -5.5124, y: -2.515, z: 0 },
    annotations: [
      { end: [-7.3, 1.5, Z], text: 'Specify Pitch', space: 1 },
      { end: [-6.8, -1.25, Z], text: 'Painted Side', space: 1 },
    ],
  },
  {
    id: 'long-eave-trim',
    number: 15,
    name: 'Long Eave Trim',
    category: 'commercial',
    available: true,
    coords: [
      { x: 6, y: 13.7 },
      { x: 0.7, y: 10.7 },
      { x: 0.7, y: 0.7 },
      { x: 0, y: 0 },
      { x: 0, y: -0.25 },
      { x: 0.35, y: 0.1 },
    ],
    labels: [
      { text: '3"', outside: true },
      { text: '5"', outside: true },
      { text: '0.5"', outside: false },
      null,
      null,
    ],
    translate: { x: -3, y: -6.5, z: 0 },
    annotations: [
      { end: [-8.5, 3, Z], text: 'Painted Side', space: 1 },
      { end: [-8.5, -3.5, Z], text: 'Specify Pitch', space: 1 },
    ],
  },
  {
    id: 'head-trim',
    number: 16,
    name: 'Head Trim',
    category: 'commercial',
    available: true,
    coords: [
      { x: 1.25, y: 6.25 },
      { x: 1.25, y: 7.5 },
      { x: 0, y: 7.5 },
      { x: 0, y: 0 },
      { x: 7.5, y: 0 },
      { x: 7.5, y: 13.75 },
    ],
    labels: [
      null,
      null,
      { text: '1.5"', outside: true },
      { text: '1.5"', outside: true },
      { text: '2.75"', outside: true },
    ],
    translate: { x: -3, y: -5, z: 0 },
    annotations: [{ end: [-9, 0.25, Z], text: 'Painted Side', space: 1 }],
  },
  {
    id: 'jamb-trim',
    number: 17,
    name: 'Jamb Trim',
    category: 'commercial',
    available: true,
    coords: [
      { x: 1.4, y: 4.6 },
      { x: 0, y: 6 },
      { x: 0, y: 0 },
      { x: 6, y: 0 },
      { x: 6, y: 11 },
    ],
    labels: [
      { text: '0.5"', outside: true },
      { text: '1.5"', outside: true },
      { text: '1.5"', outside: true },
      { text: '2.75"', outside: true },
    ],
    translate: { x: -3, y: -4, z: 0 },
    annotations: [{ end: [-7, 0, Z], text: 'Painted Side', space: 1 }],
  },
  {
    id: 'base-trim',
    number: 18,
    name: 'Base Trim',
    category: 'commercial',
    available: true,
    paintedBack: true,
    coords: [
      { x: 0, y: 9.75 },
      { x: 0, y: 0 },
      { x: 5.25, y: 0 },
      { x: 5.25, y: 0 },
      { x: 6.84, y: -1.59 },
      { x: 6.84, y: -2.34 },
      { x: 6.84, y: -2.34 },
      { x: 6.045, y: -1.545 },
    ],
    labels: [
      { text: '3.25"', outside: true },
      { text: '1.75"', outside: true },
      null,
      { text: '0.75"', outside: false },
    ],
    translate: { x: -3, y: -2, z: 0 },
    annotations: [{ end: [8, 5, Z], text: 'Painted Side', space: 1 }],
  },
  {
    id: 'sidewall-transition',
    number: 19,
    name: 'Sidewall Transition',
    category: 'commercial',
    available: true,
    coords: [
      { x: 0, y: 6 },
      { x: 0, y: 0 },
      { x: 8, y: 0 },
      { x: 10.5, y: -3 },
      { x: 12, y: -3 },
    ],
    labels: [
      { text: '3"', outside: true },
      { text: '4"', outside: true },
      { text: '1.75"', outside: false },
      { text: '0.75"', outside: true },
    ],
    translate: { x: -5, y: 1, z: 0 },
    annotations: [{ end: [-7, 0.25, Z], text: 'Painted Side', space: 1 }],
  },

  // ── Residential ─────────────────────────────────────────────────────────
  {
    id: 'sculptured-ridge',
    number: 20,
    name: 'Sculptured Ridge',
    category: 'residential',
    available: true,
    coords: [
      { x: 5.225, y: -3.65 },
      { x: 5.875, y: -4.025 },
      { x: 5.875, y: -3.775 },
      { x: 4.375, y: -2.9 },
      { x: 4.5, y: -2.25 },
      { x: 0, y: 0 },
      { x: -4.5, y: -2.25 },
      { x: -4.375, y: -2.9 },
      { x: -5.875, y: -3.775 },
      { x: -5.875, y: -4.025 },
      { x: -5.225, y: -3.65 },
    ],
    labels: [
      null,
      null,
      { text: '1.75"', outside: true },
      null,
      { text: '4.5"', outside: true },
      { text: '4.5"', outside: true },
      null,
      { text: '1.75"', outside: true },
    ],
    translate: { x: 0, y: 2, z: 0 },
    // Match the Peak Sheet camera angle (the default view reads as off here).
    cameraDir: [-40, 2, 55],
    fit: 1.25, // pull the camera back so the part isn't oversized
    annotations: [
      { end: [6.5, 4.5, Z], text: 'Painted Side', space: 1 },
      { end: [1, -1, Z], text: 'Specify Pitch', space: 1 },
    ],
  },
  {
    id: 'short-eave-trim',
    number: 21,
    name: 'Short Eave Trim',
    category: 'residential',
    available: true,
    coords: [
      { x: 13.4, y: 13.4 },
      { x: 1.4, y: 13.4 },
      { x: 1.4, y: 1.4 },
      { x: 0, y: 0 },
      { x: 0, y: -0.5 },
      { x: 0.7, y: 0.2 },
    ],
    labels: [
      { text: '3"', outside: true },
      { text: '3"', outside: true },
      { text: '0.5"', outside: false },
    ],
    translate: { x: -6, y: -8, z: 0 },
  },
  {
    id: 'residential-rake',
    number: 22,
    name: 'Residential Rake',
    category: 'residential',
    available: true,
    coords: [
      { x: 9.4, y: 6.1 },
      { x: 10.9, y: 6.1 },
      { x: 10.9, y: 6.6 },
      { x: 9.4, y: 6.6 },
      { x: 8, y: 8 },
      { x: 0, y: 8 },
      { x: 0, y: 0 },
      { x: -0.7, y: -0.7 },
      { x: -0.7, y: -0.95 },
      { x: 0, y: -0.25 },
    ],
    labels: [
      null,
      { text: '0.75"', outside: true },
      null,
      { text: '1"', outside: true },
      { text: '4"', outside: true },
      { text: '4"', outside: true },
      { text: '0.5"', outside: false },
    ],
    translate: { x: -5, y: -4, z: 0 },
    annotations: [{ end: [3, 10, Z], text: 'Painted Side', space: 1 }],
  },
  {
    id: 'valley',
    number: 23,
    name: 'Valley',
    category: 'residential',
    available: true,
    paintedBack: true,
    coords: [
      { x: -11.4, y: 6.75 },
      { x: -12, y: 6.375 },
      { x: -12, y: 6.375 },
      { x: -0.9375, y: 0 },
      { x: 0, y: 1.5 },
      { x: 0.9375, y: 0 },
      { x: 12, y: 6.375 },
      { x: 12, y: 6.375 },
      { x: 11.4, y: 6.75 },
    ],
    labels: [
      { text: '0.5"', outside: true },
      null,
      { text: '8.5"', outside: true },
      { text: '1.25"', outside: false },
      { text: '1.25"', outside: false },
      { text: '8.5"', outside: true },
      null,
      { text: '0.5"', outside: true },
    ],
    translate: { x: 0, y: -3, z: 0 },
    annotations: [
      { end: [2, 8.25, Z], text: 'Painted Side', space: 1 },
      { end: [2, -6.5, Z], text: 'Specify Pitch', space: 1 },
    ],
  },
]

export const TRIM_ORDER = TRIM_CONTENT.map((t) => t.id)

/**
 * Maps each catalog trim slug to its formed cross-section here, so cards can
 * show the 3D model of the piece instead of a photo. Shared by the trims page
 * and the trim grid on the panels page.
 */
export const TRIM_MODELS: Record<string, string> = {
  'ridge-cap': 'sculptured-ridge',
  'rake-trim': 'sculptured-rake',
  'eave-trim': 'long-eave-trim',
  'valley-trim': 'valley',
  'corner-trim': 'outside-corner',
  'base-trim': 'base-trim',
}

/** The viewer cross-section for a catalog trim slug, if one exists. */
export function getTrimModel(slug: string) {
  const id = TRIM_MODELS[slug]
  return id ? TRIM_CONTENT.find((content) => content.id === id) : undefined
}
