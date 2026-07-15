'use client'

import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { clsx } from 'clsx'
import { Link } from '@/components/link'
import { state, useSnapshot } from '@/state'
import cubeIcon from '@iconify/icons-lucide/box'
import { PanelStage } from './lazy-stage'
import { PANEL_PROFILES, type PanelProfileId } from './profiles'

interface PanelViewerProps {
  profile: PanelProfileId
  /** Accessible name for the rendered profile, e.g. "PBR Panel". */
  label: string
  className?: string
}

/**
 * Compact card preview: a gently swaying, dimensioned 3D model of the panel
 * with a single link out to the full-page studio. Detailed controls (wire,
 * variant, color, zoom) live on that page rather than crowding the card.
 */
export function PanelViewer({ profile, label, className }: PanelViewerProps) {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })
  const snap = useSnapshot(state)
  const spec = PANEL_PROFILES[profile]
  const [hovered, setHovered] = useState(false)

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
      <div className="aspect-[5/2] w-full">
        {inView && (
          <PanelStage
            profile={profile}
            color={snap.panelColor}
            purlin={spec.defaultPurlin}
            showDimensions={false}
            sway={!hovered}
          />
        )}
      </div>

      <Link
        href={`/panels/${profile}`}
        icon={cubeIcon}
        iconPlacement="before"
        className="absolute bottom-2 right-2 rounded-md bg-body/85 px-2.5 py-1 text-xs font-semibold shadow-sm backdrop-blur"
      >
        Open 3D view
      </Link>
      <span className="sr-only">Open the detailed 3D model of the {label}</span>
    </div>
  )
}
