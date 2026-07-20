'use client'

import { useRef } from 'react'
import { Html, Line } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { clsx } from 'clsx'
import type { Point } from './geometry'

/** Replace decimal fractions in a callout with their Unicode glyphs. */
function formatFraction(value: string): string {
  return value
    .replace(/\b0\.25\b/g, '¼')
    .replace(/\b0\.5\b|\b0\.50\b/g, '½')
    .replace(/\b0\.75\b/g, '¾')
    .replace(/(\d+)\.25\b/g, (_, whole) => `${whole}¼`)
    .replace(/(\d+)\.5\b|\b(\d+)\.50\b/g, (_, whole) => `${whole}½`)
    .replace(/(\d+)\.75\b/g, (_, whole) => `${whole}¾`)
}

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
  color: 'black',
  side: THREE.DoubleSide,
  transparent: true,
  opacity: 0.75,
})
const _worldPos = new THREE.Vector3()

/**
 * A filled arrowhead whose tip sits at `tip`, pointing along `dir`. Its scale is
 * refreshed each frame to `distance / ARROW_REF_DIST`, which cancels perspective
 * foreshortening so the arrow keeps a constant pixel size no matter how each trim
 * is framed or how far the inspector is zoomed.
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

export interface DimensionProps {
  start: [number, number, number]
  end: [number, number, number]
  text: string
  textPosition?: 'in-line' | 'below'
  ticMarkLength?: number
  ticDirectionOpposite?: boolean
  direction?: 'horizontal' | 'vertical' | 'angled'
}

/** A dimension line with one-sided tic marks and a floating callout label. */
export function Dimension({
  start,
  end,
  text,
  textPosition = 'in-line',
  ticMarkLength = 0.3,
  ticDirectionOpposite = false,
  direction = 'horizontal',
}: DimensionProps) {
  const startVec = new THREE.Vector3(...start)
  const endVec = new THREE.Vector3(...end)
  const midPoint = new THREE.Vector3()
    .addVectors(startVec, endVec)
    .multiplyScalar(0.5)

  const dir2D = new THREE.Vector2(
    end[0] - start[0],
    end[1] - start[1]
  ).normalize()
  const perp2D = new THREE.Vector2(-dir2D.y, dir2D.x)
    .normalize()
    .multiplyScalar(ticDirectionOpposite ? ticMarkLength : -ticMarkLength)
  const perpVec3 = new THREE.Vector3(perp2D.x, perp2D.y, 0)

  const labelPosition = midPoint.clone()
  if (direction === 'vertical' || direction === 'angled') {
    labelPosition.add(perpVec3.clone().multiplyScalar(-3.2))
  }

  return (
    <group>
      <Line
        points={[startVec.toArray(), endVec.toArray()]}
        color="black"
        lineWidth={0.75}
        transparent
        opacity={0.75}
      />
      {/* Solid arrowheads pointing outward at each end of the dimension line. */}
      <Arrowhead
        tip={start}
        dir={startVec.clone().sub(endVec)}
      />
      <Arrowhead
        tip={end}
        dir={endVec.clone().sub(startVec)}
      />
      <Html
        position={labelPosition.toArray()}
        center
        zIndexRange={[30, 0]}
      >
        <div
          className={clsx(
            'select-none rounded-sm bg-body2 leading-none text-contrast',
            textPosition === 'in-line'
              ? 'p-1 text-[10px] sm:text-sm'
              : 'p-px text-[10px] sm:text-sm'
          )}
        >
          {formatFraction(text)}
        </div>
      </Html>
    </group>
  )
}

export interface DimLabel {
  text: string
  outside?: boolean
}

/**
 * Build a dimension line for each labelled segment of a trim cross-section,
 * offset perpendicular to that segment.
 */
export function DimensionTrim({
  t,
  coords,
  label,
  depth = 20,
}: {
  t: { x: number; y: number; z: number }
  coords: Point[]
  label: (DimLabel | null)[]
  depth?: number
}) {
  const perpOffset = (
    start: THREE.Vector2,
    end: THREE.Vector2,
    offset: number
  ) => {
    const dir = new THREE.Vector2(end.x - start.x, end.y - start.y).normalize()
    return new THREE.Vector2(-dir.y, dir.x).multiplyScalar(offset)
  }

  return (
    <>
      {coords.map((point, i) => {
        const next = coords[i + 1]
        const info = label[i]
        if (!next || !info || !info.text) return null

        const offset = info.outside ? -0.8 : 0.8
        const start2D = new THREE.Vector2(point.x, point.y)
        const end2D = new THREE.Vector2(next.x, next.y)
        const off = perpOffset(start2D, end2D, offset)

        const start3D: [number, number, number] = [
          start2D.x + off.x + t.x,
          start2D.y + off.y + t.y,
          depth / 2,
        ]
        const end3D: [number, number, number] = [
          end2D.x + off.x + t.x,
          end2D.y + off.y + t.y,
          depth / 2,
        ]

        return (
          <Dimension
            key={i}
            start={start3D}
            end={end3D}
            text={info.text}
            ticDirectionOpposite={Boolean(info.outside)}
            textPosition="below"
            direction="angled"
          />
        )
      })}
    </>
  )
}

/** A leader line + free text annotation (e.g. "Painted Side", "Specify Pitch"). */
export function CalloutLabel({
  start,
  end,
  text,
  space,
}: {
  start?: [number, number, number]
  end: [number, number, number]
  text: string
  space: number
}) {
  const position = new THREE.Vector3(end[0], end[1] - space, end[2])
  return (
    <group>
      {start && (
        <Line
          points={[
            [start[0], start[1], start[2]],
            [end[0], end[1], end[2]],
          ]}
          color="black"
          lineWidth={0.75}
          transparent
          opacity={0.75}
        />
      )}
      <Html
        position={position.toArray()}
        center
        zIndexRange={[30, 0]}
      >
        <div className="-translate-x-1/3 select-none whitespace-nowrap rounded-sm bg-body2 p-1 text-left text-[10px] text-contrast sm:text-sm">
          {text}
        </div>
      </Html>
    </group>
  )
}
