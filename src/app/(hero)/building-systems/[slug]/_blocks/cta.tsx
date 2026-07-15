import type { BuildingSystem } from '@/catalog'
import { CTASection } from '@/components/cta-section'
import { cta } from '@/config'

/** Closing quote CTA for a building system detail page. */
export default function Cta({ system }: { system: BuildingSystem }) {
  return (
    <CTASection
      heading={`Request a Quote for ${system.name}`}
      body="Send dimensions, a sketch, or drawings. We will review the openings and trim conditions with you and confirm scope and timing on the order rather than guessing up front."
      primaryCta={cta.quote}
      secondaryCta={cta.call}
      image={{ src: system.image.src, alt: '' }}
    />
  )
}
