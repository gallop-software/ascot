import { CTASection } from '@/components/cta-section'
import { cta } from '@/config'

/** Closing call to action for /about. */
export default function Cta() {
  return (
    <CTASection
      heading="Tell Us What You Are Building"
      body="Send dimensions, drawings, or a rough sketch. We will review the scope, flag anything that looks unclear, and put together a material list you can build from."
      primaryCta={cta.quote}
      secondaryCta={{ label: 'Contact ForgeSpan', href: '/contact' }}
      image={{
        src: '/placeholder.png',
        alt: 'Bundled metal panels being loaded onto a delivery truck at the ForgeSpan Metals plant',
      }}
    />
  )
}
