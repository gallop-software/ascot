type PageSlugItem = {
  slug: string
  modified: string
  uri: string
}

// Top-level public pages, in sitemap order.
//
// This list is maintained by hand ON PURPOSE. It used to be discovered by
// scanning src/app with readdirSync, but there is no filesystem on Cloudflare
// Workers, so that scan threw at runtime and /sitemap.xml returned a 500.
// Nothing here may touch `fs` or `process.cwd()`.
//
// ADD A ROUTE HERE when you add a top-level page under a route group,
// otherwise it will be missing from the sitemap. Nested content routes are
// enumerated elsewhere: projects from _data/_blog.json (getPostSlugs /
// getCategorySlugs) and panel profiles from PANEL_PROFILES in src/catalog.ts.
const STATIC_PAGES = [
  '', // home
  'about',
  'buildings',
  'contact',
  'panels',
  'products',
  'projects',
  'trims',
] as const

// Page routes have no per-content date, so use a shared modified date rather
// than a build-clock timestamp that churns lastModified on every deploy.
// Bump this when page content changes materially.
const PAGES_LAST_MODIFIED = '2026-07-15T00:00:00Z'

export async function getPageSlugs(): Promise<{ pageSlugs: PageSlugItem[] }> {
  const pageSlugs: PageSlugItem[] = STATIC_PAGES.map((slug) => ({
    slug,
    modified: PAGES_LAST_MODIFIED,
    uri: slug === '' ? '/' : `/${slug}`,
  }))

  return { pageSlugs }
}
