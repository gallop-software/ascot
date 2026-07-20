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
    <section className="relative overflow-hidden bg-body2">
      <Image
        src="/placeholder.png"
        alt="Stacked metal roofing panels and steel coil stock on the ForgeSpan Metals manufacturing floor"
        size="full"
        rounded="rounded-none"
        lazy={false}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-body2 via-body2/92 to-body2/60" />

      <Container className="relative pt-40 pb-20 md:pt-40 md:pb-28 lg:pt-68 lg:pb-36">
        <div className="max-w-3xl">
          <Heading
            as="h1"
            color="text-contrast"
            margin="mb-6"
            className="text-balance"
          >
            Steel Components Manufactured for the Way You Build
          </Heading>

          <Paragraph
            variant="large"
            color="text-contrast-light"
            margin="mb-8"
            className="text-pretty"
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
                className="text-accent"
              >
                <Span
                  color="text-contrast-light"
                  fontSize="text-base"
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
