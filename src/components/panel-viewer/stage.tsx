'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  OrbitControls,
  Environment,
  Lightformer,
  ContactShadows,
} from '@react-three/drei'
import * as THREE from 'three'
import { buildRibbonGeometry, buildWireframe } from './geometry'
import { Dimension, CalloutLabel } from './dimension'
import {
  PANEL_DEPTH,
  PANEL_PROFILES,
  buildAnnotations,
  buildProfilePoints,
  profileMetrics,
  type PanelProfileId,
} from './profiles'

/** Underside finish — held constant so the formed sheet reads correctly. */
const UNDERSIDE_COLOR = '#eceae3'
/** Wireframe line color. */
const WIRE_COLOR = '#3f4448'
/** Closest the camera may zoom in, as a fraction of the framed distance. */
const MIN_ZOOM_FACTOR = 0.2
/** Farthest the camera may zoom out, as a fraction of the framed distance. */
const MAX_ZOOM_FACTOR = 3

export type ViewPreset = 'front' | 'iso' | 'top'

/** Unit camera directions for the preset views. */
const PRESET_DIRECTIONS: Record<ViewPreset, THREE.Vector3> = {
  front: new THREE.Vector3(0, 0.12, 1),
  iso: new THREE.Vector3(0.7, 0.5, 1),
  top: new THREE.Vector3(0, 1, 0.18),
}

export interface PanelStageProps {
  profile: PanelProfileId
  color: string
  purlin: boolean
  wire?: boolean
  showDimensions?: boolean
  /** Allow zoom/free orbit (full-page studio) vs. a fixed preview framing. */
  interactive?: boolean
  /** Apply the gentle idle sway (preview only). */
  sway?: boolean
  /** Camera preset to apply when `presetNonce` changes. */
  preset?: ViewPreset
  /** Bump to (re)apply `preset`, even if it hasn't changed. */
  presetNonce?: number
}

/** Track the user's reduced-motion preference. */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])
  return reduced
}

/**
 * The shared 3D stage: a parametric formed sheet with a constant underside,
 * environment reflections, contact shadows, optional dimension callouts, and a
 * wire view. Used by both the compact card preview and the full-page studio.
 */
export function PanelStage({
  profile,
  color,
  purlin,
  wire = false,
  showDimensions = true,
  interactive = false,
  sway = false,
  preset,
  presetNonce = 0,
}: PanelStageProps) {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <Canvas
      camera={{ position: [0, 5, 45], fov: 40, near: 0.1, far: 200 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <Scene
        profile={profile}
        color={color}
        purlin={purlin}
        wire={wire}
        showDimensions={showDimensions}
        interactive={interactive}
        sway={sway && !reducedMotion}
        preset={preset}
        presetNonce={presetNonce}
      />
    </Canvas>
  )
}

interface SceneProps {
  profile: PanelProfileId
  color: string
  purlin: boolean
  wire: boolean
  showDimensions: boolean
  interactive: boolean
  sway: boolean
  preset: ViewPreset | undefined
  presetNonce: number
}

function Scene({
  profile,
  color,
  purlin,
  wire,
  showDimensions,
  interactive,
  sway,
  preset,
  presetNonce,
}: SceneProps) {
  const spec = PANEL_PROFILES[profile]

  const points = useMemo(() => buildProfilePoints(spec, purlin), [spec, purlin])
  const geometry = useMemo(() => buildRibbonGeometry(points, PANEL_DEPTH), [points])
  // Built only when the wire view is actually used (never on the cards).
  const wireGeometry = useMemo(
    () => (wire ? buildWireframe(points, PANEL_DEPTH) : null),
    [points, wire],
  )

  const materials = useMemo(() => {
    const topside = new THREE.MeshStandardMaterial({
      color,
      metalness: 0.4,
      roughness: 0.6,
      envMapIntensity: 0.22,
      flatShading: true,
    })
    const underside = new THREE.MeshStandardMaterial({
      color: UNDERSIDE_COLOR,
      metalness: 0.2,
      roughness: 0.78,
      envMapIntensity: 0.15,
      flatShading: true,
    })
    return [topside, underside]
  }, [color])

  // Dispose GPU resources when they're replaced (color/profile/variant change)
  // or on unmount — R3F doesn't free imperatively-created objects on its own.
  useEffect(() => () => geometry.dispose(), [geometry])
  useEffect(() => () => wireGeometry?.dispose(), [wireGeometry])
  useEffect(() => () => materials.forEach((m) => m.dispose()), [materials])

  const metrics = useMemo(() => profileMetrics(spec, purlin), [spec, purlin])
  const { dimensions, label } = useMemo(
    () => buildAnnotations(spec, purlin, metrics),
    [spec, purlin, metrics],
  )

  // Frame the panel by its width so it never overflows on narrow/tall
  // canvases — the camera distance adapts to aspect. The width factor keeps
  // the panel at roughly two-thirds of the view (generous margins, matching
  // the reference's relaxed framing) rather than edge-to-edge.
  const fit = useMemo(() => {
    const widthFactor = showDimensions ? 2.05 : 1.9
    const halfWidth = metrics.halfWidth * widthFactor
    const halfHeight = showDimensions
      ? Math.max(metrics.top + 5, 7)
      : Math.max((metrics.top - metrics.bottom) / 2 + 5, 6)
    return { halfWidth, halfHeight }
  }, [metrics, showDimensions])

  // The distance that frames `fit` for the current aspect — shared by the
  // camera placement and the zoom limits so clamping scales with the canvas.
  const camera = useThree((s) => s.camera)
  const size = useThree((s) => s.size)
  const fitDistance = useMemo(() => {
    const persp = camera as THREE.PerspectiveCamera
    const aspect = size.width / size.height
    const tanV = Math.tan(((persp.fov * Math.PI) / 180) / 2)
    return Math.max(fit.halfHeight / tanV, fit.halfWidth / (tanV * aspect))
  }, [camera, size, fit])

  // Small viewports already frame from a larger distance, so the full zoom-out
  // factor lets the panel shrink too far — tighten it on narrow screens.
  const maxZoomFactor = size.width < 640 ? 1.5 : MAX_ZOOM_FACTOR

  const shadowY = -(metrics.top + PANEL_DEPTH * 0.18 + 0.6)

  return (
    <>
      <FitView dist={fitDistance} />
      {interactive && (
        <PresetView
          preset={preset}
          nonce={presetNonce}
          dist={fitDistance}
        />
      )}

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

      <Panel
        geometry={geometry}
        wireGeometry={wireGeometry}
        materials={materials}
        wire={wire}
        sway={sway}
      >
        {showDimensions && (
          <>
            {dimensions.map((d, i) => (
              <Dimension
                key={i}
                {...d}
              />
            ))}
            {label && <CalloutLabel {...label} />}
          </>
        )}
      </Panel>

      {!wire && (
        <ContactShadows
          position={[0, shadowY, 0]}
          scale={metrics.halfWidth * 3}
          blur={2.6}
          opacity={0.35}
          far={PANEL_DEPTH}
          color="#1c1d1f"
        />
      )}

      <OrbitControls
        makeDefault
        enableZoom={interactive}
        enablePan={false}
        enableDamping
        dampingFactor={0.12}
        minDistance={fitDistance * MIN_ZOOM_FACTOR}
        maxDistance={fitDistance * maxZoomFactor}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={(4 * Math.PI) / 5}
      />
    </>
  )
}

/**
 * Reframe to the given distance when it changes (aspect resize, profile or
 * dimension toggle) while preserving the camera's current direction — so a
 * chosen preset or user orbit survives a re-fit instead of snapping to front.
 */
function FitView({ dist }: { dist: number }) {
  const camera = useThree((s) => s.camera)

  useEffect(() => {
    const dir = camera.position.clone()
    if (dir.lengthSq() === 0) dir.set(0, dist * 0.11, dist)
    dir.normalize().multiplyScalar(dist)
    camera.position.copy(dir)
    camera.lookAt(0, 0, 0)
    camera.updateProjectionMatrix()
  }, [camera, dist])

  return null
}

/**
 * Snap the camera to a preset direction when `nonce` changes. Reads the latest
 * framed distance from a ref so it doesn't fight {@link FitView} on resize.
 */
function PresetView({
  preset,
  nonce,
  dist,
}: {
  preset: ViewPreset | undefined
  nonce: number
  dist: number
}) {
  const camera = useThree((s) => s.camera)
  const controls = useThree((s) => s.controls) as
    | { target: THREE.Vector3; update: () => void }
    | null

  const distRef = useRef(dist)
  distRef.current = dist
  const presetRef = useRef(preset)
  presetRef.current = preset

  useEffect(() => {
    if (!nonce || !presetRef.current) return
    const dir = PRESET_DIRECTIONS[presetRef.current]
      .clone()
      .normalize()
      .multiplyScalar(distRef.current)
    camera.position.copy(dir)
    camera.lookAt(0, 0, 0)
    camera.updateProjectionMatrix()
    if (controls) {
      controls.target.set(0, 0, 0)
      controls.update()
    }
  }, [nonce, camera, controls])

  return null
}

function Panel({
  geometry,
  wireGeometry,
  materials,
  wire,
  sway,
  children,
}: {
  geometry: THREE.BufferGeometry
  wireGeometry: THREE.BufferGeometry | null
  materials: THREE.Material[]
  wire: boolean
  sway: boolean
  children: React.ReactNode
}) {
  const group = useRef<THREE.Group>(null)

  // Hold the near-face-on framing, angled slightly up; add a small idle sway
  // for the preview so the sheet has life without turning edge-on.
  useFrame(({ clock }) => {
    const g = group.current
    if (!g) return
    if (sway) {
      g.rotation.y = Math.sin(clock.elapsedTime * 0.4) * 0.12
      g.rotation.x = 0.22 + Math.sin(clock.elapsedTime * 0.55) * 0.02
    } else {
      g.rotation.x = 0.22
    }
  })

  return (
    <group ref={group}>
      {wire && wireGeometry ? (
        <lineSegments geometry={wireGeometry}>
          <lineBasicMaterial color={WIRE_COLOR} />
        </lineSegments>
      ) : (
        <mesh
          geometry={geometry}
          material={materials}
        />
      )}
      {children}
    </group>
  )
}
