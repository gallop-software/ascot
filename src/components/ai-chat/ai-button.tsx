'use client'

import { forwardRef } from 'react'
import { Popover } from '@headlessui/react'
import { Icon } from '@/components/icon'
import sparkleIcon from '@iconify/icons-mdi/auto-awesome'

// Floating AI chat trigger: a white circular button with a gradient-filled
// sparkle, anchored bottom-right (mirrors the dougnewby.com style). Must be
// rendered inside a <Popover> since it is the Popover.Button; the ref lets the
// panel be opened programmatically.
const AiButton = forwardRef<HTMLButtonElement>((_props, ref) => {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center">
      {/* Gradient the sparkle icon is filled with (referenced by id below).
          SVG fills can't be a CSS gradient, so it's defined here once and the
          icon paths point at it via url(#id). */}
      <svg
        width="0"
        height="0"
        className="absolute"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="ai-sparkle-gradient"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="#60a5fa"
            />
            <stop
              offset="100%"
              stopColor="#a855f7"
            />
          </linearGradient>
        </defs>
      </svg>
      <Popover.Button
        ref={ref}
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-body shadow-[0_0_15px_rgba(0,0,0,0.2)] transition-colors hover:bg-body-light focus:outline-none focus:ring-0"
      >
        <span className="sr-only">Open AI chat</span>
        <Icon
          className="h-7 w-7 [&_path]:fill-[url(#ai-sparkle-gradient)]"
          icon={sparkleIcon}
        />
      </Popover.Button>
    </div>
  )
})

AiButton.displayName = 'AiButton'

export default AiButton
