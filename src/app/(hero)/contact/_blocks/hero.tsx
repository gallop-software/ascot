import { Container } from '@/components/container'
import { Image } from '@/components/image'
import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import { Span } from '@/components/span'
import { List, Li } from '@/components/list'
import { Buttons } from '@/components/buttons'
import { Button } from '@/components/button'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { cta, contact, serviceArea } from '@/config'
import phoneIcon from '@iconify/icons-lucide/phone'
import checkIcon from '@iconify/icons-lucide/check'

/** Page hero for /contact. */
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-body2">
      <Image
        src="/image-3.jpg"
        alt="Entrance to the Frontier Metals manufacturing plant and will-call yard"
        size="full"
        rounded="rounded-none"
        lazy={false}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-body2/95 via-body2/80 to-body2/45" />

      <Container className="relative pt-40 pb-20 md:pt-40 md:pb-28 lg:pt-68 lg:pb-36">
        <Breadcrumbs
          className="mb-8"
          items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
        />

        <div className="max-w-3xl">
          <Heading
            as="h2"
            margin="mb-4"
          >
            Contact
          </Heading>

          <Heading
            as="h1"
            color="text-contrast"
            margin="mb-6"
            className="text-balance"
          >
            Talk With Someone Who Knows the Product
          </Heading>

          <Paragraph
            variant="large"
            color="text-contrast-light"
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

          <div className="mt-10">
            <Heading
              as="h2"
              color="text-contrast"
              margin="mb-4"
            >
              Where We Deliver
            </Heading>
            <List
              variant="unstyled"
              margin="mb-0"
              className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2"
            >
              {serviceArea.areas.map((area) => (
                <Li
                  key={area}
                  icon={checkIcon}
                  iconSize="w-5 h-5"
                  className="text-accent"
                >
                  <Span
                    fontSize="text-base"
                    fontWeight="font-medium"
                    color="text-contrast-light"
                  >
                    {area}
                  </Span>
                </Li>
              ))}
            </List>
          </div>
        </div>
      </Container>
    </section>
  )
}
