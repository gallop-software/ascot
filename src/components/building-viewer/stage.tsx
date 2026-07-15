'use client'

import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Lightformer, Html, Line } from '@react-three/drei'
import * as THREE from 'three'

/**
 * Annotated 3D model of a pre-engineered metal building — gable roof, red wall
 * panels, an open framed opening, and leader-line callouts for the key
 * components (ridge cap, eave/base closures, trims, soffit, structure). Drag to
 * orbit; idles with a slow auto-rotate when not hovered.
 */

// --- Building dimensions (world units) ---
const HX = 17 // half length (X, ridge runs along X)
const HZ = 10 // half span (Z, gable ends face ±X)
const EY = 8 // eave height
const RR = 1.8 // ridge rise above the eave
const RIDGE_Y = EY + RR
const WALL_T = 0.3 // wall thickness
const RAKE = 0.7 // roof overhang past the walls
const RIB_STEP = 1.5 // spacing between vertical panel ribs
const RIB_W = 0.16 // rib width
const RIB_OUT = 0.22 // how far a rib stands proud of the wall

/** Height of the gable wall top at a given span position (roofline). */
function gableTopY(z: number): number {
  return EY + RR * (1 - Math.abs(z) / HZ)
}

// Big framed opening in the +X gable end (spans part of the span/height).
const DOOR_Z0 = -3.5
const DOOR_Z1 = 3.5
const DOOR_H = 7
// Small walk door in the +Z side wall — placed toward the +X gable (the main
// entrance with the big opening) so the two are on the same end.
const WALK_X0 = 9.5
const WALK_X1 = 12
const WALK_H = 4.2

// --- Finishes ---
const WALL_COLOR = '#9c2b2b' // barn red panels
const ROOF_COLOR = '#c7cace' // light grey roof panels
const TRIM_COLOR = '#5f656d' // grey trim / closures
const SOFFIT_COLOR = '#e9e7e0' // white soffit / underside
const FLOOR_COLOR = '#d7d3ca' // concrete
const STEEL_COLOR = '#3b3e44' // structural steel
const LEADER_COLOR = '#1c1d1f'

/** Selectable model views the viewer can switch between. */
export type BuildingView = 'anatomy' | 'frame' | 'frame60' | 'frame100'

// Per-view camera framing (the frame models have a longer footprint).
const CAMERAS: Record<BuildingView, { position: [number, number, number]; fov: number }> = {
  anatomy: { position: [40, 15, 36], fov: 38 },
  frame: { position: [54, 30, 46], fov: 34 },
  frame60: { position: [56, 32, 48], fov: 34 },
  frame100: { position: [50, 22, 50], fov: 34 },
}

export interface BuildingStageProps {
  autoRotate?: boolean
  view?: BuildingView
}

export function BuildingStage({ autoRotate = false, view = 'anatomy' }: BuildingStageProps) {
  const cam = CAMERAS[view]
  // Scroll-zoom clamps, derived from the view's default framing distance.
  const dist = Math.hypot(...cam.position)
  const zoom = { min: dist * 0.55, max: dist * 1.5 }
  return (
    <Canvas
      // Remount on view change so the camera re-inits at the new framing.
      key={view}
      camera={{ position: cam.position, fov: cam.fov, near: 0.1, far: 600 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      {view === 'anatomy' ? (
        <Scene
          autoRotate={autoRotate}
          zoom={zoom}
        />
      ) : (
        <SteelFrame
          cfg={
            view === 'frame60'
              ? FRAME_60x120
              : view === 'frame100'
                ? FRAME_100x100
                : FRAME_200x400
          }
          autoRotate={autoRotate}
          zoom={zoom}
        />
      )}
    </Canvas>
  )
}

/** Shared studio lighting + reflection environment used by every view. */
function Lights() {
  return (
    <>
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
      {/* Lightformer-built studio environment for metallic reflections — no
          network HDRI required, so it works offline and in headless builds. */}
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
    </>
  )
}

function Scene({
  autoRotate,
  zoom,
}: {
  autoRotate: boolean
  zoom: { min: number; max: number }
}) {
  // Gable end wall (pentagon) with an optional door cut-out, extruded along the
  // building length. Built in the span/height plane, then rotated onto X.
  const gable = useMemo(() => buildGable(false), [])
  const gableDoor = useMemo(() => buildGable(true), [])
  // Side wall (rectangle) with an optional walk-door cut-out.
  const sideWall = useMemo(() => buildSideWall(false), [])
  const sideWallDoor = useMemo(() => buildSideWall(true), [])

  useEffect(
    () => () => [gable, gableDoor, sideWall, sideWallDoor].forEach((g) => g.dispose()),
    [gable, gableDoor, sideWall, sideWallDoor],
  )

  const wallMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: WALL_COLOR,
        metalness: 0.4,
        roughness: 0.55,
        envMapIntensity: 0.3,
        side: THREE.DoubleSide,
      }),
    [],
  )
  const roofMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: ROOF_COLOR,
        metalness: 0.45,
        roughness: 0.5,
        envMapIntensity: 0.35,
      }),
    [],
  )
  const trimMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: TRIM_COLOR, metalness: 0.5, roughness: 0.5 }),
    [],
  )
  // Trim that overlaps the sloped roof (ridge cap, eave closures): polygon
  // offset pulls it toward the camera so it always wins the depth test and
  // never z-fights the roof panels it sits over.
  const roofTrimMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: TRIM_COLOR,
        metalness: 0.5,
        roughness: 0.5,
        polygonOffset: true,
        polygonOffsetFactor: -2,
        polygonOffsetUnits: -2,
      }),
    [],
  )
  const soffitMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: SOFFIT_COLOR,
        metalness: 0.1,
        roughness: 0.8,
        side: THREE.DoubleSide,
      }),
    [],
  )

  useEffect(
    () => () => [wallMat, roofMat, trimMat, roofTrimMat, soffitMat].forEach((m) => m.dispose()),
    [wallMat, roofMat, trimMat, roofTrimMat, soffitMat],
  )

  // Roof slope geometry shared by both panels. Each panel runs from the ridge
  // (z=0) down to the eave, with the rake overhang added at the eave end only so
  // the two panels meet flush at the centered ridge.
  const slopeLen = Math.hypot(HZ, RR)
  const slopeAngle = Math.atan2(RR, HZ)
  const cosA = HZ / slopeLen
  const ohZ = (RAKE * HZ) / slopeLen // eave overhang, horizontal component
  const ohY = (RAKE * RR) / slopeLen // eave overhang, vertical drop
  // Run the panels all the way to (and slightly past) the ridge so they cross
  // under the ridge cap, which covers the intersection.
  const RIDGE_GAP = -0.3 // negative = overhang past the ridge
  const eaveZ = HZ + ohZ
  const eaveY = EY - ohY
  const ridgeEndY = RIDGE_Y - (RIDGE_GAP * RR) / HZ
  // Pull the panel's eave end in a hair so it tucks behind the eave closures
  // instead of overhanging them.
  const EAVE_INSET = 0.25
  const roofEaveZ = eaveZ - EAVE_INSET
  const roofEaveY = eaveY + (EAVE_INSET * RR) / HZ
  const roofLen = (roofEaveZ - RIDGE_GAP) / cosA
  const roofCenterZ = (RIDGE_GAP + roofEaveZ) / 2
  const roofCenterY = (ridgeEndY + roofEaveY) / 2

  return (
    <>
      <Lights />

      <group position={[0, -EY / 2 + 4, 0]}>
        {/* Concrete floor — sits on top of the base plinth to avoid z-fighting */}
        <mesh position={[0, 0.65, 0]}>
          <boxGeometry args={[2 * HX - 0.4, 0.1, 2 * HZ - 0.4]} />
          <meshStandardMaterial
            color={FLOOR_COLOR}
            roughness={0.95}
          />
        </mesh>

        {/* Gable end walls (±X). +X has the big framed opening. */}
        <mesh
          geometry={gableDoor}
          material={wallMat}
          position={[HX, 0, 0]}
          rotation={[0, -Math.PI / 2, 0]}
        />
        <mesh
          geometry={gable}
          material={wallMat}
          position={[-HX, 0, 0]}
          rotation={[0, Math.PI / 2, 0]}
        />

        {/* Side walls (±Z). +Z has the walk door. */}
        <mesh
          geometry={sideWallDoor}
          material={wallMat}
          position={[0, 0, HZ - WALL_T]}
        />
        <mesh
          geometry={sideWall}
          material={wallMat}
          position={[0, 0, -HZ]}
        />

        {/* Vertical panel ribs on the red walls */}
        <WallRibs material={wallMat} />

        {/* Roof panels with standing-seam ribs */}
        <RoofPanel
          material={roofMat}
          position={[0, roofCenterY, roofCenterZ]}
          rotation={[slopeAngle, 0, 0]}
          length={roofLen}
        />
        <RoofPanel
          material={roofMat}
          position={[0, roofCenterY, -roofCenterZ]}
          rotation={[-slopeAngle, 0, 0]}
          length={roofLen}
        />

        {/* Ridge cap */}
        <mesh
          material={roofTrimMat}
          position={[0, RIDGE_Y + 0.12, 0]}
        >
          <boxGeometry args={[2 * HX + 2 * RAKE, 0.3, 0.7]} />
        </mesh>

        {/* Eave trim / closures along both side walls — run the full roof
            length and sit flush under the eave edge (incl. rake overhang) */}
        <mesh
          material={roofTrimMat}
          position={[0, roofEaveY, roofEaveZ + 0.13]}
          rotation={[slopeAngle, 0, 0]}
        >
          <boxGeometry args={[2 * HX + 2 * RAKE, 0.18, 0.3]} />
        </mesh>
        <mesh
          material={roofTrimMat}
          position={[0, roofEaveY, -(roofEaveZ + 0.13)]}
          rotation={[-slopeAngle, 0, 0]}
        >
          <boxGeometry args={[2 * HX + 2 * RAKE, 0.18, 0.3]} />
        </mesh>

        {/* Base trim — a solid filled plinth across the whole footprint so it
            doubles as a real foundation base (not just a perimeter band) */}
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[2 * HX + 0.52, 0.6, 2 * HZ + 0.52]} />
          <meshStandardMaterial
            color={TRIM_COLOR}
            metalness={0.5}
            roughness={0.5}
          />
        </mesh>

        {/* Vertical corner trim — one at each wall corner, base top to eave */}
        <CornerTrims material={trimMat} />

        {/* Full wrap trim — frame around the big opening (+X gable) */}
        <DoorFrame
          material={trimMat}
          x={HX + 0.08}
        />

        {/* White roll-up shutter at the head of the opening */}
        <Shutter material={soffitMat} />

        {/* Soffit under the +Z eave overhang */}
        <mesh
          material={soffitMat}
          position={[0, EY - 0.1, HZ + RAKE / 2]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[2 * HX + 2 * RAKE, RAKE]} />
        </mesh>

        {/* Interior structural columns down both side walls (visible through
            the opening) */}
        <InteriorColumns />

        {/* Walk door (+Z wall) */}
        <mesh position={[(WALK_X0 + WALK_X1) / 2, (0.6 + WALK_H) / 2, HZ + 0.04]}>
          <boxGeometry args={[WALK_X1 - WALK_X0, WALK_H - 0.6, 0.1]} />
          <meshStandardMaterial
            color={SOFFIT_COLOR}
            roughness={0.7}
          />
        </mesh>

        {/* Callouts */}
        <Callout
          anchor={[3, RIDGE_Y + 0.2, 0]}
          label={[-2, RIDGE_Y + 4, 0]}
          text="Ridge Cap"
        />
        <Callout
          anchor={[-6, EY + RR * 0.55, 4]}
          label={[-12, RIDGE_Y + 2.5, 5]}
          text="Siphon Groove on Panels"
        />
        <Callout
          anchor={[1, EY, HZ + 0.2]}
          label={[-3, EY + 2.6, HZ + 1]}
          text="Closures at Eave"
        />
        <Callout
          anchor={[HX + RAKE, roofCenterY, -roofCenterZ]}
          label={[HX + 6, roofCenterY + 2, -roofCenterZ - 2]}
          text="Soffit System (Optional)"
        />
        <Callout
          anchor={[HX - 4, 4.5, -HZ + WALL_T + 0.3]}
          label={[HX, 6.5, 4]}
          text="Structural Integrity"
        />
        <Callout
          anchor={[HX + 0.1, 2.2, DOOR_Z0]}
          label={[HX + 6.5, 0.5, DOOR_Z0 - 1]}
          text="Full Wrap Trim"
        />
        <Callout
          anchor={[0, 0.4, HZ + 0.2]}
          label={[-1, 2.4, HZ + 1.5]}
          text="Closures at Base"
        />
        <Callout
          anchor={[HX + 0.25, 0.3, 6]}
          label={[HX + 2.5, -1.2, 6]}
          text="Base Trim"
        />
        <Callout
          anchor={[HX, 0.4, HZ]}
          label={[HX - 2, 0.5, HZ + 5]}
          text="Sheeting Notch with Closures"
        />
      </group>

      <OrbitControls
        makeDefault
        enableZoom
        enablePan={false}
        enableDamping
        dampingFactor={0.1}
        autoRotate={autoRotate}
        autoRotateSpeed={0.5}
        target={[0, 1, 0]}
        minDistance={zoom.min}
        maxDistance={zoom.max}
      />
    </>
  )
}

/** Vertical trim wrapping each of the four wall corners, base top to eave. */
function CornerTrims({ material }: { material: THREE.Material }) {
  const top = 0.6 // base-plinth top
  const h = EY - top
  const cy = (top + EY) / 2
  const c = HX + 0.05
  const d = HZ + 0.05
  const corners: [number, number][] = [
    [c, d],
    [c, -d],
    [-c, d],
    [-c, -d],
    // Two intermediate trims along each longer (±Z) side wall.
    [HX / 3, d],
    [-HX / 3, d],
    [HX / 3, -d],
    [-HX / 3, -d],
  ]
  return (
    <group>
      {corners.map(([x, z]) => (
        <mesh
          key={`${x},${z}`}
          material={material}
          position={[x, cy, z]}
        >
          <boxGeometry args={[0.3, h, 0.3]} />
        </mesh>
      ))}
    </group>
  )
}

/** Steel columns spaced along both side walls' inner faces. */
function InteriorColumns() {
  const cols: React.ReactElement[] = []
  const zPos = HZ - WALL_T - 0.3 // +Z inner face
  const zNeg = -HZ + WALL_T + 0.3 // -Z inner face
  for (let x = -HX + 4; x <= HX - 4 + 0.01; x += (2 * HX - 8) / 3) {
    cols.push(
      <mesh
        key={`cp${x.toFixed(1)}`}
        position={[x, EY / 2, zPos]}
      >
        <boxGeometry args={[0.25, EY, 0.6]} />
        <meshStandardMaterial
          color={STEEL_COLOR}
          metalness={0.6}
          roughness={0.5}
        />
      </mesh>,
      <mesh
        key={`cn${x.toFixed(1)}`}
        position={[x, EY / 2, zNeg]}
      >
        <boxGeometry args={[0.25, EY, 0.6]} />
        <meshStandardMaterial
          color={STEEL_COLOR}
          metalness={0.6}
          roughness={0.5}
        />
      </mesh>,
    )
  }
  return <group>{cols}</group>
}

/** Vertical standing-seam ribs across all four red walls (inside and out). */
function WallRibs({ material }: { material: THREE.Material }) {
  const ribs: React.ReactElement[] = []
  const step = RIB_STEP / 2 // tighter rib spacing on the red walls

  const push = (
    key: string,
    position: [number, number, number],
    size: [number, number, number],
  ) =>
    ribs.push(
      <mesh
        key={key}
        material={material}
        position={position}
      >
        <boxGeometry args={size} />
      </mesh>,
    )

  // Side walls (±Z): ribs run full eave height, stepping along X. The +Z wall
  // has the walk door, so above it the rib is only the header-to-eave segment.
  for (let x = -HX + 0.3; x <= HX - 0.3; x += step) {
    const inWalk = x > WALK_X0 - 0.3 && x < WALK_X1 + 0.3
    const pzH = inWalk ? EY - WALK_H : EY
    const pzY = inWalk ? (WALK_H + EY) / 2 : EY / 2
    // +Z wall: exterior rib stands out, interior rib stands in off the inner face.
    push(`pz${x.toFixed(1)}`, [x, pzY, HZ + RIB_OUT / 2], [RIB_W, pzH, RIB_OUT])
    push(`pzi${x.toFixed(1)}`, [x, pzY, HZ - WALL_T - RIB_OUT / 2], [RIB_W, pzH, RIB_OUT])
    // -Z wall (no opening): full-height ribs on both faces.
    push(`nz${x.toFixed(1)}`, [x, EY / 2, -HZ - RIB_OUT / 2], [RIB_W, EY, RIB_OUT])
    push(`nzi${x.toFixed(1)}`, [x, EY / 2, -HZ + WALL_T + RIB_OUT / 2], [RIB_W, EY, RIB_OUT])
  }

  // Gable walls (±X): rib height follows the roofline, stepping along Z.
  for (let z = -HZ + 0.9; z <= HZ - 0.9; z += step) {
    const h = gableTopY(z)
    const inDoor = z > DOOR_Z0 - 0.3 && z < DOOR_Z1 + 0.3
    const pxH = inDoor ? h - DOOR_H : h
    const pxY = inDoor ? (DOOR_H + h) / 2 : h / 2
    // +X gable (main entrance): exterior + interior ribs.
    push(`px${z.toFixed(1)}`, [HX + RIB_OUT / 2, pxY, z], [RIB_OUT, pxH, RIB_W])
    push(`pxi${z.toFixed(1)}`, [HX - WALL_T - RIB_OUT / 2, pxY, z], [RIB_OUT, pxH, RIB_W])
    // -X gable (no opening): full-height ribs on both faces.
    push(`mx${z.toFixed(1)}`, [-HX - RIB_OUT / 2, h / 2, z], [RIB_OUT, h, RIB_W])
    push(`mxi${z.toFixed(1)}`, [-HX + WALL_T + RIB_OUT / 2, h / 2, z], [RIB_OUT, h, RIB_W])
  }

  return <group>{ribs}</group>
}

/** A sloped roof panel slab with raised standing-seam ribs running up-slope. */
function RoofPanel({
  material,
  position,
  rotation,
  length,
}: {
  material: THREE.Material
  position: [number, number, number]
  rotation: [number, number, number]
  length: number
}) {
  const panelW = 2 * HX + 2 * RAKE
  const seams: React.ReactElement[] = []
  for (let x = -panelW / 2 + 0.7; x <= panelW / 2 - 0.7; x += RIB_STEP) {
    seams.push(
      <mesh
        key={`t${x.toFixed(1)}`}
        material={material}
        position={[x, 0.105, 0]}
      >
        <boxGeometry args={[RIB_W, 0.03, length]} />
      </mesh>,
      <mesh
        key={`b${x.toFixed(1)}`}
        material={material}
        position={[x, -0.105, 0]}
      >
        <boxGeometry args={[RIB_W, 0.03, length]} />
      </mesh>,
    )
  }
  return (
    <group
      position={position}
      rotation={rotation}
    >
      <mesh material={material}>
        <boxGeometry args={[panelW, 0.18, length]} />
      </mesh>
      {seams}
    </group>
  )
}

/** White slatted roll-up shutter filling the head of the +X gable opening. */
function Shutter({ material }: { material: THREE.Material }) {
  const width = DOOR_Z1 - DOOR_Z0 - 0.1
  const slatH = 0.32
  const gap = 0.06
  const top = DOOR_H - 0.15 // just under the header
  const count = 3 // partly-rolled shutter covering the upper opening
  const slats: React.ReactElement[] = []
  for (let i = 0; i < count; i++) {
    const y = top - i * (slatH + gap) - slatH / 2
    slats.push(
      <mesh
        key={i}
        material={material}
        position={[HX - 0.18, y, (DOOR_Z0 + DOOR_Z1) / 2]}
      >
        <boxGeometry args={[0.16, slatH, width]} />
      </mesh>,
    )
  }
  return <group>{slats}</group>
}

/** Grey frame (left jamb, right jamb, header) around the big +X gable opening. */
function DoorFrame({ material, x }: { material: THREE.Material; x: number }) {
  const w = DOOR_Z1 - DOOR_Z0
  // Jambs run from the base top (world y = 0.6) up to just above the header.
  const jambTop = DOOR_H + 0.2 // world-space top of each jamb
  const jambH = jambTop - 0.6
  const jambCenter = EY / 2 + (0.6 + jambTop) / 2 // group-space center
  return (
    <group position={[x, -EY / 2, 0]}>
      <mesh
        material={material}
        position={[0, jambCenter, DOOR_Z0 - 0.2]}
      >
        <boxGeometry args={[0.5, jambH, 0.4]} />
      </mesh>
      <mesh
        material={material}
        position={[0, jambCenter, DOOR_Z1 + 0.2]}
      >
        <boxGeometry args={[0.5, jambH, 0.4]} />
      </mesh>
      <mesh
        material={material}
        position={[0, EY / 2 + DOOR_H + 0.2, 0]}
      >
        <boxGeometry args={[0.5, 0.4, w + 0.8]} />
      </mesh>
    </group>
  )
}

/** Leader line from a feature anchor to a floating uppercase text label. */
function Callout({
  anchor,
  label,
  text,
}: {
  anchor: [number, number, number]
  label: [number, number, number]
  text: string
}) {
  return (
    <group>
      <Line
        points={[anchor, label]}
        color={LEADER_COLOR}
        lineWidth={1.5}
      />
      <Html
        position={label}
        center
        zIndexRange={[20, 0]}
      >
        <div className="pointer-events-none select-none whitespace-nowrap rounded-sm bg-body2/90 px-1 py-0.5 text-[10px] font-semibold uppercase leading-none tracking-wide text-contrast shadow-sm sm:px-1.5 sm:text-xs">
          {text}
        </div>
      </Html>
    </group>
  )
}

// --- Structural-frame views: bare pre-engineered frames, parameterized so
// multiple building sizes share one builder. Ridge runs along X; rigid frames
// ("bents") span Z. Modeled at a ~2:1 length:span ratio. ---
const MEM = 0.5 // main frame member (column / rafter) size
const FRAME_COLOR = '#8f2a2a' // barn-red steel (every frame member shares it)

interface FrameCfg {
  hz: number // half span (Z)
  ey: number // eave height
  rr: number // ridge rise above the eave
  nBays: number // bays between the end frames
  wall: 'x' | 'girts' // long-wall members: square X-braces or horizontal girts
  purlins: number // roof purlins per slope
  endPosts: number // gable endwall posts per end
  girtRows?: number // interior girts per long wall (wall === 'girts')
  endGirtRows?: number // interior girts per gable endwall (defaults to girtRows)
  ratio?: number // length:span (default 2); ignored for wall === 'x'
  interiorCols?: number[] // interior support columns per frame, as span fractions
  spanFt: number // real-world width across the span (ft), for the dimension label
  lengthFt: number // real-world length along the ridge (ft), for the dimension label
}

const FRAME_200x400: FrameCfg = {
  hz: 12,
  ey: 5,
  rr: 2.2,
  nBays: 10,
  wall: 'x',
  purlins: 8,
  endPosts: 10,
  spanFt: 200,
  lengthFt: 400,
}
const FRAME_60x120: FrameCfg = {
  hz: 13,
  ey: 6,
  rr: 2.6,
  nBays: 5,
  wall: 'girts',
  purlins: 11,
  endPosts: 2,
  girtRows: 2,
  spanFt: 60,
  lengthFt: 120,
}
const FRAME_100x100: FrameCfg = {
  hz: 15,
  ey: 6,
  rr: 2.5,
  ratio: 1, // square footprint
  nBays: 5,
  wall: 'girts',
  purlins: 12,
  endPosts: 4,
  girtRows: 2,
  endGirtRows: 3,
  spanFt: 100,
  lengthFt: 100,
}

/** Derive all geometry for a frame config. */
function frameGeom(cfg: FrameCfg) {
  const { hz, ey, rr, nBays } = cfg
  const ridgeY = ey + rr
  // X-braced walls need square bays (bay width === eave height); girt walls keep
  // a length:span of `ratio` (default 2).
  const hx = cfg.wall === 'x' ? (nBays * ey) / 2 : (cfg.ratio ?? 2) * hz
  const step = (2 * hx) / nBays
  const slope = Math.atan2(rr, hz)
  const rafLen = Math.hypot(hz, rr)
  // Extend each rafter to the column outer face so the knee reads as connected.
  const knee = (MEM / 2) * (rafLen / hz)
  const rafFull = rafLen + knee
  const eaveZ = hz + knee * (hz / rafLen)
  const eaveY = ey - knee * (rr / rafLen)
  const rafCz = eaveZ / 2
  const rafCy = (ridgeY + eaveY) / 2
  const bentXs = Array.from({ length: nBays + 1 }, (_, i) => -hx + i * step)
  const topY = (z: number) => ey + rr * (1 - Math.abs(z) / hz)
  const interiorZ = (cfg.interiorCols ?? []).map((f) => f * hz)
  return { hz, ey, rr, ridgeY, step, hx, slope, rafFull, rafCz, rafCy, bentXs, topY, nBays, interiorZ }
}

type Geom = ReturnType<typeof frameGeom>

/** Bare structural steel frame rendered from a config. */
function SteelFrame({
  cfg,
  autoRotate,
  zoom,
}: {
  cfg: FrameCfg
  autoRotate: boolean
  zoom: { min: number; max: number }
}) {
  const g = useMemo(() => frameGeom(cfg), [cfg])
  const frameMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: FRAME_COLOR,
        metalness: 0.5,
        roughness: 0.5,
        envMapIntensity: 0.3,
      }),
    [],
  )
  useEffect(() => () => frameMat.dispose(), [frameMat])

  // Rigid frames — solid box columns + peaked rafters.
  const bents: React.ReactElement[] = []
  g.bentXs.forEach((x, i) => {
    bents.push(
      <mesh
        key={`cn${i}`}
        material={frameMat}
        position={[x, g.ey / 2, -g.hz]}
      >
        <boxGeometry args={[MEM, g.ey, MEM]} />
      </mesh>,
      <mesh
        key={`cp${i}`}
        material={frameMat}
        position={[x, g.ey / 2, g.hz]}
      >
        <boxGeometry args={[MEM, g.ey, MEM]} />
      </mesh>,
      <mesh
        key={`rn${i}`}
        material={frameMat}
        position={[x, g.rafCy, -g.rafCz]}
        rotation={[-g.slope, 0, 0]}
      >
        <boxGeometry args={[MEM, MEM, g.rafFull]} />
      </mesh>,
      <mesh
        key={`rp${i}`}
        material={frameMat}
        position={[x, g.rafCy, g.rafCz]}
        rotation={[g.slope, 0, 0]}
      >
        <boxGeometry args={[MEM, MEM, g.rafFull]} />
      </mesh>,
    )
    // Interior support columns, base to roofline.
    g.interiorZ.forEach((z, j) => {
      const h = g.topY(z)
      bents.push(
        <mesh
          key={`ic${i}-${j}`}
          material={frameMat}
          position={[x, h / 2, z]}
        >
          <boxGeometry args={[MEM, h, MEM]} />
        </mesh>,
      )
    })
  })

  return (
    <>
      <Lights />

      <group position={[0, -g.ey / 2 + 4, 0]}>
        {/* Slab */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2 * g.hx + 2, 0.1, 2 * g.hz + 2]} />
          <meshStandardMaterial
            color={FLOOR_COLOR}
            roughness={0.95}
          />
        </mesh>

        <group>{bents}</group>
        <FrameDimensions
          g={g}
          cfg={cfg}
        />
        <FrameEndPosts
          g={g}
          count={cfg.endPosts}
        />
        <FramePurlins
          g={g}
          count={cfg.purlins}
        />
        {cfg.wall === 'x' ? (
          <FrameXBraces g={g} />
        ) : (
          <>
            <FrameGirts
              g={g}
              rows={cfg.girtRows ?? 3}
            />
            <FrameEndGirts
              g={g}
              rows={cfg.endGirtRows ?? cfg.girtRows ?? 3}
            />
          </>
        )}
      </group>

      <OrbitControls
        makeDefault
        enableZoom
        enablePan={false}
        enableDamping
        dampingFactor={0.1}
        autoRotate={autoRotate}
        autoRotateSpeed={0.5}
        target={[0, 2, 0]}
        minDistance={zoom.min}
        maxDistance={zoom.max}
      />
    </>
  )
}

/** Gable endwall posts, base to roofline, on both short ends. */
function FrameEndPosts({ g, count }: { g: Geom; count: number }) {
  const lines: React.ReactElement[] = []
  ;[-g.hx, g.hx].forEach((x, xi) => {
    for (let k = 1; k <= count; k++) {
      const z = -g.hz + (k * (2 * g.hz)) / (count + 1)
      lines.push(
        <Line
          key={`ep${xi}-${k}`}
          points={[
            [x, 0, z],
            [x, g.topY(z), z],
          ]}
          color={FRAME_COLOR}
          lineWidth={1.5}
        />,
      )
    }
  })
  return <group>{lines}</group>
}

// Solid-triangle arrowhead sizing (mirrors the trim-viewer dimension style).
const DIM_ARROW_LEN = 0.8 // triangle length back along the line
const DIM_ARROW_W = 0.7 // triangle base width
const DIM_ARROW_REF = 52 // camera distance that renders the arrow at unit scale
const _dimWorld = new THREE.Vector3()

/**
 * A filled triangle arrowhead whose tip sits at `tip`, pointing outward along
 * `dir`, with its base spread along `perp` (both in the horizontal plane). Its
 * scale is refreshed each frame so the arrow keeps a constant on-screen size
 * regardless of how far the frame is framed — same trick as the trim viewer.
 */
function DimArrowhead({
  tip,
  dir,
  perp,
}: {
  tip: [number, number, number]
  dir: [number, number, number]
  perp: [number, number, number]
}) {
  const ref = useRef<THREE.Mesh>(null)
  const geom = useMemo(() => {
    const w = DIM_ARROW_W / 2
    const bx = -dir[0] * DIM_ARROW_LEN
    const by = -dir[1] * DIM_ARROW_LEN
    const bz = -dir[2] * DIM_ARROW_LEN
    const g = new THREE.BufferGeometry()
    g.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(
        [
          0, 0, 0,
          bx + perp[0] * w, by + perp[1] * w, bz + perp[2] * w,
          bx - perp[0] * w, by - perp[1] * w, bz - perp[2] * w,
        ],
        3,
      ),
    )
    return g
  }, [dir, perp])
  useEffect(() => () => geom.dispose(), [geom])

  useFrame(({ camera }) => {
    const mesh = ref.current
    if (!mesh) return
    mesh.getWorldPosition(_dimWorld)
    mesh.scale.setScalar(camera.position.distanceTo(_dimWorld) / DIM_ARROW_REF)
  })

  return (
    <mesh
      ref={ref}
      geometry={geom}
      position={tip}
    >
      <meshBasicMaterial
        color={LEADER_COLOR}
        side={THREE.DoubleSide}
        transparent
        opacity={0.75}
      />
    </mesh>
  )
}

/** A dimension line with a solid arrowhead at each end and a measurement label
 * at the midpoint, in the horizontal ground plane. */
function DimensionLine({
  p0,
  p1,
  label,
}: {
  p0: [number, number, number]
  p1: [number, number, number]
  label: string
}) {
  const dx = p1[0] - p0[0]
  const dy = p1[1] - p0[1]
  const dz = p1[2] - p0[2]
  const len = Math.hypot(dx, dy, dz) || 1
  // Unit direction from p0→p1, and its horizontal perpendicular (dir × up).
  const d: [number, number, number] = [dx / len, dy / len, dz / len]
  const perp: [number, number, number] = [d[2], 0, -d[0]]
  const mid: [number, number, number] = [
    (p0[0] + p1[0]) / 2,
    (p0[1] + p1[1]) / 2,
    (p0[2] + p1[2]) / 2,
  ]
  return (
    <group>
      <Line
        points={[p0, p1]}
        color={LEADER_COLOR}
        lineWidth={0.75}
        transparent
        opacity={0.75}
      />
      {/* Arrowheads point outward (away from the midpoint) at each end. */}
      <DimArrowhead
        tip={p0}
        dir={[-d[0], -d[1], -d[2]]}
        perp={perp}
      />
      <DimArrowhead
        tip={p1}
        dir={d}
        perp={perp}
      />
      <Html
        position={mid}
        center
        zIndexRange={[30, 0]}
      >
        <div className="select-none rounded-sm bg-body2 p-1 text-[10px] leading-none text-contrast sm:text-sm">
          {label}
        </div>
      </Html>
    </group>
  )
}

/** Length and span dimension lines along the footprint edges of a frame. */
function FrameDimensions({ g, cfg }: { g: Geom; cfg: FrameCfg }) {
  const off = 2.5 // stand the dimension line off the building edge
  return (
    <group>
      {/* Length along the ridge, in front of the +Z long wall */}
      <DimensionLine
        p0={[-g.hx, 0, g.hz + off]}
        p1={[g.hx, 0, g.hz + off]}
        label={`${cfg.lengthFt}'`}
      />
      {/* Span across the gable end, off the +X end */}
      <DimensionLine
        p0={[g.hx + off, 0, -g.hz]}
        p1={[g.hx + off, 0, g.hz]}
        label={`${cfg.spanFt}'`}
      />
    </group>
  )
}

/** Roof purlins along both slopes + the ridge, running the full length. */
function FramePurlins({ g, count }: { g: Geom; count: number }) {
  const lines: React.ReactElement[] = []
  lines.push(
    <Line
      key="ridge"
      points={[
        [-g.hx, g.ridgeY, 0],
        [g.hx, g.ridgeY, 0],
      ]}
      color={FRAME_COLOR}
      lineWidth={1.5}
    />,
  )
  Array.from({ length: count }, (_, i) => (i + 1) / count).forEach((frac, i) => {
    const z = frac * g.hz
    const y = g.topY(z)
    lines.push(
      <Line
        key={`pn${i}`}
        points={[
          [-g.hx, y, -z],
          [g.hx, y, -z],
        ]}
        color={FRAME_COLOR}
        lineWidth={1.5}
      />,
      <Line
        key={`pp${i}`}
        points={[
          [-g.hx, y, z],
          [g.hx, y, z],
        ]}
        color={FRAME_COLOR}
        lineWidth={1.5}
      />,
    )
  })
  return <group>{lines}</group>
}

/** Square X cross-bracing in every bay of both long walls. */
function FrameXBraces({ g }: { g: Geom }) {
  const lines: React.ReactElement[] = []
  ;[-g.hz, g.hz].forEach((z, wi) => {
    for (let i = 0; i < g.nBays; i++) {
      const x0 = -g.hx + i * g.step
      const x1 = x0 + g.step
      lines.push(
        <Line
          key={`x1-${wi}-${i}`}
          points={[
            [x0, 0, z],
            [x1, g.ey, z],
          ]}
          color={FRAME_COLOR}
          lineWidth={1.5}
        />,
        <Line
          key={`x2-${wi}-${i}`}
          points={[
            [x1, 0, z],
            [x0, g.ey, z],
          ]}
          color={FRAME_COLOR}
          lineWidth={1.5}
        />,
      )
    }
  })
  return <group>{lines}</group>
}

/** Horizontal girts across both gable (short) endwalls, spanning the width. The
 * top row sits at the eave (top of the endwall posts). */
function FrameEndGirts({ g, rows }: { g: Geom; rows: number }) {
  const ys = Array.from({ length: rows }, (_, i) => (g.ey * (i + 1)) / rows)
  const lines: React.ReactElement[] = []
  ;[-g.hx, g.hx].forEach((x, xi) => {
    ys.forEach((y, ri) => {
      lines.push(
        <Line
          key={`eg${xi}-${ri}`}
          points={[
            [x, y, -g.hz],
            [x, y, g.hz],
          ]}
          color={FRAME_COLOR}
          lineWidth={1.5}
        />,
      )
    })
  })
  return <group>{lines}</group>
}

/** Horizontal girts along both long walls (base, evenly spaced rows, eave). */
function FrameGirts({ g, rows }: { g: Geom; rows: number }) {
  const ys = [
    0,
    ...Array.from({ length: rows }, (_, i) => (g.ey * (i + 1)) / (rows + 1)),
    g.ey,
  ]
  const lines: React.ReactElement[] = []
  ;[-g.hz, g.hz].forEach((z, wi) => {
    ys.forEach((y, ri) => {
      lines.push(
        <Line
          key={`g${wi}-${ri}`}
          points={[
            [-g.hx, y, z],
            [g.hx, y, z],
          ]}
          color={FRAME_COLOR}
          lineWidth={1.5}
        />,
      )
    })
  })
  return <group>{lines}</group>
}

/** Pentagon gable wall in the (span, height) plane, extruded along the length. */
function buildGable(door: boolean): THREE.BufferGeometry {
  const shape = new THREE.Shape()
  shape.moveTo(-HZ, 0)
  shape.lineTo(HZ, 0)
  shape.lineTo(HZ, EY)
  shape.lineTo(0, RIDGE_Y)
  shape.lineTo(-HZ, EY)
  shape.closePath()

  if (door) {
    const hole = new THREE.Path()
    hole.moveTo(DOOR_Z0, 0)
    hole.lineTo(DOOR_Z1, 0)
    hole.lineTo(DOOR_Z1, DOOR_H)
    hole.lineTo(DOOR_Z0, DOOR_H)
    hole.closePath()
    shape.holes.push(hole)
  }

  const geo = new THREE.ExtrudeGeometry(shape, { depth: WALL_T, bevelEnabled: false })
  geo.computeVertexNormals()
  return geo
}

/** Rectangular side wall in the (length, height) plane, extruded in thickness. */
function buildSideWall(door: boolean): THREE.BufferGeometry {
  const shape = new THREE.Shape()
  shape.moveTo(-HX, 0)
  shape.lineTo(HX, 0)
  shape.lineTo(HX, EY)
  shape.lineTo(-HX, EY)
  shape.closePath()

  if (door) {
    const hole = new THREE.Path()
    hole.moveTo(WALK_X0, 0)
    hole.lineTo(WALK_X1, 0)
    hole.lineTo(WALK_X1, WALK_H)
    hole.lineTo(WALK_X0, WALK_H)
    hole.closePath()
    shape.holes.push(hole)
  }

  const geo = new THREE.ExtrudeGeometry(shape, { depth: WALL_T, bevelEnabled: false })
  geo.computeVertexNormals()
  return geo
}
