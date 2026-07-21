/**
 * Parametric cross-section definitions for the metal panel profiles.
 *
 * Profiles are described as data and expanded into a 2D polyline by
 * {@link buildProfilePoints}. The numeric dimensions (rib heights, slope
 * lengths, valley widths) are derived from real panel geometry; everything
 * else here (the single parametric builder, the variant handling, the
 * dimension generator) is original to this template.
 *
 * Units are nominal "profile units"; the 36" coverage maps to the centered
 * span produced by {@link profileMetrics}.
 */

export type PanelProfileId = 'fm-r36' | 'fm-a36' | 'fm-u36'

/** Display + variant metadata shared by every profile spec. */
interface ProfileMeta {
  /** Whether this profile offers a purlin-bearing-leg variant toggle. */
  hasVariant: boolean
  /** Label for the symmetric (non-purlin) variant, e.g. "R-Panel". */
  baseLabel: string
  /** Label for the purlin-bearing-leg variant, e.g. "PBR-Panel". */
  purlinLabel: string
  /** Which variant is shown first (true = purlin-bearing-leg). */
  defaultPurlin: boolean
  /** Rib height callout, e.g. '1¼"'. */
  ribHeightLabel: string
  /** Rib spacing callout matching the product card, e.g. '12"'. */
  centersLabel: string
  /** Rib spacing in inches, for placing the pitch dimension line. */
  centersInches: number
}

/** Double-rib family (PBR, AG Panel): a tall major rib with two minor ribs between. */
interface RibProfileSpec extends ProfileMeta {
  kind: 'rib'
  majorHeight: number
  majorHalfTop: number
  majorSlope: number
  minorHeight: number
  minorTop: number
  minorSlope: number
  valley: number
  valleyCenter: number
  repeats: number
  startFactor: number
  /**
   * Optional two-tier major rib (AG Panel). When set, the slope climbs to a
   * lower ridge shelf, runs flat for `ridgeHalfTop`, then steps vertically up
   * to the full `majorHeight` peak, giving the notched rib top seen on Ag-Panel.
   */
  ridgeHeight?: number
  ridgeHalfTop?: number
}

/** U-rib family (PBU): evenly spaced trapezoidal ribs with wide flats. */
interface UProfileSpec extends ProfileMeta {
  kind: 'u'
  ribHeight: number
  ribHalfTop: number
  ribSlope: number
  valley: number
  repeats: number
  startFactor: number
}

export type PanelProfileSpec = RibProfileSpec | UProfileSpec

export interface Point {
  x: number
  y: number
}

/** Coverage width every profile is dimensioned against. */
export const COVERAGE_INCHES = 36

/** Extrusion depth of the rendered sheet along the run of the panel. */
export const PANEL_DEPTH = 20

export const PANEL_PROFILES: Record<PanelProfileId, PanelProfileSpec> = {
  // PBR Panel: 1¼" major rib on 12" centers across 36" coverage.
  'fm-r36': {
    kind: 'rib',
    majorHeight: 1.25,
    majorHalfTop: 0.5,
    majorSlope: 1.15625,
    minorHeight: 0.25,
    minorTop: 0.75,
    minorSlope: 0.34375,
    valley: 1.625,
    valleyCenter: 2.5625,
    repeats: 3,
    startFactor: 0.4,
    hasVariant: true,
    baseLabel: 'R-Panel',
    purlinLabel: 'PBR-Panel',
    defaultPurlin: true,
    ribHeightLabel: '1¼"',
    centersLabel: '12"',
    centersInches: 12,
  },
  // AG Panel: ¾" rib on 9" centers across 36" coverage. No variant.
  // Ag-Panel cross-section geometry.
  'fm-a36': {
    kind: 'rib',
    majorHeight: 0.75,
    majorHalfTop: 0.25,
    majorSlope: 0.6,
    minorHeight: 0.25,
    minorTop: 0.75,
    minorSlope: 0.3,
    valley: 1.3,
    valleyCenter: 1.5,
    repeats: 4,
    startFactor: 0.9,
    ridgeHeight: 0.6,
    ridgeHalfTop: 0.25,
    hasVariant: false,
    baseLabel: 'AG Panel',
    purlinLabel: 'AG Panel',
    defaultPurlin: true,
    ribHeightLabel: '¾"',
    centersLabel: '9"',
    centersInches: 9,
  },
  // PBU Panel: ¾" rib on 6" centers (6 ribs × 6" = 36" coverage), wide flats.
  // Rib pitch = 2·ribHalfTop + 2·ribSlope + valley = 6 units (1 unit = 1 inch).
  'fm-u36': {
    kind: 'u',
    ribHeight: 0.75,
    ribHalfTop: 0.515625,
    ribSlope: 0.71875,
    valley: 3.53125,
    repeats: 6,
    startFactor: 0.4,
    hasVariant: true,
    baseLabel: 'U-Panel',
    purlinLabel: 'PBU-Panel',
    defaultPurlin: true,
    ribHeightLabel: '¾"',
    centersLabel: '6"',
    centersInches: 6,
  },
}

/**
 * Walk a list of relative {dx, y} steps into absolute points, accumulating x.
 */
function accumulate(steps: Point[]): Point[] {
  let cursor = 0
  return steps.map(({ x, y }) => {
    const point = { x: cursor + x, y }
    cursor += x
    return point
  })
}

/**
 * Expand a profile spec into the centered 2D polyline of its cross-section.
 * Points are centered on the origin in both X (across coverage) and Y
 * (between valley and rib peak) so the model and its dimension callouts share
 * one predictable frame. `purlinLeg` selects the down-turned bearing-leg end.
 */
export function buildProfilePoints(
  spec: PanelProfileSpec,
  purlinLeg: boolean
): Point[] {
  const steps: Point[] =
    spec.kind === 'rib' ? ribSteps(spec, purlinLeg) : uSteps(spec, purlinLeg)
  const points = accumulate(steps)

  const xs = points.map((p) => p.x)
  const ys = points.map((p) => p.y)
  const xShift = -(Math.max(...xs) + Math.min(...xs)) / 2
  const yShift = -(Math.max(...ys) + Math.min(...ys)) / 2

  return points.map((p) => ({ x: p.x + xShift, y: p.y + yShift }))
}

function ribSteps(spec: RibProfileSpec, purlinLeg: boolean): Point[] {
  const start = spec.majorSlope * spec.startFactor
  const startHeight =
    spec.majorHeight - (spec.majorHeight * start) / spec.majorSlope

  // Two-tier major rib (AG Panel): the slope climbs only to a lower shelf, runs
  // flat across the ridge, then steps vertically up to the full peak. Without
  // ridge params this collapses to the original single-trapezoid major rib.
  const hasRidge = spec.ridgeHeight != null
  const shelf = spec.ridgeHeight ?? spec.majorHeight
  const ridgeTop = spec.ridgeHalfTop ?? 0

  // Climb the slope to the shelf, run the ridge flat, then step up to the peak.
  const upToPeak: Point[] = hasRidge
    ? [
        { x: spec.majorSlope, y: shelf },
        { x: ridgeTop, y: shelf },
        { x: 0, y: spec.majorHeight },
        { x: spec.majorHalfTop, y: spec.majorHeight },
      ]
    : [
        { x: spec.majorSlope, y: spec.majorHeight },
        { x: spec.majorHalfTop, y: spec.majorHeight },
      ]

  // Mirror: peak flat, step down to the shelf, ridge flat, then slope down.
  const downFromPeak: Point[] = hasRidge
    ? [
        { x: spec.majorHalfTop, y: spec.majorHeight },
        { x: 0, y: shelf },
        { x: ridgeTop, y: shelf },
        { x: spec.majorSlope, y: 0 },
      ]
    : [
        { x: spec.majorHalfTop, y: spec.majorHeight },
        { x: spec.majorSlope, y: 0 },
      ]

  const beginning: Point[] = hasRidge
    ? [
        { x: 0, y: startHeight },
        { x: start, y: shelf },
        { x: ridgeTop, y: shelf },
        { x: 0, y: spec.majorHeight },
        { x: spec.majorHalfTop, y: spec.majorHeight },
      ]
    : [
        { x: 0, y: startHeight },
        { x: start, y: spec.majorHeight },
        { x: spec.majorHalfTop, y: spec.majorHeight },
      ]

  const middle: Point[] = [
    ...downFromPeak,
    { x: spec.valley, y: 0 },
    { x: spec.minorSlope, y: spec.minorHeight },
    { x: spec.minorTop, y: spec.minorHeight },
    { x: spec.minorSlope, y: 0 },
    { x: spec.valleyCenter, y: 0 },
    { x: spec.minorSlope, y: spec.minorHeight },
    { x: spec.minorTop, y: spec.minorHeight },
    { x: spec.minorSlope, y: 0 },
    { x: spec.valley, y: 0 },
    ...upToPeak,
  ]

  const end: Point[] = purlinLeg
    ? [...downFromPeak, { x: start, y: 0 }]
    : hasRidge
      ? [
          { x: spec.majorHalfTop, y: spec.majorHeight },
          { x: 0, y: shelf },
          { x: ridgeTop, y: shelf },
          { x: start, y: startHeight },
        ]
      : [
          { x: spec.majorHalfTop, y: spec.majorHeight },
          { x: start, y: startHeight },
        ]

  return [...beginning, ...repeat(middle, spec.repeats), ...end]
}

function uSteps(spec: UProfileSpec, purlinLeg: boolean): Point[] {
  const start = spec.ribSlope * spec.startFactor
  const startHeight = spec.ribHeight - (spec.ribHeight * start) / spec.ribSlope

  const beginning: Point[] = [
    { x: 0, y: startHeight },
    { x: start, y: spec.ribHeight },
    { x: spec.ribHalfTop, y: spec.ribHeight },
  ]

  const middle: Point[] = [
    { x: spec.ribHalfTop, y: spec.ribHeight },
    { x: spec.ribSlope, y: 0 },
    { x: spec.valley, y: 0 },
    { x: spec.ribSlope, y: spec.ribHeight },
    { x: spec.ribHalfTop, y: spec.ribHeight },
  ]

  const end: Point[] = purlinLeg
    ? [
        { x: spec.ribHalfTop, y: spec.ribHeight },
        { x: spec.ribSlope, y: 0 },
        { x: start, y: 0 },
      ]
    : [
        { x: spec.ribHalfTop, y: spec.ribHeight },
        { x: start, y: startHeight },
      ]

  return [...beginning, ...repeat(middle, spec.repeats), ...end]
}

function repeat(segment: Point[], times: number): Point[] {
  const out: Point[] = []
  for (let i = 0; i < times; i++) out.push(...segment)
  return out
}

export interface ProfileMetrics {
  points: Point[]
  /** Half the coverage width (model spans -halfWidth..+halfWidth in X). */
  halfWidth: number
  /** Rib peak Y (top of the centered section). */
  top: number
  /** Valley Y (bottom of the centered section). */
  bottom: number
  /** Front-face Z, where dimension annotations sit. */
  frontZ: number
}

/** Derive the framing metrics used to lay out the mesh and its dimensions. */
export function profileMetrics(
  spec: PanelProfileSpec,
  purlinLeg: boolean
): ProfileMetrics {
  const points = buildProfilePoints(spec, purlinLeg)
  const xs = points.map((p) => p.x)
  const ys = points.map((p) => p.y)
  return {
    points,
    halfWidth: Math.max(...xs),
    top: Math.max(...ys),
    bottom: Math.min(...ys),
    frontZ: PANEL_DEPTH / 2,
  }
}

export interface DimensionSpec {
  start: [number, number, number]
  end: [number, number, number]
  text: string
  direction: 'horizontal' | 'vertical'
  ticMarkLength: number
}

export interface LabelSpec {
  start: [number, number, number]
  end: [number, number, number]
  text: string
}

/** Build the dimension lines + optional purlin label for a framed profile. */
export function buildAnnotations(
  spec: PanelProfileSpec,
  purlinLeg: boolean,
  metrics: ProfileMetrics
): { dimensions: DimensionSpec[]; label: LabelSpec | null } {
  const { halfWidth: w, top, bottom, frontZ: z } = metrics
  const coverageY = top + 2.4
  const centersY = top + 0.9
  // 1 profile-unit = 1 inch, so dimensions are drawn at true inch coordinates:
  // coverage spans the nominal 36" (drawn just inside the end half-ribs), and
  // the rib-pitch line spans exactly `centersInches`, matching the geometry.
  const halfCoverage = COVERAGE_INCHES / 2

  const dimensions: DimensionSpec[] = [
    {
      start: [-halfCoverage, coverageY, z],
      end: [halfCoverage, coverageY, z],
      text: `${COVERAGE_INCHES}"`,
      direction: 'horizontal',
      ticMarkLength: coverageY - top + 0.2,
    },
    {
      start: [-halfCoverage, centersY, z],
      end: [-halfCoverage + spec.centersInches, centersY, z],
      text: spec.centersLabel,
      direction: 'horizontal',
      ticMarkLength: centersY - top + 0.2,
    },
    {
      start: [-w - 2, bottom, z],
      end: [-w - 2, top, z],
      text: spec.ribHeightLabel,
      direction: 'vertical',
      ticMarkLength: 0.6,
    },
  ]

  const label: LabelSpec | null = purlinLeg
    ? {
        // Leader from the down-turned leg tip, angled out and down to the text.
        start: [w, bottom, z],
        end: [w + 3, bottom - 2.4, z],
        text: 'Purlin Bearing Leg',
      }
    : null

  return { dimensions, label }
}
