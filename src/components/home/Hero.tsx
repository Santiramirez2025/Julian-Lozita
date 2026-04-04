'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'

const heroSlides = [
  {
    src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80',
    alt: 'Casa en venta en Villa María, Córdoba — fachada con jardín',
  },
  {
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80',
    alt: 'Departamento moderno en el centro de Villa María',
  },
  {
    src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80',
    alt: 'Propiedad con pileta en barrio norte de Villa María',
  },
]

const quickFilters = [
  { label: 'Casas', tipo: 'casa' },
  { label: 'Departamentos', tipo: 'departamento' },
  { label: 'Terrenos', tipo: 'terreno' },
  { label: 'Locales', tipo: 'local' },
  { label: 'Alquileres', tipo: 'alquiler' },
]

export default function Hero() {
  const [query, setQuery] = useState('')
  const [currentSlide, setCurrentSlide] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [])

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      const params = new URLSearchParams()
      if (query.trim()) params.set('q', query.trim())
      router.push(`/propiedades${params.toString() ? `?${params}` : ''}`)
    },
    [query, router]
  )

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5493534000000'
  const whatsappMessage = encodeURIComponent(
    'Hola Julián, estoy buscando una propiedad en Villa María. ¿Podés asesorarme?'
  )

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen max-h-[960px] flex items-center overflow-hidden">
      {/* ── Background carousel ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <Image
            src={heroSlides[currentSlide].src}
            alt={heroSlides[currentSlide].alt}
            fill
            className="object-cover"
            sizes="100vw"
            priority={currentSlide === 0}
            quality={85}
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-accent text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-5"
          >
            Inmobiliaria en Villa María
          </motion.p>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-[2rem] sm:text-5xl lg:text-[3.5rem] font-heading font-extrabold text-white leading-[1.1] mb-6"
          >
            Tu próxima propiedad
            <br />
            en <span className="text-accent">Villa María</span>
            <br className="hidden sm:block" />
            <span className="text-white/50 text-[0.6em] font-bold"> te está esperando</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="text-white/45 text-sm sm:text-base leading-relaxed mb-8 max-w-lg"
          >
            Casas, departamentos, terrenos y locales con asesoramiento
            personalizado. Fotos reales, precio directo. Sin vueltas.
          </motion.p>

          {/* ── Search bar ── */}
          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.5 }}
            className="mb-4"
          >
            <div className="flex items-center gap-0 bg-white/[0.07] backdrop-blur-xl rounded-2xl p-1.5 border border-white/[0.08] max-w-xl transition-colors focus-within:border-white/20 focus-within:bg-white/[0.1]">
              <div className="flex-1 relative">
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Barrio, tipo, dormitorios..."
                  className="w-full bg-transparent text-white placeholder:text-white/30 pl-12 pr-4 py-3.5 text-sm focus:outline-none"
                  aria-label="Buscar propiedades en Villa María"
                />
              </div>
              <Button type="submit" size="sm" className="shrink-0 rounded-xl px-5">
                Ver propiedades
              </Button>
            </div>
          </motion.form>

          {/* ── Quick filters ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {quickFilters.map((item) => (
              <Link
                key={item.tipo}
                href={`/propiedades?tipo=${item.tipo}`}
                className="px-4 py-2 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white/50 text-xs sm:text-sm font-medium hover:bg-white/[0.14] hover:text-white hover:border-white/15 transition-all duration-200"
              >
                {item.label}
              </Link>
            ))}
          </motion.div>

          {/* ── CTAs — clean, no overlap ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
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
            <Link
              href="/propiedades"
              className="text-white/40 hover:text-white text-sm font-medium transition-colors underline underline-offset-4 decoration-white/15 hover:decoration-white/40"
            >
              Explorar todas las propiedades →
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ── Slide indicators — bottom right only ── */}
      <div className="absolute bottom-6 right-4 sm:right-8 z-10 flex gap-1.5">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Ver imagen ${index + 1}`}
            className={`h-1 rounded-full transition-all duration-500 ${
              index === currentSlide
                ? 'w-7 bg-white'
                : 'w-1.5 bg-white/25 hover:bg-white/40'
            }`}
          />
        ))}
      </div>

      {/* ── Scroll hint — center bottom, desktop only ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden lg:block"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1.5"
        >
          <span className="text-white/15 text-[10px] uppercase tracking-widest">Scroll</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" className="opacity-15">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}