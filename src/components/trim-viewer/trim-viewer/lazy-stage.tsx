'use client'

import dynamic from 'next/dynamic'

/**
 * Code-split the WebGL trim stage so three.js and the R3F runtime load in their
 * own client chunk, on demand — the cards gate mounting on scroll, so the chunk
 * fetches only when a viewer actually enters view.
 */
export const TrimStage = dynamic(
  () => import('./stage').then((m) => ({ default: m.TrimStage })),
  { ssr: false },
)
