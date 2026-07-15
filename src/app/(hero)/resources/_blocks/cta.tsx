import { CTASection } from '@/components/cta-section'
import { cta } from '@/config'

/** Closing call to action for the /resources index. */
export default function Cta() {
  return (
    <CTASection
      heading="Still Working Something Out?"
      body="A guide only goes so far. Send us the drawings or call the plant, and we will work through the profile, gauge, and trim conditions with you before anything is ordered."
      primaryCta={cta.quote}
      secondaryCta={{ label: 'Contact ForgeSpan', href: '/contact' }}
      image={{
        src: '/images/resources/reviewing-project-drawings.jpg',
        alt: 'Sales staff and a contractor reviewing metal building drawings at a counter',
      }}
    />
  )
}
