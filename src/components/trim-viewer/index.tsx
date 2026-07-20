'use client'

import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { clsx } from 'clsx'
import { Icon } from '@/components/icon'
import { state, useSnapshot } from '@/state'
import cubeIcon from '@iconify/icons-lucide/box'
import { TrimStage } from './lazy-stage'
import type { TrimContent } from './data'

interface TrimViewerProps {
  trim: TrimContent
  /** Aspect ratio of the preview frame. */
  aspect?: string
  className?: string
}

/**
 * Compact card for a single trim: a gently swaying, dimensioned 3D model of the
 * formed cross-section. Trims not yet modelled (`available: false`) show a
 * neutral placeholder so the catalog stays complete.
 */
export function TrimViewer({
  trim,
  aspect = 'aspect-[5/3]',
  className,
}: TrimViewerProps) {
  // No triggerOnce: the WebGL canvas mounts when near the viewport and unmounts
  // when scrolled well away, freeing its GPU context. Browsers cap live WebGL
  // contexts (~16), so with a full trim catalog only the handful on screen stay
  // alive — keeping the page fast. The rootMargin preloads just before entry so
  // there's no blank flash as you scroll.
  const { ref, inView } = useInView({ threshold: 0, rootMargin: '300px 0px' })
  const snap = useSnapshot(state)
  const [hovered, setHovered] = useState(false)

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={clsx('relative overflow-hidden bg-body2/50', className)}
    >
      <div className={clsx('w-full', aspect)}>
        {trim.available ? (
          inView && (
            <TrimStage
              trim={trim}
              color={snap.panelColor}
              sway={!hovered}
            />
          )
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-contrast-light">
            <Icon
              icon={cubeIcon}
              className="h-7 w-7 opacity-40"
            />
            <span className="text-xs font-medium opacity-70">
              3D view coming soon
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
