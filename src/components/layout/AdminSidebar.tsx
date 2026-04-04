'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { useState, useEffect, createContext, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

// ─── Context for sidebar state (share with layout) ───
const SidebarContext = createContext<{
  isOpen: boolean
  setIsOpen: (v: boolean) => void
  isCollapsed: boolean
  setIsCollapsed: (v: boolean) => void
}>({
  isOpen: false,
  setIsOpen: () => {},
  isCollapsed: false,
  setIsCollapsed: () => {},
})

export const useSidebar = () => useContext(SidebarContext)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Close mobile menu on route change
  const pathname = usePathname()
  useEffect(() => setIsOpen(false), [pathname])

  // Lock body scroll on mobile when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen, isCollapsed, setIsCollapsed }}>
      {children}
    </SidebarContext.Provider>
  )
}

// ─── Mobile trigger button (place in admin header) ───
export function SidebarMobileTrigger() {
  const { setIsOpen } = useSidebar()
  return (
    <button
      onClick={() => setIsOpen(true)}
      className="lg:hidden p-2 -ml-2 rounded-xl text-text-light hover:bg-gray-100 hover:text-text transition-colors"
      aria-label="Abrir menú"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M3 12h18M3 6h18M3 18h18" />
      </svg>
    </button>
  )
}

// ─── Nav items ───
const mainNav = [
  {
    href: '/admin',
    label: 'Dashboard',
    exact: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    href: '/admin/propiedades',
    label: 'Propiedades',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <path d="M9 22V12h6v10" />
      </svg>
    ),
  },
  {
    href: '/admin/leads',
    label: 'Leads',
    badge: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    href: '/admin/analytics',
    label: 'Analytics',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </svg>
    ),
  },
  {
    href: '/admin/scoring',
    label: 'Scoring IA',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4 4 0 014 4c0 1.95-1.4 3.58-3.25 3.93" />
        <path d="M8.75 9.93A4.002 4.002 0 0112 2" />
        <path d="M12 15a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        <circle cx="12" cy="10" r="1" fill="currentColor" />
        <path d="M9.5 14.5L12 12l2.5 2.5" />
      </svg>
    ),
  },
]

// ─── Sidebar content (shared between desktop + mobile) ───
function SidebarContent() {
  const pathname = usePathname()
  const { isCollapsed } = useSidebar()

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <Link href="/admin" className="flex items-center gap-2.5 mb-8 px-1 group">
        <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center font-heading font-extrabold text-sm shrink-0 transition-transform group-hover:scale-105">
          JL
        </div>
        {!isCollapsed && (
          <div className="flex flex-col min-w-0">
            <span className="font-heading font-bold text-sm text-text leading-tight truncate">
              Julián Lozita
            </span>
            <span className="text-[10px] font-medium text-text-light leading-tight">
              Panel de gestión
            </span>
          </div>
        )}
      </Link>

      {/* Quick action — Nueva propiedad */}
      <Link
        href="/admin/propiedades/nueva"
        className={cn(
          'flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all duration-200 mb-6',
          'bg-primary text-white hover:bg-primary-light shadow-sm hover:shadow-md hover:shadow-primary/10',
          isCollapsed ? 'w-9 h-9 mx-auto p-0' : 'px-4 py-2.5'
        )}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="shrink-0">
          <path d="M12 5v14M5 12h14" />
        </svg>
        {!isCollapsed && <span>Nueva propiedad</span>}
      </Link>

      {/* Section label */}
      {!isCollapsed && (
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-text-light/60 px-4 mb-2">
          Principal
        </p>
      )}

      {/* Main nav */}
      <nav className="flex flex-col gap-0.5" aria-label="Menú principal">
        {mainNav.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname === item.href || pathname?.startsWith(item.href + '/')

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'group relative flex items-center gap-3 rounded-xl text-sm font-medium transition-all duration-200',
                isCollapsed ? 'justify-center w-10 h-10 mx-auto' : 'px-4 py-2.5',
                isActive
                  ? 'bg-primary/[0.06] text-primary'
                  : 'text-text-light hover:bg-gray-50 hover:text-text'
              )}
              title={isCollapsed ? item.label : undefined}
            >
              {/* Active indicator bar */}
              {isActive && (
                <motion.div
                  layoutId="admin-active-indicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-primary"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}

              <span className={cn(
                'shrink-0 transition-colors',
                isActive ? 'text-primary' : 'text-text-light group-hover:text-text'
              )}>
                {item.icon}
              </span>

              {!isCollapsed && (
                <>
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full bg-sold/10 text-sold text-[10px] font-bold px-1.5">
                      3
                    </span>
                  )}
                </>
              )}

              {isCollapsed && item.badge && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-sold" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom section */}
      <div className="border-t border-border pt-3 flex flex-col gap-0.5">
        <Link
          href="/"
          target="_blank"
          className={cn(
            'group flex items-center gap-3 rounded-xl text-sm font-medium text-text-light hover:bg-gray-50 hover:text-text transition-all duration-200',
            isCollapsed ? 'justify-center w-10 h-10 mx-auto' : 'px-4 py-2.5'
          )}
          title={isCollapsed ? 'Ver sitio público' : undefined}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
            <path d="M15 3h6v6" />
            <path d="M10 14L21 3" />
          </svg>
          {!isCollapsed && <span>Ver sitio público</span>}
        </Link>

        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className={cn(
            'group flex items-center gap-3 rounded-xl text-sm font-medium text-text-light hover:bg-sold/5 hover:text-sold transition-all duration-200 w-full',
            isCollapsed ? 'justify-center w-10 h-10 mx-auto' : 'px-4 py-2.5'
          )}
          title={isCollapsed ? 'Cerrar sesión' : undefined}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
            <path d="M16 17l5-5-5-5" />
            <path d="M21 12H9" />
          </svg>
          {!isCollapsed && <span>Cerrar sesión</span>}
        </button>
      </div>

      {/* Collapse toggle — desktop only */}
      <div className="hidden lg:block pt-3 border-t border-border mt-3">
        <CollapseToggle />
      </div>
    </div>
  )
}

function CollapseToggle() {
  const { isCollapsed, setIsCollapsed } = useSidebar()
  return (
    <button
      onClick={() => setIsCollapsed(!isCollapsed)}
      className={cn(
        'flex items-center gap-2 rounded-xl text-xs font-medium text-text-light/50 hover:text-text-light hover:bg-gray-50 transition-all duration-200 w-full',
        isCollapsed ? 'justify-center w-10 h-10 mx-auto' : 'px-4 py-2'
      )}
      aria-label={isCollapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn('shrink-0 transition-transform duration-300', isCollapsed && 'rotate-180')}
      >
        <path d="M11 17l-5-5 5-5" />
        <path d="M18 17l-5-5 5-5" />
      </svg>
      {!isCollapsed && <span>Colapsar</span>}
    </button>
  )
}

// ─── Main export ───
export default function AdminSidebar() {
  const { isOpen, setIsOpen, isCollapsed } = useSidebar()

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          'hidden lg:flex flex-col bg-white border-r border-border min-h-screen p-4 admin-sidebar transition-all duration-300',
          isCollapsed ? 'w-[72px]' : 'w-64'
        )}
      >
        <SidebarContent />
      </aside>

      {/* Mobile overlay + drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', stiffness: 350, damping: 35 }}
              className="fixed top-0 left-0 bottom-0 z-50 w-[264px] bg-white shadow-2xl p-4 lg:hidden overflow-y-auto"
            >
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-text-light hover:bg-gray-100 transition-colors"
                aria-label="Cerrar menú"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}