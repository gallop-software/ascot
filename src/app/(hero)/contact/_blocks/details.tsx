import NextLink from 'next/link'
import mapPinIcon from '@iconify/icons-lucide/map-pin'
import phoneIcon from '@iconify/icons-lucide/phone'
import mailIcon from '@iconify/icons-lucide/mail'
import { Section } from '@/components/section'
import { Grid } from '@/components/grid'
import { Heading } from '@/components/heading'
import { Icon } from '@/components/icon'
import { Paragraph } from '@/components/paragraph'
import { Span } from '@/components/span'
import { address, contact } from '@/config'

interface ContactMethod {
  icon: { body: string; width?: number; height?: number }
  label: string
  lines: string[]
  linkLabel: string
  href: string
  /** Opens in a new tab. Only the off-site map link does. */
  newTab?: boolean
  note: string
}

const METHODS: ContactMethod[] = [
  {
    icon: phoneIcon,
    label: 'Phone',
    lines: [contact.phone],
    linkLabel: `Call ${contact.phone}`,
    href: contact.phoneHref,
    note: 'Fastest way to reach the sales desk during business hours.',
  },
  {
    icon: mailIcon,
    label: 'Email',
    lines: [contact.email],
    linkLabel: `Email ${contact.email}`,
    href: contact.emailHref,
    note: 'Send drawings, dimensions, or an existing material list.',
  },
  {
    icon: mapPinIcon,
    label: 'Visit Us',
    lines: [
      address.street,
      `${address.city}, ${address.region} ${address.postalCode}`,
    ],
    linkLabel: 'Open in Google Maps',
    href: contact.mapHref,
    newTab: true,
    note: 'Order pickup and the sales counter are at the same entrance.',
  },
]

/**
 * Local row for one contact method. Not exported, because per Canon rule 025 a content
 * component that only serves this block stays in the block. Borderless: a large
 * accent icon with the details beside it, the whole row linked via the stretched
 * overlay on the action link.
 */
function MethodRow({ method }: { method: ContactMethod }) {
  return (
    <div className="group relative flex gap-x-5 border border-accent3-dark bg-body-light p-6 transition-shadow duration-200 hover:shadow-lg has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent-dark">
      <Icon
        icon={method.icon}
        className="mt-1 h-8 w-8 flex-none text-accent-dark"
      />

      <div className="flex flex-col items-start">
        <Heading
          as="h4"
          margin="mb-2"
        >
          {method.label}
        </Heading>

        <div className="mb-2 flex flex-col gap-y-0.5">
          {method.lines.map((line) => (
            <Span
              key={line}
              fontSize="text-base"
              fontWeight="font-medium"
              color="text-contrast"
            >
              {line}
            </Span>
          ))}
        </div>

        <Paragraph
          fontSize="text-sm"
          color="text-contrast-light"
          margin="mb-0"
        >
          {method.note}
        </Paragraph>
      </div>

      <NextLink
        href={method.href}
        {...(method.newTab && { target: '_blank', rel: 'noopener' })}
        aria-label={method.linkLabel}
        className="absolute inset-0 focus:outline-none"
      >
        <span className="sr-only">{method.linkLabel}</span>
      </NextLink>
    </div>
  )
}

/** Address, phone, and email for /contact. */
export default function Details() {
  return (
    <Section className="bg-body py-20 md:py-28">
      <div className="mb-12 max-w-3xl md:mb-16">
        <Heading as="h2">Reach Us</Heading>
        <Heading as="h3">Three Ways to Get an Answer</Heading>
        <Paragraph
          color="text-contrast-light"
          margin="mb-0"
        >
          Pick whichever suits the question: pricing, a material takeoff, a trim
          detail, or a delivery date.
        </Paragraph>
      </div>

      <Grid
        cols="grid-cols-1 sm:grid-cols-2"
        gap="gap-4 lg:gap-6"
      >
        {METHODS.map((method) => (
          <MethodRow
            key={method.label}
            method={method}
          />
        ))}
      </Grid>
    </Section>
  )
}
