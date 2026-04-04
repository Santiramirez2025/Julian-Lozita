'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'

const WhatsAppFloat = dynamic(() => import('@/components/layout/WhatsAppFloat'), {
  ssr: false,
})
const ChatBot = dynamic(() => import('@/components/ai/ChatBot'), {
  ssr: false,
})

export default function FloatingWidgets() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  if (!show) return null

  return (
    <>
      <WhatsAppFloat />
      <ChatBot />
    </>
  )
}