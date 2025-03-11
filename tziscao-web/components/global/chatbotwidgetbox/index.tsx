'use client'

import { BotMessageSquare, Coffee, Send, X } from 'lucide-react'
import { useState, useRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import ReactMarkdown from 'react-markdown'

export default function ChatbotWidgetBox() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  )
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [currentReply, setCurrentReply] = useState('')
  const readerRef = useRef<ReadableStreamDefaultReader | null>(null)

  const recaptchaRef = useRef<ReCAPTCHA | null>(null)

  const sendMessage = async () => {
    if (!input) return
    setLoading(true)

    // Get reCAPTCHA token
    const token = await recaptchaRef.current?.executeAsync()
    recaptchaRef.current?.reset()

    const newMessages = [...messages, { role: 'user', content: input }]
    setMessages(newMessages)
    setInput('')

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input, token }),
    })

    const reader = response.body?.getReader()
    if (reader) {
      readerRef.current = reader
    }
    setCurrentReply('')

    if (reader) {
      const decoder = new TextDecoder()
      let partialReply = ''

      while (true) {
        const { value, done } = await reader.read()
        if (done) break

        partialReply += decoder.decode(value, { stream: true })
        setCurrentReply(partialReply)
      }

      setMessages([
        ...newMessages,
        { role: 'assistant', content: partialReply },
      ])
    }

    setLoading(false)
  }

  return (
    <div className="fixed right-4 bottom-4 z-20 flex flex-col items-end">
      {/* Chatbot Toggle Button */}
      <button
        className="bg-main hover:bg-brown-700 rounded-full p-3 text-white shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="text-white" />
        ) : (
          <div className="flex space-x-2">
            <BotMessageSquare />
            <Coffee />
          </div>
        )}
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="mt-2 flex h-[28rem] w-80 flex-col rounded-lg border border-gray-300 bg-white p-4 shadow-lg">
          <div className="flex-1 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`my-2 rounded-md p-2 ${msg.role === 'user' ? 'bg-main text-secondary-light self-end' : 'text-main self-start bg-gray-100'}`}
              >
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            ))}

            {/* Streaming Markdown Response */}
            {loading && (
              <div className="text-main rounded-md bg-gray-100 p-2">
                <ReactMarkdown>{currentReply}</ReactMarkdown>
              </div>
            )}
          </div>

          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            size="invisible"
          />

          {/* Input Field & Send Button */}
          <div className="mt-2 flex items-center">
            <input
              type="text"
              className="flex-1 rounded-lg border border-gray-300 p-2 outline-none"
              placeholder="Pregúntame sobre el café ☕..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <button
              className="bg-main ml-2 rounded-lg p-2 text-white disabled:bg-gray-400"
              onClick={sendMessage}
              disabled={loading}
            >
              <Send className="text-white" />
            </button>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            This site is protected by reCAPTCHA and the Google{' '}
            <a
              href="https://policies.google.com/privacy"
              className="text-blue-500"
            >
              Privacy Policy
            </a>{' '}
            and{' '}
            <a
              href="https://policies.google.com/terms"
              className="text-blue-500"
            >
              Terms of Service
            </a>{' '}
            apply.
          </div>
        </div>
      )}
    </div>
  )
}
