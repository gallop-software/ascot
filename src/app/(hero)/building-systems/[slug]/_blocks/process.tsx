import { PROCESS_STEPS } from '@/catalog'
import { ProcessSteps } from '@/components/process-steps'
import { Section } from '@/components/section'
import { SectionHeading } from '@/components/section-heading'

/** Typical project process for a building system order. */
export default function Process() {
  return (
    <Section className="bg-accent2 py-20 lg:py-28">
      <SectionHeading
        dark
        eyebrow="How It Works"
        heading="Typical Project Process"
        intro="From first measurements through pickup or delivery, this is how an order moves."
        className="mb-12 lg:mb-16"
      />

      <ProcessSteps
        dark
        steps={PROCESS_STEPS}
      />
    </Section>
  )
}
