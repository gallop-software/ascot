import { Section } from '@/components/section'
import { SectionHeading } from '@/components/section-heading'
import { StatisticsStrip } from '@/components/statistics-strip'
import { extendedStats } from '@/config'

/** Key figures for the About page, driven by `extendedStats` in @/config. */
export default function Stats() {
  return (
    <Section className="bg-accent2 py-20 md:py-28">
      <SectionHeading
        dark
        eyebrow="By the Numbers"
        heading="Capability, Measured"
        intro="Figures reflect typical recent performance and are reviewed as the operation changes."
        className="mb-12 max-w-3xl"
      />

      <StatisticsStrip
        dark
        stats={extendedStats}
      />
    </Section>
  )
}
