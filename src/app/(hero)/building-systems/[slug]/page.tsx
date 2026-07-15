import { notFound } from 'next/navigation'
import { PageWrapper } from '@/components/page-wrapper'
import { BUILDING_SYSTEMS, getBuildingSystem, type BuildingSystem } from '@/catalog'
import { company, serviceArea } from '@/config'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import { baseURL, businessId } from '@/app/metadata'

import Hero from './_blocks/hero'
import Details from './_blocks/details'
import Process from './_blocks/process'
import Projects from './_blocks/projects'
import Faqs from './_blocks/faqs'
import Cta from './_blocks/cta'

interface PageProps {
  params: Promise<{ slug: string }>
}

// Pre-render every building system at build time; reject unknown slugs.
export const dynamicParams = false

export function generateStaticParams() {
  return BUILDING_SYSTEMS.map((system) => ({ slug: system.slug }))
}

function getContent(slug: string): BuildingSystem | null {
  return getBuildingSystem(slug) ?? null
}

/**
 * Service + Breadcrumb + FAQ schema for a building system. The business entity
 * is emitted globally — this references it by @id rather than redefining it.
 */
function buildStructuredData(system: BuildingSystem): object[] {
  const url = `${baseURL}/building-systems/${system.slug}`

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: system.name,
      description: system.shortDescription,
      serviceType: 'Steel building package supply',
      url,
      image: system.image.src,
      provider: { '@id': businessId },
      areaServed: [
        ...serviceArea.regions.map((region) => ({
          '@type': region.type,
          name: region.name,
        })),
        ...serviceArea.cities.map((name) => ({ '@type': 'City', name })),
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: `${system.name} components`,
        itemListElement: system.components.map((component) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: component },
        })),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: baseURL },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Building Systems',
          item: `${baseURL}/building-systems`,
        },
        { '@type': 'ListItem', position: 3, name: system.name, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: system.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  ]
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const system = getContent(slug)
  if (!system) return {}

  const metadata: PageMetadata = {
    title: `${system.name} | Steel Building Packages | ${company.name}`,
    description: system.shortDescription,
    slug: `building-systems/${slug}`,
    focusKeyword: system.name.toLowerCase(),
    publishDate: '2026-07-15T00:00:00Z',
    modifiedDate: '2026-07-15T00:00:00Z',
    alternates: { canonical: `/building-systems/${slug}` },
    openGraph: {
      image: { url: system.image.src, alt: system.image.alt },
    },
  }
  return generatePageMetadata(metadata)
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const system = getContent(slug)
  if (!system) notFound()

  return (
    <PageWrapper metadata={{ structuredData: buildStructuredData(system) }}>
      <Hero system={system} />
      <Details system={system} />
      <Process />
      <Projects system={system} />
      <Faqs system={system} />
      <Cta system={system} />
    </PageWrapper>
  )
}
