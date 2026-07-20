import { Container } from '@/components/container'
import { Image } from '@/components/image'
import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import { Buttons } from '@/components/buttons'
import { Button } from '@/components/button'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { cta } from '@/config'
import phoneIcon from '@iconify/icons-lucide/phone'

/** Index hero for the buildings overview. */
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-body2">
      <Image
        src="/placeholder.png"
        alt="Erected steel building frame with roof and wall panels being installed"
        size="full"
        rounded="rounded-none"
        lazy={false}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-body2 via-body2/92 to-body2/60" />

      <Container className="relative pt-40 pb-20 md:pt-40 md:pb-28 lg:pt-68 lg:pb-36">
        <Breadcrumbs
          className="mb-8"
          items={[
            { label: 'Home', href: '/' },
            { label: 'Buildings' },
          ]}
        />

        <div className="max-w-3xl border-l-2 border-accent pl-6 sm:pl-8">
          <Heading
            as="h2"
            margin="mb-4"
          >
            Buildings
          </Heading>

          <Heading
            as="h1"
            color="text-contrast"
            margin="mb-6"
            className="text-balance"
          >
            From Individual Components to Complete Steel Packages
          </Heading>

          <Paragraph
            variant="large"
            color="text-contrast-light"
            margin="mb-8"
            className="max-w-2xl text-pretty"
          >
            Panels, trim, structural framing, fasteners, and accessories
            coordinated into one package — sized to the building you are
            actually putting up, with a takeoff you can hand to a crew.
          </Paragraph>

          <Buttons margin="mt-0 mb-0">
            <Button
              href={cta.quote.href}
              size="medium"
              className="w-full sm:w-auto"
            >
              {cta.quote.label}
            </Button>
            <Button
              href={cta.call.href}
              variant="outline"
              size="medium"
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
