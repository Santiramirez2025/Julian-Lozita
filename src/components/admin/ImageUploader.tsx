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

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setUploading(true)

    try {
      const uploadPromises = acceptedFiles.map(async (file) => {
        const base64 = await new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result as string)
          reader.readAsDataURL(file)
        })

        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64 }),
        })

        if (!res.ok) throw new Error('Upload failed')
        const data = await res.json()
        return data.url
      })

      const urls = await Promise.all(uploadPromises)
      const newImages = [...images, ...urls]
      onImagesChange(newImages)

      if (!coverImage && urls.length > 0) {
        onCoverChange(urls[0])
      }

      toast.success(`${urls.length} imagen${urls.length > 1 ? 'es subidas' : ' subida'}`)
    } catch {
      toast.error('Error al subir imágenes')
    } finally {
      setUploading(false)
    }
  }, [images, coverImage, onImagesChange, onCoverChange])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
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

  return (
    <div>
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-colors',
          isDragActive ? 'border-primary-light bg-primary-light/5' : 'border-border hover:border-primary-light/50',
          uploading && 'opacity-50 cursor-not-allowed'
        )}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <svg className="animate-spin h-8 w-8 text-primary-light" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <p className="text-sm text-text-light">Subiendo imágenes...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            <p className="text-sm text-text-light">
              {isDragActive ? 'Soltá las imágenes acá' : 'Arrastrá fotos o hacé click para seleccionar'}
            </p>
            <p className="text-xs text-text-light/50">JPG, PNG, WebP · Máx 10MB</p>
          </div>
        )}
      </div>

      {/* Preview grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-4">
          {images.map((img, index) => (
            <div
              key={index}
              className={cn(
                'relative aspect-square rounded-xl overflow-hidden group',
                coverImage === img && 'ring-2 ring-primary-light ring-offset-2'
              )}
            >
              <Image src={img} alt={`Foto ${index + 1}`} fill className="object-cover" sizes="150px" />

              {/* Overlay actions */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <button
                  onClick={() => onCoverChange(img)}
                  className="w-8 h-8 rounded-lg bg-white/90 flex items-center justify-center text-primary text-xs"
                  title="Portada"
                >
                  ⭐
                </button>
                <button
                  onClick={() => removeImage(img)}
                  className="w-8 h-8 rounded-lg bg-white/90 flex items-center justify-center text-sold text-xs"
                  title="Eliminar"
                >
                  ✕
                </button>
              </div>

              {coverImage === img && (
                <div className="absolute top-1 left-1 bg-primary-light text-white text-[10px] px-2 py-0.5 rounded-md font-medium">
                  Portada
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
