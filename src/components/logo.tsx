import clsx from 'clsx'

interface LogoProps {
  className?: string
  /** Rendered height of the mark in px. The wordmark scales alongside it. */
  height?: number
  /** @deprecated Retained for call-site compatibility; the mark is fixed-ratio. */
  width?: number
  /** Renders for dark surfaces (navigation, footer): light wordmark. */
  dark?: boolean
  /** Mark plus wordmark, or the standalone mark. */
  variant?: 'full' | 'mark'
  /**
   * One-color rendering — every part inherits `currentColor`, including the
   * accent ridge. Use on the footer and mobile navigation.
   */
  monochrome?: boolean
}

/**
 * ForgeSpan Metals logo.
 *
 * A placeholder brand mark for the template: a simplified roofline built from
 * two overlapping panel planes. Replace this component with the customer's
 * finished logo — every call site renders through it.
 *
 * Inline SVG rather than a raster asset so the mark inherits color tokens and
 * needs no separate light/dark files.
 */
export function Logo({
  className = '',
  height = 34,
  dark = false,
  variant = 'full',
  monochrome = false,
}: LogoProps) {
  const bodyColor = monochrome
    ? 'text-current'
    : dark
      ? 'text-accent2-contrast'
      : 'text-contrast'

  const mark = (
    <svg
      viewBox="0 0 44 32"
      aria-hidden="true"
      focusable="false"
      style={{ height, width: (height * 44) / 32 }}
      className="flex-none"
    >
      {/* Upper panel plane rising to a ridge */}
      <path
        d="M22 2 L43 15 L43 22 L22 9 L1 22 L1 15 Z"
        fill="currentColor"
      />
      {/* Lower plane, offset so the two read as stacked panels */}
      <path
        d="M22 14 L43 27 L43 31 L22 18 L1 31 L1 27 Z"
        fill="currentColor"
        opacity={0.45}
      />
      {/* Ridge cap — the single accent detail */}
      <path
        d="M22 1 L26.5 4 L22 7 L17.5 4 Z"
        className={monochrome ? 'text-current' : 'text-accent'}
        fill="currentColor"
      />
    </svg>
  )

  if (variant === 'mark') {
    return (
      <span className={clsx('inline-flex', bodyColor, className)}>
        <span className="sr-only">ForgeSpan Metals</span>
        {mark}
      </span>
    )
  }

  return (
    <span
      className={clsx('inline-flex items-center gap-3', bodyColor, className)}
      role="img"
      aria-label="ForgeSpan Metals"
    >
      {mark}
      <span
        aria-hidden="true"
        className="font-heading leading-[1.05] font-bold uppercase"
        style={{ fontSize: height * 0.44 }}
      >
        <span className="block tracking-tight">ForgeSpan</span>
        <span
          className={clsx(
            'block font-medium tracking-[0.34em]',
            monochrome ? 'text-current' : 'text-accent'
          )}
          style={{ fontSize: height * 0.23 }}
        >
          Metals
        </span>
      </span>
    </span>
  )
}
