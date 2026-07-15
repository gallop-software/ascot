import { CTASection } from '@/components/cta-section'
import { cta } from '@/config'

/**
 * CTASection renders its own Section (with the dark scrim over the background
 * image) — it must not be wrapped in Section/Container here.
 */
export default function Cta() {
  return (
    <CTASection
      heading="Ready to Price Your Next Steel Project?"
      body="Send us your material list, measurements, plans, or project details. Our team will help identify the right products and prepare a clear quote."
      primaryCta={cta.quote}
      secondaryCta={cta.call}
      image={{
        src: '/images/cta/steel-plant-night.jpg',
        alt: 'Steel coil and formed panel bundles staged in the ForgeSpan Metals yard',
      }}
    />
  )
}
