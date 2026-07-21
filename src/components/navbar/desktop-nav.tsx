'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState, type ReactElement } from 'react'
import clsx from 'clsx'
import { Icon } from '@/components/icon'
import chevronDownIcon from '@iconify/icons-heroicons/chevron-down-20-solid'
import { links } from './config'
import type { NavLink } from './types'

/**
 * Returns the route portion of an href (drops any #hash).
 */
function routeOf(href: string): string {
  return href.split('#')[0] || '/'
}

/**
 * True when the given href points at the currently viewed page. Hash-only
 * links (e.g. '/#projects') never count as active because they're page sections.
 */
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

/**
 * Base classes shared by top-level nav triggers (links and dropdown parents).
 */
const triggerClass =
  'flex h-full items-center gap-1 border-b-4 px-4 py-5 text-base font-medium tracking-wide transition-colors duration-200 focus:outline-none focus:ring-0'

/**
 * A single top-level dropdown: a trigger (optionally a link to a hub page) plus
 * a panel of child links. Opens on hover; closes on mouse-leave, on clicking a
 * child link, and whenever the route changes (so it never lingers open after
 * navigation).
 */
function NavDropdown({
  item,
  pathname,
}: {
  item: NavLink
  pathname: string
}): ReactElement {
  const children = item.children ?? []
  const [open, setOpen] = useState(false)

  // Close the panel after any navigation (a link was followed).
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const isActive =
    isHrefActive(item.href, pathname) ||
    children.some((child) => isHrefActive(child.href, pathname, true))

  const triggerInner = (
    <>
      {item.label}
      <Icon
        icon={chevronDownIcon}
        className={clsx(
          'h-4 w-4 transition-transform duration-200',
          open && 'rotate-180'
        )}
      />
    </>
  )

  return (
    <div
      className="relative flex items-stretch"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {item.href ? (
        <Link
          href={item.href}
          onClick={() => setOpen(false)}
          className={clsx(
            triggerClass,
            isActive
              ? 'border-accent text-accent-contrast'
              : 'border-transparent text-accent-contrast hover:text-accent-light'
          )}
        >
          {triggerInner}
        </Link>
      ) : (
        <span
          className={clsx(
            triggerClass,
            'cursor-default',
            isActive
              ? 'border-accent text-accent-contrast'
              : 'border-transparent text-accent-contrast hover:text-accent-light'
          )}
        >
          {triggerInner}
        </span>
      )}

      {/* Panel, toggled by the group's hover state. */}
      <div
        className={clsx(
          'absolute left-0 top-full z-50 min-w-[264px] transition-all duration-200',
          open
            ? 'visible translate-y-0 opacity-100'
            : 'invisible translate-y-1 opacity-0'
        )}
      >
        <div className="overflow-hidden rounded-sm bg-body py-2 shadow-xl ring-1 ring-body-dark/40">
          {children.map((child) => (
            <Link
              key={child.href}
              href={child.href ?? '#'}
              onClick={() => setOpen(false)}
              className={clsx(
                'block px-5 py-2.5 text-sm font-medium tracking-wide transition-colors duration-200',
                isHrefActive(child.href, pathname, true)
                  ? 'bg-body2 text-accent'
                  : 'text-contrast hover:bg-body2 hover:text-accent'
              )}
            >
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

/**
 * Desktop navigation: horizontal links on the dark bar. The active item is
 * highlighted in red (ConstX-style); items with children expand on hover.
 */
export function DesktopNav({
  className,
}: {
  className?: string
} = {}): ReactElement {
  const pathname = usePathname()

  return (
    <nav className={clsx('hidden items-stretch lg:flex', className)}>
      {links.map((item: NavLink) => {
        if (item.children && item.children.length > 0) {
          return (
            <NavDropdown
              key={item.label}
              item={item}
              pathname={pathname}
            />
          )
        }

        const isActive = isHrefActive(item.href, pathname)

        return (
          <Link
            key={item.label}
            href={item.href ?? '#'}
            className={clsx(
              triggerClass,
              isActive
                ? 'border-accent text-accent-contrast'
                : 'border-transparent text-accent-contrast hover:text-accent-light'
            )}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
