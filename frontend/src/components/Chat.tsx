import { useSidebar } from './ui/sidebar'
import PromptInput from './PromptInput'
import Message from './Message'
import { useState, useRef, useEffect } from 'react'
import axios from 'axios'

type MessageType = {
  role: "user" | "assistant"
  content: string
}

const Chat = () => {
  const { state, isMobile } = useSidebar()

  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<MessageType[]>([])
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const getLeftPadding = () => {
    if (isMobile) return '1rem' // Default p-4 padding
    return state === 'expanded' ? 'calc(var(--sidebar-width) + 1rem)' : '1rem'
  }

  const handleSend = async () => {
    console.log('sent!!')
    if (!message.trim()) return

    // Add user message
    const userMessage: MessageType = { role: "user", content: message }
    setMessages(prev => [...prev, userMessage])
    setMessage("")

    try {
      const res = await axios.post('http://127.0.0.1:8000/echo', { message });
      console.log("Server reply: ", res.data.reply)

      // Add assistant response
      const assistantMessage: MessageType = { role: "assistant", content: res.data.reply }
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if the key is a printable character (length === 1)
      // and no modifier keys are pressed
      if (
        e.key.length === 1 &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.altKey
      ) {
        // Check if we're not already focused on an input or textarea
        const activeElement = document.activeElement
        if (
          activeElement?.tagName !== 'INPUT' &&
          activeElement?.tagName !== 'TEXTAREA'
        ) {
          // Focus the textarea
          inputRef.current?.focus()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <div className="flex-1 overflow-y-auto pb-32">
        {messages.map((msg, index) => (
          <Message key={index} role={msg.role} content={msg.content} />
        ))}
      </div>
      <div
        className='fixed bottom-0 left-0 right-0 p-4 transition-all duration-200 ease-linear'
        style={{
          paddingLeft: getLeftPadding(),
        }}
      >
        <div className="max-w-4xl mx-auto bg-background rounded-lg">
          <PromptInput
            ref={inputRef}
            message={message}
            onMessageChange={setMessage}
            onSend={handleSend}
            disabled={!message.trim()}
          />
        </div>
      </div>
    </>
  )
}

export default Chat