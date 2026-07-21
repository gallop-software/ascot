'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { useState, type ReactElement } from 'react'
import { Icon } from '@/components/icon'
import { Button } from '@/components/button'
import chevronDownIcon from '@iconify/icons-heroicons/chevron-down-20-solid'
import { links, contactItems, quoteLink } from './config'
import type { NavLink, ContactItem } from './types'

/**
 * Returns the route portion of an href (drops any #hash).
 */
function routeOf(href: string): string {
  return href.split('#')[0] || '/'
}

function isHrefActive(
  href: string | undefined,
  pathname: string,
  exact = false
): boolean {
  if (!href) return false
  if (href === '/') return pathname === '/'
  if (href.includes('#')) return false
  const route = routeOf(href)
  return exact ? pathname === route : pathname.startsWith(route)
}

const rowClass =
  'py-3.5 font-body text-base font-medium tracking-wide transition-colors duration-200 focus:outline-none focus:ring-0'

/**
 * A collapsible group in the mobile menu, where the parent label toggles a list of
 * indented child links (no left rail).
 */
function MobileGroup({
  item,
  pathname,
  close,
}: {
  item: NavLink
  pathname: string
  close: () => void
}): ReactElement {
  const children = item.children ?? []
  const groupActive = children.some((child) =>
    isHrefActive(child.href, pathname, true)
  )
  const [open, setOpen] = useState(groupActive)

  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className={clsx(
          rowClass,
          'flex items-center justify-between',
          groupActive ? 'text-accent' : 'text-contrast hover:text-accent-light'
        )}
      >
        {item.label}
        <Icon
          icon={chevronDownIcon}
          className={clsx(
            'h-5 w-5 transition-transform duration-200',
            open && 'rotate-180'
          )}
        />
      </button>

      {open && (
        <div className="flex flex-col pl-4">
          {children.map((child) => (
            <Link
              key={child.href}
              href={child.href ?? '#'}
              onClick={close}
              className={clsx(
                'py-2.5 font-body text-sm font-medium tracking-wide transition-colors duration-200 focus:outline-none focus:ring-0',
                isHrefActive(child.href, pathname, true)
                  ? 'text-accent'
                  : 'text-contrast/80 hover:text-contrast'
              )}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

/**
 * Mobile navigation contents: stacked links and expandable groups, a red
 * quote CTA and the business contact details. Rendered inside the slide-in
 * dialog panel.
 */
export function MobileNav({ close }: { close: () => void }): ReactElement {
  const pathname = usePathname()

  return (
    <div className="mb-64 flex flex-col px-6 py-6">
      <nav className="flex flex-col">
        {links.map((item: NavLink) => {
          if (item.children && item.children.length > 0) {
            return (
              <MobileGroup
                key={item.label}
                item={item}
                pathname={pathname}
                close={close}
              />
            )
          }

          return (
            <Link
              key={item.label}
              href={item.href ?? '#'}
              onClick={close}
              className={clsx(
                rowClass,
                isHrefActive(item.href, pathname)
                  ? 'text-accent'
                  : 'text-contrast hover:text-accent-light'
              )}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>

      <Button
        href={quoteLink}
        size="medium"
        className="mt-6 w-full"
        onClick={close}
      >
        Request a Quote
      </Button>

      <div className="mt-8 flex flex-col gap-7">
        {contactItems.map((item: ContactItem) => (
          <a
            key={item.title}
            href={item.href}
            {...(item.external && {
              target: '_blank',
              rel: 'noopener noreferrer',
            })}
            className="ft-tracking group flex items-center gap-3 text-contrast transition-colors duration-200 focus:outline-none focus:ring-0"
          >
            <span className="flex size-10 flex-none items-center justify-center rounded-full text-accent ring-1 ring-body-dark transition-colors duration-200 group-hover:bg-accent group-hover:text-accent-contrast group-hover:ring-accent">
              <Icon
                icon={item.icon}
                className="h-5 w-5"
              />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-body text-sm font-medium tracking-wide">
                {item.title}
              </span>
              <span className="text-xs font-normal text-contrast-light">
                {item.value}
              </span>
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}
