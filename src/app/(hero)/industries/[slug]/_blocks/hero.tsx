import type { Industry } from '@/catalog'
import { Container } from '@/components/container'
import { Image } from '@/components/image'
import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import { Span } from '@/components/span'
import { Buttons } from '@/components/buttons'
import { Button } from '@/components/button'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { cta } from '@/config'
import phoneIcon from '@iconify/icons-lucide/phone'

/** Hero for a single industry, driven entirely by the catalog entry. */
export default function Hero({ industry }: { industry: Industry }) {
  return (
    <section className="relative overflow-hidden bg-accent2">
      <Image
        src={industry.image.src}
        alt={industry.image.alt}
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
          items={[
            { label: 'Home', href: '/' },
            { label: 'Industries', href: '/industries' },
            { label: industry.name },
          ]}
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
            Industries We Serve
          </Span>

          <Heading
            as="h1"
            color="text-overlay-text"
            margin="mb-6"
            className="text-balance"
          >
            {industry.name}
          </Heading>

          <Paragraph
            variant="large"
            color="text-accent3"
            margin="mb-8"
            className="max-w-2xl text-pretty"
          >
            {industry.body}
          </Paragraph>

          <Buttons margin="mt-0 mb-0">
            <Button
              href={cta.quote.href}
              size="medium"
              dark
              className="w-full sm:w-auto"
            >
              {cta.quote.label}
            </Button>
            <Button
              href={cta.call.href}
              variant="outline"
              size="medium"
              dark
              native
              icon={phoneIcon}
              iconPlacement="before"
              className="w-full sm:w-auto"
            >
              {cta.call.label}
            </Button>
          </Buttons>
        </div>
      </Container>
    </section>
  )
}
