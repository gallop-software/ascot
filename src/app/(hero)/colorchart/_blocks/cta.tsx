import { CTASection } from '@/components/cta-section'
import { cta } from '@/config'

export default function Cta() {
  return (
    <CTASection
      heading="Found Your Color?"
      body="Tell us the finishes you are considering and what you are building. We will confirm availability for the profile and gauge you need, coordinate matching trim, and get a quote back to you."
      primaryCta={cta.quote}
      secondaryCta={cta.call}
      image={{
        src: '/images/categories/complete-building-packages.jpg',
        alt: '',
      }}
    />
  )
}
