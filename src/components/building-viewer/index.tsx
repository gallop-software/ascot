'use client'

import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { clsx } from 'clsx'
import { Span } from '@/components/span'
import { BuildingStage } from './lazy-stage'

interface BuildingViewerProps {
  className?: string
}

/**
 * Interactive 3D model of an 80×140 pre-engineered steel building frame. The
 * WebGL canvas mounts only when near the viewport and idles with a slow
 * auto-rotate until hovered, where the user can drag to orbit.
 */
export function BuildingViewer({ className }: BuildingViewerProps) {
  const { ref, inView } = useInView({ threshold: 0, rootMargin: '300px 0px' })
  const [hovered, setHovered] = useState(false)

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={clsx('relative overflow-hidden bg-body2/50', className)}
    >
      <div className="relative aspect-[16/9] w-full">
        {inView && (
          <BuildingStage
            view="frame60"
            autoRotate={!hovered}
          />
        )}
        <Span
          color="text-contrast-light"
          fontSize="text-xs"
          className="pointer-events-none absolute bottom-3 left-1/2 hidden -translate-x-1/2 rounded-full bg-body2 px-3 py-1 sm:block"
        >
          Drag to rotate · Scroll to zoom
        </Span>
      </div>
    </div>
  )
}
