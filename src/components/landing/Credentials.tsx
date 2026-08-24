'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 26 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const pillars = [
  {
    title: 'Respaldo legal real',
    body: 'Escribano Público y Abogado. La seguridad jurídica de tu operación no es un extra: es el punto de partida.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" /><path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Mirada patrimonial',
    body: 'No pensamos una propiedad aislada, sino cómo encaja en tu patrimonio y tus objetivos a largo plazo.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" /><path d="M7 15l3-4 3 3 4-6" />
      </svg>
    ),
  },
  {
    title: 'Sin vender humo',
    body: 'Cero presión de vendedor. Si algo no te conviene, te lo digo. Mi trabajo es que decidas bien, no que compres rápido.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3a9 9 0 1 0 9 9" /><path d="m8 12 3 3 9-9" />
      </svg>
    ),
  },
  {
    title: 'Local, de verdad',
    body: 'Villa María y la región. Conozco las zonas, los valores y hacia dónde crece cada barrio.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z" /><circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
]

export default function Credentials() {
  return (
    <section className="relative bg-[#0A0A0F] py-24 sm:py-28 overflow-hidden">
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[40rem] h-64 bg-primary/15 blur-[120px]" />
      <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
        <FadeUp className="max-w-2xl mb-14">
          <p className="text-accent text-xs font-semibold tracking-[0.22em] uppercase mb-3">Por qué Julián</p>
          <h2 className="text-white text-3xl sm:text-[2.6rem] font-heading font-bold leading-tight">
            Un asesor, no un intermediario.
          </h2>
          <p className="text-white/55 text-lg mt-4">
            La diferencia entre firmar tranquilo y arrepentirte después casi siempre está en con quién te
            asesoraste antes.
          </p>
        </FadeUp>

        <div className="grid sm:grid-cols-2 gap-4">
          {pillars.map((p, i) => (
            <FadeUp key={p.title} delay={i * 0.08}>
              <div className="group h-full rounded-3xl border border-white/10 bg-white/[0.025] p-7 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]">
                <span className="inline-flex w-12 h-12 rounded-2xl bg-accent/12 text-accent items-center justify-center [&_svg]:w-6 [&_svg]:h-6 mb-5">
                  {p.icon}
                </span>
                <h3 className="text-white text-xl font-heading font-bold mb-2.5">{p.title}</h3>
                <p className="text-white/55 leading-relaxed">{p.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
