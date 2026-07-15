import { CTASection } from '@/components/cta-section'
import { cta } from '@/config'

/** Closing call to action for a resource article. */
export default function Cta() {
  return (
    <CTASection
      heading="Ready to Put This Into an Order?"
      body="Send dimensions, drawings, or a sketch. We will review the scope, flag anything that looks off, and price a material list you can build from."
      primaryCta={cta.quote}
      secondaryCta={{ label: 'Contact ForgeSpan', href: '/contact' }}
      image={{
        src: '/images/resources/reviewing-project-drawings.jpg',
        alt: 'Sales staff and a contractor reviewing metal building drawings at a counter',
      }}
    />
  )
}
