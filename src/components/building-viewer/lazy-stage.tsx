'use client'

import dynamic from 'next/dynamic'

/**
 * Code-split the WebGL building stage so three.js and the R3F runtime load in
 * their own client chunk, fetched only when the viewer enters the viewport.
 */
export const BuildingStage = dynamic(
  () => import('./stage').then((m) => ({ default: m.BuildingStage })),
  { ssr: false },
)
