import { Section } from '@/components/section'
import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import { Buttons } from '@/components/buttons'
import { Button } from '@/components/button'
import { cta } from '@/config'

/** Closing quote CTA for the buildings index. */
export default function Cta() {
  return (
    <Section
      imageSrc="/panels-1.jpg"
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
        Send dimensions, a sketch, or construction drawings and we will work
        through the package with you: panels, trim, framing, and the
        accessories that get missed.
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
