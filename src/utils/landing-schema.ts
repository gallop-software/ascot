import { baseURL, businessId } from '@/app/metadata'
import { serviceArea } from '@/config'

/** Default areaServed for landing pages — derived from the configured service area. */
const defaultAreaServed = [
  ...serviceArea.cities.map((city) => `${city}, TX`),
  ...serviceArea.regions.map((region) => region.name),
]

interface LandingSchemaInput {
  name: string
  description: string
  slug: string
  serviceType: string
  areaServed?: string[]
  faq?: { q: string; a: string }[] | undefined
}

/**
 * Build Service + BreadcrumbList (+ optional FAQPage) structured data for a
 * keyword landing page. Fed into PageMetadata.structuredData so PageWrapper
 * renders it as JSON-LD alongside the site-wide business schema.
 */
export function buildLandingSchema({
  name,
  description,
  slug,
  serviceType,
  areaServed = defaultAreaServed,
  faq,
}: LandingSchemaInput): object[] {
  const url = `${baseURL}/${slug}`

  const schema: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name,
      description,
      serviceType,
      url,
      areaServed: areaServed.map((area) => ({ '@type': 'Place', name: area })),
      provider: { '@id': businessId },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: baseURL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name,
          item: url,
        },
      ],
    },
  ]

  if (faq && faq.length > 0) {
    schema.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a,
        },
      })),
    })
  }

  return schema
}
