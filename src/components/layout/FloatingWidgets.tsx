'use client'

import dynamic from 'next/dynamic'

const WhatsAppFloat = dynamic(() => import('@/components/layout/WhatsAppFloat'), {
  ssr: false,
})
const ChatBot = dynamic(() => import('@/components/ai/ChatBot'), {
  ssr: false,
})

export default function FloatingWidgets() {
  return (
    <>
      <WhatsAppFloat />
      <ChatBot />
    </>
  )
}