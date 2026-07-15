import { Section } from '@/components/section'
import { Heading } from '@/components/heading'
import { Icon } from '@/components/icon'
import { List, Li } from '@/components/list'
import { Paragraph } from '@/components/paragraph'
import { Span } from '@/components/span'
import { SectionHeading } from '@/components/section-heading'
import { contact } from '@/config'
import { InlineLink } from '@/components/inline-link'
import alertIcon from '@iconify/icons-lucide/alert-triangle'

/**
 * Warranty information — an explicit, unfilled placeholder.
 *
 * Warranty terms are a legal commitment that varies by product, finish,
 * substrate, and customer agreement. This template deliberately states no terms
 * rather than inventing plausible ones. The section must be replaced with the
 * customer's real, reviewed warranty language before launch. The nav links here
 * (/resources#warranty), so the section stays — visibly unfilled — until then.
 */
const TO_CONFIGURE = [
  'Panel and finish warranty terms, including duration and what is covered',
  'Substrate and coating coverage, stated separately where they differ',
  'Conditions, exclusions, and any transferability rules',
  'The claim process and what documentation a claim requires',
]

export default function Warranty() {
  return (
    <Section
      id="warranty"
      className="scroll-mt-32 bg-body py-20 md:py-28"
    >
      <SectionHeading
        eyebrow="Warranty"
        heading="Warranty Information"
        className="mb-8 max-w-3xl"
      />

      <div className="max-w-3xl border-l-2 border-accent bg-accent3-light/40 p-6 md:p-8">
        <div className="mb-4 flex items-center gap-x-3">
          <Icon
            icon={alertIcon}
            className="h-5 w-5 flex-none text-accent-dark"
          />
          <Span
            fontFamily="font-heading2"
            fontSize="text-sm"
            fontWeight="font-semibold"
            color="text-accent-dark"
            className="uppercase tracking-[0.16em]"
          >
            Placeholder — Replace Before Launch
          </Span>
        </div>

        <Paragraph
          color="text-contrast"
          margin="mb-4"
          className="text-pretty"
        >
          This template ships with no warranty terms. Warranty coverage is
          configured per customer and per product line, so no duration, coverage,
          or condition is stated here — anything shown would be fiction, and a
          warranty is not something to guess at.
        </Paragraph>

        <Paragraph
          color="text-contrast-light"
          margin="mb-6"
          className="text-pretty"
        >
          Whoever launches this site is responsible for replacing this section
          with reviewed warranty language for the products actually sold. Until
          then, treat any warranty question as one to answer directly.
        </Paragraph>

        <Heading
          as="h3"
          fontSize="text-lg"
          fontWeight="font-bold"
          color="text-contrast"
          margin="mb-4"
        >
          What this section needs to contain
        </Heading>

        <List
          variant="bulleted"
          margin="mb-6"
          gap="gap-y-2"
        >
          {TO_CONFIGURE.map((item) => (
            <Li key={item}>
              <Span
                fontSize="text-base"
                color="text-contrast-light"
              >
                {item}
              </Span>
            </Li>
          ))}
        </List>

        <Paragraph
          fontSize="text-base"
          color="text-contrast"
          margin="mb-0"
        >
          For warranty terms on a specific order, contact us at{' '}
          <InlineLink href={contact.emailHref}>{contact.email}</InlineLink> or
          call <InlineLink href={contact.phoneHref}>{contact.phone}</InlineLink>.
        </Paragraph>
      </div>
    </Section>
  )
}
