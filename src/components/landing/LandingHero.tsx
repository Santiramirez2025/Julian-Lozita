'use client'

import { motion } from 'framer-motion'
import Simulator from './Simulator'

function Ambient() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Blobs */}
      <div className="absolute -top-40 -left-32 w-[36rem] h-[36rem] rounded-full bg-primary/25 blur-[130px]" />
      <div className="absolute top-1/3 -right-40 w-[34rem] h-[34rem] rounded-full bg-accent/12 blur-[130px]" />
      <div className="absolute bottom-0 left-1/4 w-[28rem] h-[28rem] rounded-full bg-primary-light/12 blur-[120px]" />
      {/* Grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hero-grid" width="56" height="56" patternUnits="userSpaceOnUse">
            <path d="M 56 0 L 0 0 0 56" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>
      {/* Scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent"
        initial={{ top: '-5%' }}
        animate={{ top: '105%' }}
        transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}

export default function LandingHero() {
  return (
    <section id="simulador" className="relative min-h-screen bg-[#07070C] overflow-hidden scroll-mt-0">
      <Ambient />

      {/* Top bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pt-7 flex items-center justify-between">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logo-white.svg"
          alt="J-Lozita — Estrategia Inmobiliaria & Patrimonial"
          className="h-8 sm:h-9 w-auto"
        />
        <span className="hidden sm:inline-flex items-center gap-2 text-xs text-white/50 font-mono tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          Villa María, Córdoba
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pt-16 sm:pt-24 pb-20">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-10 items-center">
          {/* Left: copy */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-white font-heading font-extrabold leading-[1.05] text-[2.5rem] sm:text-6xl tracking-tight"
            >
              Julián{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary-light">
                no
              </span>{' '}
              vende casas.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-5 text-lg sm:text-xl text-white/60 leading-relaxed max-w-lg"
            >
              Es el asesor al que le consultás <span className="text-white/90">antes</span> de tomar una
              decisión inmobiliaria o patrimonial importante.
            </motion.p>

            {/* Perfil de Julián: foto + nombre + credencial */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-9 inline-flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-3 pr-6"
            >
              <span className="relative block w-16 h-16 rounded-xl overflow-hidden ring-1 ring-white/15">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/julian.jpg"
                  alt="Julián Lozita"
                  className="w-full h-full object-cover"
                />
              </span>
              <span>
                <span className="block text-white font-heading font-bold text-lg leading-tight">
                  Julián Lozita
                </span>
                <span className="mt-1 flex items-center gap-1.5 text-accent text-sm font-medium">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
                    <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
                    <path d="M7 21h10M12 3v18M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Escribano Público y Abogado
                </span>
              </span>
            </motion.div>
          </div>

          {/* Right: simulator */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="mb-4 text-center lg:hidden">
              <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">Simulador</p>
              <p className="text-white/60 text-sm mt-1">Armá tu perfil en 30 segundos</p>
            </div>
            <Simulator />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
