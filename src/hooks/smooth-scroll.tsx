'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { state } from '@/state'

// Height (px) of the sticky/fixed nav bar to keep clear when scrolling to an
// anchor. Full <section> blocks carry their own top padding, so they land flush
// at their top; bare anchor targets (e.g. the color-chart promo div) get this
// offset so their heading isn't hidden under the header.
const NAV_OFFSET = 90

const SmoothScroll = () => {
  const pathname = usePathname()

  useEffect(() => {
    const smoothScroll = (target: Element, hash: string) => {
      state.scrollingDirection = 'down'
      state.lockScrollDirection = true

      // Unlock direction tracking once the smooth scroll finishes.
      window.addEventListener(
        'scrollend',
        () => {
          state.lockScrollDirection = false
        },
        { once: true }
      )

      const scrollOffset =
        target.tagName.toLowerCase() === 'section' ? 0 : NAV_OFFSET

      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - scrollOffset,
        behavior: 'smooth',
      })

      history.pushState(null, '', hash)
    }

    // One delegated, capture-phase listener handles every in-page anchor,
    // navbar, footer, and in-content links alike, including Next <Link> hash
    // links that sit outside <main>/<header>. Capture runs before Next's own
    // click handler, so preventDefault stops its (offset-less) scroll.
    const handleClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return

      const anchor = (event.target as Element | null)?.closest?.(
        'a[href]'
      ) as HTMLAnchorElement | null
      if (!anchor || anchor.classList.contains('no-anchor-scroll')) return

      // Links inside the mobile menu (a scroll-locking Headless UI Dialog) are
      // left to native navigation: the menu closes on click and the browser
      // jumps to the hash. Manually scrolling while the dialog releases its
      // scroll lock causes a visible jump on phones, so don't.
      if (anchor.closest('[role="dialog"]')) return

      const hash = anchor.hash
      if (!hash || hash === '#') return

      // Only handle same-page anchors. A "/#section" link clicked from another
      // route has a different pathname, so it falls through to normal Next
      // navigation (load the home page first, then scroll).
      if (anchor.pathname !== window.location.pathname) return

      let target: Element | null = null
      try {
        target = document.querySelector(hash)
      } catch {
        return
      }
      if (!target) return

      event.preventDefault()
      smoothScroll(target, hash)
    }

    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [pathname])

  return null
}

export default SmoothScroll
