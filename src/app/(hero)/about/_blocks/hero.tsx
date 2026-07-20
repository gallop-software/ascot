import { Container } from '@/components/container'
import { Image } from '@/components/image'
import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import { Buttons } from '@/components/buttons'
import { Button } from '@/components/button'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { company, cta, contact } from '@/config'
import phoneIcon from '@iconify/icons-lucide/phone'

/** Page hero for /about. */
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-body2">
      <Image
        src="/placeholder.png"
        alt="Roll-forming line running finished metal roofing panels inside the ForgeSpan Metals plant"
        size="full"
        rounded="rounded-none"
        lazy={false}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-body2 via-body2/92 to-body2/60" />

      <Container className="relative pt-40 pb-20 md:pt-40 md:pb-28 lg:pt-68 lg:pb-36">
        <Breadcrumbs
          className="mb-8"
          items={[{ label: 'Home', href: '/' }, { label: 'About' }]}
        />

        <div className="max-w-3xl border-l-2 border-accent pl-6 sm:pl-8">
          <Heading
            as="h2"
            margin="mb-4"
          >
            About {company.shortName}
          </Heading>

          <Heading
            as="h1"
            color="text-contrast"
            margin="mb-6"
            className="text-balance"
          >
            Manufacturing Steel Products Since {company.founded}
          </Heading>

          <Paragraph
            variant="large"
            color="text-contrast-light"
            margin="mb-8"
            className="text-pretty"
          >
            {company.description}
          </Paragraph>

          <Buttons margin="mt-0 mb-0">
            <Button
              href={cta.quote.href}
              size="medium"
              className="max-sm:w-full"
            >
              {cta.quote.label}
            </Button>
            <Button
              href={contact.phoneHref}
              variant="outline"
              size="medium"
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
