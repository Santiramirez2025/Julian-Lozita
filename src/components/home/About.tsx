'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Button from '@/components/ui/Button'

const values = [
  {
    title: 'Trato directo',
    description: 'Hablás conmigo. Sin intermediarios, sin call centers.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    title: 'Conozco cada barrio',
    description: 'Sé qué zonas están creciendo y dónde conviene invertir.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    title: 'Sin letra chica',
    description: 'Precios reales, condiciones claras desde el primer contacto.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5493534000000'
  const whatsappMessage = encodeURIComponent(
    'Hola Julián, me gustaría consultar sobre una propiedad.'
  )

  return (
    <section className="py-20 sm:py-28 bg-bg" id="sobre-julian">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Photo column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 relative"
          >
            <div className="relative aspect-[4/5] sm:aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5 border border-border">
              {/* 
                Para poner la foto real de Julián:
                1. Poné la imagen en public/images/julian.jpg
                2. Descomentá el Image de abajo
                3. Borrá el bloque "Placeholder"
              */}
              {/* <Image
                src="/images/julian.jpg"
                alt="Julián Lozita — Asesor inmobiliario en Villa María"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              /> */}

              {/* Placeholder — borrar cuando esté la foto real */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <img src="/images/logo-mark.svg" alt="JL" className="w-24 h-24 mb-4" />
                <p className="text-text font-heading font-semibold">Julián Lozita</p>
                <p className="text-text-light text-sm">Asesor inmobiliario</p>
              </div>
            </div>

            {/* Experience badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="absolute -bottom-4 left-4 sm:-bottom-5 sm:left-6 glass rounded-xl px-5 py-3 shadow-lg"
            >
              <p className="font-heading font-extrabold text-2xl text-primary leading-none">5+</p>
              <p className="text-text-light text-xs mt-0.5">Años en el mercado</p>
            </motion.div>
          </motion.div>

          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/50 mb-3">
              Sobre Julián
            </p>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-text leading-tight mb-5">
              Tu asesor inmobiliario
              <br />
              en <span className="text-primary">Villa María</span>
            </h2>

            <div className="space-y-3 text-text-light text-sm sm:text-base leading-relaxed mb-8">
              <p>
                Soy Julián Lozita. Me dedico a la venta de propiedades en Villa María y zona con un enfoque simple:{' '}
                <span className="text-text font-medium">transparencia, trato personal y conocimiento real de cada barrio.</span>
              </p>
              <p>
                Cuando me contactás, hablás conmigo. Te acompaño en todo el proceso — desde la primera consulta hasta la escritura. Mi trabajo es que tomes la mejor decisión con información clara.
              </p>
            </div>

            {/* Values */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8">
              {values.map((value, i) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-primary/[0.03] border border-primary/[0.06]"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/[0.07] flex items-center justify-center text-primary shrink-0 mt-0.5">
                    {value.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-text leading-tight">{value.title}</p>
                    <p className="text-xs text-text-light mt-0.5 leading-relaxed">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
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
                  Hablar con Julián
                </Button>
              </a>
              <a
                href="tel:+5493534000000"
                className="text-text-light hover:text-primary text-sm font-medium transition-colors flex items-center gap-1.5"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                353 400-0000
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}