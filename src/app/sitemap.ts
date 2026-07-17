import { getPageSlugs } from '@/tools/get-page-slugs'
import { baseURL } from '@/app/metadata'
import { PANEL_PROFILES } from '@/catalog'
import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'
export const revalidate = 86400

// Catalog-driven pages have no per-content date; use a shared modified date so
// lastModified reflects real content changes instead of every build's clock.
// Bump this when catalog content changes materially.
const CATALOG_LAST_MODIFIED = '2026-07-15T00:00:00Z'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { pageSlugs } = await getPageSlugs()

  const pages = pageSlugs.map((item) => ({
    url: baseURL + item.uri,
    lastModified: new Date(item.modified),
    changeFrequency: (item.uri === '/' ? 'daily' : 'weekly') as
      | 'daily'
      | 'weekly',
    // Homepage carries the most weight; other top-level pages sit just below.
    priority: item.uri === '/' ? 1 : 0.8,
  }))

  // The panel detail routes are dynamic, so the filesystem scan can't discover
  // them — enumerate their statically-generated params from the catalog, the
  // same source `generateStaticParams` reads, so the sitemap can't drift.
  const panelProfiles = PANEL_PROFILES.map((panel) => ({
    url: `${baseURL}/panels/${panel.slug}`,
    lastModified: new Date(CATALOG_LAST_MODIFIED),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...pages, ...panelProfiles]
}
