'use client'

import dynamic from 'next/dynamic'

/**
 * Code-split the WebGL stage so three.js and the R3F runtime load in their own
 * client chunk, on demand, rather than weighing down the initial bundle. The
 * homepage cards already gate mounting on scroll, so the chunk fetches only
 * when a viewer actually enters view.
 */
export const PanelStage = dynamic(
  () => import('./stage').then((m) => ({ default: m.PanelStage })),
  { ssr: false },
)
