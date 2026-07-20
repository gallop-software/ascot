import { PageWrapper } from '@/components/page-wrapper'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import { baseURL } from '@/app/metadata'
import { PANEL_PROFILES } from '@/catalog'
import { company } from '@/config'

import Hero from './_blocks/hero'
import Panels from './_blocks/panels'
import Trims from './_blocks/trims'
import Cta from './_blocks/cta'

function Content() {
  return (
    <>
      <Hero />
      <Panels />
      <Trims />
      <Cta />
    </>
  )
}

const metadata: PageMetadata = {
  title: `Panel Profiles — Roofing and Wall | ${company.name}`,
  description:
    'Compare the three Frontier panel profiles — exposed-fastener structural rib, concealed-fastener standing seam, and insulated wall — with coverage, rib geometry, gauges, and finishes.',
  slug: 'panels',
  keywords: [
    'metal panel profiles',
    'metal roofing panels',
    'wall and liner panels',
    'standing seam panel',
    'insulated wall panel',
  ],
  focusKeyword: 'metal panel profiles',
  publishDate: '2026-07-15T00:00:00Z',
  modifiedDate: '2026-07-15T00:00:00Z',
  alternates: {
    canonical: '/panels',
  },
  openGraph: {
    image: {
      url: '/placeholder.png',
      alt: 'Stacked metal roofing panels in multiple colors on a manufacturing floor',
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
          name: 'Panel Profiles',
          item: `${baseURL}/panels`,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Panel Profiles',
      itemListElement: PANEL_PROFILES.map((panel, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: panel.name,
        url: `${baseURL}/panels/${panel.slug}`,
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
