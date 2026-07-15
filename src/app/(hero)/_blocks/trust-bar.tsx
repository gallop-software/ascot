import { Container } from '@/components/container'
import { StatisticsStrip } from '@/components/statistics-strip'
import { stats } from '@/config'

/**
 * Statistics strip directly under the hero — the first proof point after the
 * headline. Dark navy so it reads as a continuation of the hero band rather
 * than the start of the light content flow.
 */
export default function TrustBar() {
  return (
    <section className="bg-accent2-dark">
      <Container className="py-12 md:py-16">
        <StatisticsStrip
          stats={stats}
          dark
        />
      </Container>
    </section>
  )
}
