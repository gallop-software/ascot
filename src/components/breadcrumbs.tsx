import Link from 'next/link'
import { clsx } from 'clsx'
import chevronRight from '@iconify/icons-lucide/chevron-right'
import { Icon } from '@/components/icon'
import { List, Li } from '@/components/list'
import { Span } from '@/components/span'

export interface BreadcrumbItem {
  label: string
  /** Omit on the final/current item — it is marked aria-current instead. */
  href?: string
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  /** Render for placement on a dark (accent2 / navy) surface. */
  dark?: boolean
  className?: string
}

/**
 * Breadcrumb trail. The last item is always rendered as the current page —
 * unlinked and marked `aria-current="page"` — regardless of whether an href was
 * supplied, since a link to the page you are on is a dead end for keyboard and
 * screen-reader users.
 */
export function Breadcrumbs({ items, dark = false, className }: BreadcrumbsProps) {
  if (items.length === 0) return null

  const mutedColor = dark ? 'text-accent3' : 'text-contrast-light'

  return (
    <nav
      aria-label="Breadcrumb"
      className={className}
    >
      <List
        variant="unstyled"
        spacing="tight"
        margin="mb-0"
        gap="gap-0"
        className="grid-flow-col auto-cols-max items-center"
      >
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1

          return (
            <Li
              key={`${item.label}-${index}`}
              className="flex items-center"
            >
              {index > 0 && (
                <Icon
                  icon={chevronRight}
                  className={clsx('mx-2 h-4 w-4 flex-none', mutedColor)}
                />
              )}

              {isCurrent || !item.href ? (
                <Span
                  fontSize="text-sm"
                  fontWeight={isCurrent ? 'font-semibold' : 'font-normal'}
                  color={
                    isCurrent
                      ? dark
                        ? 'text-overlay-text'
                        : 'text-contrast'
                      : mutedColor
                  }
                  {...(isCurrent && { 'aria-current': 'page' as const })}
                >
                  {item.label}
                </Span>
              ) : (
                <Link
                  href={item.href}
                  className={clsx(
                    'rounded-sm no-underline!',
                    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                    dark
                      ? 'focus-visible:outline-accent-light'
                      : 'focus-visible:outline-accent-dark'
                  )}
                >
                  <Span
                    fontSize="text-sm"
                    color={mutedColor}
                    className={clsx(
                      'transition-colors duration-200',
                      dark ? 'hover:text-overlay-text' : 'hover:text-accent-dark'
                    )}
                  >
                    {item.label}
                  </Span>
                </Link>
              )}
            </Li>
          )
        })}
      </List>
    </nav>
  )
}
