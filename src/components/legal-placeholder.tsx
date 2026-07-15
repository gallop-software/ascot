import { Section } from '@/components/section'
import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import { Span } from '@/components/span'
import { List, Li } from '@/components/list'
import { Icon } from '@/components/icon'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { contact, company } from '@/config'
import alertIcon from '@iconify/icons-lucide/alert-triangle'

interface LegalPlaceholderProps {
  title: string
  /** What this document must cover once real content is supplied. */
  covers: string[]
}

/**
 * Placeholder scaffold for a legal page.
 *
 * The footer links to Privacy Policy, Terms, and Accessibility, so these routes
 * must resolve. Their content is deliberately NOT written: privacy, terms, and
 * accessibility statements are legal commitments specific to each business and
 * jurisdiction, and generated text would be a liability, not a starting point.
 *
 * Each page states plainly that it is unwritten and lists what the real
 * document needs to cover. Replace with reviewed copy before launch.
 */
export function LegalPlaceholder({ title, covers }: LegalPlaceholderProps) {
  return (
    <Section className="py-20 md:py-28">
      <Breadcrumbs
        items={[{ label: 'Home', href: '/' }, { label: title }]}
        className="mb-8"
      />

      <Heading
        as="h1"
        margin="mb-8"
      >
        {title}
      </Heading>

      <div className="max-w-3xl border-l-4 border-accent bg-accent3-light p-6 md:p-8">
        <div className="mb-4 flex items-center gap-3">
          <Icon
            icon={alertIcon}
            className="h-5 w-5 flex-none text-accent-dark"
          />
          <Span
            color="text-contrast"
            fontWeight="font-semibold"
            fontSize="text-sm"
            className="font-heading2 tracking-[0.16em] uppercase"
          >
            Placeholder — replace before launch
          </Span>
        </div>

        <Paragraph margin="mb-4">
          This page has no content yet. {company.name} is fictional demo content
          in a website template, and this document is intentionally left unwritten
          — a {title.toLowerCase()} is a legal commitment specific to your
          business and jurisdiction, and boilerplate would not be safe to publish.
        </Paragraph>

        <Paragraph
          margin="mb-4"
          fontWeight="font-medium"
        >
          A reviewed {title.toLowerCase()} should cover:
        </Paragraph>

        <List
          variant="bulleted"
          margin="mb-4"
          gap="gap-y-2"
        >
          {covers.map((item) => (
            <Li
              key={item}
              className="text-contrast-light"
            >
              {item}
            </Li>
          ))}
        </List>

        <Paragraph margin="mb-0">
          Questions in the meantime can go to{' '}
          <a
            href={contact.emailHref}
            className="text-accent-dark hover:underline"
          >
            {contact.email}
          </a>
          .
        </Paragraph>
      </div>
    </Section>
  )
}
