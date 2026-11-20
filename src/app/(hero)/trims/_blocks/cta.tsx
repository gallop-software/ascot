import { Section } from '@/components/section'
import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import { Buttons } from '@/components/buttons'
import { Button } from '@/components/button'
import { cta } from '@/config'

export default function Cta() {
  return (
    <Section
      imageSrc="https://ascot-cdn.gallop.software/images/panels-1.jpg"
      imageWidth={1672}
      imageHeight={941}
      imageAlt=""
      overlayColor="bg-accent2/88"
      className="py-20 lg:py-28"
    >
      <Heading
        as="h3"
        color="text-overlay-text"
        margin="mb-4"
      >
        Need Trim to Match a Panel Order?
      </Heading>
      <Paragraph
        variant="large"
        color="text-accent3"
        margin="mb-8"
        className="max-w-2xl text-pretty"
      >
        Send the panel profile, color, and the conditions you need to close. We
        will confirm the trim pieces, flag anything that needs a custom bend,
        and get a material list back to you.
      </Paragraph>
      <Buttons margin="mt-0 mb-0">
        <Button
          href={cta.quote.href}
          size="medium"
          dark
        >
          {cta.quote.label}
        </Button>
        <Button
          href={cta.call.href}
          variant="outline"
          size="medium"
          dark
        >
          {cta.call.label}
        </Button>
      </Buttons>
    </Section>
  )
}
