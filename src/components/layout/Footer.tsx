'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// Reusable fade-up wrapper
function FadeUp({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Animated grid background
function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient mesh orbs */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/8 blur-[120px]" />
      <div className="absolute -bottom-48 -left-24 w-80 h-80 rounded-full bg-accent/5 blur-[100px]" />

      {/* Animated grid lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.03]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="footer-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#footer-grid)" />
      </svg>

      {/* Horizontal scanning line */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent"
        initial={{ top: '0%' }}
        animate={{ top: '100%' }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}

// Animated counter dot for the "active" indicator
function PulseDot() {
  return (
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]" />
    </span>
  )
}

export default function Footer() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5493534000000'
  const whatsappMessage = encodeURIComponent(
    'Hola Julián, vi tu web y me interesa consultar por una propiedad.'
  )
  const currentYear = new Date().getFullYear()
  const footerRef = useRef(null)
  const isInView = useInView(footerRef, { once: true, margin: '-60px' })

  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/propiedades', label: 'Propiedades en venta' },
    { href: '/propiedades?tipo=alquiler', label: 'Alquileres' },
    { href: '/contacto', label: 'Contacto' },
  ]

  const zonas = [
    { href: '/propiedades?zona=centro', label: 'Centro' },
    { href: '/propiedades?zona=norte', label: 'Barrio Norte' },
    { href: '/propiedades?zona=sur', label: 'Zona Sur' },
    { href: '/propiedades?zona=villa-nueva', label: 'Villa Nueva' },
  ]

  return (
    <footer ref={footerRef} className="relative bg-bg-dark text-white overflow-hidden" role="contentinfo">
      <GridBackground />

      {/* ── CTA Banner ── */}
      <div className="relative border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <FadeUp>
            <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden">
              {/* Glow accent inside card */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

              <div className="text-center sm:text-left relative z-10">
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-white leading-tight">
                  ¿Buscás tu próxima propiedad?
                </h3>
                <p className="text-white/40 text-sm mt-2 max-w-md">
                  Asesoramiento sin compromiso. Respondemos en minutos.
                </p>
              </div>

              <motion.a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="relative z-10 inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold px-7 py-3.5 rounded-xl transition-colors duration-200 shadow-lg shadow-[#25D366]/15 text-sm shrink-0"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.75.75 0 00.917.918l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.34 0-4.508-.654-6.365-1.787l-.444-.267-3.07 1.03 1.03-3.07-.267-.444A9.955 9.955 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
                </svg>
                Consultá ahora
              </motion.a>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <FadeUp delay={0.05} className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5 group">
              <motion.div
                whileHover={{ rotate: -6, scale: 1.08 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/10 to-white/[0.03] border border-white/[0.12] flex items-center justify-center font-heading font-extrabold text-sm text-white"
              >
                JL
              </motion.div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-base leading-tight text-white">
                  Julián Lozita
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/35 leading-tight">
                  Inmobiliaria
                </span>
              </div>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Compra, venta y alquiler de propiedades en Villa María y zona.
              Casas, departamentos, terrenos y locales comerciales.
            </p>

            {/* Online indicator */}
            <div className="flex items-center gap-2 mt-5">
              <PulseDot />
              <span className="text-xs text-white/35">Respondemos en minutos</span>
            </div>
          </FadeUp>

          {/* Navegación */}
          <FadeUp delay={0.1}>
            <h4 className="font-heading font-semibold text-xs mb-5 text-white/50 uppercase tracking-[0.15em]">
              Navegación
            </h4>
            <nav aria-label="Footer" className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group text-sm text-white/40 hover:text-white transition-colors duration-200 w-fit flex items-center gap-2"
                >
                  <span className="w-0 group-hover:w-3 h-px bg-accent transition-all duration-300" />
                  {link.label}
                </Link>
              ))}
            </nav>
          </FadeUp>

          {/* Zonas */}
          <FadeUp delay={0.15}>
            <h4 className="font-heading font-semibold text-xs mb-5 text-white/50 uppercase tracking-[0.15em]">
              Zonas
            </h4>
            <div className="flex flex-col gap-2">
              {zonas.map((zona) => (
                <Link
                  key={zona.href}
                  href={zona.href}
                  className="group text-sm text-white/40 hover:text-white transition-colors duration-200 w-fit flex items-center gap-2"
                >
                  <span className="w-0 group-hover:w-3 h-px bg-accent transition-all duration-300" />
                  {zona.label}
                </Link>
              ))}
            </div>
          </FadeUp>

          {/* Contacto */}
          <FadeUp delay={0.2}>
            <h4 className="font-heading font-semibold text-xs mb-5 text-white/50 uppercase tracking-[0.15em]">
              Contacto
            </h4>
            <div className="flex flex-col gap-3.5">
              {/* WhatsApp */}
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/40 hover:text-[#25D366] transition-colors duration-200 flex items-center gap-2.5 w-fit group"
              >
                <span className="w-8 h-8 rounded-lg bg-white/[0.04] group-hover:bg-[#25D366]/10 border border-white/[0.06] group-hover:border-[#25D366]/20 flex items-center justify-center transition-all duration-200">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.75.75 0 00.917.918l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                  </svg>
                </span>
                Escribir por WhatsApp
              </a>

              {/* Teléfono */}
              <a
                href="tel:+5493534000000"
                className="text-sm text-white/40 hover:text-accent transition-colors duration-200 flex items-center gap-2.5 w-fit group"
              >
                <span className="w-8 h-8 rounded-lg bg-white/[0.04] group-hover:bg-accent/10 border border-white/[0.06] group-hover:border-accent/20 flex items-center justify-center transition-all duration-200">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </span>
                353 400-0000
              </a>

              {/* Ubicación */}
              <div className="text-sm text-white/40 flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                Villa María, Córdoba
              </div>

              {/* Horario */}
              <div className="text-sm text-white/40 flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </span>
                Lun a Vie · 9:00 – 18:00
              </div>

              {/* Social */}
              <div className="flex items-center gap-2 mt-2">
                {[
                  {
                    href: 'https://instagram.com/julianlozita',
                    label: 'Instagram de Julián Lozita Inmobiliaria',
                    icon: (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                    ),
                  },
                  {
                    href: 'https://facebook.com/julianlozita',
                    label: 'Facebook de Julián Lozita Inmobiliaria',
                    icon: (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    ),
                  },
                ].map((social) => (
                  <motion.a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-9 h-9 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] hover:border-white/[0.12] flex items-center justify-center text-white/35 hover:text-white transition-all duration-200"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>

        {/* ── Animated divider ── */}
        <div className="relative mt-12 mb-6">
          <div className="h-px bg-white/[0.06]" />
          <motion.div
            className="absolute top-0 left-0 h-px w-1/3 bg-gradient-to-r from-accent/40 via-accent/20 to-transparent"
            initial={{ x: '-100%' }}
            animate={isInView ? { x: '300%' } : { x: '-100%' }}
            transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, repeatDelay: 2 }}
          />
        </div>

        {/* ── Bottom bar ── */}
        <FadeUp delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[11px] text-white/20 tracking-wide">
              © {currentYear} Julián Lozita Inmobiliaria — Villa María, Córdoba
            </p>
            <p className="text-[11px] text-white/20 tracking-wide">
              Diseño por{' '}
              <a
                href="https://santiagoagustinramirez.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-accent transition-colors duration-300"
              >
                Santiago Ramírez
              </a>
            </p>
          </div>
        </FadeUp>
      </div>
    </footer>
  )
}