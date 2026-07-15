'use client'

import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { clsx } from 'clsx'
import { Span } from '@/components/span'
import { BuildingStage } from './lazy-stage'
import type { BuildingView } from './stage'

interface BuildingViewerProps {
  className?: string
}

const VIEWS: { id: BuildingView; label: string }[] = [
  { id: 'anatomy', label: 'Anatomy' },
  { id: 'frame', label: '200×400 Frame' },
  { id: 'frame60', label: '60×120 Frame' },
  { id: 'frame100', label: '100×100 Frame' },
]

/**
 * Interactive, annotated 3D model of a pre-engineered metal building. The WebGL
 * canvas mounts only when near the viewport and idles with a slow auto-rotate
 * until hovered, where the user can drag to orbit. Tabs switch between model
 * views (finished anatomy vs. bare structural frame).
 */
export function BuildingViewer({ className }: BuildingViewerProps) {
  const { ref, inView } = useInView({ threshold: 0, rootMargin: '300px 0px' })
  const [hovered, setHovered] = useState(false)
  const [view, setView] = useState<BuildingView>('anatomy')

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={clsx(
        'relative overflow-hidden rounded-lg bg-body2 ring-1 ring-inset ring-body-dark/50',
        className,
      )}
    >
      <div className="grid w-full grid-cols-1 gap-px border-b border-body-dark bg-body-dark backdrop-blur md:grid-cols-2 lg:grid-cols-4">
        {VIEWS.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => setView(v.id)}
            className={clsx(
              'cursor-pointer px-3 py-2 text-xs font-semibold transition-colors',
              view === v.id
                ? 'bg-accent-dark text-accent-contrast'
                : 'bg-body2/80 text-contrast-light hover:bg-body-dark hover:text-contrast',
            )}
          >
            {v.label}
          </button>
        ))}
      </div>

      <div className="relative aspect-[16/9] w-full">
        {inView && (
          <BuildingStage
            view={view}
            autoRotate={!hovered}
          />
        )}
        <Span
          color="text-contrast-light"
          fontSize="text-xs"
          className="pointer-events-none absolute bottom-3 left-1/2 hidden -translate-x-1/2 rounded-full bg-body/70 px-3 py-1 backdrop-blur sm:block"
        >
          Drag to rotate · Scroll to zoom
        </Span>
      </div>
    </div>
  )
}
