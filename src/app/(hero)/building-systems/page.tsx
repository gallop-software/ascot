import { PageWrapper } from '@/components/page-wrapper'
import { baseURL, businessId } from '@/app/metadata'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import { BUILDING_SYSTEMS } from '@/catalog'
import { company } from '@/config'

import Hero from './_blocks/hero'
import Systems from './_blocks/systems'
import Process from './_blocks/process'
import Cta from './_blocks/cta'

function PageBody() {
  return (
    <>
      <Hero />
      <Systems />
      <Process />
      <Cta />
    </>
  )
}

const metadata: PageMetadata = {
  title: `Steel Building Systems & Complete Packages | ${company.name}`,
  description:
    'Coordinated steel building packages for agricultural, commercial, industrial, warehouse, shop, and storage projects — panels, trim, structural framing, and accessories supplied together.',
  slug: 'building-systems',
  focusKeyword: 'steel building systems',
  publishDate: '2026-07-15T00:00:00Z',
  modifiedDate: '2026-07-15T00:00:00Z',
  alternates: { canonical: '/building-systems' },
  openGraph: {
    image: {
      url: '/images/buildings/steel-building-package.jpg',
      alt: `Steel building package supplied by ${company.name}`,
    },
  },
  structuredData: [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Steel Building Systems',
      description:
        'Complete steel building packages and the components that make them up.',
      url: `${baseURL}/building-systems`,
      about: { '@id': businessId },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: BUILDING_SYSTEMS.map((system, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: system.name,
          url: `${baseURL}/building-systems/${system.slug}`,
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
      ],
    },
  ],
}

export const generateMetadata = () => generatePageMetadata(metadata)

export default function Page() {
  return (
    <PageWrapper metadata={metadata}>
      <PageBody />
    </PageWrapper>
  )
}
