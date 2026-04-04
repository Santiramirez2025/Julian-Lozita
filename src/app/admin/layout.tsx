'use client'

import { useSession } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { SessionProvider } from 'next-auth/react'
import AdminSidebar from '@/components/layout/AdminSidebar'

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const { status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (status === 'unauthenticated' && pathname !== '/admin/login') {
      router.push('/admin/login')
    }
  }, [status, router, pathname])

  // Login page doesn't need sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-8 w-8 text-primary mx-auto" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-text-light text-sm mt-3">Cargando...</p>
        </div>
      </div>
    )
  }

  if (status === 'unauthenticated') return null

  return (
    <div className="flex min-h-screen bg-bg">
      <AdminSidebar />
      <div className="flex-1 overflow-x-hidden">
        {/* Mobile header */}
        <div className="lg:hidden bg-white border-b border-border p-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-heading font-bold text-xs">
            JL
          </div>
          <span className="font-heading font-bold text-text">Admin</span>
        </div>
        <div className="p-6 lg:p-8">{children}</div>
      </div>
    </div>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </SessionProvider>
  )
}
