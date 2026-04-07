'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { cn } from '@/lib/utils'

interface ImageUploaderProps {
  images: string[]
  coverImage: string
  onImagesChange: (images: string[]) => void
  onCoverChange: (cover: string) => void
}

export default function ImageUploader({ images, coverImage, onImagesChange, onCoverChange }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 })
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return

    setUploading(true)
    setUploadProgress({ current: 0, total: acceptedFiles.length })

    const uploadedUrls: string[] = []

    try {
      for (let i = 0; i < acceptedFiles.length; i++) {
        const file = acceptedFiles[i]
        try {
          const base64 = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result as string)
            reader.onerror = () => reject(new Error('No se pudo leer el archivo'))
            reader.readAsDataURL(file)
          })

          const res = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: base64 }),
          })

          if (!res.ok) {
            const err = await res.json().catch(() => ({}))
            throw new Error(err.error || `Error al subir ${file.name}`)
          }

          const data = await res.json()
          uploadedUrls.push(data.url)
          setUploadProgress({ current: i + 1, total: acceptedFiles.length })
        } catch (err) {
          toast.error(err instanceof Error ? err.message : `Error con ${file.name}`)
        }
      }

      if (uploadedUrls.length > 0) {
        const newImages = [...images, ...uploadedUrls]
        onImagesChange(newImages)

        if (!coverImage) {
          onCoverChange(uploadedUrls[0])
        }

        toast.success(
          uploadedUrls.length === 1
            ? '1 imagen subida'
            : `${uploadedUrls.length} imágenes subidas`
        )
      }
    } finally {
      setUploading(false)
      setUploadProgress({ current: 0, total: 0 })
    }
  }, [images, coverImage, onImagesChange, onCoverChange])

  const onDropRejected = useCallback((rejections: import('react-dropzone').FileRejection[]) => {
    const firstError = rejections[0]?.errors[0]
    if (firstError?.code === 'file-too-large') {
      toast.error('Archivo muy grande. Máximo 10MB por imagen.')
    } else if (firstError?.code === 'file-invalid-type') {
      toast.error('Formato no válido. Usá JPG, PNG o WebP.')
    } else {
      toast.error(firstError?.message || 'No se pudo cargar la imagen')
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
    maxSize: 10 * 1024 * 1024,
    disabled: uploading,
  })

  const removeImage = (url: string) => {
    const newImages = images.filter((img) => img !== url)
    onImagesChange(newImages)
    if (coverImage === url) {
      onCoverChange(newImages[0] || '')
    }
  }

  // Drag & drop reorder
  const handleDragStart = (index: number) => setDraggedIndex(index)
  const handleDragEnd = () => setDraggedIndex(null)
  const handleDragOver = (e: React.DragEvent) => e.preventDefault()
  const handleDrop = (targetIndex: number) => {
    if (draggedIndex === null || draggedIndex === targetIndex) return
    const newImages = [...images]
    const [moved] = newImages.splice(draggedIndex, 1)
    newImages.splice(targetIndex, 0, moved)
    onImagesChange(newImages)
    setDraggedIndex(null)
  }

  return (
    <div>
      {/* Header with counter */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-text">
          Imágenes de la propiedad
        </p>
        {images.length > 0 && (
          <span className="text-xs text-text-light">
            {images.length} {images.length === 1 ? 'imagen' : 'imágenes'}
          </span>
        )}
      </div>

      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all',
          isDragActive ? 'border-primary bg-primary/5 scale-[1.01]' : 'border-border hover:border-primary/40 hover:bg-bg',
          uploading && 'opacity-60 cursor-not-allowed'
        )}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <div className="flex flex-col items-center gap-3">
            <svg className="animate-spin h-8 w-8 text-primary" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-text">Subiendo imágenes...</p>
              <p className="text-xs text-text-light mt-0.5">
                {uploadProgress.current} de {uploadProgress.total}
              </p>
            </div>
            {/* Progress bar */}
            <div className="w-full max-w-xs h-1 bg-border rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${(uploadProgress.current / uploadProgress.total) * 100}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-1">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-text">
              {isDragActive ? 'Soltá las imágenes acá' : 'Arrastrá fotos o hacé click'}
            </p>
            <p className="text-xs text-text-light">JPG, PNG o WebP · Máximo 10MB cada una</p>
          </div>
        )}
      </div>

      {/* Preview grid */}
      {images.length > 0 && (
        <>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-4">
            {images.map((img, index) => (
              <div
                key={img}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(index)}
                className={cn(
                  'relative aspect-square rounded-xl overflow-hidden group cursor-move transition-all',
                  coverImage === img && 'ring-2 ring-primary ring-offset-2',
                  draggedIndex === index && 'opacity-40 scale-95'
                )}
              >
                <Image src={img} alt={`Foto ${index + 1}`} fill className="object-cover" sizes="150px" />

                {/* Overlay — visible on hover (desktop) and always partially visible on mobile */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent sm:bg-black/0 sm:group-hover:bg-black/50 transition-colors" />

                {/* Action buttons */}
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-center gap-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={() => onCoverChange(img)}
                    disabled={coverImage === img}
                    className="flex-1 h-8 rounded-lg bg-white/95 backdrop-blur flex items-center justify-center text-primary text-xs font-semibold disabled:opacity-50 disabled:cursor-default hover:bg-white transition-colors"
                    title="Marcar como portada"
                    aria-label="Marcar como portada"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => removeImage(img)}
                    className="flex-1 h-8 rounded-lg bg-white/95 backdrop-blur flex items-center justify-center text-red-500 hover:bg-white hover:text-red-600 transition-colors"
                    title="Eliminar imagen"
                    aria-label="Eliminar imagen"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                    </svg>
                  </button>
                </div>

                {/* Cover badge */}
                {coverImage === img && (
                  <div className="absolute top-2 left-2 bg-primary text-white text-[10px] px-2 py-1 rounded-md font-semibold flex items-center gap-1">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                    Portada
                  </div>
                )}

                {/* Order number */}
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur text-white text-[10px] w-5 h-5 rounded-full font-bold flex items-center justify-center">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-text-light mt-3 flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
            Arrastrá las imágenes para reordenarlas. La primera será la portada por defecto.
          </p>
        </>
      )}
    </div>
  )
}