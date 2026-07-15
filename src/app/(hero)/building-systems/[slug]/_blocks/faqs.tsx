import type { BuildingSystem } from '@/catalog'
import { FaqAccordion } from '@/components/faq-accordion'
import { Section } from '@/components/section'
import { SectionHeading } from '@/components/section-heading'

/** Catalog-driven FAQ for a building system. */
export default function Faqs({ system }: { system: BuildingSystem }) {
  if (system.faqs.length === 0) return null

  return (
    <Section className="py-20 lg:py-28">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="Common Questions"
          heading={`${system.name}: Questions We Get`}
          className="mb-10"
        />

        <FaqAccordion
          items={system.faqs.map((faq) => ({ q: faq.question, a: faq.answer }))}
        />
      </div>
    </Section>
  )
}
