'use client'

import { useEffect, useRef } from 'react'

interface PropertyMapProps {
  latitude: number
  longitude: number
  title: string
}

export default function PropertyMap({ latitude, longitude, title }: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    const initMap = async () => {
      const L = (await import('leaflet')).default

      const map = L.map(mapRef.current!, {
        center: [latitude, longitude],
        zoom: 15,
        scrollWheelZoom: false,
      })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
      }).addTo(map)

      const icon = L.divIcon({
        html: `<div style="width:32px;height:32px;background:#1E3A5F;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
        </div>`,
        className: '',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      })

      L.marker([latitude, longitude], { icon }).addTo(map).bindPopup(title)

      mapInstanceRef.current = map
    }

    initMap()

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [latitude, longitude, title])

  return (
    <div ref={mapRef} className="w-full h-[300px] rounded-2xl overflow-hidden border border-border" />
  )
}
