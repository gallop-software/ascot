import { CTASection } from '@/components/cta-section'
import { cta } from '@/config'

export default function Cta() {
  return (
    <CTASection
      heading="Not Sure Which Profile Fits the Job?"
      body="Send us the building dimensions, the substrate, and what the structure has to do. We will walk through the profile options and put together a material list you can price against."
      primaryCta={cta.quote}
      secondaryCta={cta.call}
      image={{
        src: '/placeholder.png',
        alt: '',
      }}
    />
  )
}
