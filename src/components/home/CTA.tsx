'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'

const trustPoints = [
  'Respuesta en minutos',
  'Sin compromiso',
  'Asesoramiento gratuito',
]

export default function CTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5493534222575'
  const whatsappMessage = encodeURIComponent(
    'Hola Julián, estoy buscando propiedades en Villa María. ¿Podés asesorarme?'
  )

  return (
    <section className="py-16 sm:py-20 bg-bg" id="contactar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl bg-bg-dark overflow-hidden"
        >
          {/* Background effects */}
          <div className="absolute inset-0 dot-pattern opacity-15" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-accent/[0.04] blur-[80px]" />
          <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-primary/[0.06] blur-[80px]" />

          <div className="relative px-6 py-12 sm:px-12 sm:py-16 lg:px-20 lg:py-20">
            <div className="max-w-2xl mx-auto text-center">
              {/* Eyebrow */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.2 }}
                className="text-accent text-xs font-semibold uppercase tracking-[0.2em] mb-4"
              >
                Empezá hoy
              </motion.p>

              {/* H2 */}
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ delay: 0.25, duration: 0.45 }}
                className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-white leading-tight mb-4"
              >
                Tu próxima propiedad en Villa María
                <br className="hidden sm:block" />
                {' '}está a un mensaje de distancia
              </motion.h2>

              {/* Sub */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.35 }}
                className="text-white/40 text-sm sm:text-base mb-8 max-w-lg mx-auto leading-relaxed"
              >
                Contale a Julián qué buscás — tipo, zona, presupuesto — y recibí
                opciones reales en minutos. Sin vueltas.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: 0.45 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8"
              >
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="whatsapp" size="lg">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.75.75 0 00.917.918l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.34 0-4.508-.654-6.365-1.787l-.444-.267-3.07 1.03 1.03-3.07-.267-.444A9.955 9.955 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
                    </svg>
                    Consultá ahora por WhatsApp
                  </Button>
                </a>
                <Link
                  href="/propiedades"
                  className="text-white/35 hover:text-white text-sm font-medium transition-colors underline underline-offset-4 decoration-white/15 hover:decoration-white/40"
                >
                  o explorá las propiedades →
                </Link>
              </motion.div>

              {/* Trust points */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.55 }}
                className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
              >
                {trustPoints.map((point) => (
                  <span
                    key={point}
                    className="flex items-center gap-1.5 text-xs text-white/25"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent/40">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {point}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}