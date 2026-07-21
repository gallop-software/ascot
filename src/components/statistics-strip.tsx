'use client'

import { clsx } from 'clsx'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import type { CompanyStat } from '@/config'
import { Icon } from '@/components/icon'
import { Paragraph } from '@/components/paragraph'
import { Span } from '@/components/span'

export interface StatisticsStripProps {
  stats: CompanyStat[]
  /** Responsive grid-column classes for the figures. */
  cols?: string
  /** Render for placement on a dark (accent2 / navy) surface. */
  dark?: boolean
  className?: string
}

/**
 * Splits a stat value into a leading prefix, an integer target, and a trailing
 * suffix so the number can count up while symbols like "+", "%", or "," survive.
 * For example, "2,500+" → { prefix: '', target: 2500, suffix: '+' }.
 */
function parseStat(value: string): {
  prefix: string
  target: number | null
  suffix: string
} {
  const match = value.match(/^(\D*)([\d,]+)(.*)$/)
  if (!match) return { prefix: '', target: null, suffix: value }
  const prefix = match[1] ?? ''
  const digits = match[2] ?? ''
  const suffix = match[3] ?? ''
  return { prefix, target: Number(digits.replace(/,/g, '')), suffix }
}

/** Counts from 0 to target with an ease-out curve once `start` is true. */
function useCountUp(target: number | null, start: boolean): number {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!start || target === null) return
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setCurrent(target)
      return
    }

    const duration = 1400
    let raf = 0
    let startTime: number | null = null
    const tick = (now: number) => {
      if (startTime === null) startTime = now
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCurrent(Math.round(target * eased))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, start])

  return current
}

function AnimatedValue({
  value,
  start,
  dark,
}: {
  value: string
  start: boolean
  dark: boolean
}) {
  const { prefix, target, suffix } = parseStat(value)
  const count = useCountUp(target, start)
  const display =
    target === null
      ? value
      : `${prefix}${count.toLocaleString('en-US')}${suffix}`

  return (
    <Span
      fontFamily="font-heading"
      fontSize="text-4xl"
      fontWeight="font-bold"
      color={dark ? 'text-overlay-text' : 'text-contrast'}
      className="tabular-nums tracking-tight"
    >
      {display}
    </Span>
  )
}

/**
 * Strip of key figures whose numbers count up when the strip scrolls into
 * view. Data-driven from `stats` / `extendedStats` in `@/config`; never
 * hardcode the numbers at the call site.
 */
export function StatisticsStrip({
  stats,
  cols = 'sm:grid-cols-2 lg:grid-cols-4',
  dark = false,
  className,
}: StatisticsStripProps) {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: '-64px' })

  if (stats.length === 0) return null

  return (
    <dl
      ref={ref}
      className={clsx('grid grid-cols-1 gap-x-8 gap-y-10', cols, className)}
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex items-center gap-4"
        >
          {stat.icon && (
            <span className="flex size-12 flex-none items-center justify-center rounded-full bg-accent text-accent-contrast">
              <Icon
                icon={stat.icon}
                className="h-6 w-6"
              />
            </span>
          )}
          <div className="flex flex-col">
            <dd>
              <AnimatedValue
                value={stat.value}
                start={inView}
                dark={dark}
              />
            </dd>
            <dt>
              <Paragraph
                color={dark ? 'text-accent3' : 'text-contrast-light'}
                margin="mb-0"
              >
                {stat.label}
              </Paragraph>
            </dt>
          </div>
        </div>
      ))}
    </dl>
  )
}
