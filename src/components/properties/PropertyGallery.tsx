'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type PanInfo,
  type Variants,
} from 'framer-motion'
import IPhoneFrame from './IPhoneFrame'

interface PropertyGalleryProps {
  images: string[]
  title: string
  videoUrl?: string | null
  videoPoster?: string | null
}

const AUTOPLAY_MS = 5000
const IOS_EASE = [0.32, 0.72, 0, 1] as const

// Reescribe la URL de Cloudinary para entregar un thumbnail real
// (cuadrado 200×200, q=70) en lugar de la full 1920px.
function toThumbUrl(url: string): string {
  return url.replace(
    /c_limit,f_auto,q_\d+,w_\d+/,
    'c_fill,f_auto,q_70,w_200,h_200',
  )
}

// Para el poster del video: si es URL de Cloudinary, aplicamos transformaciones
// para servir un frame de baja resolución (q=auto, w=720). Si no, devolvemos tal cual.
function videoPosterOrDerived(poster: string | null | undefined, videoUrl: string): string | undefined {
  if (poster) return poster
  // Cloudinary video URL → derivar poster con eo_0 (frame 0)
  // Ej: /video/upload/v.../folder/clip.mp4 → /video/upload/so_0,w_720,q_auto/.../clip.jpg
  if (/res\.cloudinary\.com\/.+\/video\/upload\//.test(videoUrl)) {
    return videoUrl
      .replace('/video/upload/', '/video/upload/so_0,w_720,q_auto,f_jpg/')
      .replace(/\.(mp4|webm|mov)$/i, '.jpg')
  }
  return undefined
}

const slideVariants: Variants = {
  enter: (direction: number) => ({ x: direction >= 0 ? '100%' : '-100%' }),
  center: { x: 0 },
  exit: (direction: number) => ({ x: direction >= 0 ? '-100%' : '100%' }),
}

const fadeVariants: Variants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
}

export default function PropertyGallery({
  images,
  title,
  videoUrl,
  videoPoster,
}: PropertyGalleryProps) {
  const prefersReducedMotion = useReducedMotion()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const thumbsRef = useRef<HTMLDivElement>(null)

  const hasVideo = !!videoUrl
  const variants = prefersReducedMotion ? fadeVariants : slideVariants

  // Autoplay solo en modo galería iOS (sin video)
  useEffect(() => {
    if (hasVideo) return
    if (!prefersReducedMotion && images.length > 1) setIsPlaying(true)
  }, [prefersReducedMotion, images.length, hasVideo])

  const goNext = useCallback(() => {
    setDirection(1)
    setSelectedIndex((p) => (p === images.length - 1 ? 0 : p + 1))
  }, [images.length])

  const goPrev = useCallback(() => {
    setDirection(-1)
    setSelectedIndex((p) => (p === 0 ? images.length - 1 : p - 1))
  }, [images.length])

  const selectIndex = useCallback(
    (idx: number) => {
      setDirection(idx > selectedIndex ? 1 : -1)
      setSelectedIndex(idx)
      setIsPlaying(false)
    },
    [selectedIndex],
  )

  // Thumb activo a la vista (modo iOS)
  useEffect(() => {
    if (hasVideo) return
    const el = thumbsRef.current?.children[selectedIndex] as HTMLElement | undefined
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [selectedIndex, hasVideo])

  // Lightbox: teclado + scroll lock
  useEffect(() => {
    if (!lightboxOpen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false)
      else if (e.key === 'ArrowLeft') goPrev()
      else if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [lightboxOpen, goNext, goPrev])

  const handleSwipe = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -50 || info.velocity.x < -400) goNext()
    else if (info.offset.x > 50 || info.velocity.x > 400) goPrev()
    setIsPlaying(false)
  }

  const openLightboxAt = (idx: number) => {
    setSelectedIndex(idx)
    setDirection(0)
    setLightboxOpen(true)
  }

  if (images.length === 0 && !hasVideo) {
    return (
      <div className="aspect-[3/4] md:aspect-[4/3] rounded-3xl bg-bg-dark flex items-center justify-center">
        <p className="text-white/40 text-sm">Sin imágenes</p>
      </div>
    )
  }

  // ╔══════════════════════════════════════════════════════════════╗
  // ║   MODO VIDEO — Marco iPhone + grid de thumbnails             ║
  // ╚══════════════════════════════════════════════════════════════╝
  if (hasVideo) {
    const poster = videoPosterOrDerived(videoPoster, videoUrl)

    return (
      <>
        <div className="space-y-6">
          {/* iPhone con video */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: IOS_EASE }}
            className="py-4"
          >
            <IPhoneFrame>
              <video
                src={videoUrl}
                poster={poster}
                controls
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              >
                Tu navegador no soporta video HTML5.
              </video>
            </IPhoneFrame>
          </motion.div>

          {/* Thumbnails — fotos de la propiedad */}
          {images.length > 0 && (
            <div>
              <h3 className="font-heading font-semibold text-text text-sm mb-3 px-1">
                Más fotos
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                {images.map((img, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => openLightboxAt(index)}
                    aria-label={`Ver foto ${index + 1}`}
                    className="group relative aspect-square rounded-xl overflow-hidden bg-bg-dark shadow-sm hover:shadow-md transition-all"
                  >
                    <Image
                      src={toThumbUrl(img)}
                      alt={`${title} - Foto ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {renderLightbox()}
      </>
    )
  }

  // ╔══════════════════════════════════════════════════════════════╗
  // ║   MODO GALERÍA — iOS-style con autoplay (sin video)          ║
  // ╚══════════════════════════════════════════════════════════════╝
  const autoplay = isPlaying && !lightboxOpen && images.length > 1

  return (
    <>
      <div className="space-y-3">
        <div className="relative aspect-[3/4] md:aspect-[4/3] rounded-3xl overflow-hidden shadow-xl shadow-black/10 bg-bg-dark select-none">
          <motion.div
            className="absolute inset-0"
            drag={images.length > 1 ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleSwipe}
          >
            <AnimatePresence custom={direction} initial={false}>
              <motion.div
                key={selectedIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: IOS_EASE }}
                className="absolute inset-0 cursor-zoom-in"
                onClick={() => setLightboxOpen(true)}
              >
                <Image
                  src={images[selectedIndex]}
                  alt={`${title} - Foto ${selectedIndex + 1}`}
                  fill
                  className="object-contain pointer-events-none"
                  sizes="(max-width: 768px) 100vw, 60vw"
                  priority={selectedIndex === 0}
                  draggable={false}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {autoplay && (
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10 z-10 pointer-events-none">
              <motion.div
                key={selectedIndex}
                className="h-full bg-white/90"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' }}
                onAnimationComplete={() => {
                  if (autoplay) goNext()
                }}
              />
            </div>
          )}

          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setIsPlaying((p) => !p)
              }}
              aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
              className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white rounded-full p-2 transition-colors z-10"
            >
              {isPlaying ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          )}

          <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-full z-10 tracking-wide">
            {selectedIndex + 1} / {images.length}
          </div>

          {images.length > 5 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setLightboxOpen(true)
              }}
              className="absolute bottom-4 left-4 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-colors z-10"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
              Ver todas
            </button>
          )}
        </div>

        {images.length > 1 && (
          <div
            ref={thumbsRef}
            className="flex gap-2 overflow-x-auto snap-x snap-mandatory pb-1 scroll-container"
          >
            {images.map((img, index) => (
              <button
                key={index}
                type="button"
                onClick={() => selectIndex(index)}
                aria-label={`Ver foto ${index + 1}`}
                className={`relative aspect-square w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden flex-shrink-0 snap-start transition-all duration-300 ${
                  index === selectedIndex
                    ? 'ring-2 ring-primary opacity-100 scale-100'
                    : 'opacity-50 hover:opacity-90 scale-[0.97]'
                }`}
              >
                <Image
                  src={toThumbUrl(img)}
                  alt={`Miniatura ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {renderLightbox()}
    </>
  )

  function renderLightbox() {
    return (
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center select-none"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              type="button"
              className="absolute top-4 right-4 text-white/70 hover:text-white p-2 z-20"
              onClick={(e) => {
                e.stopPropagation()
                setLightboxOpen(false)
              }}
              aria-label="Cerrar"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/90 text-sm font-medium bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full z-20 tracking-wide">
              {selectedIndex + 1} / {images.length}
            </div>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 z-20 hidden md:block"
                  onClick={(e) => {
                    e.stopPropagation()
                    goPrev()
                  }}
                  aria-label="Anterior"
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 z-20 hidden md:block"
                  onClick={(e) => {
                    e.stopPropagation()
                    goNext()
                  }}
                  aria-label="Siguiente"
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </>
            )}

            <motion.div
              className="relative w-[92vw] h-[80vh]"
              drag={images.length > 1 ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleSwipe}
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 280, damping: 30 }}
            >
              <AnimatePresence custom={direction} initial={false}>
                <motion.div
                  key={selectedIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: IOS_EASE }}
                  className="absolute inset-0"
                >
                  <Image
                    src={images[selectedIndex]}
                    alt={`${title} - Foto ${selectedIndex + 1}`}
                    fill
                    className="object-contain pointer-events-none"
                    sizes="92vw"
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }
}
