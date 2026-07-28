import { getPageSlugs } from '@/tools/get-page-slugs'
import { getPostSlugs } from '@/tools/get-post-slugs'
import { getCategorySlugs } from '@/tools/get-category-slugs'
import { baseURL } from '@/app/metadata'
import { PANEL_PROFILES } from '@/catalog'
import type { MetadataRoute } from 'next'

// Fully static: built once at build time, served as an asset.
//
// Do NOT add `revalidate` here. It makes the route ISR, which on Cloudflare
// Workers re-renders at runtime — and getPageSlugs() scans src/app with
// readdirSync, which throws on Workers (no filesystem), returning a 500.
// The sitemap is regenerated on every deploy anyway, so it cannot go stale.
export const dynamic = 'force-static'

// Catalog-driven pages have no per-content date; use a shared modified date so
// lastModified reflects real content changes instead of every build's clock.
// Bump this when catalog content changes materially.
const CATALOG_LAST_MODIFIED = '2026-07-15T00:00:00Z'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { pageSlugs } = await getPageSlugs()
  const { postSlugs } = await getPostSlugs()
  const { categorySlugs } = await getCategorySlugs()

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
  // them, so enumerate their statically-generated params from the catalog, the
  // same source `generateStaticParams` reads, so the sitemap can't drift.
  const panelProfiles = PANEL_PROFILES.map((panel) => ({
    url: `${baseURL}/panels/${panel.slug}`,
    lastModified: new Date(CATALOG_LAST_MODIFIED),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Project case studies live at /projects/<slug> (nested under the projects
  // archive), so the filesystem scan can't discover them — enumerate from the
  // generated blog metadata instead.
  const projects = postSlugs.map((item) => ({
    url: baseURL + item.uri,
    lastModified: new Date(item.modified),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Project category archives at /projects/category/<slug>.
  const categories = categorySlugs.map((item) => ({
    url: baseURL + item.uri,
    lastModified: item.lastModified ? new Date(item.lastModified) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }))

  return [...pages, ...projects, ...categories, ...panelProfiles]
}
