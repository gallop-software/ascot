import type { ReactNode } from 'react'
import { clsx } from 'clsx'
import arrowRight from '@iconify/icons-lucide/arrow-right'
import { Icon } from '@/components/icon'
import { Span } from '@/components/span'

export interface ArrowLinkProps {
  children: ReactNode
  /** Text color token. Defaults to the Safety Orange link color. */
  color?: string
  className?: string
}

/**
 * The standard "label + arrow" call-to-action affordance used inside cards.
 * Presentational only — the enclosing card usually supplies the real link via
 * a stretched overlay, so this renders inline text rather than an anchor.
 */
export function ArrowLink({
  children,
  color = 'text-accent-dark',
  className,
}: ArrowLinkProps) {
  return (
    <Span
      fontSize="text-sm"
      fontWeight="font-semibold"
      color={color}
      className={clsx('inline-flex items-center gap-x-2', className)}
    >
      {children}
      <Icon
        icon={arrowRight}
        className="h-4 w-4"
      />
    </Span>
  )
}
