import AiChat from '@/components/ai-chat'

// Global floating AI chat button, anchored bottom-right on every page.
// Positioning/z-index live on the button itself (inside AiChat) so the always
// visible button can sit below other floating clusters while the AI panel it
// opens still layers above them.
export default function FloatingAiChat() {
  return <AiChat />
}
