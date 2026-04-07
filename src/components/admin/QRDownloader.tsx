'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import toast from 'react-hot-toast'

interface QRDownloaderProps {
  propertyId: string
  slug: string
}

export default function QRDownloader({ propertyId, slug }: QRDownloaderProps) {
  const [loadingQR, setLoadingQR] = useState(false)
  const [loadingPoster, setLoadingPoster] = useState(false)

  const download = async (type: 'qr' | 'poster') => {
    const setLoading = type === 'qr' ? setLoadingQR : setLoadingPoster
    const filename = type === 'qr' ? `qr-${slug}.png` : `cartel-${slug}.png`
    const url = type === 'qr' ? `/api/qr/${propertyId}` : `/api/qr/${propertyId}?poster=true`
    const successMsg = type === 'qr' ? 'QR descargado' : 'Cartel A4 descargado'

    setLoading(true)
    const toastId = toast.loading(type === 'qr' ? 'Generando QR...' : 'Generando cartel...')

    try {
      const res = await fetch(url)
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || `Error ${res.status}`)
      }
      const blob = await res.blob()
      const objectUrl = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = objectUrl
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(objectUrl)

      toast.success(successMsg, { id: toastId })
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Error al descargar', { id: toastId })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={() => download('qr')}
        variant="secondary"
        size="sm"
        loading={loadingQR}
        disabled={loadingPoster}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <path d="M14 14h3v3M21 14v.01M14 21v-3M17 21h4M21 17v4" />
        </svg>
        QR
      </Button>
      <Button
        onClick={() => download('poster')}
        variant="secondary"
        size="sm"
        loading={loadingPoster}
        disabled={loadingQR}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
          <path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" />
          <rect x="6" y="14" width="12" height="8" rx="1" />
        </svg>
        Cartel A4
      </Button>
    </div>
  )
}