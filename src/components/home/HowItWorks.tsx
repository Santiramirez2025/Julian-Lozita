'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Button from '@/components/ui/Button'

const steps = [
  {
    number: '01',
    title: 'Explorá propiedades',
    description:
      'Buscá por tipo, zona o precio. Cada publicación tiene fotos reales, datos verificados y precio actualizado.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
        <path d="M11 8v6M8 11h6" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Consultá sin compromiso',
    description:
      'Escribile a Julián por WhatsApp o llamalo directo. Respuesta en minutos, no en días.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Visitá y decidí',
    description:
      'Coordinamos una visita en el horario que te sirva. Te acompañamos en todo el proceso hasta la escritura.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
]

export default function HowItWorks() {
  const headingRef = useRef(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-40px' })

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5493534222575'
  const whatsappMessage = encodeURIComponent(
    'Hola Julián, quiero consultar por una propiedad en Villa María.'
  )

  return (
    <section className="py-20 sm:py-28 bg-bg" id="como-funciona">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Heading ── */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14 sm:mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/50 mb-3">
            Simple y directo
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-text leading-tight mb-3">
            Encontrá tu propiedad en{' '}
            <span className="text-primary">3 pasos</span>
          </h2>
          <p className="text-text-light text-sm sm:text-base max-w-lg mx-auto">
            Sin intermediarios innecesarios, sin demoras. Atención personalizada
            de principio a fin.
          </p>
        </motion.div>

        {/* ── Steps ── */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Connecting line — desktop only */}
          <div className="hidden md:block absolute top-[4.5rem] left-[16.67%] right-[16.67%] h-px" aria-hidden="true">
            <div className="w-full h-full bg-gradient-to-r from-border via-primary/20 to-border" />
            {/* Arrow dots on the line */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-1">
              <div className="w-1 h-1 rounded-full bg-primary/30" />
              <div className="w-1 h-1 rounded-full bg-primary/20" />
              <div className="w-1 h-1 rounded-full bg-primary/10" />
            </div>
          </div>

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: index * 0.12, duration: 0.45 }}
              className="relative flex flex-col items-center text-center group"
            >
              {/* Step number + icon container */}
              <div className="relative mb-6">
                <div className="w-[72px] h-[72px] rounded-2xl bg-primary/[0.04] border border-primary/[0.08] flex items-center justify-center text-primary group-hover:bg-primary/[0.08] group-hover:border-primary/[0.15] group-hover:scale-105 transition-all duration-300">
                  {step.icon}
                </div>
                {/* Number badge */}
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shadow-sm shadow-primary/20">
                  {index + 1}
                </div>
              </div>

              {/* Mobile step connector */}
              {index < steps.length - 1 && (
                <div className="md:hidden absolute -bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5" aria-hidden="true">
                  <div className="w-px h-3 bg-border" />
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-border">
                    <path d="M12 5v14M5 12l7 7 7-7" />
                  </svg>
                </div>
              )}

              {/* Text */}
              <h3 className="font-heading font-bold text-lg text-text mb-2">
                {step.title}
              </h3>
              <p className="text-text-light text-sm leading-relaxed max-w-xs">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-14 sm:mt-16"
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
              Empezá tu consulta ahora
            </Button>
          </a>
          <span className="text-text-light/40 text-xs hidden sm:block">
            Respuesta en menos de 30 minutos
          </span>
        </motion.div>
      </div>
    </section>
  )
}