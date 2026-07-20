import { Section } from '@/components/section'
import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import { StatisticsStrip } from '@/components/statistics-strip'
import { extendedStats } from '@/config'

/** Key figures for the About page, driven by `extendedStats` in @/config. */
export default function Stats() {
  return (
    <Section className="bg-body2 py-20 md:py-28">
      <div className="mb-12 max-w-3xl">
        <Heading as="h2">By the Numbers</Heading>
        <Heading as="h3">Capability, Measured</Heading>
        <Paragraph
          color="text-contrast-light"
          margin="mb-0"
        >
          Figures reflect typical recent performance and are reviewed as the
          operation changes.
        </Paragraph>
      </div>

      <StatisticsStrip stats={extendedStats} />
    </Section>
  )
}
