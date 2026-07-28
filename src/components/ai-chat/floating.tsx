'use client'

import { usePathname } from 'next/navigation'
import AiChat from '@/components/ai-chat'

// Global floating AI chat button, anchored bottom-right on every page.
// Positioning/z-index live on the button itself (inside AiChat) so the always
// visible button can sit below other floating clusters while the AI panel it
// opens still layers above them.
//
// The block preview route renders isolated blocks for demo/screenshot use, so
// the chat is omitted there.
export default function FloatingAiChat() {
  const pathname = usePathname()

  if (pathname === '/block' || pathname?.startsWith('/block/')) return null

  return <AiChat />
}
