import { Container } from '@/components/container'
import { Image } from '@/components/image'
import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import { Span } from '@/components/span'
import { List, Li } from '@/components/list'
import { Buttons } from '@/components/buttons'
import { Button } from '@/components/button'
import { TRUST_POINTS } from '@/catalog'
import { cta } from '@/config'
import arrowRightIcon from '@iconify/icons-heroicons/arrow-right-20-solid'
import checkIcon from '@iconify/icons-lucide/check'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-accent2">
      <Image
        src="/images/hero/steel-panel-stacks.jpg"
        alt="Stacked metal roofing panels and steel coil stock on the ForgeSpan Metals manufacturing floor"
        size="full"
        rounded="rounded-none"
        lazy={false}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      {/* The photograph behind this is unknown, so the text side of the scrim
          stays near-opaque — that is what guarantees the white headline clears
          AA rather than depending on what the image happens to contain. */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent2/97 via-accent2/90 to-accent2/60" />
      {/* Thin technical rule tying the hero into the statistics strip below. */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-accent4-dark" />

      <Container className="relative pt-32 pb-16 md:pt-40 md:pb-24 lg:pt-52 lg:pb-32">
        <div className="max-w-3xl">
          <div className="mb-5 flex items-center gap-x-3">
            <span
              aria-hidden="true"
              className="h-px w-8 flex-none bg-accent"
            />
            <Span
              fontFamily="font-heading2"
              fontSize="text-sm"
              fontWeight="font-semibold"
              color="text-accent-light"
              className="uppercase tracking-[0.2em]"
            >
              Regional Steel Manufacturing &amp; Building Supply
            </Span>
          </div>

          <Heading
            as="h1"
            fontSize="text-4xl sm:text-5xl lg:text-6xl"
            fontWeight="font-bold"
            lineHeight="leading-tight"
            letterSpacing="tracking-tight"
            color="text-overlay-text"
            margin="mb-6"
          >
            Steel Components Manufactured for the Way You Build
          </Heading>

          <Paragraph
            variant="large"
            color="text-accent3"
            margin="mb-8"
            className="max-w-2xl text-pretty"
          >
            ForgeSpan Metals manufactures metal roofing, wall panels, trim,
            structural components, and complete building packages for
            contractors, agricultural operations, businesses, and property
            owners across the region.
          </Paragraph>

          <Buttons margin="mt-0 mb-10">
            <Button
              href={cta.quote.href}
              size="medium"
              dark
              icon={arrowRightIcon}
              iconPlacement="after"
              className="max-sm:w-full"
            >
              {cta.quote.label}
            </Button>
            <Button
              href={cta.products.href}
              variant="outline"
              size="medium"
              dark
              className="max-sm:w-full"
            >
              {cta.products.label}
            </Button>
          </Buttons>

          <List
            variant="unstyled"
            margin="mb-0"
            className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2"
          >
            {TRUST_POINTS.map((point) => (
              <Li
                key={point}
                icon={checkIcon}
                iconSize="w-5 h-5"
                className="text-accent-light"
              >
                <Span
                  color="text-accent3"
                  fontSize="text-sm"
                  fontWeight="font-medium"
                >
                  {point}
                </Span>
              </Li>
            ))}
          </List>
        </div>
      </Container>
    </section>
  )
}
