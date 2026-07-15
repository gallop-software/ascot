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
import { SectionHeading } from '@/components/section-heading'
import { address, contact } from '@/config'

interface ContactMethod {
  icon: { body: string; width?: number; height?: number }
  label: string
  lines: string[]
  linkLabel: string
  href: string
  /** Opens in a new tab — only the off-site map link does. */
  newTab?: boolean
  note: string
}

const METHODS: ContactMethod[] = [
  {
    icon: mapPinIcon,
    label: 'Plant and Will-Call',
    lines: [
      address.street,
      `${address.city}, ${address.region} ${address.postalCode}`,
    ],
    linkLabel: 'Open in Google Maps',
    href: contact.mapHref,
    newTab: true,
    note: 'Order pickup and the sales counter are at the same entrance.',
  },
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
]

/**
 * Local card for one contact method. Not exported — per Canon rule 025 a content
 * component that only serves this block stays in the block.
 */
function MethodCard({ method }: { method: ContactMethod }) {
  return (
    <div className="group relative flex h-full flex-col rounded-none border border-accent3-dark bg-body-light p-6 transition-colors duration-200 hover:border-accent4 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent-dark">
      <Icon
        icon={method.icon}
        className="mb-4 h-6 w-6 text-accent-dark"
      />

      <Heading
        as="h3"
        fontSize="text-xl"
        fontWeight="font-bold"
        letterSpacing="tracking-tight"
        color="text-contrast"
        margin="mb-3"
      >
        {method.label}
      </Heading>

      <div className="mb-4 flex flex-col gap-y-1">
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
        margin="mb-5"
        className="flex-1"
      >
        {method.note}
      </Paragraph>

      <NextLink
        href={method.href}
        {...(method.newTab && { target: '_blank', rel: 'noopener' })}
        className="no-underline! before:absolute before:inset-0 focus:outline-none"
      >
        <Span
          fontSize="text-sm"
          fontWeight="font-semibold"
          color="text-accent-dark"
        >
          {method.linkLabel}
        </Span>
      </NextLink>
    </div>
  )
}

/** Address, phone, and email for /contact. */
export default function Details() {
  return (
    <Section className="bg-body py-20 md:py-28">
      <SectionHeading
        eyebrow="Reach Us"
        heading="Three Ways to Get an Answer"
        intro="Pick whichever suits the question — pricing, a material takeoff, a trim detail, or a delivery date."
        className="mb-12 max-w-3xl md:mb-16"
      />

      <Grid
        cols="grid-cols-1 md:grid-cols-3"
        gap="gap-6 lg:gap-8"
      >
        {METHODS.map((method) => (
          <MethodCard
            key={method.label}
            method={method}
          />
        ))}
      </Grid>
    </Section>
  )
}
