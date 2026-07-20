import { Container } from '@/components/container'
import { Logo } from '@/components/logo'
import Link from 'next/link'
import { Icon } from '@/components/icon'
import { Paragraph } from '@/components/paragraph'
import { Heading } from '@/components/heading'
import { Span } from '@/components/span'
import { List, Li } from '@/components/list'
import { DateTime } from 'luxon'
import mapMarkerIcon from '@iconify/icons-mdi/map-marker'
import phoneIcon from '@iconify/icons-mdi/phone'
import emailOutlineIcon from '@iconify/icons-mdi/email-outline'
import clockIcon from '@iconify/icons-mdi/clock-outline'
import {
  socialLinks,
  productLinks,
  buildingLinks,
  legalLinks,
  contact,
  hours,
  description,
  copyrightName,
} from './config'
import type { FooterLink, SocialLink } from './config'

const linkStyles =
  'text-base font-normal text-contrast-light hover:text-accent transition-colors duration-200'

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <Heading
      as="h4"
      color="text-contrast"
      fontSize="text-base"
      margin="mb-6"
      className="relative pb-3 tracking-[0.14em] uppercase after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-10 after:bg-accent"
    >
      {children}
    </Heading>
  )
}

function LinkColumn({ items }: { items: FooterLink[] }) {
  return (
    <List
      variant="unstyled"
      margin="mb-0"
      gap="gap-y-3"
    >
      {items.map((link: FooterLink) => (
        <Li key={`${link.label}-${link.href}`}>
          <Link
            href={link.href}
            className={linkStyles}
          >
            {link.label}
          </Link>
        </Li>
      ))}
    </List>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-body-dark bg-body-light [&_a]:no-underline!">
      <Container className="pt-20 pb-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <Logo
              className="mb-6 text-contrast"
              height={38}
            />
            <Paragraph
              color="text-contrast-light"
              fontSize="text-base"
              className="max-w-sm"
            >
              {description}
            </Paragraph>
            {socialLinks.length > 0 && (
              <div className="flex gap-2">
                {socialLinks.map((item: SocialLink) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                    className="flex size-10 items-center justify-center bg-body-dark text-contrast transition-colors duration-200 hover:bg-accent hover:text-accent-contrast"
                  >
                    <Icon
                      icon={item.icon}
                      className="h-5 w-5"
                    />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Nav — 2x2: Explore / Company in one column, Contact / Hours in
              the next (column-wise fill); stacks to a single column on phones. */}
          <div className="grid grid-cols-1 gap-12 sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-2 sm:gap-16 lg:col-span-2">
            <div>
              <FooterHeading>Explore</FooterHeading>
              <LinkColumn items={productLinks} />
            </div>

            <div>
              <FooterHeading>Company</FooterHeading>
              <LinkColumn items={buildingLinks} />
            </div>

            <div>
              <FooterHeading>Contact</FooterHeading>
              <List
                variant="unstyled"
                margin="mb-0"
                gap="gap-y-4"
              >
                <Li
                  icon={mapMarkerIcon}
                  className="text-contrast-light"
                >
                  <a
                    href={contact.addressHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${linkStyles} whitespace-pre-line`}
                  >
                    {contact.address}
                  </a>
                </Li>
                <Li
                  icon={phoneIcon}
                  className="text-contrast-light"
                >
                  <a
                    href={contact.phoneHref}
                    className={linkStyles}
                  >
                    {contact.phone}
                  </a>
                </Li>
                <Li
                  icon={emailOutlineIcon}
                  className="text-contrast-light"
                >
                  <a
                    href={contact.emailHref}
                    className={linkStyles}
                  >
                    {contact.email}
                  </a>
                </Li>
              </List>
            </div>

            <div id="hours">
              <FooterHeading>Hours</FooterHeading>
              <List
                variant="unstyled"
                margin="mb-0"
                gap="gap-y-2"
              >
                {hours.map((h) => (
                  <Li
                    key={h.days}
                    icon={clockIcon}
                    className="text-base font-normal text-contrast-light"
                  >
                    <Span
                      color="text-contrast"
                      fontWeight="font-medium"
                      fontSize="text-base"
                    >
                      {h.days}:
                    </Span>{' '}
                    {h.time}
                  </Li>
                ))}
              </List>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-body-dark pt-6 lg:flex-row lg:items-center lg:justify-between">
          <Paragraph
            fontSize="text-sm"
            color="text-contrast-light"
            textAlign="text-center"
            margin="mb-0"
            className="lg:text-left"
          >
            &copy; {DateTime.now().year} {copyrightName}. All rights reserved.
          </Paragraph>

          <List
            variant="unstyled"
            margin="mb-0"
            gap="gap-x-6 gap-y-2"
            className="flex flex-wrap justify-center lg:justify-end"
          >
            {legalLinks.map((link) => (
              <Li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-normal text-contrast-light transition-colors duration-200 hover:text-accent"
                >
                  {link.label}
                </Link>
              </Li>
            ))}
          </List>

          <Paragraph
            fontSize="text-sm"
            color="text-contrast-light"
            textAlign="text-center"
            margin="mb-0"
            className="lg:text-right"
          >
            Website development by{' '}
            <a
              href="https://webplant.media"
              target="_blank"
              rel="noopener noreferrer"
              className="text-contrast-light! hover:underline!"
            >
              webplant.media
            </a>
          </Paragraph>
        </div>
      </Container>
    </footer>
  )
}
