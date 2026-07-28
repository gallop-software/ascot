import { baseURL, businessId } from '@/app/metadata'
import type { PageMetadata } from '@/utils/page-helpers'

/**
 * Article + Breadcrumb schema for a project, built from its metadata.
 *
 * Each project route folder owns its own page.tsx (the folder-per-project shape
 * copied from speedwell), so this shared builder keeps the JSON-LD identical
 * across them instead of duplicating it five times.
 */
export function buildProjectStructuredData(
  metadata: PageMetadata,
  name: string,
  slug: string
): object[] {
  const url = `${baseURL}/projects/${slug}`
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: name,
      description: metadata.description,
      image: metadata.featuredImage,
      datePublished: metadata.date,
      dateModified: metadata.modifiedDate || metadata.date,
      author: { '@id': businessId },
      publisher: { '@id': businessId },
      mainEntityOfPage: url,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: baseURL },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Projects',
          item: `${baseURL}/projects`,
        },
        { '@type': 'ListItem', position: 3, name, item: url },
      ],
    },
  ]
}
