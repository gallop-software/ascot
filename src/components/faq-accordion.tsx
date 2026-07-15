'use client'

import { useState } from 'react'
import { clsx } from 'clsx'
import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import { Icon } from '@/components/icon'
import chevronDownIcon from '@iconify/icons-heroicons/chevron-down-20-solid'

interface FaqItem {
  q: string
  a: string
}

/**
 * Expandable FAQ list — each question is a chevron toggle that reveals its
 * answer. Client component so it can hold open/closed state; fed by server
 * FAQ blocks.
 */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="flex flex-col border-t border-body-dark/60">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        return (
          <div
            key={item.q}
            className="border-b border-body-dark/60"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left focus:outline-none focus:ring-0"
            >
              <Heading
                as="h3"
                fontSize="text-lg"
                margin="mb-0"
                className="normal-case"
              >
                {item.q}
              </Heading>
              <Icon
                icon={chevronDownIcon}
                className={clsx(
                  'h-5 w-5 flex-none text-accent transition-transform duration-200',
                  isOpen && 'rotate-180'
                )}
              />
            </button>
            <div
              className={clsx(
                'grid transition-all duration-200 ease-out',
                isOpen
                  ? 'grid-rows-[1fr] opacity-100'
                  : 'grid-rows-[0fr] opacity-0'
              )}
            >
              <div className="overflow-hidden">
                <Paragraph
                  color="text-contrast-light"
                  margin="mb-0"
                  className="pb-5"
                >
                  {item.a}
                </Paragraph>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
