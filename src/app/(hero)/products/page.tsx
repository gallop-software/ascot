import { PageWrapper } from '@/components/page-wrapper'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import { baseURL } from '@/app/metadata'
import { STRUCTURAL_COMPONENTS, ACCESSORY_PRODUCTS } from '@/catalog'
import { company } from '@/config'

import Hero from './_blocks/hero'
import Products from './_blocks/products'
import Cta from './_blocks/cta'

function Content() {
  return (
    <>
      <Hero />
      <Products />
      <Cta />
    </>
  )
}

const metadata: PageMetadata = {
  title: `Steel Products — Panels, Trim, Components | ${company.name}`,
  description:
    'Metal roofing and wall panels, structural components, trim, fasteners and accessories, and complete steel building packages — manufactured to order by Frontier Metals.',
  slug: 'products',
  keywords: [
    'metal roofing panels',
    'wall and liner panels',
    'structural steel components',
    'metal trim',
    'metal roofing fasteners',
    'steel building packages',
  ],
  focusKeyword: 'steel building products',
  publishDate: '2026-07-15T00:00:00Z',
  modifiedDate: '2026-07-15T00:00:00Z',
  alternates: {
    canonical: '/products',
  },
  openGraph: {
    image: {
      url: '/placeholder.png',
      alt: 'Structural steel frame of a metal building against an open sky',
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
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Steel Products',
      itemListElement: [...STRUCTURAL_COMPONENTS, ...ACCESSORY_PRODUCTS].map(
        (product, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: product.name,
          url: `${baseURL}/products#${product.slug}`,
        })
      ),
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
