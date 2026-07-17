import { CTASection } from '@/components/cta-section'
import { cta } from '@/config'

export default function Cta() {
  return (
    <CTASection
      heading="Need Trim to Match a Panel Order?"
      body="Send the panel profile, color, and the conditions you need to close. We will confirm the trim pieces, flag anything that needs a custom bend, and get a material list back to you."
      primaryCta={cta.quote}
      secondaryCta={cta.call}
      image={{
        src: '/placeholder.png',
        alt: '',
      }}
    />
  )
}
