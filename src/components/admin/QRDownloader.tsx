'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import toast from 'react-hot-toast'

interface QRDownloaderProps {
  propertyId: string
  propertyTitle: string
  slug: string
}

export default function QRDownloader({ propertyId, propertyTitle, slug }: QRDownloaderProps) {
  const [loading, setLoading] = useState(false)

  const downloadQR = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/qr/${propertyId}`)
      if (!res.ok) throw new Error()
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `qr-${slug}.png`
      a.click()
      URL.revokeObjectURL(url)
      toast.success('QR descargado')
    } catch {
      toast.error('Error al descargar QR')
    } finally {
      setLoading(false)
    }
  }

  const downloadPoster = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/qr/${propertyId}?poster=true`)
      if (!res.ok) throw new Error()
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `cartel-${slug}.png`
      a.click()
      URL.revokeObjectURL(url)
      toast.success('Cartel descargado')
    } catch {
      toast.error('Error al descargar cartel')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button onClick={downloadQR} variant="secondary" size="sm" loading={loading}>
        📱 QR
      </Button>
      <Button onClick={downloadPoster} variant="secondary" size="sm" loading={loading}>
        🖨️ Cartel A4
      </Button>
    </div>
  )
}
