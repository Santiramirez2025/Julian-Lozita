'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FloatingWidgets from '@/components/layout/FloatingWidgets'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

const contactMethods = [
  {
    label: 'WhatsApp',
    description: 'Respuesta en minutos',
    href: 'whatsapp', // handled dynamically
    iconBg: 'bg-[#25D366]/10',
    iconColor: '#25D366',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.75.75 0 00.917.918l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
      </svg>
    ),
  },
  {
    label: 'Teléfono',
    description: '353 400-0000',
    href: 'tel:+5493534000000',
    iconBg: 'bg-primary/10',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
  },
  {
    label: 'Ubicación',
    description: 'Villa María, Córdoba',
    href: 'https://maps.google.com/?q=Villa+María+Córdoba+Argentina',
    iconBg: 'bg-accent/10',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    label: 'Horario',
    description: 'Lun–Vie 9–19h · Sáb 9–13h',
    href: null,
    iconBg: 'bg-primary/10',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
]

export default function ContactoClient() {
  const [form, setForm] = useState({ nombre: '', telefono: '', mensaje: '' })

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5493534000000'
  const whatsappDirectMessage = encodeURIComponent(
    'Hola Julián, vi tu web y me gustaría consultar sobre una propiedad.'
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const message = encodeURIComponent(
      `Hola Julián, soy ${form.nombre}. ${form.mensaje}${form.telefono ? ` Mi teléfono: ${form.telefono}` : ''}`
    )
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank')
  }

  return (
    <>
      <Navbar />
      <main className="pt-20 sm:pt-24 pb-16 min-h-screen bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-2xl mb-10 sm:mb-12"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/50 mb-3">
              Contacto
            </p>
            <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-text leading-tight mb-3">
              Hablá con Julián{' '}
              <span className="text-primary">directamente</span>
            </h1>
            <p className="text-text-light text-sm sm:text-base leading-relaxed">
              Consultas sobre propiedades, tasaciones o asesoramiento inmobiliario
              en Villa María. Sin compromiso, sin demoras.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* ── Left: Contact methods ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="lg:col-span-2 space-y-3"
            >
              {/* Direct WhatsApp CTA — primary action */}
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappDirectMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <Button variant="whatsapp" size="lg" className="w-full justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.75.75 0 00.917.918l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.34 0-4.508-.654-6.365-1.787l-.444-.267-3.07 1.03 1.03-3.07-.267-.444A9.955 9.955 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
                  </svg>
                  Escribir por WhatsApp ahora
                </Button>
              </a>

              {/* Contact cards */}
              {contactMethods.map((method) => {
                const isWhatsApp = method.label === 'WhatsApp'
                if (isWhatsApp) return null // Already shown as primary CTA above

                const href =
                  method.href === null
                    ? undefined
                    : method.href

                const Wrapper = href ? 'a' : 'div'
                const wrapperProps = href
                  ? {
                      href,
                      target: href.startsWith('http') ? '_blank' : undefined,
                      rel: href.startsWith('http') ? 'noopener noreferrer' : undefined,
                    }
                  : {}

                return (
                  <Wrapper
                    key={method.label}
                    {...(wrapperProps as any)}
                    className={`flex items-center gap-3.5 p-4 rounded-xl border border-border bg-white transition-all ${
                      href ? 'hover:border-primary/20 hover:shadow-sm cursor-pointer' : ''
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl ${method.iconBg} flex items-center justify-center shrink-0`}>
                      {method.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-text">{method.label}</p>
                      <p className="text-xs text-text-light">{method.description}</p>
                    </div>
                    {href && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="ml-auto text-text-light/30 shrink-0">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    )}
                  </Wrapper>
                )
              })}

              {/* Social */}
              <div className="pt-3">
                <p className="text-xs text-text-light/50 mb-2 font-medium">Seguinos</p>
                <div className="flex gap-2">
                  <a
                    href="https://instagram.com/julianlozita"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="w-9 h-9 rounded-xl border border-border bg-white flex items-center justify-center text-text-light hover:text-primary hover:border-primary/20 transition-all"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </a>
                  <a
                    href="https://facebook.com/julianlozita"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="w-9 h-9 rounded-xl border border-border bg-white flex items-center justify-center text-text-light hover:text-primary hover:border-primary/20 transition-all"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-text-light">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* ── Right: Form ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="lg:col-span-3"
            >
              <div className="rounded-2xl border border-border bg-white p-6 sm:p-8">
                <h2 className="font-heading font-bold text-lg text-text mb-1">
                  Enviá tu consulta
                </h2>
                <p className="text-text-light text-sm mb-6">
                  Se envía directo por WhatsApp a Julián. Respuesta en minutos.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Nombre"
                      value={form.nombre}
                      onChange={(e) => setForm((p) => ({ ...p, nombre: e.target.value }))}
                      placeholder="Tu nombre"
                      required
                    />
                    <Input
                      label="Teléfono (opcional)"
                      type="tel"
                      value={form.telefono}
                      onChange={(e) => setForm((p) => ({ ...p, telefono: e.target.value }))}
                      placeholder="353 412-3456"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-1.5">
                      Mensaje
                    </label>
                    <textarea
                      value={form.mensaje}
                      onChange={(e) => setForm((p) => ({ ...p, mensaje: e.target.value }))}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-white text-text placeholder:text-text-light/50 focus:border-primary-light focus:ring-2 focus:ring-primary-light/10 transition-all text-sm"
                      placeholder="Ej: Busco casa de 3 dormitorios en Barrio Norte con cochera..."
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="whatsapp"
                    size="lg"
                    className="w-full"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.75.75 0 00.917.918l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.34 0-4.508-.654-6.365-1.787l-.444-.267-3.07 1.03 1.03-3.07-.267-.444A9.955 9.955 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
                    </svg>
                    Enviar consulta por WhatsApp
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingWidgets />
    </>
  )
}