'use client'

import { motion } from 'framer-motion'
import { ChatMessage as ChatMessageType } from '@/types'

interface ChatMessageProps {
  message: ChatMessageType
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`flex items-start gap-2 max-w-[85%] ${isUser ? 'flex-row-reverse' : ''}`}>
        {/* Avatar */}
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
            isUser
              ? 'bg-primary text-white'
              : 'bg-gradient-to-br from-accent/20 to-primary/10 text-primary'
          }`}
        >
          {isUser ? 'U' : '✨'}
        </div>

        {/* Message bubble */}
        <div
          className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
            isUser
              ? 'bg-primary text-white rounded-br-md'
              : 'bg-gray-50 text-text rounded-bl-md'
          }`}
        >
          {/* Parse property links */}
          {message.content.split('\n').map((line, i) => {
            const linkMatch = line.match(/👉 Ver más: (\/propiedades\/[\w-]+)/)
            if (linkMatch) {
              return (
                <p key={i}>
                  <a
                    href={linkMatch[1]}
                    className={`underline font-medium ${isUser ? 'text-white/90' : 'text-primary-light'}`}
                    target="_blank"
                  >
                    👉 Ver propiedad
                  </a>
                </p>
              )
            }
            return <p key={i} className={i > 0 ? 'mt-1' : ''}>{line}</p>
          })}
        </div>
      </div>
    </motion.div>
  )
}
