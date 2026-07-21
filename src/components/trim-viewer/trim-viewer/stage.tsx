'use client'

import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, Lightformer } from '@react-three/drei'
import * as THREE from 'three'
import {
  buildPeakSheetGeometry,
  buildRibbonGeometry,
  connectPoints,
  smoothPoints,
  TRIM_DEPTH,
} from './geometry'
import { Dimension, DimensionTrim, CalloutLabel } from './dimension'
import type { TrimContent } from './data'

/** Unpainted (underside) finish, matching the panel viewer's underside. */
const UNDERSIDE_COLOR = '#eceae3'

const MIN_ZOOM_FACTOR = 0.35
const MAX_ZOOM_FACTOR = 2.2
/** Resting upward tilt of the part, and the peak sway amplitude (radians). */
const TILT_X = 0.18
const SWAY_Y = 0.12

export interface TrimStageProps {
  trim: TrimContent
  color: string
  showDimensions?: boolean
  interactive?: boolean
  sway?: boolean
}

export function TrimStage({
  trim,
  color,
  showDimensions = true,
  interactive = false,
  sway = false,
}: TrimStageProps) {
  return (
    <Canvas
      camera={{ position: [0, 4, 45], fov: 40, near: 0.1, far: 400 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <Scene
        trim={trim}
        color={color}
        showDimensions={showDimensions}
        interactive={interactive}
        sway={sway}
      />
    </Canvas>
  )
}

function Scene({
  trim,
  color,
  showDimensions,
  interactive,
  sway,
}: Required<
  Pick<
    TrimStageProps,
    'trim' | 'color' | 'showDimensions' | 'interactive' | 'sway'
  >
>) {
  const depth = trim.depth ?? TRIM_DEPTH
  const t = trim.translate ?? { x: 0, y: 0, z: 0 }

  const geometry = useMemo(() => {
    const coords = trim.coords ?? []
    let geo: THREE.BufferGeometry
    if (trim.geometry === 'peak-sheet') {
      geo = buildPeakSheetGeometry(connectPoints(coords), depth, 25)
    } else {
      geo = buildRibbonGeometry(
        smoothPoints(coords, trim.smoothRadius ?? 0.3),
        depth
      )
    }
    geo.translate(t.x, t.y, t.z)
    return geo
  }, [trim, depth, t.x, t.y, t.z])

  const materials = useMemo(() => {
    // Only the painted side shows the panel color; the other side is the
    // unpainted underside. Which face is painted depends on the cross-section's
    // winding, so `paintedBack` flips it per trim where needed.
    const paintedSide = trim.paintedBack ? THREE.BackSide : THREE.FrontSide
    const underSide = trim.paintedBack ? THREE.FrontSide : THREE.BackSide
    const painted = new THREE.MeshStandardMaterial({
      color,
      metalness: 0.4,
      roughness: 0.6,
      envMapIntensity: 0.22,
      flatShading: true,
      side: paintedSide,
    })
    const under = new THREE.MeshStandardMaterial({
      color: UNDERSIDE_COLOR,
      metalness: 0.2,
      roughness: 0.78,
      envMapIntensity: 0.15,
      flatShading: true,
      side: underSide,
    })
    return { front: painted, back: under }
  }, [color, trim.paintedBack])

  useEffect(() => () => geometry.dispose(), [geometry])
  useEffect(
    () => () => Object.values(materials).forEach((m) => m.dispose()),
    [materials]
  )

  // Frame by the XY extent of the cross-section AND its callouts (dimension
  // lines + "Painted Side"/"Specify Pitch" leaders), ignoring the extrusion
  // depth (z). A mesh-only box zooms in too far and clips the labels; a sphere
  // fit zooms out to swallow the 20-unit depth and looks tiny.
  const bounds = useMemo(() => {
    geometry.computeBoundingBox()
    const box = geometry.boundingBox ?? new THREE.Box3()
    let minX = box.min.x
    let maxX = box.max.x
    let minY = box.min.y
    let maxY = box.max.y
    const expand = (x: number, y: number) => {
      minX = Math.min(minX, x)
      maxX = Math.max(maxX, x)
      minY = Math.min(minY, y)
      maxY = Math.max(maxY, y)
    }

    // Per-segment dimension lines (offset perpendicular to each labelled edge).
    const coords = trim.coords ?? []
    if (trim.labels) {
      for (let i = 0; i < coords.length - 1; i++) {
        const info = trim.labels[i]
        if (!info || !info.text) continue
        const p = coords[i]!
        const n = coords[i + 1]!
        const dx = n.x - p.x
        const dy = n.y - p.y
        const len = Math.hypot(dx, dy) || 1
        const off = info.outside ? -0.8 : 0.8
        const ox = (-dy / len) * off
        const oy = (dx / len) * off
        expand(p.x + ox + t.x, p.y + oy + t.y)
        expand(n.x + ox + t.x, n.y + oy + t.y)
      }
    }
    trim.extraDimensions?.forEach((d) => {
      expand(d.start[0], d.start[1])
      expand(d.end[0], d.end[1])
    })
    trim.annotations?.forEach((a) => {
      expand(a.end[0], a.end[1] - a.space)
      if (a.start) expand(a.start[0], a.start[1])
    })

    const center = new THREE.Vector3((minX + maxX) / 2, (minY + maxY) / 2, 0)
    return {
      center,
      halfWidth: Math.max((maxX - minX) / 2, 1),
      halfHeight: Math.max((maxY - minY) / 2, 1),
    }
  }, [geometry, trim, t.x, t.y])

  const camera = useThree((s) => s.camera)
  const size = useThree((s) => s.size)
  const fitDistance = useMemo(() => {
    const persp = camera as THREE.PerspectiveCamera
    const aspect = size.width / size.height
    const tanV = Math.tan((persp.fov * Math.PI) / 180 / 2)
    // Margin is proportional to the part's size (plus a small constant for the
    // screen-space callout text), so every trim, large or small, fills a
    // similar share of its card instead of small parts looking shrunken.
    const PAD = 1.18
    const margin = Math.max(bounds.halfWidth, bounds.halfHeight) * 0.16 + 1
    // The part is tilted (TILT_X) and sways (SWAY_Y), which projects the
    // extrusion depth onto the screen and grows the silhouette, so account for it.
    const halfDepth = depth / 2
    const projY = Math.sin(TILT_X) * halfDepth
    const projX = Math.sin(SWAY_Y) * halfDepth
    const halfH = (bounds.halfHeight + projY + margin) * PAD
    const halfW = (bounds.halfWidth + projX + margin) * PAD
    return Math.max(halfH / tanV, halfW / (tanV * aspect)) * (trim.fit ?? 1)
  }, [camera, size, bounds, depth, trim.fit])

  return (
    <>
      <FitView
        dist={fitDistance}
        target={bounds.center}
        dir={trim.cameraDir}
      />

      <ambientLight intensity={0.35} />
      <hemisphereLight
        intensity={0.4}
        groundColor="#1c1d1f"
      />
      <directionalLight
        position={[16, 24, 22]}
        intensity={1.6}
      />
      <directionalLight
        position={[-24, 8, 10]}
        intensity={0.6}
      />
      <Environment resolution={256}>
        <Lightformer
          position={[0, 6, -6]}
          scale={[12, 12, 1]}
          intensity={2}
          color="#ffffff"
        />
        <Lightformer
          position={[-6, 2, 4]}
          scale={[6, 8, 1]}
          intensity={1}
          color="#dfe6ee"
        />
        <Lightformer
          position={[6, 3, 4]}
          scale={[6, 8, 1]}
          intensity={1}
          color="#ffffff"
        />
      </Environment>

      <Trim
        geometry={geometry}
        materials={materials}
        center={bounds.center}
        sway={sway && trim.geometry !== 'peak-sheet'}
        tilt={trim.geometry === 'peak-sheet' ? 0 : TILT_X}
      >
        {showDimensions && (
          <>
            {trim.coords && trim.labels && (
              <DimensionTrim
                t={t}
                coords={trim.coords}
                label={trim.labels}
                depth={depth}
              />
            )}
            {trim.extraDimensions?.map((d, i) => (
              <Dimension
                key={`d${i}`}
                {...d}
              />
            ))}
            {trim.annotations?.map((a, i) => (
              <CalloutLabel
                key={`a${i}`}
                {...a}
              />
            ))}
          </>
        )}
      </Trim>

      <OrbitControls
        makeDefault
        enableZoom={interactive}
        enablePan={false}
        enableDamping
        dampingFactor={0.12}
        target={bounds.center}
        minDistance={fitDistance * MIN_ZOOM_FACTOR}
        maxDistance={fitDistance * MAX_ZOOM_FACTOR}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={(4 * Math.PI) / 5}
      />
    </>
  )
}

function FitView({
  dist,
  target,
  dir: dirOverride,
}: {
  dist: number
  target: THREE.Vector3
  dir?: [number, number, number] | undefined
}) {
  const camera = useThree((s) => s.camera)
  const key = dirOverride ? dirOverride.join(',') : ''
  useEffect(() => {
    const dir = dirOverride
      ? new THREE.Vector3(...dirOverride)
      : camera.position.clone().sub(target)
    if (dir.lengthSq() === 0) dir.set(0, dist * 0.1, dist)
    dir.normalize().multiplyScalar(dist)
    camera.position.copy(target).add(dir)
    camera.lookAt(target)
    camera.updateProjectionMatrix()
    // dirOverride is identity-stable via `key`; eslint-disable for exhaustive-deps
  }, [camera, dist, target, key]) // eslint-disable-line react-hooks/exhaustive-deps
  return null
}

function Trim({
  geometry,
  materials,
  center,
  sway,
  tilt = TILT_X,
  children,
}: {
  geometry: THREE.BufferGeometry
  materials: { front: THREE.Material; back: THREE.Material }
  center: THREE.Vector3
  sway: boolean
  tilt?: number
  children: React.ReactNode
}) {
  const group = useRef<THREE.Group>(null)

  // Gentle idle sway about the part's center, mirroring the panel cards. The
  // peak sheet passes tilt=0 and sway=false so it renders flat, because its pitch is
  // already baked into the geometry, so the shared upward tilt would skew it
  // and drop one edge.
  useFrame(({ clock }) => {
    const g = group.current
    if (!g) return
    g.rotation.x = tilt
    g.rotation.y = sway ? Math.sin(clock.elapsedTime * 0.4) * SWAY_Y : 0
  })

  return (
    <group
      ref={group}
      position={[center.x, center.y, center.z]}
    >
      <group position={[-center.x, -center.y, -center.z]}>
        <mesh
          geometry={geometry}
          material={materials.front}
        />
        <mesh
          geometry={geometry}
          material={materials.back}
        />
        {children}
      </group>
    </group>
  )
}
