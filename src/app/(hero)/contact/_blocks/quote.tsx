import { Section } from '@/components/section'
import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import { Buttons } from '@/components/buttons'
import { Button } from '@/components/button'
import { cta } from '@/config'

/**
 * Closing call to action. Points at the single quote form on /#quote so there
 * is exactly one quote form on the site. Matches the dark CTA band used to
 * close every other page.
 */
export default function Quote() {
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
        Send Us the Project Details
      </Heading>
      <Paragraph
        variant="large"
        color="text-accent3"
        margin="mb-8"
        className="max-w-2xl text-pretty"
      >
        Our quote form is the quickest route to a priced material list. The more
        detail you send, the fewer rounds it takes to get it right.
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
