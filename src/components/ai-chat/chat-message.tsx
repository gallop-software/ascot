'use client'

import { clsx } from 'clsx'
import { parse } from 'marked'
import type { ChatMessage, ChatStatus } from '@/hooks/use-chat'

// `marked` puts a single newline between block-level tags (e.g. between
// </li> and <li>). The thread is rendered inside a `whitespace-pre-wrap`
// container, which would turn each of those newlines into a visible blank
// line, the "weird spacing" around lists. Collapse single newlines (keeping
// intentional double newlines as one) so only the CSS margins create spacing.
function compressContent(content: string): string {
  return content
    .replace(/(\r\n|\r)/gm, '')
    .replace(/\n\n/gm, '__DOUBLE_NEWLINE__')
    .replace(/\n/g, '')
    .replace(/__DOUBLE_NEWLINE__/g, '\n')
}

export function cleanCitation(text: string) {
  if (!text || text.length === 0) return ''
  return (
    String(text)
      // file_search citations: visible "filecite…turn" text wrapped in
      // invisible delimiters U+E200 … U+E201.
      .replace(/\s*\uE200[\s\S]*?\uE201/g, '')
      // Fallback: strip any stray private-use citation delimiter.
      .replace(/[\uE000-\uF8FF]/g, '')
      // Legacy 【…】 style citations.
      .replace(/【[^】]*】/g, '')
  )
}

// While streaming, a trailing markdown link or HTML <a> anchor that hasn't
// closed yet would render its raw source and then collapse once it closes, causing a
// visible flicker. Hide the still-forming tail until it closes. Only applied to
// the in-progress message, so a completed answer keeps any literal "[text]" it
// may end with.
function hideFormingLink(text: string): string {
  let cut = text.length

  // Forming markdown link: trailing "[label", "[label]", or "[label](dest".
  const b = text.lastIndexOf('[')
  if (b !== -1) {
    const tail = text.slice(b)
    if (
      /^\[[^\]]*$/.test(tail) ||
      /^\[[^\]]*\]$/.test(tail) ||
      /^\[[^\]]*\]\([^)]*$/.test(tail)
    ) {
      cut = Math.min(cut, b)
    }
  }

  // Forming HTML anchor: the last "<a…" with no "</a>" yet, or a bare trailing
  // "<" that might begin one.
  const aMatches = [...text.matchAll(/<a\b/gi)]
  const a = aMatches.length ? (aMatches[aMatches.length - 1]?.index ?? -1) : -1
  if (a !== -1 && !/<\/a>/i.test(text.slice(a))) {
    cut = Math.min(cut, a)
  } else if (text.endsWith('<')) {
    cut = Math.min(cut, text.length - 1)
  }

  return cut < text.length ? text.slice(0, cut) : text
}

// Renders the full back-and-forth conversation, newest turn first, with each
// question kept above its answer.
export function ChatThread({
  messages,
  status,
}: {
  messages: ChatMessage[]
  status: ChatStatus
}) {
  // Group the flat message list into question/answer turns.
  const turns: { user: ChatMessage; assistant: ChatMessage | null }[] = []
  for (const message of messages) {
    if (message.role === 'user') {
      turns.push({ user: message, assistant: null })
    } else {
      const last = turns[turns.length - 1]
      if (last) last.assistant = message
    }
  }

  return (
    <div className="flex flex-col gap-7 text-contrast">
      {[...turns].reverse().map((turn, i) => {
        const waiting = !turn.assistant && status === 'in_progress'
        // The newest turn (index 0 after reverse) is the one still streaming.
        const streaming =
          i === 0 && status === 'in_progress' && !!turn.assistant

        let aiHtml = ''
        if (turn.assistant) {
          let content = String(turn.assistant.content)
          if (streaming) content = hideFormingLink(content)
          aiHtml = compressContent(String(parse(cleanCitation(content))))
        }

        return (
          <div
            key={turn.user.id}
            className="flex flex-col gap-2"
          >
            <p className="text-xl font-medium text-accent">
              {turn.user.content}
            </p>
            {waiting ? (
              <p className="thinking-dots h-[30px] text-contrast" />
            ) : (
              <div
                className={clsx(
                  '[&>*]:mb-7',
                  '[&_a]:text-accent [&_a]:underline',
                  '[&>h2]:mt-7 [&>h2]:text-3xl [&>h2]:font-medium',
                  '[&>h3]:mt-7 [&>h3]:text-2xl [&>h3]:font-medium',
                  '[&>h4]:mt-7 [&>h4]:text-xl [&>h4]:font-medium',
                  '[&_ul]:ml-9 [&_ul]:list-disc',
                  '[&_ol]:ml-9 [&_ol]:list-decimal',
                  '[&_strong]:font-medium',
                  '[&>*:last-child]:mb-0'
                )}
                dangerouslySetInnerHTML={{
                  __html: aiHtml,
                }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
