import { clsx } from 'clsx'
import type { CompanyStat } from '@/config'
import { Span } from '@/components/span'

export interface StatisticsStripProps {
  stats: CompanyStat[]
  /** Render for placement on a dark (accent2 / navy) surface. */
  dark?: boolean
  className?: string
}

/**
 * Bordered industrial strip of key figures. Data-driven from `stats` /
 * `extendedStats` in `@/config` — never hardcode the numbers at the call site.
 *
 * Uses a shared outer border plus dividers so the strip reads as one machined
 * plate rather than a row of floating cards.
 */
export function StatisticsStrip({
  stats,
  dark = false,
  className,
}: StatisticsStripProps) {
  if (stats.length === 0) return null

  return (
    <dl
      className={clsx(
        'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
        'rounded-none border divide-y sm:divide-y-0',
        '[&>*:not(:first-child)]:sm:border-l',
        dark
          ? 'border-accent4-dark divide-accent4-dark [&>*]:sm:border-accent4-dark'
          : 'border-accent3-dark divide-accent3-dark [&>*]:sm:border-accent3-dark',
        className
      )}
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col gap-y-2 px-6 py-8"
        >
          <dt className="order-2">
            <Span
              fontFamily="font-heading2"
              fontSize="text-sm"
              fontWeight="font-medium"
              color={dark ? 'text-accent3' : 'text-contrast-light'}
              className="uppercase tracking-[0.14em]"
            >
              {stat.label}
            </Span>
          </dt>
          <dd className="order-1">
            <Span
              fontFamily="font-heading"
              fontSize="text-4xl"
              fontWeight="font-bold"
              color={dark ? 'text-overlay-text' : 'text-contrast'}
              className="tracking-tight"
            >
              {stat.value}
            </Span>
          </dd>
        </div>
      ))}
    </dl>
  )
}
