'use client'

import { useRef } from 'react'
import { Html, Line } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { clsx } from 'clsx'
import type { DimensionSpec, LabelSpec } from './profiles'

/** Muted leader-line color that reads on the bg-body2 viewport. */
const LINE_COLOR = '#6c6e6f'

// Shared solid-triangle arrowhead. A unit triangle points along +X with its tip
// at the origin; each instance is positioned at a line end, rotated to the line
// direction, and scaled every frame to a constant on-screen size (see below).
const ARROW_LEN = 0.6
const ARROW_WIDTH = 0.55
const ARROW_REF_DIST = 45
const ARROW_GEOMETRY = new THREE.BufferGeometry().setAttribute(
  'position',
  new THREE.Float32BufferAttribute(
    [0, 0, 0, -ARROW_LEN, ARROW_WIDTH / 2, 0, -ARROW_LEN, -ARROW_WIDTH / 2, 0],
    3
  )
)
const ARROW_MATERIAL = new THREE.MeshBasicMaterial({
  color: LINE_COLOR,
  side: THREE.DoubleSide,
})
const _worldPos = new THREE.Vector3()

/**
 * A filled arrowhead whose tip sits at `tip`, pointing along `dir`. Its scale is
 * refreshed each frame to `distance / ARROW_REF_DIST`, which cancels perspective
 * foreshortening so the arrow keeps a constant pixel size no matter how far the
 * camera is.
 */
function Arrowhead({
  tip,
  dir,
}: {
  tip: [number, number, number]
  dir: THREE.Vector3
}) {
  const ref = useRef<THREE.Mesh>(null)
  const angle = Math.atan2(dir.y, dir.x)

  useFrame(({ camera }) => {
    const mesh = ref.current
    if (!mesh) return
    mesh.getWorldPosition(_worldPos)
    mesh.scale.setScalar(camera.position.distanceTo(_worldPos) / ARROW_REF_DIST)
  })

  return (
    <mesh
      ref={ref}
      geometry={ARROW_GEOMETRY}
      material={ARROW_MATERIAL}
      position={tip}
      rotation={[0, 0, angle]}
    />
  )
}

/**
 * A single measurement callout: a leader line with solid arrowheads and a
 * screen-facing HTML label. Adapted from the reference annotation but rebuilt
 * with clsx + semantic tokens and driven entirely by {@link DimensionSpec}.
 */
export function Dimension({ start, end, text, direction }: DimensionSpec) {
  const startVec = new THREE.Vector3(...start)
  const endVec = new THREE.Vector3(...end)
  const mid = new THREE.Vector3()
    .addVectors(startVec, endVec)
    .multiplyScalar(0.5)

  // Nudge the label clear of the line: above for horizontal, left for vertical.
  const labelPos =
    direction === 'vertical'
      ? mid.clone().add(new THREE.Vector3(-1.4, 0, 0))
      : mid.clone().add(new THREE.Vector3(0, 0.9, 0))

  return (
    <group>
      <Line
        points={[startVec.toArray(), endVec.toArray()]}
        color={LINE_COLOR}
        lineWidth={1.2}
      />
      {/* Solid arrowheads pointing outward at each end of the leader line. */}
      <Arrowhead
        tip={start}
        dir={startVec.clone().sub(endVec)}
      />
      <Arrowhead
        tip={end}
        dir={endVec.clone().sub(startVec)}
      />
      <Html
        position={labelPos.toArray()}
        center
        zIndexRange={[40, 0]}
      >
        <div className="select-none rounded-sm bg-body2/90 px-1 py-0.5 text-[10px] font-medium leading-none text-contrast sm:text-sm">
          {text}
        </div>
      </Html>
    </group>
  )
}

/** A leader line to a free-text callout, e.g. "Purlin Bearing Leg". */
export function CalloutLabel({ start, end, text }: LabelSpec) {
  return (
    <group>
      <Line
        points={[start, end]}
        color={LINE_COLOR}
        lineWidth={1.2}
      />
      <Html
        position={end}
        center
        zIndexRange={[40, 0]}
      >
        <div
          className={clsx(
            'select-none whitespace-nowrap rounded-sm',
            'bg-body2/90 px-1 py-0.5 text-[10px] font-medium leading-none text-contrast sm:px-1.5 sm:text-sm'
          )}
        >
          {text}
        </div>
      </Html>
    </group>
  )
}
