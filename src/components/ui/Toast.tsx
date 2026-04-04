'use client'

import { Toaster } from 'react-hot-toast'

export default function ToastProvider() {
  return (
    <Toaster
      position="bottom-center"
      toastOptions={{
        duration: 3000,
        style: {
          fontFamily: 'var(--font-body)',
          borderRadius: '16px',
          padding: '12px 20px',
          fontSize: '14px',
          boxShadow: '0 10px 40px -10px rgba(0,0,0,0.15)',
        },
        success: {
          iconTheme: { primary: '#10B981', secondary: '#fff' },
        },
        error: {
          iconTheme: { primary: '#EF4444', secondary: '#fff' },
        },
      }}
    />
  )
}
