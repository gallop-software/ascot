'use client'

import { useState, useRef, useCallback } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { sendFlowTraceEvent } from '@/hooks/flow-trace'

export type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export type ChatStatus = 'awaiting_message' | 'in_progress'

let counter = 0
const nextId = () => `msg-${++counter}`

/**
 * Minimal chat hook backed by the OpenAI Responses API SSE stream from
 * /api/assistant, with no external dependency, just fetch + a stream reader.
 */
export function useChat({ api }: { api: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [status, setStatus] = useState<ChatStatus>('awaiting_message')
  // Server-side conversation pointer, sent back on each turn for context.
  const previousResponseId = useRef<string | null>(null)
  // Tracks the in-flight request so switching conversations can cancel it and
  // stop its streamed tokens from landing in a different chat.
  const abortRef = useRef<AbortController | null>(null)

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setInput(e.target.value),
    []
  )

  // Reset everything for a brand-new conversation.
  const reset = useCallback(() => {
    abortRef.current?.abort()
    setMessages([])
    setInput('')
    setStatus('awaiting_message')
    previousResponseId.current = null
  }, [])

  // Replace the current state with a previously saved conversation so the
  // server-side context pointer is restored along with the messages.
  const loadChat = useCallback(
    (savedMessages: ChatMessage[], responseId: string | null) => {
      abortRef.current?.abort()
      // Re-id on load: the id counter resets on page reload while stored ids
      // persist, so fresh ids are needed to keep React keys unique.
      setMessages(savedMessages.map((m) => ({ ...m, id: nextId() })))
      setInput('')
      setStatus('awaiting_message')
      previousResponseId.current = responseId
    },
    []
  )

  // Read the current server-side conversation pointer (a ref, so callers grab
  // it at save time rather than depending on a re-render).
  const getResponseId = useCallback(() => previousResponseId.current, [])

  const submitMessage = useCallback(
    async (e?: FormEvent, overrideText?: string) => {
      e?.preventDefault()

      const text = (overrideText ?? input).trim()
      if (!text || status === 'in_progress') return

      const controller = new AbortController()
      abortRef.current = controller

      setInput('')
      setStatus('in_progress')
      setMessages((prev) => [
        ...prev,
        { id: nextId(), role: 'user', content: text },
      ])

      // Notify via FlowTrace that a question was asked (non-blocking).
      sendFlowTraceEvent({
        id: 'ai-chat-question',
        label: 'AI Question',
        innerText: text,
      })

      // The assistant message is added lazily on the first delta so the
      // "..." loading state shows until tokens actually arrive.
      let assistantId: string | null = null
      const appendDelta = (delta: string) => {
        if (assistantId === null) {
          assistantId = nextId()
          const id = assistantId
          setMessages((prev) => [
            ...prev,
            { id, role: 'assistant', content: delta },
          ])
        } else {
          const id = assistantId
          setMessages((prev) =>
            prev.map((m) =>
              m.id === id ? { ...m, content: m.content + delta } : m
            )
          )
        }
      }

      try {
        const res = await fetch(api, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: text,
            previousResponseId: previousResponseId.current,
          }),
          signal: controller.signal,
        })

        if (!res.ok || !res.body) throw new Error('Request failed')

        const reader = res.body.getReader()
        const decoder = new TextDecoder()
        let buffer = ''

        while (true) {
          const { value, done } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })

          // SSE frames are separated by a blank line; keep the trailing
          // partial frame in the buffer for the next read.
          const frames = buffer.split('\n\n')
          buffer = frames.pop() ?? ''

          for (const frame of frames) {
            const dataLine = frame
              .split('\n')
              .find((line) => line.startsWith('data:'))
            if (!dataLine) continue

            const payload = dataLine.slice(5).trim()
            if (!payload) continue

            // Skip a malformed frame rather than aborting the whole stream.
            let evt: {
              type: 'id' | 'delta' | 'done' | 'error'
              text?: string
              responseId?: string
            }
            try {
              evt = JSON.parse(payload)
            } catch {
              continue
            }

            if (evt.type === 'id' || evt.type === 'done') {
              if (evt.responseId) previousResponseId.current = evt.responseId
            } else if (evt.type === 'delta' && evt.text) {
              appendDelta(evt.text)
            } else if (evt.type === 'error') {
              appendDelta('\n\nSorry, something went wrong. Please try again.')
            }
          }
        }
      } catch (err) {
        // The request was cancelled because the user switched/started another
        // chat, so leave state alone so we don't touch the now-active chat.
        if ((err as Error)?.name === 'AbortError') return
        appendDelta('\n\nSorry, something went wrong. Please try again.')
      } finally {
        // Only the most recent request may clear the in-flight state; a
        // superseded (aborted) request must not reset the new chat's status.
        if (abortRef.current === controller) {
          abortRef.current = null
          setStatus('awaiting_message')
        }
      }
    },
    [api, input, status]
  )

  return {
    messages,
    input,
    status,
    handleInputChange,
    submitMessage,
    reset,
    loadChat,
    getResponseId,
  }
}
