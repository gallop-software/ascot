import * as THREE from 'three'
import type { Point } from './profiles'

/**
 * Build a formed-sheet mesh from a 2D cross-section by extruding the polyline
 * along Z. Each section point becomes an outer and an inner vertex offset
 * along the local surface normal so the panel reads as a real sheet with
 * thickness. The triangles are split into two geometry groups:
 *
 *   - group 0: the outer skin (painted the selected finish)
 *   - group 1: the inner skin + cut edges (a constant underside color)
 *
 * so a two-material mesh can colour the topside and underside independently.
 */
export function buildRibbonGeometry(
  points: Point[],
  depth: number,
  thickness = 0.1,
): THREE.BufferGeometry {
  const normals = sectionNormals(points)
  const half = depth / 2

  const positions: number[] = []
  for (let i = 0; i < points.length; i++) {
    const { x, y } = points[i]!
    const n = normals[i]!
    const ox = x + n.x * thickness
    const oy = y + n.y * thickness
    // per section: 0 front-outer, 1 front-inner, 2 back-outer, 3 back-inner
    positions.push(x, y, half)
    positions.push(ox, oy, half)
    positions.push(x, y, -half)
    positions.push(ox, oy, -half)
  }

  const outer: number[] = []
  const inner: number[] = []
  const stride = 4
  for (let i = 0; i < points.length - 1; i++) {
    const a = i * stride
    const b = (i + 1) * stride
    quad(outer, a + 0, b + 0, b + 2, a + 2) // outer skin (topside)
    quad(inner, a + 3, b + 3, b + 1, a + 1) // inner skin (underside)
    quad(inner, a + 1, b + 1, b + 0, a + 0) // front cut edge
    quad(inner, a + 2, b + 2, b + 3, a + 3) // back cut edge
  }

  const indices = [...outer, ...inner]
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.setIndex(indices)
  geometry.addGroup(0, outer.length, 0)
  geometry.addGroup(outer.length, inner.length, 1)
  geometry.computeVertexNormals()
  return geometry
}

/** Zero-thickness strip used only to derive clean wireframe edges. */
export function buildWireframe(points: Point[], depth: number): THREE.BufferGeometry {
  const half = depth / 2
  const positions: number[] = []
  points.forEach(({ x, y }) => {
    positions.push(x, y, half)
    positions.push(x, y, -half)
  })

  const indices: number[] = []
  for (let i = 0; i < points.length - 1; i++) {
    const j = i * 2
    indices.push(j, j + 1, j + 2, j + 1, j + 3, j + 2)
  }

  const strip = new THREE.BufferGeometry()
  strip.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  strip.setIndex(indices)
  strip.computeVertexNormals()
  const edges = new THREE.EdgesGeometry(strip, 1)
  strip.dispose()
  return edges
}

/** Outward 2D normals at each polyline vertex (averaged across adjacent segments). */
function sectionNormals(points: Point[]): Point[] {
  const segNormals: Point[] = []
  for (let i = 0; i < points.length - 1; i++) {
    const dx = points[i + 1]!.x - points[i]!.x
    const dy = points[i + 1]!.y - points[i]!.y
    const len = Math.hypot(dx, dy) || 1
    segNormals.push({ x: -dy / len, y: dx / len })
  }

  return points.map((_, i) => {
    const a = segNormals[Math.max(0, i - 1)]!
    const b = segNormals[Math.min(segNormals.length - 1, i)]!
    const nx = a.x + b.x
    const ny = a.y + b.y
    const len = Math.hypot(nx, ny) || 1
    return { x: nx / len, y: ny / len }
  })
}

function quad(out: number[], a: number, b: number, c: number, d: number) {
  out.push(a, b, c, a, c, d)
}
