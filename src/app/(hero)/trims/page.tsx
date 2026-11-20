import { PageWrapper } from '@/components/page-wrapper'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import { baseURL } from '@/app/metadata'
import { TRIM_PRODUCTS } from '@/catalog'
import { company } from '@/config'

import Hero from './_blocks/hero'
import Trims from './_blocks/trims'
import Cta from './_blocks/cta'

function Content() {
  return (
    <>
      <Hero />
      <Trims />
      <Cta />
    </>
  )
}

const metadata: PageMetadata = {
  title: `Metal Trims | ${company.name}`,
  description:
    'Ridge, rake, eave, valley, corner, and base trim formed from the same coil as Frontier panels, plus custom flashing formed to the condition.',
  slug: 'trims',
  keywords: [
    'metal roof trim',
    'metal flashing',
    'ridge cap',
    'rake trim',
    'custom metal flashing',
  ],
  focusKeyword: 'metal trim',
  publishDate: '2026-07-15T00:00:00Z',
  modifiedDate: '2026-07-15T00:00:00Z',
  alternates: {
    canonical: '/trims',
  },
  openGraph: {
    image: {
      url: 'https://ascot-cdn.gallop.software/images/logo-lg.png',
      width: 1400,
      height: 708,
      alt: `${company.name} logo`,
    },
  },
  structuredData: [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: baseURL },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Products',
          item: `${baseURL}/products`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Trims',
          item: `${baseURL}/trims`,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Metal Trims',
      itemListElement: TRIM_PRODUCTS.map((trim, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: trim.name,
        url: `${baseURL}/trims#${trim.slug}`,
      })),
    },
  ],
}

export const generateMetadata = () => generatePageMetadata(metadata)

export default function Page() {
  return (
    <PageWrapper metadata={metadata}>
      <Content />
    </PageWrapper>
  )
}
