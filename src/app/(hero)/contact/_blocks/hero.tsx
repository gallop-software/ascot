import { Container } from '@/components/container'
import { Image } from '@/components/image'
import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import { Span } from '@/components/span'
import { Buttons } from '@/components/buttons'
import { Button } from '@/components/button'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { cta, contact } from '@/config'
import phoneIcon from '@iconify/icons-lucide/phone'

/** Page hero for /contact. */
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-accent2">
      <Image
        src="/images/contact/forgespan-plant-entrance.jpg"
        alt="Entrance to the ForgeSpan Metals manufacturing plant and will-call yard"
        size="full"
        rounded="rounded-none"
        lazy={false}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-accent2-dark/95 via-accent2-dark/85 to-accent2-dark/45" />

      <Container className="relative pt-40 pb-20 md:pt-40 md:pb-28 lg:pt-64 lg:pb-36">
        <Breadcrumbs
          dark
          className="mb-8"
          items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
        />

        <div className="max-w-3xl border-l-2 border-accent pl-6 sm:pl-8">
          <Span
            fontFamily="font-heading2"
            fontSize="text-sm"
            fontWeight="font-semibold"
            color="text-accent-light"
            margin="mb-4"
            className="uppercase tracking-[0.2em]"
          >
            Contact
          </Span>

          <Heading
            as="h1"
            color="text-overlay-text"
            margin="mb-6"
            className="text-balance"
          >
            Talk With Someone Who Knows the Product
          </Heading>

          <Paragraph
            variant="large"
            color="text-accent3"
            margin="mb-8"
            className="text-pretty"
          >
            Call the plant, send us drawings, or stop by the counter. Whether you
            need a single trim piece or a full building package, you will reach
            someone who can talk through the details.
          </Paragraph>

          <Buttons margin="mt-0 mb-0">
            <Button
              href={cta.quote.href}
              size="medium"
              dark
              className="max-sm:w-full"
            >
              {cta.quote.label}
            </Button>
            <Button
              href={contact.phoneHref}
              variant="outline"
              size="medium"
              dark
              native
              icon={phoneIcon}
              iconPlacement="before"
              className="max-sm:w-full"
            >
              {cta.call.label}
            </Button>
          </Buttons>
        </div>
      </Container>
    </section>
  )
}
