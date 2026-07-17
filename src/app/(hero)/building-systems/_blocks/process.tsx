import { PROCESS_STEPS } from '@/catalog'
import { ProcessSteps } from '@/components/process-steps'
import { Section } from '@/components/section'
import { SectionHeading } from '@/components/section-heading'

/** How a building package moves from planning to delivery. */
export default function Process() {
  return (
    <Section className="bg-body2 py-20 lg:py-28">
      <SectionHeading
        eyebrow="How It Works"
        heading="Typical Project Process"
        intro="The same four steps apply whether the order is a single roof or a complete building package."
        className="mb-12 lg:mb-16"
      />

      <ProcessSteps steps={PROCESS_STEPS} />
    </Section>
  )
}
