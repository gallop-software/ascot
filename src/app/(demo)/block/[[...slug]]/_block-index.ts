// Auto-generated — regenerate with: npm run blocks
// Maps demo page slugs to block imports

import type { ComponentType } from 'react'

export const blockImports: Record<string, () => Promise<{ default: ComponentType }>> = {
  'about/cta': () => import('@/app/(hero)/about/_blocks/cta'),
  'about/hero': () => import('@/app/(hero)/about/_blocks/hero'),
  'about/stats': () => import('@/app/(hero)/about/_blocks/stats'),
  'about/story': () => import('@/app/(hero)/about/_blocks/story'),
  'about/timeline': () => import('@/app/(hero)/about/_blocks/timeline'),
  'about/values': () => import('@/app/(hero)/about/_blocks/values'),
  'buildings': () => import('@/app/(hero)/_blocks/buildings'),
  'buildings/anatomy': () => import('@/app/(hero)/buildings/_blocks/anatomy'),
  'buildings/cta': () => import('@/app/(hero)/buildings/_blocks/cta'),
  'buildings/hero': () => import('@/app/(hero)/buildings/_blocks/hero'),
  'buildings/process': () => import('@/app/(hero)/buildings/_blocks/process'),
  'buildings/systems': () => import('@/app/(hero)/buildings/_blocks/systems'),
  'contact/details': () => import('@/app/(hero)/contact/_blocks/details'),
  'contact/hero': () => import('@/app/(hero)/contact/_blocks/hero'),
  'contact/hours': () => import('@/app/(hero)/contact/_blocks/hours'),
  'contact/quote': () => import('@/app/(hero)/contact/_blocks/quote'),
  'cta': () => import('@/app/(hero)/_blocks/cta'),
  'hero': () => import('@/app/(hero)/_blocks/hero'),
  'panels': () => import('@/app/(hero)/_blocks/panels'),
  'panels/cta': () => import('@/app/(hero)/panels/_blocks/cta'),
  'panels/hero': () => import('@/app/(hero)/panels/_blocks/hero'),
  'panels/panels': () => import('@/app/(hero)/panels/_blocks/panels'),
  'panels/trims': () => import('@/app/(hero)/panels/_blocks/trims'),
  'process': () => import('@/app/(hero)/_blocks/process'),
  'products': () => import('@/app/(hero)/_blocks/products'),
  'products/cta': () => import('@/app/(hero)/products/_blocks/cta'),
  'products/hero': () => import('@/app/(hero)/products/_blocks/hero'),
  'products/products': () => import('@/app/(hero)/products/_blocks/products'),
  'projects': () => import('@/app/(hero)/_blocks/projects'),
  'quote-form': () => import('@/app/(hero)/_blocks/quote-form'),
  'testimonials': () => import('@/app/(hero)/_blocks/testimonials'),
  'trims/cta': () => import('@/app/(hero)/trims/_blocks/cta'),
  'trims/hero': () => import('@/app/(hero)/trims/_blocks/hero'),
  'trims/trims': () => import('@/app/(hero)/trims/_blocks/trims'),
  'trust-bar': () => import('@/app/(hero)/_blocks/trust-bar'),
}

export const blockSlugs = Object.keys(blockImports)
