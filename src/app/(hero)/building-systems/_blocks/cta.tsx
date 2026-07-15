import { CTASection } from '@/components/cta-section'
import { cta } from '@/config'

/** Closing quote CTA for the building systems index. */
export default function Cta() {
  return (
    <CTASection
      heading="Tell Us What You Are Building"
      body="Send dimensions, a sketch, or construction drawings and we will work through the package with you — panels, trim, framing, and the accessories that get missed."
      primaryCta={cta.quote}
      secondaryCta={cta.call}
      image={{
        src: '/images/buildings/steel-package-delivery.jpg',
        alt: '',
      }}
    />
  )
}
