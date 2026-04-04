'use client'

import { motion, useInView } from 'framer-motion'
import { useEffect, useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import PropertyCard from '@/components/properties/PropertyCard'
import Button from '@/components/ui/Button'
import { Property } from '@/types'

export default function FeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-60px' })

  // Scroll state for arrows
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  useEffect(() => {
    fetch('/api/propiedades?featured=true&limit=6')
      .then((res) => {
        if (!res.ok) throw new Error('Failed')
        return res.json()
      })
      .then((data) => {
        setProperties(data)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [])

  // Check scroll position for arrow visibility
  const updateScrollState = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el || loading) return
    // Initial check after render
    const timer = setTimeout(updateScrollState, 100)
    el.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)
    return () => {
      clearTimeout(timer)
      el.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [loading, properties, updateScrollState])

  const scroll = useCallback((direction: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = 320
    el.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth',
    })
  }, [])

  // ── Loading state ──
  if (loading) {
    return (
      <section className="py-20 sm:py-28 bg-bg" id="propiedades-destacadas">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-7 w-72 skeleton-shimmer rounded-lg mb-2" />
          <div className="h-5 w-96 skeleton-shimmer rounded-lg mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-[360px] skeleton-shimmer rounded-2xl"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </section>
    )
  }

  // ── Error state ──
  if (error) {
    return (
      <section className="py-20 sm:py-28 bg-bg" id="propiedades-destacadas">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-text-light text-sm mb-4">
            No pudimos cargar las propiedades en este momento.
          </p>
          <button
            onClick={() => {
              setError(false)
              setLoading(true)
              fetch('/api/propiedades?featured=true&limit=6')
                .then((res) => res.json())
                .then((data) => {
                  setProperties(data)
                  setLoading(false)
                })
                .catch(() => {
                  setError(true)
                  setLoading(false)
                })
            }}
            className="text-primary text-sm font-medium underline underline-offset-4 hover:text-primary-light transition-colors"
          >
            Reintentar
          </button>
        </div>
      </section>
    )
  }

  // ── Empty state ──
  if (properties.length === 0) {
    return (
      <section className="py-20 sm:py-28 bg-bg" id="propiedades-destacadas">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-text mb-3">
            Próximamente: nuevas propiedades
          </h2>
          <p className="text-text-light text-sm mb-6 max-w-md mx-auto">
            Estamos actualizando nuestro catálogo. Contactanos para conocer las
            propiedades disponibles en Villa María.
          </p>
          <Link href="/contacto">
            <Button size="md">Consultar disponibilidad</Button>
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 sm:py-28 bg-bg" id="propiedades-destacadas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/60 mb-3">
              Destacadas
            </p>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-text leading-tight">
              Propiedades en{' '}
              <span className="text-primary">Villa María</span>
            </h2>
            <p className="text-text-light mt-2 text-sm sm:text-base">
              Las mejores oportunidades del momento. Publicaciones verificadas con precio real.
            </p>
          </div>

          {/* Desktop: Ver todas + scroll arrows */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <Link
              href="/propiedades"
              className="text-sm font-medium text-primary hover:text-primary-light transition-colors underline underline-offset-4 decoration-primary/30 hover:decoration-primary/60"
            >
              Ver las {properties.length < 6 ? '' : '120+ '}propiedades →
            </Link>

            {/* Scroll arrows — visible only on tablet where scroll is active */}
            <div className="flex items-center gap-1.5 lg:hidden">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                aria-label="Anterior"
                className="w-9 h-9 rounded-xl border border-border flex items-center justify-center text-text-light hover:bg-gray-50 hover:text-text disabled:opacity-30 disabled:cursor-default transition-all"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                aria-label="Siguiente"
                className="w-9 h-9 rounded-xl border border-border flex items-center justify-center text-text-light hover:bg-gray-50 hover:text-text disabled:opacity-30 disabled:cursor-default transition-all"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── Cards: horizontal scroll on mobile/tablet, grid on desktop ── */}
        <div className="relative">
          {/* Fade edges for scroll hint — mobile/tablet only */}
          {canScrollRight && (
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none lg:hidden" />
          )}
          {canScrollLeft && (
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none lg:hidden" />
          )}

          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto scroll-container pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0 lg:gap-6"
          >
            {properties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                className="min-w-[280px] sm:min-w-[300px] lg:min-w-0"
              >
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Bottom CTA — mobile ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center sm:hidden"
        >
          <Link href="/propiedades">
          <Button variant="secondary" size="md" className="w-full">
  Ver todas las propiedades →
</Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}