import { Section } from '@/components/section'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { SectionHeading } from '@/components/section-heading'

/**
 * Page header for the panel profile index. Sits on the navy band so it reads
 * correctly beneath the transparent hero navbar.
 */
export default function Hero() {
  return (
    <Section className="bg-accent2 pt-40 pb-16 md:pt-52 md:pb-20 lg:pt-64">
      <Breadcrumbs
        dark
        className="mb-8"
        items={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: 'Panel Profiles' },
        ]}
      />

      <SectionHeading
        as="h1"
        dark
        eyebrow="Panel Profiles"
        heading="Profiles for Roofing, Walls, and Interior Applications"
        intro="Six roll-formed profiles covering exposed-fastener roofing, concealed-fastener standing seam, insulated wall systems, and interior liner. Compare coverage, rib geometry, and gauge, then request a quote on the profile that fits the project."
        className="max-w-3xl"
      />
    </Section>
  )
}
