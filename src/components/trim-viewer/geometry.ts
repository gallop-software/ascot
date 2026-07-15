/**
 * Geometry helpers for the trim viewer.
 *
 * Trims are bent sheet-metal strips, modelled as an open 2D polyline extruded
 * to a thin ribbon along the run of the part. The cross-section dimensions
 * match the real formed parts so the callouts are accurate. These builders
 * (corner smoothing, ribbon extrusion, the pitched peak-sheet cap) produce the
 * rendered shapes.
 */

import * as THREE from 'three'

export interface Point {
  x: number
  y: number
}

/** Default extrusion depth (run length) of a trim ribbon. */
export const TRIM_DEPTH = 15

/**
 * Round the corners of an open polyline. Each interior vertex is replaced by a
 * short quadratic bezier fillet (unless the bend is nearly straight), giving the
 * formed-metal look instead of hard creases.
 */
export function smoothPoints(coords: Point[], radius = 0.3): THREE.Vector3[] {
  const out: THREE.Vector3[] = []

  for (let i = 1; i < coords.length - 1; i++) {
    const p = coords[i - 1]!
    const c = coords[i]!
    const n = coords[i + 1]!
    const prev = new THREE.Vector3(p.x, p.y, 0)
    const current = new THREE.Vector3(c.x, c.y, 0)
    const next = new THREE.Vector3(n.x, n.y, 0)

    const dirToPrev = prev.clone().sub(current).normalize()
    const dirToNext = next.clone().sub(current).normalize()

    const angle = dirToPrev.angleTo(dirToNext)
    if (angle < Math.PI * 0.1) {
      out.push(current)
      continue
    }

    const maxRadius =
      Math.min(prev.distanceTo(current), next.distanceTo(current)) / 2
    const adjustedRadius = Math.min(radius, maxRadius)

    const cornerStart = current
      .clone()
      .add(dirToPrev.multiplyScalar(adjustedRadius))
    const cornerEnd = current
      .clone()
      .add(dirToNext.multiplyScalar(adjustedRadius))

    out.push(cornerStart)
    const curve = new THREE.QuadraticBezierCurve3(cornerStart, current, cornerEnd)
    out.push(...curve.getPoints(10))
    out.push(cornerEnd)
  }

  const first = coords[0]!
  const last = coords[coords.length - 1]!
  out.unshift(new THREE.Vector3(first.x, first.y, 0))
  out.push(new THREE.Vector3(last.x, last.y, 0))

  return out
}

/** Turn relative {dx, y} steps into absolute points (used by the peak sheet). */
export function connectPoints(coords: Point[]): Point[] {
  let cumulativeX = 0
  return coords.map((coord) => {
    const point = { x: cumulativeX + coord.x, y: coord.y }
    cumulativeX += coord.x
    return point
  })
}

/** Extrude an open polyline into a flat ribbon of the given depth. */
export function buildRibbonGeometry(
  points: Array<{ x: number; y: number }>,
  depth: number,
): THREE.BufferGeometry {
  const vertices: number[] = []
  const indices: number[] = []

  points.forEach((point, i) => {
    vertices.push(point.x, point.y, depth / 2)
    vertices.push(point.x, point.y, -depth / 2)
    if (i < points.length - 1) {
      const j = i * 2
      indices.push(j, j + 1, j + 2, j + 1, j + 3, j + 2)
    }
  })

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
  geometry.setIndex(indices)
  geometry.computeVertexNormals()
  return geometry
}

/**
 * Extrude the corrugated peak-sheet profile across the run while bending it to a
 * roof pitch, so it peaks at the center (z=0) and drops away at both edges.
 */
export function buildPeakSheetGeometry(
  points: Array<{ x: number; y: number }>,
  width: number,
  bendAngleDeg: number,
): THREE.BufferGeometry {
  const rad = THREE.MathUtils.degToRad(bendAngleDeg)
  const cos = Math.cos(rad)
  const sin = Math.sin(rad)
  const tan = Math.tan(rad)
  const height = tan * (width / 2)

  const vertices: number[] = []
  const indices: number[] = []

  points.forEach((p, i) => {
    const adj = cos * p.y
    const z = sin * adj
    const drop = tan * z
    vertices.push(p.x, p.y - drop, width / 2 + z)
    vertices.push(p.x, p.y + height, 0)
    vertices.push(p.x, p.y - drop, -width / 2 - z)
    if (i < points.length - 1) {
      const j = i * 3
      indices.push(j, j + 1, j + 3, j + 1, j + 4, j + 3)
      indices.push(j + 1, j + 2, j + 4, j + 2, j + 5, j + 4)
    }
  })

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
  geometry.setIndex(indices)
  geometry.computeVertexNormals()
  return geometry
}
