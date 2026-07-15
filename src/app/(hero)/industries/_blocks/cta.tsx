import { CTASection } from '@/components/cta-section'
import { cta } from '@/config'

/** Closing quote CTA for the industries index. */
export default function Cta() {
  return (
    <CTASection
      heading="Every Project Starts With a Conversation"
      body="Tell us what the building has to do and how your crew works. We will put together a package and a takeoff that fits the job instead of a generic parts list."
      primaryCta={cta.quote}
      secondaryCta={cta.call}
      image={{
        src: '/images/industries/jobsite-material-delivery.jpg',
        alt: '',
      }}
    />
  )
}
