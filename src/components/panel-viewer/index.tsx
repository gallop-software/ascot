'use client'

import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { clsx } from 'clsx'
import { Link } from '@/components/link'
import { state, useSnapshot } from '@/state'
import cubeIcon from '@iconify/icons-lucide/box'
import { PanelStage } from './lazy-stage'
import { PANEL_PROFILES, type PanelProfileId } from './profiles'
import { PANEL_PROFILES as CATALOG_PANELS } from '@/catalog'

interface PanelViewerProps {
  profile: PanelProfileId
  /** Accessible name for the rendered profile, e.g. "PBR Panel". */
  label: string
  /** Aspect ratio of the preview frame. */
  aspect?: string
  className?: string
}

/**
 * Compact card preview: a gently swaying, dimensioned 3D model of the panel
 * with a single link out to the full-page studio. Detailed controls (wire,
 * variant, color, zoom) live on that page rather than crowding the card.
 */
export function PanelViewer({
  profile,
  label,
  aspect = 'aspect-[5/2]',
  className,
}: PanelViewerProps) {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })
  const snap = useSnapshot(state)
  const spec = PANEL_PROFILES[profile]
  const [hovered, setHovered] = useState(false)

  // Viewer geometry ids and public route slugs are deliberately kept identical
  // ('pro-rib', 'standing-seam', 'insulated-wall'). Resolve through the catalog
  // anyway so a future id that diverges from its slug produces a working link
  // rather than a silent 404 — this link used to point at /panels/fm-r36.
  const catalogPanel = CATALOG_PANELS.find(
    (panel) => panel.viewerProfile === profile
  )

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={clsx('relative overflow-hidden bg-body2/50', className)}
    >
      <div className={clsx('w-full', aspect)}>
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
        href={`/panels/${catalogPanel?.slug ?? profile}`}
        icon={cubeIcon}
        iconPlacement="before"
        className="absolute bottom-2 right-2 rounded-md bg-body2 px-2.5 py-1 text-xs font-semibold text-contrast shadow-sm backdrop-blur"
      >
        Open 3D view
      </Link>
      <span className="sr-only">Open the detailed 3D model of the {label}</span>
    </div>
  )
}
