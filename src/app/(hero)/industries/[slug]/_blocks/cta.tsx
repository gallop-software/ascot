import type { Industry } from '@/catalog'
import { CTASection } from '@/components/cta-section'
import { cta } from '@/config'

/** Closing quote CTA for an industry detail page. */
export default function Cta({ industry }: { industry: Industry }) {
  return (
    <CTASection
      heading="Request a Quote for Your Next Project"
      body="Send dimensions, a sketch, or drawings and we will work the package with you. If a trim condition or closure is missing from the takeoff, we would rather catch it now than on the jobsite."
      primaryCta={cta.quote}
      secondaryCta={cta.call}
      image={{ src: industry.image.src, alt: '' }}
    />
  )
}
