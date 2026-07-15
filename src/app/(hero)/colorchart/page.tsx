import { PageWrapper } from '@/components/page-wrapper'
import { buildLandingSchema } from '@/utils/landing-schema'
import { generatePageMetadata, type PageMetadata } from '@/utils/page-helpers'
import { company, serviceArea } from '@/config'

import Hero from './_blocks/hero'
import Chart from './_blocks/chart'
import Cta from './_blocks/cta'

function PageBody() {
  return (
    <>
      <Hero />
      <Chart />
      <Cta />
    </>
  )
}

/** Service areas from config, so the schema never hardcodes a market. */
const areaServed = [
  ...serviceArea.regions.map((region) => region.name),
  ...serviceArea.cities,
]

const metadata: PageMetadata = {
  title: `Panel Color Chart — Standard Finishes | ${company.name}`,
  description:
    'Browse the standard ForgeSpan Metals panel color line. Every finish is matched across panels, trim, and accessories — review physical samples before ordering.',
  slug: 'colorchart',
  keywords: [
    'metal roofing color chart',
    'metal panel colors',
    'panel finish options',
    'roofing color samples',
  ],
  focusKeyword: 'metal panel color chart',
  publishDate: '2026-07-15T00:00:00Z',
  modifiedDate: '2026-07-15T00:00:00Z',
  alternates: { canonical: '/colorchart' },
  openGraph: {
    image: {
      url: '/images/categories/metal-roofing-panels.jpg',
      alt: 'Stacked metal roofing panels in multiple factory-applied colors',
    },
  },
  structuredData: buildLandingSchema({
    name: 'Panel Color Chart',
    description:
      'The standard color line for ForgeSpan Metals roofing panels, wall panels, trim, and accessories.',
    slug: 'colorchart',
    serviceType: 'Metal Roofing and Wall Panels',
    areaServed,
  }),
}

export const generateMetadata = () => generatePageMetadata(metadata)

export default function Page() {
  return (
    <PageWrapper metadata={metadata}>
      <PageBody />
    </PageWrapper>
  )
}
