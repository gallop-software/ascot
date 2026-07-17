import { CTASection } from '@/components/cta-section'
import { cta } from '@/config'

export default function Cta() {
  return (
    <CTASection
      heading="Tell Us What You Are Building"
      body="Send drawings, measurements, or a rough sketch. We will work through the panels, trim, structural components, and accessories the job needs and come back with a material list you can price against."
      primaryCta={cta.quote}
      secondaryCta={cta.call}
      image={{
        src: '/placeholder.png',
        alt: '',
      }}
    />
  )
}
