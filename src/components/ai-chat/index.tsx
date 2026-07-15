'use client'

import { Transition, Popover } from '@headlessui/react'
import { Fragment, useRef, useState, useEffect } from 'react'
import { DateTime } from 'luxon'
import { Icon } from '@/components/icon'
import xMarkIcon from '@iconify/icons-heroicons/x-mark'
import arrowUpIcon from '@iconify/icons-heroicons/arrow-up'
import plusIcon from '@iconify/icons-heroicons/plus'
import queueListIcon from '@iconify/icons-heroicons/queue-list'
import trashIcon from '@iconify/icons-heroicons/trash'
import { state, useSnapshot } from '@/state'
import { useChat } from '@/hooks/use-chat'
import AiButton from '@/components/ai-chat/ai-button'
import { ChatThread } from '@/components/ai-chat/chat-message'
import type { StoredChat } from '@/components/ai-chat/chat-storage'
import {
  loadStoredChats,
  persistChats,
  loadActiveChatId,
  persistActiveChatId,
  newChatId,
  deriveChatTitle,
  upsertChat,
} from '@/components/ai-chat/chat-storage'

// Locks page scrolling while the AI sidebar is open by pinning the body. The
// scroll position is captured and restored so opening/closing the panel does
// not jump the page.
function ScrollLock({ enabled }: { enabled: boolean }) {
  useEffect(() => {
    if (!enabled) return
    const scrollY = window.scrollY
    const { body } = document
    const prev = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
    }
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.width = '100%'
    body.style.overflow = 'hidden'
    return () => {
      body.style.position = prev.position
      body.style.top = prev.top
      body.style.width = prev.width
      body.style.overflow = prev.overflow
      window.scrollTo(0, scrollY)
    }
  }, [enabled])
  return null
}

export default function AiChat() {
  const searchRef = useRef<HTMLTextAreaElement | null>(null)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  // Lets other parts of the site (e.g. a mobile menu "Ask AI" item) open
  // this panel by flipping the global `aiSearchOpen` flag.
  const aiButtonRef = useRef<HTMLButtonElement | null>(null)
  const snap = useSnapshot(state)

  // Cap on how tall the auto-growing input may get before it scrolls (px).
  const MAX_INPUT_HEIGHT = 160

  // Grow the textarea to fit its content (up to the cap), shrinking back as
  // text is removed.
  const resizeInput = (el: HTMLTextAreaElement) => {
    el.style.height = 'auto'
    const cs = getComputedStyle(el)
    const borderY =
      parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth)
    el.style.height = `${Math.min(el.scrollHeight + borderY, MAX_INPUT_HEIGHT)}px`
  }

  const {
    messages,
    input,
    status,
    submitMessage,
    handleInputChange,
    reset,
    loadChat,
    getResponseId,
  } = useChat({
    api: '/api/assistant',
  })

  const [chats, setChats] = useState<StoredChat[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [view, setView] = useState<'chat' | 'history'>('chat')

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange(e)
    resizeInput(e.target)
  }

  // Submit the question and snap the thread back to the newest turn.
  const handleSubmit = (e?: React.FormEvent, overrideText?: string) => {
    submitMessage(e, overrideText)
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Pre-written prompts shown beneath the splash text to get visitors started.
  const SAMPLE_QUESTIONS = [
    'What is the difference between a PBR and an AG panel?',
    'Which panel profiles do you carry for metal roofing?',
    'What accessories do I need for a steel building?',
  ]

  // Enter sends; Shift+Enter inserts a newline (so multi-line prompts work).
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  // The textarea value is controlled, so a programmatic clear won't fire
  // onChange — collapse it back to one row here once the input empties.
  useEffect(() => {
    if (input === '' && searchRef.current) {
      searchRef.current.style.height = 'auto'
    }
  }, [input])

  // Hydrate saved chats from local storage on mount, restoring the last active
  // conversation if there was one.
  useEffect(() => {
    const stored = loadStoredChats()
    setChats(stored)
    const lastActive = loadActiveChatId()
    const chat = stored.find((c) => c.id === lastActive)
    if (chat) {
      setActiveId(chat.id)
      loadChat(chat.messages, chat.responseId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Persist the active conversation once a turn settles. Gating on
  // `in_progress` avoids re-serializing every saved chat on each streamed
  // token; the final answer is written when status returns to awaiting_message.
  useEffect(() => {
    if (messages.length === 0 || status === 'in_progress') return
    let id = activeId
    if (!id) {
      id = newChatId()
      setActiveId(id)
      persistActiveChatId(id)
    }
    const chat: StoredChat = {
      id,
      title: deriveChatTitle(messages),
      messages: [...messages],
      responseId: getResponseId(),
      updatedAt: DateTime.now().toMillis(),
    }
    setChats((prev) => {
      const next = upsertChat(prev, chat)
      persistChats(next)
      return next
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, status])

  // Open the panel when another component requests it, then clear the flag.
  useEffect(() => {
    if (snap.aiSearchOpen) {
      aiButtonRef.current?.click()
      state.aiSearchOpen = false
    }
  }, [snap.aiSearchOpen])

  const handleNewChat = () => {
    reset()
    setActiveId(null)
    persistActiveChatId(null)
    setView('chat')
    searchRef.current?.focus()
  }

  const handleSelectChat = (chat: StoredChat) => {
    loadChat(chat.messages, chat.responseId)
    setActiveId(chat.id)
    persistActiveChatId(chat.id)
    setView('chat')
  }

  const handleDeleteChat = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    setChats((prev) => {
      const next = prev.filter((c) => c.id !== id)
      persistChats(next)
      return next
    })
    if (id === activeId) {
      reset()
      setActiveId(null)
      persistActiveChatId(null)
    }
  }

  return (
    <Popover>
      {({ open }) => (
        <>
          <ScrollLock enabled={open} />
          <AiButton ref={aiButtonRef} />
          <Transition
            appear={true}
            unmount={false}
            show={open}
            as={Fragment}
          >
            <Popover.Panel
              unmount={false}
              as="div"
              className="relative z-50"
            >
              {({ close }) => (
                <>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    unmount={false}
                  >
                    <div
                      onClick={() => {
                        close()
                      }}
                      className="fixed inset-0 bg-overlay/30 transition-opacity"
                    />
                  </Transition.Child>

                  <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-in-out duration-500"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500"
                    leaveFrom="-translate-x-0"
                    leaveTo="translate-x-full"
                    unmount={false}
                    afterEnter={() => {
                      if (searchRef.current !== null) {
                        searchRef.current.focus()
                      }
                    }}
                  >
                    <div className="fixed inset-0 left-auto right-0 h-screen min-h-screen w-full max-w-[86%] font-body text-base text-contrast sm:max-w-[50%] lg:max-w-[40%]">
                      <div className="flex h-full justify-end">
                        <div
                          ref={scrollRef}
                          className="scrollbar-hide pointer-events-auto h-full w-full overflow-hidden overflow-y-auto bg-body text-left align-middle shadow-xl transition-all"
                        >
                          <div className="relative flex h-full flex-col items-center justify-start py-6">
                            <div className="w-full px-4 md:px-8">
                              <div className="flex w-full items-start justify-end">
                                <div className="ml-3 flex h-7 items-center">
                                  <button
                                    type="button"
                                    className="-mx-2.5 cursor-pointer rounded-full bg-body p-1.5 text-contrast hover:bg-body-dark focus:outline-none focus:ring-0"
                                    onClick={() => {
                                      close()
                                    }}
                                  >
                                    <span className="sr-only">Close panel</span>
                                    <Icon
                                      className="h-6 w-6"
                                      icon={xMarkIcon}
                                    />
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="mt-6 flex w-full flex-col gap-3 pb-20">
                              <div className="flex w-full items-center justify-between px-4 md:px-8">
                                <p className="font-heading text-xl font-bold text-accent">
                                  AI Chat
                                </p>
                                <div className="flex items-center gap-4">
                                  <button
                                    type="button"
                                    title="New chat"
                                    onClick={handleNewChat}
                                    className="inline-flex cursor-pointer items-center gap-x-2 rounded-md p-2 text-base font-normal text-contrast hover:bg-body-light focus:outline-none md:px-3"
                                  >
                                    <Icon
                                      className="h-5 w-5"
                                      icon={plusIcon}
                                    />
                                    <span className="hidden md:inline">
                                      New Chat
                                    </span>
                                  </button>
                                  <button
                                    type="button"
                                    title="Chat history"
                                    onClick={() => setView('history')}
                                    className={
                                      view === 'history'
                                        ? 'inline-flex cursor-pointer items-center gap-x-2 rounded-md bg-body-light p-2 text-base font-normal text-contrast hover:bg-body-light focus:outline-none md:px-3'
                                        : 'inline-flex cursor-pointer items-center gap-x-2 rounded-md p-2 text-base font-normal text-contrast hover:bg-body-light focus:outline-none md:px-3'
                                    }
                                  >
                                    <Icon
                                      className="h-5 w-5"
                                      icon={queueListIcon}
                                    />
                                    <span className="hidden md:inline">
                                      History
                                    </span>
                                  </button>
                                </div>
                              </div>
                              {view === 'history' ? (
                                <div className="relative flex w-full flex-col gap-1 px-4 py-4 md:px-8">
                                  {chats.length === 0 ? (
                                    <p className="text-base text-contrast-light">
                                      No saved chats yet.
                                    </p>
                                  ) : (
                                    chats.map((chat) => (
                                      <div
                                        key={chat.id}
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => handleSelectChat(chat)}
                                        onKeyDown={(e) => {
                                          // Ignore keys from the nested delete
                                          // button.
                                          if (e.target !== e.currentTarget)
                                            return
                                          if (
                                            e.key === 'Enter' ||
                                            e.key === ' '
                                          ) {
                                            e.preventDefault()
                                            handleSelectChat(chat)
                                          }
                                        }}
                                        className={
                                          'group flex cursor-pointer items-center justify-between gap-2 rounded-md p-2 hover:bg-body-light focus:bg-body-light focus:outline-none ' +
                                          (chat.id === activeId
                                            ? 'bg-body-light'
                                            : '')
                                        }
                                      >
                                        <div className="min-w-0 pl-1.5">
                                          <p className="truncate text-base text-contrast">
                                            {chat.title}
                                          </p>
                                          <p className="text-xs text-contrast-light">
                                            {DateTime.fromMillis(
                                              chat.updatedAt
                                            ).toLocaleString(
                                              DateTime.DATETIME_MED
                                            )}
                                          </p>
                                        </div>
                                        <button
                                          type="button"
                                          title="Delete chat"
                                          onClick={(e) =>
                                            handleDeleteChat(e, chat.id)
                                          }
                                          className="flex-shrink-0 cursor-pointer rounded-full p-1.5 text-contrast hover:bg-body-dark focus:outline-none focus:ring-0"
                                        >
                                          <span className="sr-only">
                                            Delete chat
                                          </span>
                                          <Icon
                                            className="h-5 w-5"
                                            icon={trashIcon}
                                          />
                                        </button>
                                      </div>
                                    ))
                                  )}
                                </div>
                              ) : (
                                <>
                                  <div className="sticky top-0 z-10 -mt-3 w-full bg-body px-4 pt-6 md:px-8">
                                    <form
                                      className="relative flex items-start"
                                      onSubmit={handleSubmit}
                                    >
                                      <textarea
                                        ref={searchRef}
                                        value={input}
                                        onChange={handleTextareaChange}
                                        onKeyDown={handleKeyDown}
                                        onFocus={(e) => e.target.select()}
                                        rows={1}
                                        placeholder="Ask ForgeSpan A.I."
                                        className="scrollbar-hide box-border block w-full resize-none appearance-none rounded-lg bg-body py-4 pl-4 pr-12 text-base leading-6 text-contrast outline outline-2 -outline-offset-1 outline-accent2/25 placeholder:text-contrast/50 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-accent2/80 focus:ring-0"
                                      />
                                      <button
                                        type="submit"
                                        disabled={!input.trim()}
                                        className="absolute bottom-2.5 right-2.5 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-accent2 text-accent2-contrast transition-colors hover:bg-accent4-light focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-40"
                                      >
                                        <span className="sr-only">Send</span>
                                        <Icon
                                          className="h-5 w-5"
                                          icon={arrowUpIcon}
                                        />
                                      </button>
                                    </form>
                                  </div>
                                  {messages.length > 0 ? (
                                    <div className="relative block w-full">
                                      <div className="whitespace-pre-wrap px-4 py-4 md:px-8">
                                        <ChatThread
                                          messages={messages}
                                          status={status}
                                        />
                                      </div>
                                    </div>
                                  ) : (
                                    !input && (
                                      <div className="relative block w-full">
                                        <div className="flex flex-col justify-center whitespace-pre-wrap px-4 py-4 md:px-8">
                                          <p className="mb-7 text-base text-contrast">
                                            Use this A.I. tool to ask about
                                            metal roofing panels, panel
                                            profiles, steel building supplies,
                                            accessories, and how to spec out
                                            your project with ForgeSpan Metals.
                                          </p>
                                          <div className="mt-8 flex flex-col gap-3">
                                            {SAMPLE_QUESTIONS.map((q) => (
                                              <button
                                                key={q}
                                                type="button"
                                                onClick={() =>
                                                  handleSubmit(undefined, q)
                                                }
                                                className="cursor-pointer rounded-md border-2 border-accent2 bg-transparent px-4 py-2 text-center text-accent2 shadow-sm hover:bg-body-light focus:outline-none focus:ring-0"
                                              >
                                                {q}
                                              </button>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Transition.Child>
                </>
              )}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}
