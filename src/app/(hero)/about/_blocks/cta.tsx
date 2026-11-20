import { Section } from '@/components/section'
import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import { Buttons } from '@/components/buttons'
import { Button } from '@/components/button'
import { cta } from '@/config'

/** Closing call to action for /about. */
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
        Tell Us What You Are Building
      </Heading>
      <Paragraph
        variant="large"
        color="text-accent3"
        margin="mb-8"
        className="max-w-2xl text-pretty"
      >
        Send dimensions, drawings, or a rough sketch. We will review the scope,
        flag anything that looks unclear, and put together a material list you
        can build from.
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
          href="/contact"
          variant="outline"
          size="medium"
          dark
        >
          Contact Us
        </Button>
      </Buttons>
    </Section>
  )
}
