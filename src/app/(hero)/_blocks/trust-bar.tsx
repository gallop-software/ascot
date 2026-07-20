import { Section } from '@/components/section'
import { StatisticsStrip } from '@/components/statistics-strip'
import { stats } from '@/config'

/**
 * Statistics strip directly under the hero — the first proof point after the
 * headline. Shares the closing CTA's navy band so the two dark anchors bracket
 * the light content flow; figures count up as it scrolls into view.
 */
export default function TrustBar() {
  return (
    <Section className="bg-accent2 py-14 md:py-20">
      <StatisticsStrip
        stats={stats}
        cols="sm:grid-cols-3"
        dark
      />
    </Section>
  )
}
