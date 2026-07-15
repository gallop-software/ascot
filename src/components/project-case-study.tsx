import type { ReactNode } from 'react'
import { Container } from '@/components/container'
import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import { Buttons } from '@/components/buttons'
import { Button } from '@/components/button'
import phoneIcon from '@iconify/icons-lucide/phone'
import { contact, cta } from '@/config'

interface ProjectCaseStudyProps {
  /** Plain project title */
  title: string
  /** The written case-study body (image + paragraphs) */
  children: ReactNode
}

/**
 * Full-page layout for a project case study. Mirrors the site's section
 * structure (bg-body2 header + body, shared CTA) so individual project pages
 * stay consistent with the /projects archive and the rest of the site.
 */
export function ProjectCaseStudy({ title, children }: ProjectCaseStudyProps) {
  return (
    <>
      <section className="relative bg-body2 pt-40 pb-20 md:pt-52 md:pb-28 lg:pt-64">
        <Container maxWidth="max-w-2xl">
          <Heading as="h2">Our Work</Heading>
          <Heading
            as="h1"
            color="text-contrast"
            margin="mb-8"
          >
            {title}
          </Heading>
          {children}
        </Container>
      </section>

      <section className="relative overflow-hidden bg-accent2-dark">
        <div className="absolute inset-0 bg-pattern-cross opacity-[0.06]" />
        <div className="absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-accent/15 blur-3xl" />
        <Container className="relative py-16 md:py-20">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <Heading
                as="h2"
                color="text-accent-contrast"
                margin="mb-4"
                fontSize="text-4xl"
              >
                Let&apos;s Talk About Your Project
              </Heading>
              <Paragraph
                color="text-accent4"
                variant="large"
                margin="mb-0"
              >
                Send us your measurements, plans, or material list — we&apos;ll
                help you choose the right products, coordinate colors and trim,
                and prepare a clear quote.
              </Paragraph>
            </div>
            <Buttons
              margin="mt-0 mb-0"
              className="w-full shrink-0 sm:w-auto"
            >
              <Button
                href={cta.quote.href}
                size="medium"
                className="ft-tracking w-full sm:w-auto"
              >
                {cta.quote.label}
              </Button>
              <Button
                href={contact.phoneHref}
                variant="outline"
                size="medium"
                dark={true}
                native={true}
                icon={phoneIcon}
                iconPlacement="before"
                className="ft-tracking w-full sm:w-auto"
              >
                {cta.call.label}
              </Button>
            </Buttons>
          </div>
        </Container>
      </section>
    </>
  )
}
