import { useEffect, useRef, useState } from "react"
import axios from "axios"

import { HeroTitle } from "./hero-title"
import { PromptBubble } from "./prompt-bubble"
import { PromptComposer } from "./prompt-composer"

type ConversationEntry =
  | { id: string; type: "prompt"; content: string }
  | { id: string; type: "response"; content: string }

const CONTAINER_CLASS = "mx-auto w-full max-w-[75rem] px-20"

export function HeroSection() {
  const [entries, setEntries] = useState<ConversationEntry[]>([])
  const [isWorking, setIsWorking] = useState(false)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const createEntry = (type: ConversationEntry["type"], content: string): ConversationEntry => ({
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    type,
    content,
  })

  const handlePromptSubmit = async (value: string) => {
    setEntries((prev) => [...prev, createEntry("prompt", value)])
    setIsWorking(true)

    try {
      // Send message to backend
      await axios.post('http://localhost:8000/api/messages', {
        message: value
      })

      // Get all messages from backend
      const response = await axios.get('http://localhost:8000/api/messages')
      const messagesText = response.data.messages.join('\n')

      setIsWorking(false)
      setEntries((prev) => [...prev, createEntry("response", messagesText)])
    } catch (error) {
      setIsWorking(false)
      setEntries((prev) => [...prev, createEntry("response", "Error connecting to backend: " + error)])
    }
  }

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const lastEntry = entries[entries.length - 1]
    if (!lastEntry) return

    if (lastEntry.type === "response") {
      const responseElements = container.querySelectorAll<HTMLElement>('[data-entry="response"]')
      const lastResponse = responseElements[responseElements.length - 1]

      if (lastResponse) {
        lastResponse.scrollIntoView({ behavior: "smooth", block: "start" })
      } else {
        container.scrollTo({ top: 0, behavior: "smooth" })
      }
      return
    }

    container.scrollTo({ top: container.scrollHeight, behavior: "smooth" })
  }, [entries])

  const hasConversationStarted = entries.length > 0

  if (!hasConversationStarted) {
    return (
      <div className="flex w-full flex-1 items-center">
        <div className={`${CONTAINER_CLASS} space-y-10 text-center`}>
          <HeroTitle />
          <PromptComposer isShifted={false} onSubmit={handlePromptSubmit} />
        </div>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-1 flex-col">
      <div className={`${CONTAINER_CLASS} flex flex-1`}>
        <div
          ref={scrollRef}
          className="flex w-full flex-1 flex-col gap-6 overflow-y-auto pb-56 pt-10"
        >
          {entries.map((entry) =>
            entry.type === "prompt" ? (
              <PromptBubble key={entry.id} text={entry.content} />
            ) : (
              <div
                key={entry.id}
                data-entry="response"
                className="w-full whitespace-pre-line text-left text-base leading-7 text-foreground"
              >
                {entry.content}
              </div>
            )
          )}
          {isWorking && (
            <div className="flex justify-start">
              <div className="flex items-center gap-3 rounded-full bg-muted/50 px-5 py-3 text-sm text-muted-foreground">
                <svg
                  className="h-5 w-5 animate-spin text-muted-foreground"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Frosty is working
              </div>
            </div>
          )}
        </div>
      </div>

      <PromptComposer isShifted onSubmit={handlePromptSubmit} />
    </div>
  )
}
