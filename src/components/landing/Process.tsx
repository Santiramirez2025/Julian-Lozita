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

const steps = [
  {
    n: '01',
    title: 'Armás tu perfil',
    body: 'Respondés 5 preguntas rápidas. En 30 segundos Julián ya sabe qué buscás y con qué contás.',
  },
  {
    n: '02',
    title: 'Julián lee tu caso',
    body: 'Recibe tu perfil y te contacta por WhatsApp en el día con una primera lectura, sin vueltas.',
  },
  {
    n: '03',
    title: 'Decidís con respaldo',
    body: 'Charlan tu situación real. Avanzás solo cuando la decisión es la correcta para vos y tu patrimonio.',
  },
]

export default function Process() {
  return (
    <section className="relative bg-[#07070C] py-24 sm:py-28 overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
        <FadeUp className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-accent text-xs font-semibold tracking-[0.22em] uppercase mb-3">Cómo trabajamos</p>
          <h2 className="text-white text-3xl sm:text-[2.6rem] font-heading font-bold leading-tight">
            Simple, directo y a tu ritmo.
          </h2>
        </FadeUp>

        <div className="grid md:grid-cols-3 gap-5">
          {steps.map((s, i) => (
            <FadeUp key={s.n} delay={i * 0.1}>
              <div className="relative h-full rounded-3xl border border-white/10 bg-white/[0.025] p-8">
                <span className="font-mono text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-primary-light to-accent">
                  {s.n}
                </span>
                <h3 className="text-white text-xl font-heading font-bold mt-5 mb-2.5">{s.title}</h3>
                <p className="text-white/55 leading-relaxed">{s.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.15} className="mt-14 text-center">
          <a
            href="#simulador"
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary-light to-accent px-7 py-4 font-semibold text-primary shadow-lg shadow-accent/20 transition-transform hover:scale-[1.03]"
          >
            Armar mi perfil ahora
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-4 h-4">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </FadeUp>
      </div>
    </section>
  )
}
