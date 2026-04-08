'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ChatMessage from './ChatMessage'
import TypingIndicator from './TypingIndicator'
import { ChatMessage as ChatMessageType } from '@/types'

const MAX_MESSAGES = 10

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hola 👋 Soy el asistente de J-Lozita. ¿Qué tipo de propiedad estás buscando en Villa María?',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [messageCount, setMessageCount] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isLoading])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    if (messageCount >= MAX_MESSAGES) {
      const limitMsg: ChatMessageType = {
        id: `limit-${Date.now()}`,
        role: 'assistant',
        content: 'Llegamos al límite de mensajes por sesión. Para seguir hablando, contactá a Julián directamente por WhatsApp. ¡Te va a ayudar mejor que yo! 😄',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, limitMsg])
      return
    }

    const userMessage: ChatMessageType = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setMessageCount((prev) => prev + 1)

    try {
      const history = messages
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({ role: m.role, content: m.content }))

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input.trim(),
          history: [...history, { role: 'user', content: input.trim() }],
        }),
      })

      if (!res.ok) throw new Error('Error en el chat')

      const reader = res.body?.getReader()
      const decoder = new TextDecoder()

      const assistantId = `assistant-${Date.now()}`
      let fullContent = ''

      setMessages((prev) => [
        ...prev,
        { id: assistantId, role: 'assistant', content: '', timestamp: new Date() },
      ])

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          const chunk = decoder.decode(value, { stream: true })
          fullContent += chunk
          setMessages((prev) =>
            prev.map((m) => (m.id === assistantId ? { ...m, content: fullContent } : m))
          )
        }
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: 'assistant',
          content: 'Ups, hubo un error. Probá de nuevo o contactá a Julián directamente por WhatsApp.',
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary-light text-white flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-110 transition-transform"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full badge-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', duration: 0.35 }}
            className="fixed bottom-6 left-6 z-50 w-[350px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-6rem)] rounded-2xl overflow-hidden bg-white border border-border shadow-2xl shadow-primary/10 flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primary-light p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-sm">
                  ✨
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">J-Lozita IA</p>
                  <p className="text-white/60 text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
                    En línea
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white p-1"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 chat-scroll">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isLoading && <TypingIndicator />}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border">
              {messageCount >= MAX_MESSAGES ? (
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5493534222575'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-3 rounded-xl bg-[#25D366] text-white text-sm font-semibold"
                >
                  Seguir por WhatsApp →
                </a>
              ) : (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                    placeholder="Escribí tu consulta..."
                    className="flex-1 bg-gray-50 rounded-xl px-4 py-2.5 text-sm text-text placeholder:text-text-light/50 focus:outline-none focus:ring-2 focus:ring-primary-light/20"
                    disabled={isLoading}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim() || isLoading}
                    className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary-light transition-colors disabled:opacity-50"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 2L11 13" />
                      <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                    </svg>
                  </button>
                </div>
              )}
              <p className="text-[10px] text-text-light/40 text-center mt-2">
                {messageCount}/{MAX_MESSAGES} mensajes · Powered by IA
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
