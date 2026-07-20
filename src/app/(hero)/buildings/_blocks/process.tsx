import { PROCESS_STEPS } from '@/catalog'
import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import { ProcessSteps } from '@/components/process-steps'
import { Section } from '@/components/section'

/** How a building package moves from planning to delivery. */
export default function Process() {
  return (
    <Section className="bg-body py-20 lg:py-28">
      <div className="mb-12 lg:mb-16">
        <Heading as="h2">How It Works</Heading>
        <Heading as="h3">Typical Project Process</Heading>
        <Paragraph
          color="text-contrast-light"
          margin="mb-0"
        >
          The same four steps apply whether the order is a single roof or a
          complete building package.
        </Paragraph>
      </div>

      <ProcessSteps steps={PROCESS_STEPS} />
    </Section>
  )
}
