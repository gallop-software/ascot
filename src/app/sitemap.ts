import { getPageSlugs } from '@/tools/get-page-slugs'
import { getPostSlugs } from '@/tools/get-post-slugs'
import { getCategorySlugs } from '@/tools/get-category-slugs'
import { baseURL } from '@/app/metadata'
import {
  PANEL_PROFILES,
  BUILDING_SYSTEMS,
  INDUSTRIES,
  PRODUCT_CATEGORIES,
  RESOURCES,
} from '@/catalog'
import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'
export const revalidate = 86400

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

  // Dynamic routes can't be discovered by the filesystem scan, so enumerate
  // their statically-generated params from the catalog — the same source
  // `generateStaticParams` reads, so the sitemap can't drift from the routes.
  const catalogRoute = (uri: string, priority: number) => ({
    url: `${baseURL}${uri}`,
    lastModified: new Date(CATALOG_LAST_MODIFIED),
    changeFrequency: 'monthly' as const,
    priority,
  })

  const panelProfiles = PANEL_PROFILES.map((panel) =>
    catalogRoute(`/panels/${panel.slug}`, 0.7)
  )

  const buildingSystems = BUILDING_SYSTEMS.map((system) =>
    catalogRoute(`/building-systems/${system.slug}`, 0.7)
  )

  const industries = INDUSTRIES.map((industry) =>
    catalogRoute(`/industries/${industry.slug}`, 0.6)
  )

  // `building-packages` is a category card that links to /building-systems
  // rather than a generated /products/<slug> page — skip it.
  const productCategories = PRODUCT_CATEGORIES.filter(
    (category) => category.href.startsWith('/products/')
  ).map((category) => catalogRoute(category.href, 0.7))

  // Resource articles carry a real publication date, so use it rather than the
  // shared catalog date.
  const resources = RESOURCES.map((resource) => ({
    url: `${baseURL}${resource.href}`,
    lastModified: new Date(resource.date),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  return [
    ...pages,
    ...projects,
    ...categories,
    ...panelProfiles,
    ...buildingSystems,
    ...industries,
    ...productCategories,
    ...resources,
  ]
}
