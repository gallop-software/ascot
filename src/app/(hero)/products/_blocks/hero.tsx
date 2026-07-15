import { Section } from '@/components/section'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { SectionHeading } from '@/components/section-heading'

export default function Hero() {
  return (
    <Section className="bg-accent2 pt-40 pb-16 md:pt-52 md:pb-20 lg:pt-64">
      <Breadcrumbs
        dark
        className="mb-8"
        items={[{ label: 'Home', href: '/' }, { label: 'Products' }]}
      />

      <SectionHeading
        as="h1"
        dark
        eyebrow="What We Manufacture"
        heading="Steel Products Built Around Real Projects"
        intro="Roofing and wall panels, structural components, trim, fasteners, and complete building packages — roll-formed to order and coordinated so a job arrives as one package instead of five partial deliveries."
        className="max-w-3xl"
      />
    </Section>
  )
}
