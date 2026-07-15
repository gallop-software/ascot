import { notFound } from 'next/navigation'
import { PageWrapper } from '@/components/page-wrapper'
import { INDUSTRIES, getIndustry, type Industry } from '@/catalog'
import { company, serviceArea } from '@/config'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import { baseURL, businessId } from '@/app/metadata'

import Hero from './_blocks/hero'
import Needs from './_blocks/needs'
import Support from './_blocks/support'
import RelatedSystems from './_blocks/related-systems'
import Cta from './_blocks/cta'

interface PageProps {
  params: Promise<{ slug: string }>
}

// Pre-render every industry at build time; reject unknown slugs.
export const dynamicParams = false

export function generateStaticParams() {
  return INDUSTRIES.map((industry) => ({ slug: industry.slug }))
}

function getContent(slug: string): Industry | null {
  return getIndustry(slug) ?? null
}

/**
 * Service + Breadcrumb schema for an industry. The business entity is emitted
 * globally — this references it by @id rather than redefining it.
 */
function buildStructuredData(industry: Industry): object[] {
  const url = `${baseURL}/industries/${industry.slug}`

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `Metal Building Supply for ${industry.name}`,
      description: industry.shortDescription,
      serviceType: 'Metal roofing and steel building material supply',
      url,
      image: industry.image.src,
      provider: { '@id': businessId },
      audience: { '@type': 'Audience', audienceType: industry.name },
      areaServed: [
        ...serviceArea.regions.map((region) => ({
          '@type': region.type,
          name: region.name,
        })),
        ...serviceArea.cities.map((name) => ({ '@type': 'City', name })),
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: baseURL },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Industries',
          item: `${baseURL}/industries`,
        },
        { '@type': 'ListItem', position: 3, name: industry.name, item: url },
      ],
    },
  ]
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const industry = getContent(slug)
  if (!industry) return {}

  const metadata: PageMetadata = {
    title: `${industry.name} | Metal Building Supply | ${company.name}`,
    description: industry.shortDescription,
    slug: `industries/${slug}`,
    focusKeyword: industry.name.toLowerCase(),
    publishDate: '2026-07-15T00:00:00Z',
    modifiedDate: '2026-07-15T00:00:00Z',
    alternates: { canonical: `/industries/${slug}` },
    openGraph: {
      image: { url: industry.image.src, alt: industry.image.alt },
    },
  }
  return generatePageMetadata(metadata)
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const industry = getContent(slug)
  if (!industry) notFound()

  return (
    <PageWrapper metadata={{ structuredData: buildStructuredData(industry) }}>
      <Hero industry={industry} />
      <Needs industry={industry} />
      <Support industry={industry} />
      <RelatedSystems industry={industry} />
      <Cta industry={industry} />
    </PageWrapper>
  )
}
