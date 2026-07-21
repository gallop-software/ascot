'use client'

import type { ChatMessage } from '@/hooks/use-chat'

// A saved conversation. `responseId` is the OpenAI server-side context pointer
// so a restored chat can continue with full context.
export type StoredChat = {
  id: string
  title: string
  messages: ChatMessage[]
  responseId: string | null
  updatedAt: number
}

const CHATS_KEY = 'frontier-ai-chats'
const ACTIVE_KEY = 'frontier-ai-active-chat'

// Cap on how many conversations are kept in local storage. When exceeded,
// the oldest chats (by updatedAt) are dropped first.
export const MAX_SAVED_CHATS = 20

export function loadStoredChats(): StoredChat[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(CHATS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    // Drop malformed entries so a corrupt value can't crash callers that
    // iterate `messages` (e.g. loadChat re-id mapping).
    return parsed.filter(
      (c) => c && typeof c.id === 'string' && Array.isArray(c.messages)
    )
  } catch {
    return []
  }
}

export function persistChats(chats: StoredChat[]) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(CHATS_KEY, JSON.stringify(chats))
  } catch {
    // localStorage can throw (private mode / quota), so fail silently.
  }
}

export function loadActiveChatId(): string | null {
  if (typeof window === 'undefined') return null
  try {
    return window.localStorage.getItem(ACTIVE_KEY)
  } catch {
    return null
  }
}

export function persistActiveChatId(id: string | null) {
  if (typeof window === 'undefined') return
  try {
    if (id) window.localStorage.setItem(ACTIVE_KEY, id)
    else window.localStorage.removeItem(ACTIVE_KEY)
  } catch {
    // no-op
  }
}

export function newChatId(): string {
  if (
    typeof crypto !== 'undefined' &&
    typeof crypto.randomUUID === 'function'
  ) {
    return crypto.randomUUID()
  }
  return `chat-${Date.now()}-${Math.round(Math.random() * 1e9)}`
}

// Derive a readable list label from the first question in the conversation.
export function deriveChatTitle(messages: ChatMessage[]): string {
  const firstUser = messages.find((m) => m.role === 'user')
  const text = (firstUser?.content || 'New chat').trim()
  return text.length > 48 ? `${text.slice(0, 48)}…` : text
}

// Insert or update a chat, keeping the list ordered most-recent first and
// capped at MAX_SAVED_CHATS (oldest dropped once the cap is exceeded).
export function upsertChat(
  chats: StoredChat[],
  chat: StoredChat
): StoredChat[] {
  const without = chats.filter((c) => c.id !== chat.id)
  return [chat, ...without]
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .slice(0, MAX_SAVED_CHATS)
}
