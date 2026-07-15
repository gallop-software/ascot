'use client'

import Link from 'next/link'
import clsx from 'clsx'
import { useState, type ReactElement } from 'react'
import { useInView } from 'react-intersection-observer'
import { Logo } from '@/components/logo'
import { Icon } from '@/components/icon'
import { Search } from '@/components/search'
import { DesktopNav } from './desktop-nav'
import { MobileNavButton } from './mobile-nav-button'
import type { NavbarProps, ContactItem } from './types'
import { homeLink, quoteLink, quoteLabel, contactItems } from './config'
import { company } from '@/config'
import searchIcon from '@iconify/icons-lucide/search'

/**
 * Main site header:
 * - An angled logo panel + utility strip (location, phone, email, hours) make
 *   up the top row
 * - The Forge Navy nav bar sits outside that row, narrower, and overlaps it
 *   slightly for a layered, industrial look
 *
 * When `hero` is set (hero-layout pages), the whole header floats as an
 * overlay so the hero section sits behind it (and bleeds to the top); a fixed
 * copy of the navy bar slides in once the header scrolls away. On all other
 * pages the header is in normal flow and the navy bar stays `position: sticky`.
 */
export function Navbar({ hero = false }: NavbarProps = {}): ReactElement {
  const [isSearching, setIsSearching] = useState(false)

  // Sentinel sits just below the in-flow bar; once it scrolls out of view the
  // hero layout's fixed copy of the bar slides in.
  const { ref: sentinelRef, inView: navAtTop } = useInView({
    initialInView: true,
  })

  // Dark charcoal nav bar contents — reused by the in-flow/overlay bar and (in
  // hero layout) by the fixed bar that slides in on scroll.
  const barInner = (
    <div className="flex items-stretch rounded-sm bg-accent2 shadow-xl">
      <DesktopNav className="pl-6" />

      <div className="ml-auto flex items-stretch">
        <button
          type="button"
          aria-label="Search"
          onClick={() => setIsSearching(true)}
          className="flex cursor-pointer items-center px-5 text-accent-contrast transition-colors duration-200 hover:text-accent focus:outline-none focus:ring-0"
        >
          <Icon
            icon={searchIcon}
            className="h-6 w-6"
          />
        </button>
        <Link
          href={quoteLink}
          className="flex items-center rounded-r-sm bg-accent-dark px-8 font-body text-base font-medium tracking-wide text-accent-contrast transition-colors duration-200 hover:bg-accent"
        >
          {quoteLabel}
        </Link>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile bar */}
      <div
        className={clsx(
          'z-50 flex items-center justify-between bg-body px-6 py-4 shadow-md lg:hidden',
          hero ? 'fixed inset-x-0 top-0' : 'sticky top-0'
        )}
      >
        <Link
          href={homeLink}
          title={company.name}
          className="block outline-none focus:outline-none"
        >
          <Logo height={40} />
        </Link>
        <div className="flex items-center">
          <button
            type="button"
            aria-label="Search"
            onClick={() => setIsSearching(true)}
            className="cursor-pointer p-3 text-accent transition-colors duration-200 hover:text-accent-dark focus:outline-none"
          >
            <Icon
              icon={searchIcon}
              className="h-7 w-7"
            />
          </button>
          <MobileNavButton />
        </div>
      </div>

      {/* Desktop header */}
      <div
        className={clsx(
          'z-40 hidden px-3 lg:block',
          hero ? 'absolute inset-x-0 top-0' : 'relative'
        )}
      >
        {/* Top row — red angled logo panel + white contact strip */}
        <header
          id="navbar"
          className={clsx(
            'mx-auto max-w-[1580px]',
            hero
              ? 'overflow-hidden rounded-b-sm bg-body shadow-xl max-[1369px]:rounded-none'
              : 'bg-body'
          )}
        >
          {/* Inner row constrained to the shared content width so the logo and
              contact content line up with the blue bar / page content. */}
          <div className="px-6 lg:px-8">
            <div className="mx-auto flex max-w-content items-stretch">
              {/* Angled logo panel */}
              <Link
                href={homeLink}
                title={company.name}
                className="relative z-20 -mr-10 flex items-center pt-6 pr-32 pb-9 [clip-path:polygon(0_0,100%_0,82%_100%,0_100%)]"
              >
                <Logo height={52} />
              </Link>

              {/* Contact strip */}
              <div className="flex flex-1 items-center justify-end gap-8 pt-5 pr-0 pb-8 pl-8 xl:gap-12">
                {contactItems.map((item: ContactItem) => (
                  <a
                    key={item.title}
                    href={item.href}
                    {...(item.external && {
                      target: '_blank',
                      rel: 'noopener noreferrer',
                    })}
                    className="ft-tracking group flex items-center gap-3 text-contrast focus:outline-none focus:ring-0"
                  >
                    <span className="flex size-10 flex-none items-center justify-center rounded-full text-accent ring-1 ring-body-dark transition-colors duration-200 group-hover:bg-accent group-hover:text-accent-contrast group-hover:ring-accent">
                      <Icon
                        icon={item.icon}
                        className="h-4 w-4"
                      />
                    </span>
                    <span className="flex flex-col leading-tight">
                      <span className="font-body text-sm font-medium tracking-wide">
                        {item.title}
                      </span>
                      <span className="text-xs font-normal text-contrast-light transition-colors duration-200 group-hover:text-accent">
                        {item.value}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Hero layout: the blue bar overlays the header — being absolute it
            adds no flow, so the hero image bleeds to the very top. A sentinel
            just beneath drives the fixed bar once the header scrolls away. */}
        {hero && (
          <>
            <div className="relative z-40 -mt-3">
              <div className="mx-auto max-w-content">{barInner}</div>
            </div>
            <div
              ref={sentinelRef}
              className="h-px w-full"
            />
          </>
        )}
      </div>

      {/* Non-hero: the bar is a page-level sticky sibling — its parent is the
          page, so it stays stuck for the full scroll. */}
      {!hero && (
        <div className="sticky top-0 z-40 -mt-3 hidden px-3 lg:block">
          <div className="mx-auto max-w-content">{barInner}</div>
        </div>
      )}

      {/* Hero: a fixed copy of the bar slides down once the header is scrolled
          past (the original overlay bar scrolls away with the header). */}
      {hero && (
        <div
          className={clsx(
            'fixed inset-x-0 top-0 z-50 hidden px-3 transition-transform duration-300 lg:block',
            navAtTop ? '-translate-y-full' : 'translate-y-0'
          )}
        >
          <div className="[&>div>div]:rounded-t-none">
            <div className="mx-auto max-w-content">{barInner}</div>
          </div>
        </div>
      )}

      <Search
        isOpen={isSearching}
        setIsOpen={setIsSearching}
      />
    </>
  )
}
