import type { PanelProfileId } from './profiles'
import { PANEL_PROFILES } from '@/catalog'

export interface PanelContent {
  profile: PanelProfileId
  name: string
  bestFor: string
  specs: { label: string; value: string }[]
  description: string
  /** SEO keywords surfaced on the panel's dedicated profile page. */
  keywords?: string[]
}

/**
 * Panel copy for the homepage cards and the full-page studio.
 *
 * Derived from `src/catalog.ts` so the 3D viewer stays decoupled from company
 * content: the model geometry lives in `profiles.ts`, the words live in the
 * catalog, and only profiles with a `viewerProfile` id appear here.
 */
export const PANEL_CONTENT: Record<PanelProfileId, PanelContent> =
  Object.fromEntries(
    PANEL_PROFILES.filter((panel) => panel.viewerProfile).map((panel) => [
      panel.viewerProfile as PanelProfileId,
      {
        profile: panel.viewerProfile as PanelProfileId,
        name: panel.name,
        bestFor: panel.bestFor,
        specs: panel.specs,
        description: panel.description,
        keywords: [
          panel.name,
          `${panel.name} supplier`,
          ...panel.applications.map((a) => `${a.toLowerCase()} panel`),
        ],
      },
    ])
  ) as Record<PanelProfileId, PanelContent>

export const PANEL_ORDER: PanelProfileId[] = ['fm-r36', 'fm-a36', 'fm-u36']
